const db = require("../../models");
const _ = require("lodash");
const GeneralHelper = require("./generalHelper");
const Boom = require("boom");
const fileName = "server/helpers/attendeesHelper.js";

const attendMeetupHelper = async (id, dataToken) => {
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

    const checkorganizer = await db.Meetups.findOne({
      where: {
        organizer_id: dataToken.id,
      },
    });

    if (!_.isEmpty(checkorganizer)) {
      return Promise.reject(
        Boom.badRequest("You are Organizer, You cant attend this meetup")
      );
    }

    const existingAttendance = await db.Attendees.findOne({
      where: {
        user_id: dataToken.id,
        meetup_id: id,
      },
    });

    if (!_.isEmpty(existingAttendance)) {
      return Promise.reject(
        Boom.badRequest("You have already attended this meetup")
      );
    }

    await db.Attendees.create({
      user_id: dataToken.id,
      meetup_id: id,
    });
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "attendMeetupHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const listAttendMeetupHelper = async (id) => {
  try {
    const checkMeetup = await db.Meetups.findOne({
      where: { id: id },
    });
    if (_.isEmpty(checkMeetup)) {
      return Promise.reject(
        Boom.badRequest("Meetup with this id is not available")
      );
    }
    const checkAttendance = await db.Attendees.findAll({
      where: {meetup_id: id},
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: db.User,
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        },
      ],
    });
    if (_.isEmpty(checkAttendance)) {
      return null
    }
    return Promise.resolve(checkAttendance);
  } catch (err) {
    console.log([fileName, "attendMeetupHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const deleteAttendMeetupHelper = async (id, dataToken) => {
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
    const checkAttendance = await db.Attendees.findOne({
      where: { user_id: dataToken.id, meetup_id: id },
    });
    if (_.isEmpty(checkAttendance)) {
      return Promise.reject(Boom.badRequest("User did not attend this meetup"));
    }
    await db.Attendees.destroy({
      where: { user_id: dataToken.id, meetup_id: id },
    });
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "deleteAttendMeetupHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  //user
  attendMeetupHelper,
  deleteAttendMeetupHelper,
  listAttendMeetupHelper,
};
