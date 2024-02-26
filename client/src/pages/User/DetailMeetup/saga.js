import { takeLatest, call, put } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { setDetailMeetup } from './actions';
import { GET_DETAIL_MEETUP } from './constants';
import { detailMeetup } from '@domain/api';

function* doFetchMeetupDetail({ id, cb }) {
  yield put(setLoading(true));
  try {
    const response = yield call(detailMeetup, id);
    yield put(setDetailMeetup(response));
  } catch (error) {
    if (error?.response?.status === 404) {
      cb();
    } else {
      cb();
    }
  }
  yield put(setLoading(false));
}

export default function* meetupDetailSaga() {
  yield takeLatest(GET_DETAIL_MEETUP, doFetchMeetupDetail);
}
