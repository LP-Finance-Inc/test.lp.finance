const point = "/images/icons/";

const initialState = {
  img: point + "SOLNetwork.png",
  name: "SOL",
  fullName: "Solana",
};

const NetworkTokenReducer = (state = initialState, action) => {
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

export default NetworkTokenReducer;
