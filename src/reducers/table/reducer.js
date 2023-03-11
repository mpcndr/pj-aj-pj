import { ADD_TABLE, CLEAR_TABLE } from "./constant";

let initState = {};

function table(state = initState, action) {
  switch (action.type) {
    case ADD_TABLE:
      let list = { ...state };

      return list;
    case CLEAR_TABLE:
      return initState;
    default:
      return initState;
  }
}

export default table;
