import { combineReducers } from "redux";

import { user, dropdownlist, search } from "./user/reducer";
import list from "./list/reducer";
import files from "./files/reducer";

export default combineReducers({
  user,
  dropdownlist,
  files,
  list,
  search,
});
