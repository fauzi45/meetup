import { produce } from 'immer';
import { RESET_MY_PROFILE, SET_MY_MEETUP_ATTENDED, SET_MY_MEETUP_CREATED, SET_MY_PROFILE } from './constants';

export const initialState = {
  myProfile: { myProfile: {}, myMeetupCreated: {}, myMeetupAttended: {} },
};

export const storedKey = ['myProfile','myMeetupCreated','myMeetupAttended'];

const myProfileReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MY_PROFILE:
        draft.myProfile = action.data;
        break;
      case SET_MY_MEETUP_CREATED:
        draft.myMeetupCreated = action.data;
        break;
      case SET_MY_MEETUP_ATTENDED:
        draft.myMeetupAttended = action.data;
        break;
      case RESET_MY_PROFILE:
        draft.myProfile = {};
        draft.myMeetupCreated = {};
        draft.myMeetupAttended = {};
        break;
      default:
        break;
    }
  });

export default myProfileReducer;
