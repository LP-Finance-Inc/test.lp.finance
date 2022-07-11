import { Token } from "../../../../assets/api/global";
const { SOLANA } = Token;

const initialState = {
  name: "wSOL",
  img: SOLANA.wSOL,
};

const SolDepositReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DEPOSIT_TOKEN_SELECT":
      const { img, name } = action.payload;

      return {
        ...state,
        name,
        img,
      };

    default:
      return state;
  }
};

export default SolDepositReducer;
