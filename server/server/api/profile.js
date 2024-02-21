const Router = require("express").Router();

const profileHelper = require("../helpers/profileHelper");

const GeneralHelper = require("../helpers/generalHelper");

const Validation = require("../helpers/validationHelper");

const Middleware = require("../middlewares/authMiddleware");

const fileName = "server/api/profile.js";

const uploadMedia = require("../middlewares/uploadMedia");


// const { decryptTextPayload } = require('../../utils/decrypt');

const getProfile = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const response = await profileHelper.getProfileHelper(dataToken);
    return res.send({
      message: "Get Profile Success",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "detailMeetupUser", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const getMyMeetup = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const response = await profileHelper.getMyMeetupHelper(dataToken);
    return res.send({
      message: "Get My Meetup Success",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "getMyMeetup", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const getMyMeetupAttend = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const response = await profileHelper.getMyMeetupAttendHelper(dataToken);
    return res.send({
      message: "Get My Attend Meetup Success",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "getMyMeetup", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const updateProfile = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const { username, bio, location } = req.body;
    const response = await profileHelper.updateProfileHelper(
      dataToken,
      username,
      bio,
      location
    );
    return res.send({
      message: "Profile successfully updated",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "updateCategoryAdmin", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    if (req?.fileValidationError)
      return res.status(400).json({ message: req.fileValidationError.message });
    console.log(req.files,"<<<<")
    if (!req?.files?.image)
      return res.status(400).json({ message: "File is required" });
    const response = await profileHelper.updateProfileImageHelper(dataToken, {
      image: req.files.image[0],
    });
    return res.send({
      message: "Profile Image successfully updated",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "updateProfileImage", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const changePassword = async (request, reply) => {
    try {
        const data = request.body;
        const old_password = data?.old_password;
        const new_password = data?.new_password;
        const new_confirm_password = data?.new_confirm_password;

        const dataToken = request.body.dataToken;

        const response = await profileHelper.changePassword(old_password, new_password, new_confirm_password, dataToken);

        return reply.send({
            message: 'Change Password Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Change Password API', 'ERROR'], { info: `${error}` });
        return reply.send(GeneralHelper.errorResponse(error));
    }
};

Router.get("/", Middleware.validateToken, getProfile);
Router.get("/my-meetup", Middleware.validateToken, getMyMeetup);
Router.get("/my-meetup-attend", Middleware.validateToken, getMyMeetupAttend);
Router.put("/update-profile", Middleware.validateToken, updateProfile);
Router.put(
  "/update-profile-image",
  uploadMedia.fields([{ name: "image", maxCount: 1 }]),
  Middleware.validateToken,
  updateProfileImage
);
Router.put("/update-password", Middleware.validateToken, changePassword);

module.exports = Router;
