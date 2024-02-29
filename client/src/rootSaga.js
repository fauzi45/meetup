import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import registerSaga from '@pages/Auth/Register/saga';
import loginSaga from '@pages/Auth/Login/saga';
import newMeetupSaga from '@pages/User/CreateMeetup/saga';
import meetupDetailSaga from '@pages/User/DetailMeetup/saga';
import meetupSaga from '@pages/Home/saga';
import categorySaga from '@pages/Category/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    registerSaga(),
    loginSaga(),
    newMeetupSaga(),
    meetupSaga(),
    meetupDetailSaga(),
    categorySaga()
  ]);
}
