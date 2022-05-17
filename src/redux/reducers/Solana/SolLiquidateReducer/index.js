const initialState = {
  List: [],
  count: 0,
  progress: false,
};

const SolLiquidateReducer = (state = initialState, action) => {
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

    case "REMOVE_LIQUIDATE_ACCOUNT_LIST":
      return {
        ...state,
        progress: false,
        count: 0,
        List: [],
      };

    case "DELETE_LIQUIDATE_ADDRESS":
      const { address } = action.payload;

      const FilterAddress = state.List.filter((val) => {
        return val.address !== address;
      });

      return {
        ...state,
        progress: false,
        count: state.count - 1,
        List: FilterAddress,
      };

    default:
      return state;
  }
};

export default SolLiquidateReducer;
