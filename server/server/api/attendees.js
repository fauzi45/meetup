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
    const { id } = req.params;
    const response = await attendeesHelper.attendMeetupHelper(
      id,
      dataToken
    );
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



Router.post("/user/:id", Middleware.validateToken, attendMeetup);
Router.delete("/delete/user/:id", Middleware.validateToken, deleteAttendMeetup);

module.exports = Router;