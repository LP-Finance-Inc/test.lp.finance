const initialState = {
  progress: false,
  ApricotList: [],
};

const ApricotReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_APRICOT_INFO_PROGRESS":
      return {
        ...state,
        progress: true,
      };

    case "SET_APRICOT_INFO_LIST":
      return {
        ...state,
        ApricotList: action.payload,
        progress: false,
      };

    default:
      return state;
  }
};

export default ApricotReducer;
