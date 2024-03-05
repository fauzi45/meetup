import { ADD_NEW_MEETUP, DELETE_IMAGE_MEETUP, UPDATE_MEETUP } from './constants';
import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';

import { deleteImageMeetup, newMeetup, updateMeetup } from '@domain/api';

function* doNewMeetup({ payload, cb }) {
  yield put(setLoading(true));
  try {
    yield call(newMeetup, payload);
    cb();
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

function* doDeleteMeetup({ id, payload, cb }) {
  yield put(setLoading(true));
  try {
    yield call(deleteImageMeetup, id, payload);
    cb();
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

function* doUpdateMeetup({ id, payload, cb }) {
  yield put(setLoading(true));
  try {
    yield call(updateMeetup, id, payload);
    cb();
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

export default function* newMeetupSaga() {
  yield takeLatest(ADD_NEW_MEETUP, doNewMeetup);
  yield takeLatest(DELETE_IMAGE_MEETUP, doDeleteMeetup);
  yield takeLatest(UPDATE_MEETUP, doUpdateMeetup);
  
}
