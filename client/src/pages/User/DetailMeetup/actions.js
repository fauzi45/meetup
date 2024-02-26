import { GET_DETAIL_MEETUP, SET_DETAIL_MEETUP } from './constants';

export const getDetailMeetup = (id, cb) => ({
  type: GET_DETAIL_MEETUP,
  id,
  cb,
});

export const setDetailMeetup = (data) => ({
  type: SET_DETAIL_MEETUP,
  data,
});
