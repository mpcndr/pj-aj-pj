import {
  ADD_USER,
  CLEAR_USER,
  ADD_DROPDOWN,
  CLEAR_DROPDOWN,
  ADD_KEYWORD,
  CLEAR_SEARCH,
  ADD_META,
  ADD_SELECTGROUP,
} from "./constant";

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const addDropdown = (data) => ({
  type: ADD_DROPDOWN,
  data,
});

export const addKeyword = (text) => ({
  type: ADD_KEYWORD,
  text,
});
export const addMetaData = (meta) => ({
  type: ADD_META,
  meta,
});
export const addSelectGroup = (select) => ({
  type: ADD_SELECTGROUP,
  select,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

export const clearDropdown = () => ({
  type: CLEAR_DROPDOWN,
});
