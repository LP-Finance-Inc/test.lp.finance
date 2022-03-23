const point = "/images/tokens/";

const initialState = {
  name: "lpBTC",
  img: point + "lpBTC.png",
};

const ShortSellTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHORT_SELL_TOKEN_SELECT":
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

export default ShortSellTokenReducer;
