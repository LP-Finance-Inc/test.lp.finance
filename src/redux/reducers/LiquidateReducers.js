const initialState = {
  List: [],
  count: 0,
  progress: false,
};

const LiquidateReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIQUIDATE_ACCOUNT_LIST_REQUEST":
      return {
        ...state,
        progress: true,
      };

    case "GET_LIQUIDATE_ACCOUNT_LIST":
      const { List, count } = action.payload;

      return {
        ...state,
        progress: false,
        count: count,
        List: List,
      };

    default:
      return state;
  }
};

export default LiquidateReducers;
