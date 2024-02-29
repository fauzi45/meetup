import { takeLatest, call, put } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { GET_MEETUP, GET_MEETUP_BY_CATEGORY } from './constants';
import { listMeetup, listMeetupbyCategory } from '@domain/api';
import { setMeetup } from './actions';

function* doFetchMeetup() {
  yield put(setLoading(true));
  try {
    const response = yield call(listMeetup);
    yield put(setMeetup(response?.response));
  } catch (error) {
    console.log(error)
  }
  yield put(setLoading(false));
}

function* doFetchMeetupByCategory({category}) {
  yield put(setLoading(true));
  try {
    const response = yield call(listMeetupbyCategory, category);
    yield put(setMeetup(response?.response));
  } catch (error) {
    console.log(error)
  }
  yield put(setLoading(false));
}

export default function* meetupSaga() {
  yield takeLatest(GET_MEETUP, doFetchMeetup);
  yield takeLatest(GET_MEETUP_BY_CATEGORY, doFetchMeetupByCategory);
}
