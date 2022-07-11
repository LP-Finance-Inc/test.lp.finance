import { Token } from "../../../../assets/api/global";
const { NEAR } = Token;

const initialState = {
  name: "lpNEAR",
  img: NEAR.lpNEAR,
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
