import { Network } from "../../../assets/api/global";

const initialState = {
  img: Network.Solana,
  name: "SOL",
  fullName: "Solana",
};

const NetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NETWORK_TOKEN_SELECT":
      const { img, name, fullName } = action.payload;

      return {
        ...state,
        img,
        name,
        fullName,
      };

    default:
      return state;
  }
};

export default NetworkReducer;
