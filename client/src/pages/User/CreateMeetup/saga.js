import { ADD_NEW_MEETUP } from './constants';
import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';

import toast from 'react-hot-toast';

function* doNewMeetup({ data, cb }) {
  yield put(setLoading(true));
  try {
    yield call(newDepartment, data);
    cb();
    toast.success('Meetup Successfully created');
  } catch (error) {
    toast.error(error.response.data.message);
  }
  yield put(setLoading(false));
}

export default function* newMeetupSaga() {
  yield takeLatest(ADD_NEW_MEETUP, doNewMeetup);
}
