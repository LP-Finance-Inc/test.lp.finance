const EthPoint = "/images/tokens/EthToken/";

const initialState = {
  name: "SOL",
  img: EthPoint + "SOL.png",
};

const EthWithdrawReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ETH_WITHDRAW_TOKEN_SELECT":
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

export default EthWithdrawReducer;
