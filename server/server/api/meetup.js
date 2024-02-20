const Router = require("express").Router();

const meetupHelper = require("../helpers/meetupHelper");

const GeneralHelper = require("../helpers/generalHelper");

const Middleware = require("../middlewares/authMiddleware");

const uploadMedia = require("../middlewares/uploadMedia");

const fileName = "server/api/meetup.js";

const listMeetupUser = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const response = await meetupHelper.getMeetupListHelperUser(dataToken);
    return res.send({
      message: "Meetup data received successfully",
      response,
    });
  } catch (err) {
    console.log([fileName, "listMeetup", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const detailMeetupUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await meetupHelper.getMeetupDetailHelperUser(id);
    return res.send({
      message: "Meetup detail data received successfully",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "detailMeetupUser", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const createMeetupUser = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
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
    } = req.body;
    if (req?.fileValidationError)
      return res.status(400).json({ message: req.fileValidationError.message });
    if (!req?.files?.image)
      return res.status(400).json({ message: "File is required" });
    const response = await meetupHelper.createMeetupUser(
      {
        title,
        description,
        category_id,
        lat,
        long,
        date,
        start_time,
        finish_time,
        capacity,
        image: req.files.image,
      },
      dataToken
    );
    return res.send({
      message: "Meetup successfully created",
      response,
    });
  } catch (err) {
    console.log([fileName, "createMeetupUser", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteMeetupUser = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const { id } = req.params;
    const response = await meetupHelper.deleteMeetupHelperUser(id, dataToken);
    return res.status(200).send({
      message: "Meetup data successfully deleted",
      response,
    });
  } catch (err) {
    console.log([fileName, "deleteMeetup", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/user/list", Middleware.validateToken, listMeetupUser);
Router.get("/user/detail/:id", Middleware.validateToken, detailMeetupUser);
Router.post(
  "/create",
  uploadMedia.fields([{ name: "image" }]),
  Middleware.validateToken,
  createMeetupUser
);
Router.delete("/user/delete/:id", Middleware.validateToken, deleteMeetupUser);

module.exports = Router;
