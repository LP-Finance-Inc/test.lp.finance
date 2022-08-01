import { Token } from "../../../../assets/api/global";
const { SOLANA } = Token;

const initialState = {
  img1: SOLANA.lpUSD,
  img2: SOLANA.USDC,
  name1: "lpUSD",
  name2: "USDC",
};

const SolRemoveLiquidityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SOL_REMOVE_LIQUIDITY_TOKEN_SELECT":
      const { img1, img2, name1, name2 } = action.payload;

      return {
        ...state,
        img1: img1,
        img2: img2,
        name1: name1,
        name2: name2,
      };

    default:
      return state;
  }
};

export default SolRemoveLiquidityReducer;
