import { produce } from 'immer';
import { SET_DETAIL_MEETUP, SET_MEMBER_MEETUP } from './constants';

export const initialState = {
  meetupDetail: { meetupDetail: {}, meetupMember: {} },
};

export const storedKey = ['meetupDetail','meetupMember'];

const meetupDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_DETAIL_MEETUP:
        draft.meetupDetail = action.data;
        break;
      case SET_MEMBER_MEETUP:
        draft.meetupMember = action.dataMember;
        break;
      default:
        break;
    }
  });

export default meetupDetailReducer;
