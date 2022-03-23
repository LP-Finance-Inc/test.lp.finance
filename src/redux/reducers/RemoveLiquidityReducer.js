const point = "/images/tokens/";

const initialState = {
  img1: point + "lpUSD.png",
  img2: point + "USDC.png",
  name: "lpUSD-USDC",
};

const RemoveLiquidityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_LIQUIDITY_TOKEN_SELECT":
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

export default RemoveLiquidityReducer;
