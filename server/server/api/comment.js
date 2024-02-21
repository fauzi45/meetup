const Router = require("express").Router();

const commentHelper = require("../helpers/commentHelper");

const GeneralHelper = require("../helpers/generalHelper");

const Validation = require("../helpers/validationHelper");

const Middleware = require("../middlewares/authMiddleware");

const fileName = "server/api/comment.js";

const commentMeetup = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    Validation.idValidation(req.params);
    const { id } = req.params;
    const { content } = req.body;
    const response = await commentHelper.commentMeetupHelper(
      id,
      content,
      dataToken
    );
    return res.send({
      message: "Comment success",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "detailMeetupUser", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteCommentMeetup = async (req, res) => {
    try {
      const dataToken = req.body.dataToken;
      Validation.idValidation(req.params);
      const { id } = req.params;
      const response = await commentHelper.deleteCommentMeetupHelper(
        id,
        dataToken
      );
      return res.send({
        message: "Delete Comment success",
        data: response,
      });
    } catch (err) {
      console.log([fileName, "deleteCommentMeetup", "ERROR"], { info: `${err}` });
      return res.send(GeneralHelper.errorResponse(err));
    }
  };

Router.post("/user/:id", Middleware.validateToken, commentMeetup);
Router.delete("/delete/user/:id", Middleware.validateToken, deleteCommentMeetup);

module.exports = Router;