const initialState = {
  BalArr: [],
  TokenPriceArr: [],
  BalList: {
    SOLBalance: "00.00",
    lpUSDBalance: "00.00",
    lpSOLBalance: "00.00",
    USDCBalance: "00.00",
    BTCBalance: "00.00",
    mSOLBalance: "00.00",
    ETHBalance: "00.00",
    SRMBalance: "00.00",
    USDTBalance: "00.00",
    USTBalance: "00.00",
    scnSOLBalance: "00.00",
    stSOLBalance: "00.00",
    lpETHBalance: "00.00",
    lpBTCBalance: "00.00",
  },

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
  variables: {
    TotalDepositedCal: "0",
    TotalBorrowedCal: "0",

    UserTotalDepositedCal: "0",
    UserTotalBorrowedCal: "0",

    //cbs borrow stack variable
    DepositedSOLAmountCal: "0",
    DepositedBTCAmountCal: "0",
    DepositedUSDCAmountCal: "0",
    DepositedLpUSDAmountCal: "0",
    DepositedLpSOLAmountCal: "0",
    DepositedMSOLAmountCal: "0",
    BorrowedLpUSDAmountCal: "0",
    BorrowedLpSOLAmountCal: "0",

    //account borrow stack variable
    DepositedUserSOLAmountCal: "0",
    DepositedUserBTCAmountCal: "0",
    DepositedUserUSDCAmountCal: "0",
    DepositedUserLpUSDAmountCal: "0",
    DepositedUserLpSOLAmountCal: "0",
    DepositedUserMSOLAmountCal: "0",
    BorrowedUserLpUSDAmountCal: "0",
    BorrowedUserLpSOLAmountCal: "0",
  },
  Borrow: {
    Overview: {
      TotalSupply: "$ 0",
      TotalBorrow: "$ 0",
      TVL: "$ 0",
      NetLTV: "0%",
    },
    Account: {
      BorrowLimit: "$ 0",
      Liquidation: "$ 0",
      LTV: "0%",
    },
    pieChart: {
      TotalSupply: {
        SOLDepositedPercentage: "0",
        lpUSDDepositedPercentage: "0",
        lpSOLDepositedPercentage: "0",
        USDCDepositedPercentage: "0",
        BTCDepositedPercentage: "0",
        mSOLDepositedPercentage: "0",
        lpUSDBorrowedPercentage: "0",
        lpSOLBorrowedPercentage: "0",
      },
    },
  },

  UserAccountInfo: {
    DepositedBtcAmount: "00.00",
    DepositedSolAmount: "00.00",
    DepositedUsdcAmount: "00.00",
    DepositedLpSolAmount: "00.00",
    DepositedLpUsdAmount: "00.00",
    DepositedMSOLAmount: "00.00",
    BorrowedLpSOLAmount: "00.00",
    BorrowedLpUsdAmount: "00.00",
  },
  UserStateAccountInfo: {
    TotalBorrowLpSOL: "00.00",
    TotalBorrowLpUSD: "00.00",
    TotalDepositedSOL: "00.00",
    TotalDepositedUSDC: "00.00",
    TotalDepositedBTC: "00.00",
    TotalDepositedLpSOL: "00.00",
    TotalDepositedLpUSD: "00.00",
    TotalDepositedMSOL: "00.00",
  },
};

const lpContractReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WALLET_TOKEN_BALANCE":
      const { BalArr, BalList } = action.payload;

      return {
        ...state,
        BalArr,
        BalList,
      };

    case "GET_USER_ACCOUNT_INFO":
      const { key, userAccountInfo } = action.payload;

      if (key) {
        return {
          ...state,
          UserAccountInfo: userAccountInfo,
        };
      } else {
        return {
          ...state,
          UserAccountInfo: {
            DepositedBtcAmount: "00.00",
            DepositedSolAmount: "00.00",
            DepositedUsdcAmount: "00.00",
            DepositedLpSolAmount: "00.00",
            DepositedLpUsdAmount: "00.00",
            DepositedMSOLAmount: "00.00",
            BorrowedLpSOLAmount: "00.00",
            BorrowedLpUsdAmount: "00.00",
          },
        };
      }

    case "GET_STATE_ACCOUNT_INFO":
      const ReadStateAccountInfo = action.payload;

      return {
        ...state,
        UserStateAccountInfo: ReadStateAccountInfo,
      };

    case "GET_TOKEN_PRICE_LIST":
      const { TokenPriceArr, TokenPriceList } = action.payload;

      const {
        lpSOLTokenPrice,
        SolTokenPrice,
        BtcTokenPrice,
        UsdcTokenPrice,
        lpUSDTokenPrice,
        mSOLTokenPrice,
      } = TokenPriceList;

      const {
        TotalDepositedSOL,
        TotalDepositedUSDC,
        TotalDepositedBTC,
        TotalDepositedLpSOL,
        TotalDepositedLpUSD,
        TotalDepositedMSOL,
        TotalBorrowLpSOL,
        TotalBorrowLpUSD,
      } = state.UserStateAccountInfo;

      const {
        BorrowedLpSOLAmount,
        BorrowedLpUsdAmount,
        DepositedBtcAmount,
        DepositedSolAmount,
        DepositedUsdcAmount,
        DepositedLpSolAmount,
        DepositedLpUsdAmount,
        DepositedMSOLAmount,
      } = state.UserAccountInfo;

      // ====================================================
      //  global variables start

      const DepositedSOLAmountCal = TotalDepositedSOL * SolTokenPrice;
      const DepositedBTCAmountCal = TotalDepositedBTC * BtcTokenPrice;
      const DepositedUSDCAmountCal = TotalDepositedUSDC * UsdcTokenPrice;
      const DepositedLpUSDAmountCal = TotalDepositedLpUSD * lpUSDTokenPrice;
      const DepositedLpSOLAmountCal = TotalDepositedLpSOL * lpSOLTokenPrice;
      const DepositedMSOLAmountCal = TotalDepositedMSOL * mSOLTokenPrice;

      const BorrowedLpUSDAmountCal = TotalBorrowLpUSD * lpUSDTokenPrice;
      const BorrowedLpSOLAmountCal = TotalBorrowLpSOL * lpSOLTokenPrice;

      const TotalDepositedCal =
        DepositedSOLAmountCal +
        DepositedBTCAmountCal +
        DepositedUSDCAmountCal +
        DepositedLpUSDAmountCal +
        DepositedLpSOLAmountCal +
        DepositedMSOLAmountCal;

      const TotalBorrowedCal = BorrowedLpUSDAmountCal + BorrowedLpSOLAmountCal;

      //  global end
      // ====================================================

      // ===================================================
      //Borrow Page start

      const DepositedUserSOLAmountCal = DepositedSolAmount * SolTokenPrice;
      const DepositedUserBTCAmountCal = DepositedBtcAmount * BtcTokenPrice;
      const DepositedUserUSDCAmountCal = DepositedUsdcAmount * UsdcTokenPrice;
      const DepositedUserLpUSDAmountCal =
        DepositedLpUsdAmount * lpUSDTokenPrice;
      const DepositedUserLpSOLAmountCal =
        DepositedLpSolAmount * lpSOLTokenPrice;
      const DepositedUserMSOLAmountCal = DepositedMSOLAmount * mSOLTokenPrice;

      const BorrowedUserLpUSDAmountCal = BorrowedLpUsdAmount * lpUSDTokenPrice;
      const BorrowedUserLpSOLAmountCal = BorrowedLpSOLAmount * lpSOLTokenPrice;

      const UserTotalDepositedCal =
        DepositedUserSOLAmountCal +
        DepositedUserBTCAmountCal +
        DepositedUserUSDCAmountCal +
        DepositedUserLpUSDAmountCal +
        DepositedUserLpSOLAmountCal +
        DepositedUserMSOLAmountCal;

      const UserTotalBorrowedCal =
        BorrowedUserLpUSDAmountCal + BorrowedUserLpSOLAmountCal;

      //Borrow Page start
      // =======================================================

      //protocol
      const TotalSupply = TotalDepositedCal;
      const TotalBorrowed = TotalBorrowedCal;
      const TVLCal = TotalDepositedCal - TotalBorrowedCal;
      const NetLTVCal = (TotalBorrowedCal / TotalDepositedCal) * 100;

      //account
      const BorrowLimit = UserTotalDepositedCal * 0.85;
      const Liquidation = UserTotalDepositedCal * 0.94;
      const LTV = (UserTotalBorrowedCal / UserTotalDepositedCal) * 100;

      // pieChart totalSupply
      const SOLDepositedPercentage =
        (DepositedSOLAmountCal / TotalDepositedCal) * 100;

      const lpUSDDepositedPercentage =
        (DepositedLpUSDAmountCal / TotalDepositedCal) * 100;

      const lpSOLDepositedPercentage =
        (DepositedLpSOLAmountCal / TotalDepositedCal) * 100;

      const USDCDepositedPercentage =
        (DepositedUSDCAmountCal / TotalDepositedCal) * 100;

      const BTCDepositedPercentage =
        (DepositedBTCAmountCal / TotalDepositedCal) * 100;

      const mSOLDepositedPercentage =
        (DepositedMSOLAmountCal / TotalDepositedCal) * 100;

      // pieChart totalBorrowed
      const lpUSDBorrowedPercentage =
        ((TotalBorrowLpUSD * lpUSDTokenPrice) / TotalBorrowedCal) * 100;
      const lpSOLBorrowedPercentage =
        ((TotalBorrowLpSOL * lpSOLTokenPrice) / TotalBorrowedCal) * 100;

      // =======================================================
      //Borrow Page end

      return {
        ...state,
        TokenPriceArr,
        TokenPriceList,
        variables: {
          TotalDepositedCal,
          TotalBorrowedCal,
          UserTotalDepositedCal,
          UserTotalBorrowedCal,
          //Cbs Stake variable
          DepositedSOLAmountCal,
          DepositedBTCAmountCal,
          DepositedUSDCAmountCal,
          DepositedLpUSDAmountCal,
          DepositedLpSOLAmountCal,
          DepositedMSOLAmountCal,
          BorrowedLpUSDAmountCal,
          BorrowedLpSOLAmountCal,
          // user Account variables
          DepositedUserSOLAmountCal,
          DepositedUserBTCAmountCal,
          DepositedUserUSDCAmountCal,
          DepositedUserLpUSDAmountCal,
          DepositedUserLpSOLAmountCal,
          DepositedUserMSOLAmountCal,
          BorrowedUserLpUSDAmountCal,
          BorrowedUserLpSOLAmountCal,
        },
        Borrow: {
          Overview: {
            TotalSupply: TotalSupply,
            TotalBorrow: TotalBorrowed,
            TVL: TVLCal,
            NetLTV: NetLTVCal,
          },
          Account: {
            BorrowLimit: BorrowLimit,
            Liquidation: Liquidation,
            LTV: LTV,
          },
          pieChart: {
            TotalSupply: {
              SOLDepositedPercentage,
              lpUSDDepositedPercentage,
              lpSOLDepositedPercentage,
              USDCDepositedPercentage,
              BTCDepositedPercentage,
              mSOLDepositedPercentage,
              lpUSDBorrowedPercentage,
              lpSOLBorrowedPercentage,
            },
          },
        },
      };

    default:
      return state;
  }
};

export default lpContractReducers;
