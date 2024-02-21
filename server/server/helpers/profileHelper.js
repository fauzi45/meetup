const db = require("../../models");
const _ = require("lodash");
const GeneralHelper = require("./generalHelper");
const Boom = require("boom");
const fileName = "server/helpers/profileHelper.js";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const {
  uploadToCloudinary,
  cloudinaryDeleteImg,
} = require("../../utils/cloudinary");

const __hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

// eslint-disable-next-line arrow-body-style
const __comparePassword = (payloadPass, dbPass) => {
  return bcrypt.compareSync(payloadPass, dbPass);
};

const getProfileHelper = async (dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
    return Promise.resolve(checkAuthorization);
  } catch (err) {
    console.log([fileName, "getProfileHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getMyMeetupHelper = async (dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
    const checkMyMeetup = await db.Meetups.findAll({
      where: { organizer_id: dataToken.id },
    });
    if (_.isEmpty(checkMyMeetup)) {
      return { message: "Your Meetup is Empty" };
    }
    return Promise.resolve(checkMyMeetup);
  } catch (err) {
    console.log([fileName, "getProfileHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getMyMeetupAttendHelper = async (dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
    const checkMyMeetup = await db.Attendees.findAll({
      where: { user_id: dataToken.id },
      include: [
        {
          model: db.User,
          attributes: { exclude: ["createdAt", "updatedAt","password"] },
        },
        {
          model: db.Meetups,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: {
            model: db.User,
            attributes: { exclude: ["createdAt", "updatedAt","password"] },
          },
        },
      ],
    });
    if (_.isEmpty(checkMyMeetup)) {
      return { message: "Your Attend Meetup is Empty" };
    }
    return Promise.resolve(checkMyMeetup);
  } catch (err) {
    console.log([fileName, "getProfileHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const updateProfileHelper = async (dataToken, username, bio, location) => {
  try {
    const checkAuthorizationUser = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorizationUser)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    await db.User.update(
      {
        username: username ? username : checkTask.dataValues.username,
        bio: bio ? bio : checkTask.dataValues.bio,
        location: location ? location : checkTask.dataValues.location,
      },
      { where: { id: dataToken.id } }
    );
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "updateProfileHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const updateProfileImageHelper = async (dataToken, dataObject) => {
  try {
    const { image } = dataObject;
    const checkAuthorizationUser = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorizationUser)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    const imageResult = await uploadToCloudinary(image, "image");
    if (checkAuthorizationUser.image_id) {
      await cloudinaryDeleteImg(checkAuthorizationUser.image_id);
    }

    await db.User.update(
      {
        image_url: imageResult?.url
          ? imageResult?.url
          : checkTask.dataValues.image_url,
        image_id: imageResult?.public_id
          ? imageResult?.public_id
          : checkTask.dataValues.image_id,
      },
      { where: { id: dataToken.id } }
    );
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "updateProfileImageHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const changePassword = async (
  old_password,
  new_password,
  new_confirm_password,
  dataToken
) => {
  try {
    const checkUser = await db.User.findOne({
      where: {
        id: dataToken?.id,
      },
    });

    const isPassMatch = __comparePassword(old_password, checkUser.password);

    if (!isPassMatch) {
      return Promise.reject(Boom.badRequest("Wrong Old Password"));
    }

    if (new_password !== new_confirm_password) {
      return Promise.reject(Boom.badRequest("New Confirm Password Incorrect"));
    }

    if (old_password === new_password) {
      return Promise.reject(Boom.badRequest("New Password Must be Different"));
    }

    await db.User.update(
      {
        password: __hashPassword(new_password),
      },
      {
        where: {
          id: dataToken?.id,
        },
      }
    );

    return Promise.resolve(true);
  } catch (error) {
    console.log([fileName, "Change Password Helper", "ERROR"], {
      info: `${error}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(error));
  }
};

module.exports = {
  //user
  getProfileHelper,
  getMyMeetupHelper,
  getMyMeetupAttendHelper,

  updateProfileHelper,
  updateProfileImageHelper,
  changePassword,
};
