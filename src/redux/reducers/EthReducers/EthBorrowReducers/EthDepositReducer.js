const EthPoint = "/images/tokens/EthToken/";

const initialState = {
  name: "SOL",
  img: EthPoint + "SOL.png",
};

const EthDepositReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ETH_DEPOSIT_TOKEN_SELECT":
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

export default EthDepositReducer;
