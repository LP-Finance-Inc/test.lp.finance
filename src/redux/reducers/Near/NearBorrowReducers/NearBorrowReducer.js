import { Token } from "../../../../assets/api/global";
const { NEAR } = Token;

const initialState = {
  name: "lpNEAR",
  img: NEAR.lpNEAR,
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
