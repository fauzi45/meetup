import { takeLatest, call, put } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { DELETE_MEETUP, GET_MY_MEETUP_ATTENDED, GET_MY_MEETUP_CREATED, GET_MY_PROFILE, UPDATE_PASSWORD  } from './constants';
import { changePassword, deleteMeetup, myMeetupAttended, myMeetupCreated, myProfile } from '@domain/api';
import { setMyMeetupAttended, setMyMeetupCreated, setMyProfile } from './actions';
import toast from 'react-hot-toast';

function* doFetchMyProfile() {
  yield put(setLoading(true));
  try {
    const response = yield call(myProfile);
    yield put(setMyProfile(response?.data));
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

function* doFetchMyMeetupCreated() {
  yield put(setLoading(true));
  try {
    const response = yield call(myMeetupCreated);
    yield put(setMyMeetupCreated(response?.data));
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

function* doFetchMyMeetupAttended() {
  yield put(setLoading(true));
  try {
    const response = yield call(myMeetupAttended);
    yield put(setMyMeetupAttended(response?.data));
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

function* doUpdatePassword({ payload, cb }) {
  yield put(setLoading(true));
  try {
    const response = yield call(changePassword, payload);
    cb && cb();
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.response.data.message);
    }
  }
  yield put(setLoading(false));
}

function* doDeleteMeetup({ id, cb }) {
  yield put(setLoading(true));
  try {
    const response = yield call(deleteMeetup, id);
    cb && cb();
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.response.data.message);
    }
  }
  yield put(setLoading(false));
}

export default function* myProfileSaga() {
  yield takeLatest(GET_MY_PROFILE, doFetchMyProfile);
  yield takeLatest(GET_MY_MEETUP_CREATED, doFetchMyMeetupCreated);
  yield takeLatest(GET_MY_MEETUP_ATTENDED, doFetchMyMeetupAttended);
  yield takeLatest(UPDATE_PASSWORD, doUpdatePassword);
  yield takeLatest(DELETE_MEETUP, doDeleteMeetup);
}
