import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMeetupDetailState = (state) => state.meetupDetail || initialState;

export const selectMeetupDetail = createSelector(selectMeetupDetailState, (state) => state.meetupDetail)