const initialState = {
  TokenBalList: [],
  TokenPriceList: [],
  TableList: [],
};

const SolLiquidityPoolReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LP_TOKENS_BALANCE":
      return {
        ...state,
        TokenBalList: action.payload,
      };

    case "GET_LP_TOKENS_PRICES":
      return {
        ...state,
        TokenPriceList: action.payload,
      };

    case "GET_LP_DATA":
      return {
        ...state,
        TableList: action.payload,
      };

    default:
      return state;
  }
};

export default SolLiquidityPoolReducers;
