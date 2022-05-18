const point = "/images/tokens/SolanaTokens/";

const initialState = {
  name: "SOL",
  img: point + "SOL.png",
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
