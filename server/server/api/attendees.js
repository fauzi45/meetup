const Router = require("express").Router();

const attendeesHelper = require("../helpers/attendeesHelper");

const GeneralHelper = require("../helpers/generalHelper");

const Validation = require("../helpers/validationHelper");

const Middleware = require("../middlewares/authMiddleware");

const fileName = "server/api/meetup.js";

const attendMeetup = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    Validation.idValidation(req.params);
    Validation.dataTokenValidation({dataToken});
    const { id } = req.params;
    const response = await attendeesHelper.attendMeetupHelper(id, dataToken);
    return res.send({
      message: "Attend success",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "detailMeetupUser", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteAttendMeetup = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    Validation.idValidation(req.params);
    Validation.dataTokenValidation({dataToken});
    const { id } = req.params;
    const response = await attendeesHelper.deleteAttendMeetupHelper(
      id,
      dataToken
    );
    return res.send({
      message: "Delete User Attend success",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "deleteAttendMeetup", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const listAttendMeetup = async (req, res) => {
  try {
    Validation.idValidation(req.params);
    const { id } = req.params;
    const response = await attendeesHelper.listAttendMeetupHelper(id);
    return res.send({
      message: "List Attend successfully received",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "listAttendMeetup", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/meetup/:id", listAttendMeetup);
Router.post("/user/:id", Middleware.validateToken, attendMeetup);
Router.delete("/delete/user/:id", Middleware.validateToken, deleteAttendMeetup);

module.exports = Router;
