import { takeLatest, call, put } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { GET_MEETUP } from './constants';
import { listMeetup } from '@domain/api';
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

export default function* meetupSaga() {
  yield takeLatest(GET_MEETUP, doFetchMeetup);
}
