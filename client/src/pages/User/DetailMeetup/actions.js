import {
  ADD_ATTEND_MEETUP,
  ADD_COMMENT_MEETUP,
  DELETE_ATTEND_MEETUP,
  GET_COMMENT_MEETUP,
  GET_DETAIL_MEETUP,
  GET_MEMBER_MEETUP,
  SET_COMMENT_MEETUP,
  SET_DETAIL_MEETUP,
  SET_MEMBER_MEETUP,
} from './constants';

export const getDetailMeetup = (id, cb) => ({
  type: GET_DETAIL_MEETUP,
  id,
  cb,
});

export const setDetailMeetup = (data) => ({
  type: SET_DETAIL_MEETUP,
  data,
});

export const getMemberMeetup = (id) => ({
  type: GET_MEMBER_MEETUP,
  id,
});

export const setMemberMeetup = (dataMember) => ({
  type: SET_MEMBER_MEETUP,
  dataMember,
});

export const addAttendMeetup = (payload, cb) => ({
  type: ADD_ATTEND_MEETUP,
  payload,
  cb,
});

export const deleteAttendMeetup = (payload, cb) => ({
  type: DELETE_ATTEND_MEETUP,
  payload,
  cb,
});

export const getCommentMeetup = (id, page) => ({
  type: GET_COMMENT_MEETUP,
  id,
  page
});

export const setCommentMeetup = (dataComment) => ({
  type: SET_COMMENT_MEETUP,
  dataComment,
});

export const addCommentMeetup = (id, data, cb) => ({
  type: ADD_COMMENT_MEETUP,
  id,
  data,
  cb
});
