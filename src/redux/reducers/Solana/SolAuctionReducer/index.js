const initialState = {
  TokenPriceList: {
    SolTokenPrice: 0,
    ETHTokenPrice: 0,
    BtcTokenPrice: 0,
    SRMTokenPrice: 0,
    UsdcTokenPrice: 0,
    USDTTokenPrice: 0,
    mSOLTokenPrice: 0,
    STSOLTokenPrice: 0,
    scnSOLTokenPrice: 0,
    lpSOLTokenPrice: 0,
    lpUSDTokenPrice: 0,
    lpETHTokenPrice: 0,
    lpBTCTokenPrice: 0,
  },
  AuctionStakeInfo: {
    AuctionStakeTotalRewardPercent: 0,
    AuctionStakeTotalDepositedLpUSD: 0,
    AuctionLastEpochProfitPercent: 0,
    AuctionLastEpochProfitAmount: 0,
    AuctionTotalLpUSD: 0,
  },
  AuctionUserAccount: {
    UserAuctionDepositedLpUSD: 0,
    UserAuctionDiscountReward: 0,
  },
};

const SolAuctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FOR_AUCTION_TOKEN_PRICE_LIST":
      const { getTokensPriceListInfo } = action.payload;

      return {
        ...state,
        TokenPriceList: getTokensPriceListInfo,
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

export default SolAuctionReducer;
