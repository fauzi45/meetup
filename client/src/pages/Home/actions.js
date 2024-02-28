import { GET_MEETUP, RESET_MEETUP, SET_MEETUP } from './constants';

export const getMeetup = () => ({
  type: GET_MEETUP,
});

export const setMeetup = (data) => ({
  type: SET_MEETUP,
  data,
});

export const resetMeetup = () => ({
  type: RESET_MEETUP,
});


