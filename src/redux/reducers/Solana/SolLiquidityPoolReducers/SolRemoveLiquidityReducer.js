const SolanaPoint = "/images/tokens/SolanaTokens/";

const initialState = {
  img1: SolanaPoint + "lpUSD.png",
  img2: SolanaPoint + "USDC.png",
  name: "lpUSD-USDC",
};

const SolRemoveLiquidityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SOL_REMOVE_LIQUIDITY_TOKEN_SELECT":
      const { img1, img2, name } = action.payload;

      return {
        ...state,
        img1: img1,
        img2: img2,
        name: name,
      };

    default:
      return state;
  }
};

export default SolRemoveLiquidityReducer;
