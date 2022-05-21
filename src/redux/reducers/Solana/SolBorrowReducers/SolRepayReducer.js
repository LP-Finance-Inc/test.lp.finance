const point = "/images/tokens/SolanaTokens/";

const initialState = {
  name: "lpUSD",
  img: point + "lpUSD.png",
};

const SolRepayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REPAY_TOKEN_SELECT":
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

export default SolRepayReducer;
