import { produce } from 'immer';
import { RESET_MEETUP, SET_MEETUP } from './constants';

export const initialState = {
  meetup: {},
};

export const storedKey = ['meetup'];

const meetupReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MEETUP:
        draft.meetup = action.data;
        break;
      case RESET_MEETUP:
        draft.meetupComment = [];
        break;
      default:
        break;
    }
  });

export default meetupReducer;
