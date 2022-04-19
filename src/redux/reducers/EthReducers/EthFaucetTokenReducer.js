const EthPoint = "/images/tokens/EthToken/";

const initialState = {
  img: EthPoint + "SOL.png",
  name: "SOL",
  value: "1",
};

const EthFaucetTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ETH_FAUCET_TOKEN_SELECT":
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

export default EthFaucetTokenReducer;
