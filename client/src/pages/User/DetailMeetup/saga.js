import { takeLatest, call, put } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { setCommentMeetup, setDetailMeetup, setMemberMeetup } from './actions';
import { ADD_ATTEND_MEETUP, ADD_COMMENT_MEETUP, DELETE_ATTEND_MEETUP, GET_COMMENT_MEETUP, GET_DETAIL_MEETUP, GET_MEMBER_MEETUP } from './constants';
import { addAttend, addComment, deleteAttend, detailMeetup, memberComment, memberMeetup } from '@domain/api';
import toast from 'react-hot-toast';

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

function* doFetchMeetupMember({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(memberMeetup, id);
    yield put(setMemberMeetup(response?.data));
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

function* doAddAttend({ payload, cb }) {
  yield put(setLoading(true));
  try {
    yield call(addAttend, payload);
    cb();
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.response.data.message);
    }
  }
  yield put(setLoading(false));
}

function* doDeleteAttend({ payload, cb }) {
  yield put(setLoading(true));
  try {
    yield call(deleteAttend, payload);
    cb();
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

function* doFetchMeetupComment({ id, page }) {
  yield put(setLoading(true));
  try {
    const response = yield call(memberComment, id, page);
    yield put(setCommentMeetup(response?.data));
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

function* doAddComment({ id, data, cb }) {
  yield put(setLoading(true));
  try {
    const response = yield call(addComment, id, data);
    cb && cb();
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error);
    } else {
      toast.error(error);
    }
  }
  yield put(setLoading(false));
}

export default function* meetupDetailSaga() {
  yield takeLatest(GET_DETAIL_MEETUP, doFetchMeetupDetail);
  yield takeLatest(GET_MEMBER_MEETUP, doFetchMeetupMember);
  yield takeLatest(ADD_ATTEND_MEETUP, doAddAttend);
  yield takeLatest(DELETE_ATTEND_MEETUP, doDeleteAttend);
  yield takeLatest(GET_COMMENT_MEETUP, doFetchMeetupComment);
  yield takeLatest(ADD_COMMENT_MEETUP, doAddComment);
}
