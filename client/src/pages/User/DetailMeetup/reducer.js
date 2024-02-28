import { produce } from 'immer';
import { RESET_COMMENT_MEETUP, SET_COMMENT_MEETUP, SET_DETAIL_MEETUP, SET_MEMBER_MEETUP } from './constants';

export const initialState = {
  meetupDetail: { meetupDetail: {}, meetupMember: {}, meetupComment: {} },
};

export const storedKey = ['meetupDetail', 'meetupMember', 'meetupComment'];

const meetupDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_DETAIL_MEETUP:
        draft.meetupDetail = action.data;
        break;
      case SET_MEMBER_MEETUP:
        draft.meetupMember = action.dataMember;
        break;
      case SET_COMMENT_MEETUP:
        draft.meetupComment = [...draft.meetupComment, ...action.dataComment];
        break;
      case RESET_COMMENT_MEETUP:
        draft.meetupComment = [];
        break;
      default:
        break;
    }
  });

export default meetupDetailReducer;
