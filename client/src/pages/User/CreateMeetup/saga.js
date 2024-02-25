import { ADD_NEW_MEETUP } from './constants';
import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';

import { newMeetup } from '@domain/api';

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

export default function* newMeetupSaga() {
  yield takeLatest(ADD_NEW_MEETUP, doNewMeetup);
}
