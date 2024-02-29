import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCategoryState = (state) => state.category || initialState;

export const selectCategory = createSelector(selectCategoryState, (state) => state.category);