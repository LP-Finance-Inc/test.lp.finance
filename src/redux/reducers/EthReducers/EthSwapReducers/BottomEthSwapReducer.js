const initialState = {
  name: "Select a token",
  img: "",
};

const BottomEthSwapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOTTOM_ETH_SWAP_TOKEN_SELECT":
      const { img, name } = action.payload;

      return {
        ...state,
        name: name,
        img: img,
      };

    case "BOTTOM_ETH_SWAP_TOKEN_COMPARE":
      return {
        ...state,
        name: "Select a token",
        img: "",
      };

    case "BOTTOM_ETH_SWAP_TOKEN_CHANGE":
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

export default BottomEthSwapReducer;
