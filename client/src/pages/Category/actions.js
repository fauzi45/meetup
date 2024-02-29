import { GET_CATEGORY, SET_CATEGORY } from "./constants";

export const getCategory = () => ({
    type: GET_CATEGORY
});

export const setCategory = (data) => ({
    type: SET_CATEGORY,
    data,
  });