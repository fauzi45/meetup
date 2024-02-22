import { produce } from 'immer';
import { REGISTER_USER } from './constants';

export const initialState = {
  user: {},
};

export const storedKey = [''];

const registerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REGISTER_USER:
        draft.user = action.user;
        break;
      default:
        break;
    }
  });

export default registerReducer;
