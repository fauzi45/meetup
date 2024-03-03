import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';
import registerReducer, { storedKey as storedRegisterState } from '@pages/Auth/Register/reducer';
import myProfileReducer, { storedKey as storedMyProfileState } from '@pages/Profile/reducer';
import locationReducer, { storedKey as storedLocationState } from '@pages/User/CreateMeetup/reducer';
import meetupDetailReducer, { storedKey as storedMeetupDetailState } from '@pages/User/DetailMeetup/reducer';
import meetupReducer, { storedKey as storedMeetupState } from '@pages/Home/reducer';
import categoryReducer, { storedKey as storedCategoryState } from '@pages/Category/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  register: { reducer: registerReducer, whitelist: storedRegisterState },
  myProfile: { reducer: myProfileReducer, whitelist: storedMyProfileState},
  locationMeetup: { reducer: locationReducer, whitelist: storedLocationState},
  category: { reducer: categoryReducer, whitelist: storedCategoryState},
  meetup: { reducer: meetupReducer, whitelist: storedMeetupState},
  meetupDetail: { reducer: meetupDetailReducer, whitelist: storedMeetupDetailState},
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
