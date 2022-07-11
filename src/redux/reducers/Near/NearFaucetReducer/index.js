import { Token } from "../../../../assets/api/global";
const { NEAR } = Token;

const initialState = {
  img: NEAR.NEAR,
  name: "NEAR",
  value: "1",
};

const NearFaucetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEAR_FAUCET_TOKEN_SELECT":
      const { img, name, value } = action.payload;

      return {
        ...state,
        img,
        name,
        value,
      };

    default:
      return state;
  }
};

export default NearFaucetReducer;
