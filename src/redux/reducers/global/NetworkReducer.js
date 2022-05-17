const point = "/images/network/";

const initialState = {
  img: point + "Solana.png",
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
