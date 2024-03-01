import { GET_MEETUP, GET_MEETUP_BY_CATEGORY, GET_MEETUP_BY_DATE, RESET_MEETUP, SET_MEETUP } from './constants';

export const getMeetup = () => ({
  type: GET_MEETUP,
});

export const getMeetupByCategory = (category) => ({
  type: GET_MEETUP_BY_CATEGORY,
  category
});

export const getMeetupByDate = (date) => ({
  type: GET_MEETUP_BY_DATE,
  date
});

export const setMeetup = (data) => ({
  type: SET_MEETUP,
  data,
});

export const resetMeetup = () => ({
  type: RESET_MEETUP,
});


