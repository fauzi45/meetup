import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMeetupState = (state) => state.meetup || initialState;

export const selectMeetup = createSelector(selectMeetupState, (state) => state.meetup)