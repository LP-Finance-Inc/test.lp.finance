const NearPoint = "/images/tokens/NearTokens/";

const initialState = {
  name: "lpNEAR",
  img: NearPoint + "lpNEAR.png",
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
