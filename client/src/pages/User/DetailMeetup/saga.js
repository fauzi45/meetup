import { takeLatest, call, put } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { setDetailMeetup, setMemberMeetup } from './actions';
import { ADD_ATTEND_MEETUP, GET_DETAIL_MEETUP, GET_MEMBER_MEETUP } from './constants';
import { addAttend, detailMeetup, memberMeetup } from '@domain/api';

function* doFetchMeetupDetail({ id, cb }) {
  yield put(setLoading(true));
  try {
    const response = yield call(detailMeetup, id);
    yield put(setDetailMeetup(response?.data));
  } catch (error) {
    if (error?.response?.status === 404) {
      cb();
    } else {
      cb();
    }
  }
  yield put(setLoading(false));
}

function* doFetchMeetupMember({ id, cb }) {
  yield put(setLoading(true));
  try {
    const response = yield call(memberMeetup, id);
    yield put(setMemberMeetup(response?.data));
  } catch (error) {
    if (error?.response?.status === 404) {
      cb();
    } else {
      cb();
    }
  }
  yield put(setLoading(false));
}

function* doAddAttend({ payload, cb }) {
  yield put(setLoading(true));
  try {
    yield call(addAttend, payload);
    cb();
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

export default function* meetupDetailSaga() {
  yield takeLatest(GET_DETAIL_MEETUP, doFetchMeetupDetail);
  yield takeLatest(GET_MEMBER_MEETUP, doFetchMeetupMember);
  yield takeLatest(ADD_ATTEND_MEETUP, doAddAttend);
}
