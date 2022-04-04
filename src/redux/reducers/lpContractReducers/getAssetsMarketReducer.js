const initialState = {
  progress: false,
  AssetsMarketList: [],
};

const getAssetsMarketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ASSETS_MARKET_LIST_PROGRESS":
      return {
        ...state,
        progress: true,
      };

    case "SET_ASSETS_MARKET_LIST":
      return {
        ...state,
        AssetsMarketList: action.payload,
        progress: false,
      };

    default:
      return state;
  }
};

export default getAssetsMarketReducer;
