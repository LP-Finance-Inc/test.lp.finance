const initialState = {
  TokenPriceList: {
    lpSOLTokenPrice: "0",
    SolTokenPrice: "0",
    BtcTokenPrice: "0",
    UsdcTokenPrice: "0",
    lpUSDTokenPrice: "0",
    mSOLTokenPrice: "0",
  },
  AuctionStakeInfo: {
    AuctionStakeTotalRewardPercent: "0",
    AuctionStakeTotalDepositedLpUSD: "0",
    AuctionLastEpochProfitPercent: "0",
    AuctionLastEpochProfitAmount: "0",
  },
  AuctionUserAccount: {
    UserAuctionDepositedLpUSD: "0",
    UserAuctionDiscountReward: "0",
  },
};

const lpAuctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FOR_AUCTION_TOKEN_PRICE_LIST":
      const { TokenPriceList } = action.payload;

      return {
        ...state,
        TokenPriceList,
      };

    case "GET_AUCTION_USER_ACCOUNT_INFO":
      return {
        ...state,
        AuctionUserAccount: action.payload,
      };

    case "GET_AUCTION_STATE_INFO":
      return {
        ...state,
        AuctionStakeInfo: action.payload,
      };

    default:
      return state;
  }
};

export default lpAuctionReducer;
