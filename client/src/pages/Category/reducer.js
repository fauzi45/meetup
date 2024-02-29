import { produce } from 'immer';
import { SET_CATEGORY } from './constants';

export const initialState = {
  category: {},
};

export const storedKey = ['category'];

const categoryReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CATEGORY:
        draft.category = action.data;
        break;
      default:
        break;
    }
  });

export default categoryReducer;
