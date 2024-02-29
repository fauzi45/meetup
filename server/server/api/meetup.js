const Router = require("express").Router();

const meetupHelper = require("../helpers/meetupHelper");

const GeneralHelper = require("../helpers/generalHelper");

const Validation = require("../helpers/validationHelper");

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

const listMeetupByCategoryUser = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const nameCategory = req.query.category;
    const response = await meetupHelper.getMeetupListByCategoryHelperUser(dataToken, nameCategory);
    return res.send({
      message: "Meetup data By Category received successfully",
      response,
    });
  } catch (err) {
    console.log([fileName, "listMeetupByCategoryUser", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const detailMeetupUser = async (req, res) => {
  try {
    Validation.idValidation(req.params);
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
    Validation.createMeetupValidation(req.body);
    Validation.imageValidation(req.files);
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
        full_address,
        lat,
        long,
        place,
        start_date,
        finish_date,
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

const updateMeetupUser = async (req, res) => {
  try {
    Validation.idValidation(req.params);
    Validation.createMeetupValidation(req.body);
    const { id } = req.params;
    const dataToken = req.body.dataToken;
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
    } = req.body;
    const response = await meetupHelper.updateMeetupUser(
      id,
      {
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
      },
      dataToken
    );
    return res.send({
      message: "Meetup data successfully updated",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "updateMeetupUser", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteMeetupUser = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    Validation.idValidation(req.params);
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
Router.get("/category/user/list/", Middleware.validateToken, listMeetupByCategoryUser);
Router.get("/user/detail/:id", Middleware.validateToken, detailMeetupUser);
Router.post(
  "/user/create",
  uploadMedia.fields([{ name: "image" }]),
  Middleware.validateToken,
  createMeetupUser
);
Router.put("/user/update/:id", Middleware.validateToken, updateMeetupUser);
Router.delete("/user/delete/:id", Middleware.validateToken, deleteMeetupUser);

module.exports = Router;
