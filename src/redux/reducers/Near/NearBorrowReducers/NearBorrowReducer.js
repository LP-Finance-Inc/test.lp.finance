const point = "/images/tokens/SolanaTokens/";

const initialState = {
  name: "lpSOL",
  img: point + "lpSOL.png",
};

const NearBorrowReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEAR_BORROW_TOKEN_SELECT":
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

export default NearBorrowReducer;
