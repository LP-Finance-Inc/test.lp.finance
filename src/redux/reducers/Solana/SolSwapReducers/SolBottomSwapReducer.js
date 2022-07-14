const initialState = {
  name: "Select a token",
  img: "",
  apiID: "solana",
};

const SolBottomSwapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOTTOM_SWAP_TOKEN_SELECT":
      const { img, name, apiID } = action.payload;

      return {
        ...state,
        name: name,
        img: img,
        apiID: apiID,
      };

    case "BOTTOM_SWAP_TOKEN_COMPARE":
      return {
        ...state,
        name: "Select a token",
        img: "",
      };

    case "BOTTOM_SWAP_TOKEN_CHANGE":
      const { name1, img1 } = action.payload;

      return {
        ...state,
        name: name1,
        img: img1,
      };

    default:
      return state;
  }
};

export default SolBottomSwapReducer;
