const point = "/images/tokens/";

const initialState = {
  name: "SOL",
  img: point + "SOL.png",
};

const DepositReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DEPOSIT_TOKEN_SELECT":
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

export default DepositReducer;
