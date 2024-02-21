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

    await db.Comments.create({
      user_id: dataToken.id,
      meetup_id: id,
      content: content,
    });
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "commentMeetupHelper", "ERROR"], {
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
  deleteCommentMeetupHelper
};
