import { produce } from 'immer';
import { SET_LOCATION, ADD_NEW_MEETUP } from './constants';

export const initialState = {
  locationMeetup: [],
  meetup: {},
};

export const storedKey = ['locationMeetup'];

const locationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_NEW_MEETUP:
        draft.meetup = action.payload;
        break;
      case SET_LOCATION:
        draft.locationMeetup = action.payload;
        break;
      default:
        break;
    }
  });

export default locationReducer;
