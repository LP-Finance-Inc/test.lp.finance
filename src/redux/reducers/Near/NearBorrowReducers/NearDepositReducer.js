const point = "/images/tokens/SolanaTokens/";

const initialState = {
  name: "SOL",
  img: point + "SOL.png",
};

const NearDepositReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEAR_DEPOSIT_TOKEN_SELECT":
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

export default NearDepositReducer;
