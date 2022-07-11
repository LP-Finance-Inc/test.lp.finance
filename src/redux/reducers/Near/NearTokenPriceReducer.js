const initialState = {
  NearTokenPriceArr: [],
  NearTokenPriceList: {
    NEARTokenPrice: 0,
    USNTokenPrice: 0,
    wBTCTokenPrice: 0,
    stNEARTokenPrice: 0,
    ETHTokenPrice: 0,
    AURORATokenPrice: 0,
    SOLTokenPrice: 0,
    CELOTokenPrice: 0,
    cUSDTokenPrice: 0,
    lpUSDTokenPrice: 0,
    lpBTCTokenPrice: 0,
    lpETHTokenPrice: 0,
    lpSOLTokenPrice: 0,
    lpNEARTokenPrice: 0,
  },
};

const NearTokenPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NEAR_TOKEN_PRICES":
      const { NearTokenPriceObj, NearTokenPriceArr } = action.payload;

      return {
        ...state,
        NearTokenPriceArr: NearTokenPriceArr,
        NearTokenPriceList: NearTokenPriceObj,
      };

    default:
      return state;
  }
};

export default NearTokenPriceReducer;
