const point = "/images/tokens/SolanaTokens/";

const initialState = {
  name: "USDC",
  img: point + "USDC.png",
};

const SolTopSwapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOP_SWAP_TOKEN_SELECT":
      const { img, name } = action.payload;

      return {
        ...state,
        name: name,
        img: img,
      };

    case "TOP_SWAP_TOKEN_COMPARE":
      return {
        ...state,
        name: "Select a token",
        img: "",
      };

    case "TOP_SWAP_TOKEN_CHANGE":
      const { name2, img2 } = action.payload;

      return {
        ...state,
        name: name2,
        img: img2,
      };

    default:
      return state;
  }
};

export default SolTopSwapReducer;
