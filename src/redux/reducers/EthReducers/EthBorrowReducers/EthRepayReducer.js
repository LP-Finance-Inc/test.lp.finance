const EthPoint = "/images/tokens/EthToken/";

const initialState = {
  name: "USDC",
  img: EthPoint + "USDC.png",
};

const EthRepayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ETH_REPAY_TOKEN_SELECT":
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

export default EthRepayReducer;
