const NearPoint = "/images/tokens/NearTokens/";

const initialState = {
  name: "NEAR",
  img: NearPoint + "NEAR.png",
};

const NearTopSwapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEAR_TOP_SWAP_TOKEN_SELECT":
      const { img, name } = action.payload;

      return {
        ...state,
        name: name,
        img: img,
      };

    case "NEAR_TOP_SWAP_TOKEN_COMPARE":
      return {
        ...state,
        name: "Select a token",
        img: "",
      };

    case "NEAR_TOP_SWAP_TOKEN_CHANGE":
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

export default NearTopSwapReducer;
