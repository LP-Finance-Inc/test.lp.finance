const point = "/images/tokens/";

const initialState = {
  name: "lpSOL",
  img: point + "lpSOL.png",
};

const EthBorrowReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ETH_BORROW_TOKEN_SELECT":
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

export default EthBorrowReducer;
