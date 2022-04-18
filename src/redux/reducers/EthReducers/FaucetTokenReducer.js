const point = "/images/tokens/";

const initialState = {
  img: point + "SOL.png",
  name: "SOL",
  value: "1",
};

const FaucetTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FAUCET_TOKEN_SELECT":
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

export default FaucetTokenReducer;
