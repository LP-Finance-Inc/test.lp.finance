const initialState = {
  process: false,
  status: "",
  SolendList: [],
};

const SolendReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SOLEND_INFO_PROGRESS":
      return {
        ...state,
        status: "progress",
        process: true,
      };

    case "SET_SOLEND_INFO_LIST":
      return {
        ...state,
        SolendList: action.payload,
        status: "success",
        process: false,
      };

    default:
      return state;
  }
};

export default SolendReducer;
