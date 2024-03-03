const db = require("../../models");
const _ = require("lodash");
const GeneralHelper = require("./generalHelper");
const Boom = require("boom");
const fileName = "server/helpers/meetupHelper.js";
const {
  uploadToCloudinary,
  cloudinaryDeleteImg,
} = require("../../utils/cloudinary");
const { Op } = require("sequelize");

const getMeetupListHelperUser = async (dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to create this data")
      );
    }
    const checkMeetup = await db.Meetups.findAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: db.Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: db.User,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    if (_.isEmpty(checkMeetup)) {
      return null;
    }
    return Promise.resolve(checkMeetup);
  } catch (err) {
    console.log([fileName, "getMeetupListHelperUser", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getMeetupListHelperbyDateUser = async (dataToken, date) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to create this data")
      );
    }
    const checkMeetup = await db.Meetups.findAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: db.Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: db.User,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      where: {
        start_date: date,
      },
    });
    if (_.isEmpty(checkMeetup)) {
      return null;
    }
    return Promise.resolve(checkMeetup);
  } catch (err) {
    console.log([fileName, "getMeetupListHelperUser", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getMeetupListByCategoryHelperUser = async (dataToken, nameCategory) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to create this data")
      );
    }

    const category = await db.Category.findOne({
      where: { name: nameCategory },
    });

    if (_.isEmpty(category)) {
      return Promise.reject(Boom.notFound("Category not found"));
    }

    const checkMeetup = await db.Meetups.findAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: db.Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: { name: nameCategory },
        },
        {
          model: db.User,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    if (_.isEmpty(checkMeetup)) {
      return null;
    }
    return Promise.resolve(checkMeetup);
  } catch (err) {
    console.log([fileName, "getMeetupListHelperUser", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getMeetupDetailHelperUser = async (id) => {
  try {
    const checkMeetup = await db.Meetups.findOne({
      where: { id: id },
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: db.Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: db.User,
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        },
      ],
    });
    if (_.isEmpty(checkMeetup)) {
      return Promise.reject(
        Boom.badRequest("Meetup with this id is not available")
      );
    }
    return Promise.resolve(checkMeetup);
  } catch (err) {
    console.log([fileName, "getMeetupListHelperUser", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const createMeetupUser = async (dataObject, dataToken) => {
  const {
    title,
    description,
    category_id,
    full_address,
    lat,
    long,
    start_date,
    finish_date,
    start_time,
    finish_time,
    capacity,
    image,
  } = dataObject;
  try {
    const imageUploadPromises = image.map(async (image) => {
      const imageResult = await uploadToCloudinary(image, "image");
      return {
        image_url: imageResult?.url,
        image_id: imageResult?.public_id,
      };
    });
    const uploadedImages = await Promise.all(imageUploadPromises);
    await db.Meetups.create({
      title,
      description,
      category_id,
      full_address,
      lat,
      long,
      start_date,
      finish_date,
      start_time,
      finish_time,
      capacity,
      status: "Pending",
      organizer_id: dataToken.id,
      image: uploadedImages,
    });
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "createMeetupUser", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const updateMeetupUser = async (id, dataObject, dataToken) => {
  const {
    title,
    description,
    category_id,
    full_address,
    lat,
    long,
    place,
    start_date,
    finish_date,
    start_time,
    finish_time,
    capacity,
  } = dataObject;
  try {
    const checkAuthorization = await db.Meetups.findOne({
      where: { organizer_id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to update this data")
      );
    }
    const checkMeetup = await db.Meetups.findOne({
      where: { id: id },
    });
    if (!checkMeetup) {
      return Promise.reject(
        Boom.badRequest("Meetup with this id is doesn't exist")
      );
    }
    await db.Meetups.update(
      {
        title: title ? title : checkMeetup.dataValues.title,
        description: description
          ? description
          : checkMeetup.dataValues.description,
        category_id: category_id
          ? category_id
          : checkMeetup.dataValues.category_id,
        full_address: full_address
          ? full_address
          : checkMeetup.dataValues.full_address,
        lat: lat ? lat : checkMeetup.dataValues.lat,
        long: long ? long : checkMeetup.dataValues.long,
        place: place ? place : checkMeetup.dataValues.place,
        start_date: start_date ? start_date : checkMeetup.dataValues.start_date,
        finish_date: finish_date
          ? finish_date
          : checkMeetup.dataValues.finish_date,
        start_time: start_time ? start_time : checkMeetup.dataValues.start_time,
        finish_time: finish_time
          ? finish_time
          : checkMeetup.dataValues.finish_time,
        capacity: capacity ? capacity : checkMeetup.dataValues.capacity,
      },
      { where: { id: id } }
    );
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "updateMeetupUser", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const deleteImageMeetupHelper = async (id, dataToken, image_id) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    const checkAuthorizationMeetup = await db.Meetups.findOne({
      where: { organizer_id: dataToken.id },
    });

    if (_.isEmpty(checkAuthorizationMeetup)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to delete this data")
      );
    }
    const checkMeetup = await db.Meetups.findOne({
      where: { id: id },
    });
    if (!checkMeetup) {
      return Promise.reject(
        Boom.badRequest("Meetup with this id is doesn't exist")
      );
    }
    imageList = JSON.parse(checkMeetup.image);
    const filteredImagelist = imageList.filter(
      (image) => image.image_id !== image_id
    );
    await cloudinaryDeleteImg(image_id, "image");
    await db.Meetups.update({ image: filteredImagelist }, { where: { id } });
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "deleteMeetupHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const deleteMeetupHelperUser = async (id, dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    const checkAuthorizationMeetup = await db.Meetups.findOne({
      where: { organizer_id: dataToken.id },
    });

    if (_.isEmpty(checkAuthorizationMeetup)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to delete this data")
      );
    }
    const checkMeetup = await db.Meetups.findOne({
      where: { id: id },
    });
    if (!checkMeetup) {
      return Promise.reject(
        Boom.badRequest("Meetup with this id is doesn't exist")
      );
    } else {
      await db.Meetups.destroy({
        where: {
          id: id,
        },
      });
    }
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "deleteMeetupHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  getMeetupListHelperUser,
  getMeetupListHelperbyDateUser,
  getMeetupListByCategoryHelperUser,
  createMeetupUser,
  getMeetupDetailHelperUser,
  deleteMeetupHelperUser,
  updateMeetupUser,
  deleteImageMeetupHelper,
};
