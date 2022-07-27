const initialState = {
  TokenBalList: [],
};

const SolLiquidityPoolReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LP_TOKENS_BALANCE":
      return {
        ...state,
        TokenBalList: action.payload,
      };

    default:
      return state;
  }
};

export default SolLiquidityPoolReducers;
