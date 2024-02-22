import { REGISTER_USER } from './constants';
import { takeLatest, put, call } from 'redux-saga/effects';
import { register } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';

function* doRegister({ payload, cb }) {
  yield put(setLoading(true));
  try {
    yield call(register, payload);
    cb && cb();
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.response.data.message);
    }
  }
  yield put(setLoading(false));
}

export default function* registerSaga() {
  yield takeLatest(REGISTER_USER, doRegister);
}
