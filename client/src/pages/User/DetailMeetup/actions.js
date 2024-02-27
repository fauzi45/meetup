import {
  ADD_ATTEND_MEETUP,
  DELETE_ATTEND_MEETUP,
  GET_DETAIL_MEETUP,
  GET_MEMBER_MEETUP,
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

export const getMemberMeetup = (id, cb) => ({
  type: GET_MEMBER_MEETUP,
  id,
  cb,
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

