import { takeLatest, call, put } from 'redux-saga/effects';
import { login } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { DO_LOGIN } from './constants';
import { setLogin, setToken } from '@containers/Client/actions';

import toast from 'react-hot-toast';

function* doLogin({ payload, cb }) {
  setLoading(true);
  try {
    const response = yield call(login, payload);
    const token = response.token;
    yield put(setLogin(true));
    yield put(setToken(token));
    cb && cb();
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.response.data.message);
    }
  }
  setLoading(false);
}

export default function* loginSaga() {
  yield takeLatest(DO_LOGIN, doLogin);
}
