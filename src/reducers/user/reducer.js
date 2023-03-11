import {
  ADD_DROPDOWN,
  ADD_KEYWORD,
  ADD_META,
  ADD_SEARCH,
  ADD_SELECTGROUP,
  ADD_USER,
  CLEAR_DROPDOWN,
  CLEAR_SEARCH,
  CLEAR_USER,
} from "./constant";

let initState = {
  isLogin: false,
  user: "",
};

let initData = {
  province: [],
  dataSetGroup: [],
  metadataGroup: [],
};

let initSearch = {
  keyword: "",
  metaDataGroup: 0,
  selectDataSetGroup: 0,
};

function user(state = initState, action) {
  switch (action.type) {
    case ADD_USER:
      let user = { ...state };
      user.isLogin = true;
      user.user = action.user.userName;
      return user;
    case CLEAR_USER:
      return initState;
    default:
      return initState;
  }
}

function dropdownlist(state = initData, action) {
  switch (action.type) {
    case ADD_DROPDOWN:
      let data = { ...state };
      console.log(data);
      data.province = action.data.province;
      data.dataSetGroup = action.data.dataSetGroup;
      data.metadataGroup = action.data.metadataGroup;
      return data;
    case CLEAR_DROPDOWN:
      return initState;
    default:
      return initState;
  }
}

function search(state = initSearch, action) {
  switch (action.type) {
    case ADD_KEYWORD:
      let k = { ...state };
      k.keyWord = action.text;
      return k;
    case ADD_META:
      let m = { ...state };
      m.metaDataGroup = action.meta;
      return m;
    case ADD_SELECTGROUP:
      let s = { ...state };
      s.selectDataSetGroup = action.select;
      return s;
    case CLEAR_SEARCH:
      return initSearch;
    default:
      return state;
  }
}

export { dropdownlist, user, search };
