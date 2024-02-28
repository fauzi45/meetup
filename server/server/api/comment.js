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

const listCommentMeetup = async (req, res) => {
  try {
    Validation.idValidation(req.params);
    const { id } = req.params;

    const response = await commentHelper.loadMoreCommentMeetupHelper(
      id,
    );

    if (!response) {
      return res.send({
        message: "No comments found for this meetup",
        data: [],
      });
    }

    return res.send({
      message: "List Comment successfully received",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "listCommentMeetup", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const loadMoreCommentMeetup = async (req, res) => {
  try {
    Validation.idValidation(req.params);
    const { id } = req.params;
    const page = req.query.page || 1; // Default page is 1
    const pageSize = 5; // Default page size is 10

    const response = await commentHelper.loadMoreCommentMeetupHelper(
      id,
      page,
      pageSize
    );

    if (!response) {
      return res.send({
        message: "No comments found for this meetup",
        data: [],
      });
    }

    return res.send({
      message: "Load More Comment successfully received",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "listCommentMeetup", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/meetup/list/:id", listCommentMeetup);
Router.get("/meetup/loadmore/:id", loadMoreCommentMeetup);
Router.post("/user/:id", Middleware.validateToken, commentMeetup);
Router.delete(
  "/delete/user/:id",
  Middleware.validateToken,
  deleteCommentMeetup
);

module.exports = Router;
