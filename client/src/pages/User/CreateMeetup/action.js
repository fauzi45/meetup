import { SET_LOCATION, ADD_NEW_MEETUP, DELETE_IMAGE_MEETUP, UPDATE_MEETUP } from './constants';

export const setLocation = (payload) => ({
  type: SET_LOCATION,
  payload,
});

export const addNewMeetup = (payload, cb) => ({
  type: ADD_NEW_MEETUP,
  payload,
  cb,
});

export const deleteImages = (id, payload, cb) => ({
  type: DELETE_IMAGE_MEETUP,
  id,
  payload,
  cb,
});

export const updateMeetup = (id, payload, cb) => ({
  type: UPDATE_MEETUP,
  id,
  payload,
  cb,
});


