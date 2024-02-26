import { SET_LOCATION, ADD_NEW_MEETUP } from './constants';

export const setLocation = (payload) => ({
  type: SET_LOCATION,
  payload,
});

export const addNewMeetup = (payload, cb) => ({
  type: ADD_NEW_MEETUP,
  payload,
  cb,
});