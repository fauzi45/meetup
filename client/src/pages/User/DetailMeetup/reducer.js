import { produce } from 'immer';
import { SET_DETAIL_MEETUP } from './constants';

export const initialState = {
  meetupDetail: {},
};

export const storedKey = ['meetupDetail'];

const meetupDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_DETAIL_MEETUP:
        draft.meetupDetail = action.data;
        break;
      default:
        break;
    }
  });

export default meetupDetailReducer;
