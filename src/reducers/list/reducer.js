import { ADD_DATALIST, CLEAR_DATALIST } from "./constant";

let initState = {
  metaData: [],
  dataSetCount: {
    logistic: 0,
    fireInOpenArea: 0,
    industry: 0,
    construct: 0,
    pollution: 0,
  },
};

function list(state = initState, action) {
  switch (action.type) {
    case ADD_DATALIST:
      let list = { ...state };
      console.log(action.list);

      list.metaData = action.list.metaData;

      list.dataSetCount.logistic = action.list.dataSetCount.logistic;
      list.dataSetCount.fireInOpenArea =
        action.list.dataSetCount.fireInOpenArea;
      list.dataSetCount.industry = action.list.dataSetCount.industry;
      list.dataSetCount.construct = action.list.dataSetCount.construct;
      list.dataSetCount.pollution = action.list.dataSetCount.pollution;

      console.log(list);

      return list;
    case CLEAR_DATALIST:
      return initState;
    default:
      return state;
  }
}

export default list;
