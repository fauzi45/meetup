import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMeetupDetailState = (state) => state.meetupDetail || initialState;

export const selectMeetupDetail = createSelector(selectMeetupDetailState, (state) => state.meetupDetail)
export const selectMemberMeetup = createSelector(selectMeetupDetailState, (state) => state.meetupMember)
export const selectCommentMeetup = createSelector(selectMeetupDetailState, (state) => state.meetupComment)