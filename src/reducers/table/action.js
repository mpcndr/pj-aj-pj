import { ADD_TABLE, CLEAR_TABLE } from "./constant";

export const addList = (data) => ({
  type: ADD_TABLE,
  data,
});

export const clearList = () => ({
  type: CLEAR_TABLE,
});
