import { DELETE_MEETUP, GET_MY_MEETUP_ATTENDED, GET_MY_MEETUP_CREATED, GET_MY_PROFILE, RESET_MY_PROFILE, SET_MY_MEETUP_ATTENDED, SET_MY_MEETUP_CREATED, SET_MY_PROFILE, UPDATE_PASSWORD } from "./constants";

export const getMyProfile = () => ({
    type: GET_MY_PROFILE,
  });
  
  export const setMyProfile = (data) => ({
    type: SET_MY_PROFILE,
    data,
  });

export const getMyMeetupCreated = () => ({
    type: GET_MY_MEETUP_CREATED,
  });
  
  export const setMyMeetupCreated = (data) => ({
    type: SET_MY_MEETUP_CREATED,
    data,
  });

export const getMyMeetupAttended = () => ({
    type: GET_MY_MEETUP_ATTENDED,
  });
  
  export const setMyMeetupAttended = (data) => ({
    type: SET_MY_MEETUP_ATTENDED,
    data,
  });
  
  export const updatePassword = (payload, cb) => ({
    type: UPDATE_PASSWORD,
    payload,
    cb
  });
  
  export const DodeleteMeetup = (id, cb) => ({
    type: DELETE_MEETUP,
    id,
    cb
  })

  export const resetMyProfile = () => ({
    type: RESET_MY_PROFILE,
  });