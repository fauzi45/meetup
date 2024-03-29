const db = require("../../models");
const _ = require("lodash");
const GeneralHelper = require("./generalHelper");
const Boom = require("boom");
const fileName = "server/helpers/commentHelper.js";

const commentMeetupHelper = async (id, content, dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to create this data")
      );
    }
    const checkMeetup = await db.Meetups.findOne({
      where: { id: id },
    });
    if (_.isEmpty(checkMeetup)) {
      return Promise.reject(
        Boom.badRequest("Meetup with this id is not available")
      );
    }

    const data = await db.Comments.create({
      user_id: dataToken.id,
      meetup_id: id,
      content: content,
    });
    
    return Promise.resolve(data);
  } catch (err) {
    console.log([fileName, "commentMeetupHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const listCommentMeetupHelper = async (id, page, pageSize) => {
  try {
    const checkMeetup = await db.Meetups.findOne({
      where: { id: id },
    });
    if (_.isEmpty(checkMeetup)) {
      return Promise.reject(
        Boom.badRequest("Meetup with this id is not available")
      );
    }

    const checkComments = await db.Comments.findAll({
      where: { meetup_id: id },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: db.User,
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        },
      ],
    });

    if (_.isEmpty(checkComments)) {
      return null;
    }

    return Promise.resolve(checkComments);
  } catch (err) {
    console.log([fileName, "listCommentMeetupHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const loadMoreCommentMeetupHelper = async (id, page, pageSize) => {
  try {
    const checkMeetup = await db.Meetups.findOne({
      where: { id: id },
    });
    if (_.isEmpty(checkMeetup)) {
      return Promise.reject(
        Boom.badRequest("Meetup with this id is not available")
      );
    }

    const offset = (page - 1) * pageSize;

    const checkComments = await db.Comments.findAll({
      where: { meetup_id: id },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: db.User,
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        },
      ],
      offset,
      limit: pageSize,
    });

    if (_.isEmpty(checkComments)) {
      return null;
    }

    return Promise.resolve(checkComments);
  } catch (err) {
    console.log([fileName, "listCommentMeetupHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const deleteCommentMeetupHelper = async (id, dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to create this data")
      );
    }
    const checkComment = await db.Comments.findOne({
      where: { user_id: dataToken.id, id: id },
    });
    if (_.isEmpty(checkComment)) {
      return Promise.reject(Boom.badRequest("The Comment is not available"));
    }
    await db.Comments.destroy({
      where: { id: id },
    });
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "deleteCommentMeetupHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  //user
  commentMeetupHelper,
  deleteCommentMeetupHelper,
  loadMoreCommentMeetupHelper,
  listCommentMeetupHelper
};
