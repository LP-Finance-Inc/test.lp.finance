const NearPoint = "/images/tokens/NearTokens/";

const initialState = {
  name: "lpNEAR",
  img: NearPoint + "lpNEAR.png",
};

const NearRepayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEAR_REPAY_TOKEN_SELECT":
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

export default NearRepayReducer;
