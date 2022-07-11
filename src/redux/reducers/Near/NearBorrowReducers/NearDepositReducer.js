import { Token } from "../../../../assets/api/global";
const { NEAR } = Token;

const initialState = {
  name: "NEAR",
  img: NEAR.NEAR,
};

const NearDepositReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEAR_DEPOSIT_TOKEN_SELECT":
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

export default NearDepositReducer;
