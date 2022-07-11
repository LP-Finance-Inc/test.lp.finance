import { Token } from "../../../../assets/api/global";
const { SOLANA } = Token;

const initialState = {
  img: SOLANA.USDC,
  name: "USDC",
  value: "1000",
};

const SolFaucetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FAUCET_TOKEN_SELECT":
      const { img, name, value } = action.payload;

      return {
        ...state,
        img,
        name,
        value,
      };

    default:
      return state;
  }
};

export default SolFaucetReducer;
