const initialState = {
  TokenPriceList: {
    SOLTokenPrice: 0,
    wSOLTokenPrice: 0,
    LPFiTokenPrice: 0,
    mSOLTokenPrice: 0,
    stSOLTokenPrice: 0,
    scnSOLTokenPriceL: 0,
    USDCTokenPrice: 0,
    wBTCTokenPrice: 0,
    wETHTokenPrice: 0,
    RAYTokenPrice: 0,
    SRMTokenPrice: 0,
    AVAXTokenPrice: 0,
    FIDATokenPrice: 0,
    FTTTokenPrice: 0,
    FTMTokenPrice: 0,
    GMTTokenPrice: 0,
    LUNATokenPrice: 0,
    MATICTokenPrice: 0,
    USDTTokenPriceL: 0,
    lpSOLTokenPrice: 0,
    lpUSDTokenPrice: 0,
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
      const { TokenPriceObj } = action.payload;

      return {
        ...state,
        TokenPriceList: TokenPriceObj,
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
