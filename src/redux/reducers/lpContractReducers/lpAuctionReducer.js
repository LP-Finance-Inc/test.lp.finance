const initialState = {
  TokenPriceList: {
    SolTokenPrice: 0,
    ETHTokenPrice: 0,
    BtcTokenPrice: 0,
    SRMTokenPrice: 0,
    UsdcTokenPrice: 0,
    USDTTokenPrice: 0,
    mSOLTokenPrice: 0,
    USTTokenPrice: 0,
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
  getLiquidateAccountList: {
    progress: false,
    message: "",
    AccountList: [],
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

    case "GET_LIQUIDATE_ACCOUNT_LIST_REQUEST":
      return {
        ...state,
        getLiquidateAccountList: {
          progress: true,
          AccountList: [],
        },
      };

    case "GET_LIQUIDATE_ACCOUNT_LIST":
      return {
        ...state,
        getLiquidateAccountList: {
          progress: false,
          AccountList: action.payload,
        },
      };
    case "GET_LIQUIDATE_ACCOUNT_LIST_ERROR":
      const { message } = action.payload;

      return {
        ...state,
        getLiquidateAccountList: {
          progress: false,
          message: message,
          AccountList: [],
        },
      };

    default:
      return state;
  }
};

export default lpAuctionReducer;
