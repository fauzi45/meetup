import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyProfileState = (state) => state.myProfile || initialState;

export const selectMyProfile = createSelector(selectMyProfileState, (state) => state.myProfile)
export const selectMyMeetupCreated = createSelector(selectMyProfileState, (state) => state.myMeetupCreated)
export const selectMyMeetupAttended = createSelector(selectMyProfileState, (state) => state.myMeetupAttended)