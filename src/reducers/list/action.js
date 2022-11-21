import { ADD_DATALIST, CLEAR_DATALIST } from "./constant";

export const addList = (list) => ({
  type: ADD_DATALIST,
  list,
});

export const clearList = () => ({
  type: CLEAR_DATALIST,
});
