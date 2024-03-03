import { takeLatest, call, put } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import {  changeProfileImage, myUpdateProfile } from '@domain/api';
import { UPDATE_MY_PROFILE, UPDATE_PROFILE_IMAGE } from './constants';

function* doUpdateMyProfile({ payload, cb }) {
  yield put(setLoading(true));
  try {
    const response = yield call(myUpdateProfile, payload);
    cb();
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

function* doUpdateProfileimage({ payload, cb }) {
  yield put(setLoading(true));
  try {
    const response = yield call(changeProfileImage, payload);
    cb();
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

export default function* changeProfile() {
  yield takeLatest(UPDATE_MY_PROFILE, doUpdateMyProfile);
  yield takeLatest(UPDATE_PROFILE_IMAGE, doUpdateProfileimage);
}
