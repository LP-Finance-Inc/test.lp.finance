import { Token } from "../../../../assets/api/global";
const { SOLANA } = Token;

const initialState = {
  name: "wSOL",
  img: SOLANA.wSOL,
};

const SolWithdrawReducer = (state = initialState, action) => {
  switch (action.type) {
    case "WITHDRAW_TOKEN_SELECT":
      const { img, name } = action.payload;

      return {
        ...state,
        name: name,
        img: img,
      };

    default:
      return state;
  }
};

export default SolWithdrawReducer;
