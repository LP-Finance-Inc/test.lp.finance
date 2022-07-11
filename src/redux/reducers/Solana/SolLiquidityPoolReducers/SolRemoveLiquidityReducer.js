import { Token } from "../../../../assets/api/global";
const { SOLANA } = Token;

const initialState = {
  img1: SOLANA.lpUSD,
  img2: SOLANA.USDC,
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
