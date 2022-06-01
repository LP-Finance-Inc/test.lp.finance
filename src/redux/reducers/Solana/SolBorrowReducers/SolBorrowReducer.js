const point = "/images/tokens/SolanaTokens/";

const initialState = {
  name: "lpUSD",
  img: point + "lpUSD.png",
};

const SolBorrowReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BORROW_TOKEN_SELECT":
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

export default SolBorrowReducer;
