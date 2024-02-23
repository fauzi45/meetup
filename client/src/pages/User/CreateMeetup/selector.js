import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLocationMeetupState = (state) => state.locationMeetup || initialState;

export const selectLocationMeetup = createSelector(selectLocationMeetupState, (state) => state.locationMeetup);