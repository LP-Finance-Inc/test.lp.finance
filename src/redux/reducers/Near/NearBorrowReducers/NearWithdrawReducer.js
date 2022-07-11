import { Token } from "../../../../assets/api/global";
const { NEAR } = Token;

const initialState = {
  name: "NEAR",
  img: NEAR.NEAR,
};

const NearWithdrawReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEAR_WITHDRAW_TOKEN_SELECT":
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

export default NearWithdrawReducer;
