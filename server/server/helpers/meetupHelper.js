const db = require("../../models");
const _ = require("lodash");
const GeneralHelper = require("./generalHelper");
const Boom = require("boom");
const fileName = "server/helpers/meetupHelper.js";
const {
  uploadToCloudinary,
  cloudinaryDeleteImg,
} = require("../../utils/cloudinary");

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
      where: { status: "Accept" },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: db.Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    if (_.isEmpty(checkMeetup)) {
      return Promise.reject(Boom.badRequest("Meetup data is empty"));
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
      where: { status: "Accept", id: id },
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: db.Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
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
    lat,
    long,
    date,
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
      lat,
      long,
      date,
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
  createMeetupUser,
  getMeetupDetailHelperUser,
  deleteMeetupHelperUser,
};
