import { DO_LOGIN } from './constants';

export const doLoginAction = (payload,cb) => ({
  type: DO_LOGIN,
  payload,
  cb
});