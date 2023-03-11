import { ADD_FILES, CLEAR_FILES } from "./constant";

export const addFies = (data) => ({
  type: ADD_FILES,
  data,
});

export const clearFies = () => ({
  type: CLEAR_FILES,
});
