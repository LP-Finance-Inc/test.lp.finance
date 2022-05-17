const point = "/images/tokens/SolanaTokens/";

const initialState = {
  name: "SOL",
  img: point + "SOL.png",
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
