import { ADD_FILES, CLEAR_FILES } from "./constant";

let initState = {
  data: [],
};

function files(state = initState, action) {
  switch (action.type) {
    case ADD_FILES:
      console.log(action.data);
      let files = { ...state };
      files.data = action.data.files;
      console.log(files);
      return files;
    case CLEAR_FILES:
      return initState;
    default:
      return initState;
  }
}

export default files;
