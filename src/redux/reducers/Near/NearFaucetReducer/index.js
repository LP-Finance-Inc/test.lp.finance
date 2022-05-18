const point = "/images/tokens/SolanaTokens/";

const initialState = {
  img: point + "SOL.png",
  name: "SOL",
  value: "1",
};

const NearFaucetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEAR_FAUCET_TOKEN_SELECT":
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

export default NearFaucetReducer;
