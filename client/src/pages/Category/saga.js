import { GET_CATEGORY } from './constants';
import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';

import { listCategory } from '@domain/api';
import { setCategory } from './actions';

function* doGetCategory() {
  yield put(setLoading(true));
  try {
    const response = yield call(listCategory);
    yield put(setCategory(response?.response));
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

export default function* categorySaga() {
  yield takeLatest(GET_CATEGORY, doGetCategory);
}
