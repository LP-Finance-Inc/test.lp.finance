const initialState = {
  BalArr: [],
  TokenPriceArr: [],
  BalList: {
    SOLBalance: "00.00",
    BTCBalance: "00.00",
    USDCBalance: "00.00",
    mSOLBalance: "00.00",
    ETHBalance: "00.00",
    SRMBalance: "00.00",
    USDTBalance: "00.00",
    scnSOLBalance: "00.00",
    stSOLBalance: "00.00",
    lpSOLBalance: "00.00",
    lpUSDBalance: "00.00",
    lpBTCBalance: "00.00",
    lpETHBalance: "00.00",
  },

  TokenPriceList: {
    SOLTokenPrice: 0,
    BTCTokenPrice: 0,
    USDCTokenPrice: 0,
    mSOLTokenPrice: 0,
    ETHTokenPrice: 0,
    SRMTokenPrice: 0,
    USDTTokenPrice: 0,
    stSOLTokenPrice: 0,
    scnSOLTokenPrice: 0,
    lpSOLTokenPrice: 0,
    lpUSDTokenPrice: 0,
    lpBTCTokenPrice: 0,
    lpETHTokenPrice: 0,
  },
  variables: {
    TotalDepositedCal: 0,
    TotalBorrowedCal: 0,

    UserTotalDepositedCal: 0,
    UserTotalBorrowedCal: 0,

    //Cbs Stake variable
    // ===================
    // deposited
    DepositedSOLAmountCal: 0,
    DepositedBTCAmountCal: 0,
    DepositedUSDCAmountCal: 0,
    DepositedMSOLAmountCal: 0,
    DepositedETHAmountCal: 0,
    DepositedSRMAmountCal: 0,
    DepositedUSDTAmountCal: 0,
    DepositedstSOLAmountCal: 0,
    DepositedscnSOLAmountCal: 0,
    DepositedLpSOLAmountCal: 0,
    DepositedLpUSDAmountCal: 0,
    DepositedLpBTCAmountCal: 0,
    DepositedLpETHAmountCal: 0,

    // borrowed
    BorrowedLpSOLAmountCal: 0,
    BorrowedLpUSDAmountCal: 0,
    BorrowedLpBTCAmountCal: 0,
    BorrowedLpETHAmountCal: 0,

    // user Account variables
    // =========================
    // deposited
    DepositedUserSOLAmountCal: 0,
    DepositedUserBTCAmountCal: 0,
    DepositedUserUSDCAmountCal: 0,
    DepositedUserMSOLAmountCal: 0,
    DepositedUserETHAmountCal: 0,
    DepositedUserSRMAmountCal: 0,
    DepositedUserUSDTAmountCal: 0,
    DepositedUserstSOLAmountCal: 0,
    DepositedUserscnSOLAmountCal: 0,
    DepositedUserLpSOLAmountCal: 0,
    DepositedUserLpUSDAmountCal: 0,
    DepositedUserLpBTCAmountCal: 0,
    DepositedUserLpETHAmountCal: 0,

    // borrowed
    BorrowedUserLpUSDAmountCal: 0,
    BorrowedUserLpSOLAmountCal: 0,
    BorrowedUserLpBTCAmountCal: 0,
    BorrowedUserLpETHAmountCal: 0,
  },
  Borrow: {
    Overview: {
      TotalSupply: 0,
      TotalBorrow: 0,
      TVL: 0,
      NetLTV: 0,
    },
    Account: {
      BorrowLimit: 0,
      Liquidation: 0,
      LTV: 0,
    },
    pieChart: {
      TotalSupply: {
        //deposited
        SOLDepositedPercentage: 0,
        BTCDepositedPercentage: 0,
        USDCDepositedPercentage: 0,
        mSOLDepositedPercentage: 0,
        ETHDepositedPercentage: 0,
        SRMDepositedPercentage: 0,
        USDTDepositedPercentage: 0,
        stSOLDepositedPercentage: 0,
        scnSOLDepositedPercentage: 0,
        lpSOLDepositedPercentage: 0,
        lpUSDDepositedPercentage: 0,
        lpBTCDepositedPercentage: 0,
        lpETHDepositedPercentage: 0,

        //borrowed
        lpSOLBorrowedPercentage: 0,
        lpUSDBorrowedPercentage: 0,
        lpBTCBorrowedPercentage: 0,
        lpETHBorrowedPercentage: 0,
      },
    },
  },

  UserAccountInfo: {
    //deposited
    DepositedSolAmount: "00.00",
    DepositedBtcAmount: "00.00",
    DepositedUsdcAmount: "00.00",
    DepositedMSOLAmount: "00.00",
    DepositedETHAmount: "00.00",
    DepositedSRMAmount: "00.00",
    DepositedUSDTAmount: "00.00",
    DepositedstSOLAmount: "00.00",
    DepositedscnSOLAmount: "00.00",

    LendingSolAmount: "00.00",
    LendingBtcAmount: "00.00",
    LendingUsdcAmount: "00.00",
    LendingMSOLAmount: "00.00",
    LendingETHAmount: "00.00",
    LendingSRMAmount: "00.00",
    LendingUSDTAmount: "00.00",
    LendingstSOLAmount: "00.00",
    LendingscnSOLAmount: "00.00",

    DepositedLpSolAmount: "00.00",
    DepositedLpUsdAmount: "00.00",
    DepositedLpBTCAmount: "00.00",
    DepositedLpETHAmount: "00.00",
    //borrowed
    BorrowedLpSOLAmount: "00.00",
    BorrowedLpUsdAmount: "00.00",
    BorrowedLpBTCAmount: "00.00",
    BorrowedLpETHAmount: "00.00",
  },
  StateAccountInfo: {
    //borrowed
    TotalBorrowLpSOL: "00.00",
    TotalBorrowLpUSD: "00.00",
    TotalBorrowLpBTC: "00.00",
    TotalBorrowLpETH: "00.00",
    //deposited
    TotalDepositedSOL: "00.00",
    TotalDepositedBTC: "00.00",
    TotalDepositedUSDC: "00.00",
    TotalDepositedMSOL: "00.00",
    TotalDepositedETH: "00.00",
    TotalDepositedSRM: "00.00",
    TotalDepositedUSDT: "00.00",
    TotalDepositedstSOL: "00.00",
    TotalDepositedscnSOL: "00.00",
    TotalDepositedLpSOL: "00.00",
    TotalDepositedLpUSD: "00.00",
    TotalDepositedLpBTC: "00.00",
    TotalDepositedLpETH: "00.00",
  },
};

const SolBorrowReducers = (state = initialState, action) => {
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
            DepositedSolAmount: 0,
            DepositedBtcAmount: 0,
            DepositedUsdcAmount: 0,
            DepositedMSOLAmount: 0,
            DepositedETHAmount: 0,
            DepositedSRMAmount: 0,
            DepositedUSDTAmount: 0,
            DepositedstSOLAmount: 0,
            DepositedscnSOLAmount: 0,

            LendingSolAmount: 0,
            LendingBtcAmount: 0,
            LendingUsdcAmount: 0,
            LendingMSOLAmount: 0,
            LendingETHAmount: 0,
            LendingSRMAmount: 0,
            LendingUSDTAmount: 0,
            LendingstSOLAmount: 0,
            LendingscnSOLAmount: 0,

            DepositedLpSolAmount: 0,
            DepositedLpUsdAmount: 0,
            DepositedLpBTCAmount: 0,
            DepositedLpETHAmount: 0,

            BorrowedLpSOLAmount: 0,
            BorrowedLpUsdAmount: 0,
            BorrowedLpBTCAmount: 0,
            BorrowedLpETHAmount: 0,
          },
        };
      }

    case "GET_STATE_ACCOUNT_INFO":
      const ReadStateAccountInfo = action.payload;

      return {
        ...state,
        StateAccountInfo: ReadStateAccountInfo,
      };

    case "GET_TOKEN_PRICE_LIST":
      const { TokenPriceArr, TokenPriceList } = action.payload;

      const {
        SOLTokenPrice,
        BTCTokenPrice,
        USDCTokenPrice,
        mSOLTokenPrice,
        ETHTokenPrice,
        SRMTokenPrice,
        USDTTokenPrice,
        stSOLTokenPrice,
        scnSOLTokenPrice,
        lpSOLTokenPrice,
        lpUSDTokenPrice,
        lpBTCTokenPrice,
        lpETHTokenPrice,
      } = state.TokenPriceList;

      const {
        //borrowed
        TotalBorrowLpSOL,
        TotalBorrowLpUSD,
        TotalBorrowLpBTC,
        TotalBorrowLpETH,
        //deposited
        TotalDepositedSOL,
        TotalDepositedBTC,
        TotalDepositedUSDC,
        TotalDepositedMSOL,
        TotalDepositedETH,
        TotalDepositedSRM,
        TotalDepositedUSDT,
        TotalDepositedstSOL,
        TotalDepositedscnSOL,
        TotalDepositedLpSOL,
        TotalDepositedLpUSD,
        TotalDepositedLpBTC,
        TotalDepositedLpETH,
      } = state.StateAccountInfo;

      const {
        //deposited
        DepositedSolAmount,
        DepositedBtcAmount,
        DepositedUsdcAmount,
        DepositedMSOLAmount,
        DepositedETHAmount,
        DepositedSRMAmount,
        DepositedUSDTAmount,
        DepositedstSOLAmount,
        DepositedscnSOLAmount,

        LendingSolAmount,
        LendingBtcAmount,
        LendingUsdcAmount,
        LendingMSOLAmount,
        LendingETHAmount,
        LendingSRMAmount,
        LendingUSDTAmount,
        LendingstSOLAmount,
        LendingscnSOLAmount,

        DepositedLpSolAmount,
        DepositedLpUsdAmount,
        DepositedLpBTCAmount,
        DepositedLpETHAmount,
        //borrowed
        BorrowedLpSOLAmount,
        BorrowedLpUsdAmount,
        BorrowedLpBTCAmount,
        BorrowedLpETHAmount,
      } = state.UserAccountInfo;

      // ====================================================
      //  global variables start
      const DepositedSOLAmountCal = TotalDepositedSOL * SOLTokenPrice;
      const DepositedBTCAmountCal = TotalDepositedBTC * BTCTokenPrice;
      const DepositedUSDCAmountCal = TotalDepositedUSDC * USDCTokenPrice;
      const DepositedMSOLAmountCal = TotalDepositedMSOL * mSOLTokenPrice;
      const DepositedETHAmountCal = TotalDepositedETH * ETHTokenPrice;
      const DepositedSRMAmountCal = TotalDepositedSRM * SRMTokenPrice;
      const DepositedUSDTAmountCal = TotalDepositedUSDT * USDTTokenPrice;
      const DepositedstSOLAmountCal = TotalDepositedstSOL * stSOLTokenPrice;
      const DepositedscnSOLAmountCal = TotalDepositedscnSOL * scnSOLTokenPrice;
      const DepositedLpSOLAmountCal = TotalDepositedLpSOL * lpSOLTokenPrice;
      const DepositedLpUSDAmountCal = TotalDepositedLpUSD * lpUSDTokenPrice;
      const DepositedLpBTCAmountCal = TotalDepositedLpBTC * lpBTCTokenPrice;
      const DepositedLpETHAmountCal = TotalDepositedLpETH * lpETHTokenPrice;

      const BorrowedLpSOLAmountCal = TotalBorrowLpSOL * lpSOLTokenPrice;
      const BorrowedLpUSDAmountCal = TotalBorrowLpUSD * lpUSDTokenPrice;
      const BorrowedLpBTCAmountCal = TotalBorrowLpBTC * lpBTCTokenPrice;
      const BorrowedLpETHAmountCal = TotalBorrowLpETH * lpETHTokenPrice;

      const TotalDepositedCal =
        DepositedSOLAmountCal +
        DepositedBTCAmountCal +
        DepositedUSDCAmountCal +
        DepositedLpUSDAmountCal +
        DepositedLpSOLAmountCal +
        DepositedMSOLAmountCal +
        DepositedETHAmountCal +
        DepositedSRMAmountCal +
        DepositedUSDTAmountCal +
        DepositedstSOLAmountCal +
        DepositedscnSOLAmountCal +
        DepositedLpBTCAmountCal +
        DepositedLpETHAmountCal;

      const TotalBorrowedCal =
        BorrowedLpUSDAmountCal +
        BorrowedLpSOLAmountCal +
        BorrowedLpBTCAmountCal +
        BorrowedLpETHAmountCal;

      //  global end
      // ====================================================

      // ===================================================
      //Borrow Page start
      const DepositedUserSOLAmountCal =
        (DepositedSolAmount + LendingSolAmount) * SOLTokenPrice;

      const DepositedUserBTCAmountCal =
        (DepositedBtcAmount + LendingBtcAmount) * BTCTokenPrice;
      const DepositedUserUSDCAmountCal =
        (DepositedUsdcAmount + LendingUsdcAmount) * USDCTokenPrice;
      const DepositedUserMSOLAmountCal =
        (DepositedMSOLAmount + LendingMSOLAmount) * mSOLTokenPrice;
      const DepositedUserETHAmountCal =
        (DepositedETHAmount + LendingETHAmount) * ETHTokenPrice;
      const DepositedUserSRMAmountCal =
        (DepositedSRMAmount + LendingSRMAmount) * SRMTokenPrice;
      const DepositedUserUSDTAmountCal =
        (DepositedUSDTAmount + LendingUSDTAmount) * USDTTokenPrice;
      const DepositedUserstSOLAmountCal =
        (DepositedstSOLAmount + LendingstSOLAmount) * stSOLTokenPrice;
      const DepositedUserscnSOLAmountCal =
        (DepositedscnSOLAmount + LendingscnSOLAmount) * scnSOLTokenPrice;

      const DepositedUserLpSOLAmountCal =
        DepositedLpSolAmount * lpSOLTokenPrice;
      const DepositedUserLpUSDAmountCal =
        DepositedLpUsdAmount * lpUSDTokenPrice;
      const DepositedUserLpBTCAmountCal =
        DepositedLpBTCAmount * lpBTCTokenPrice;
      const DepositedUserLpETHAmountCal =
        DepositedLpETHAmount * lpETHTokenPrice;

      const BorrowedUserLpSOLAmountCal = BorrowedLpSOLAmount * lpSOLTokenPrice;
      const BorrowedUserLpUSDAmountCal = BorrowedLpUsdAmount * lpUSDTokenPrice;
      const BorrowedUserLpBTCAmountCal = BorrowedLpBTCAmount * lpBTCTokenPrice;
      const BorrowedUserLpETHAmountCal = BorrowedLpETHAmount * lpETHTokenPrice;

      const UserTotalDepositedCal =
        DepositedUserSOLAmountCal +
        DepositedUserBTCAmountCal +
        DepositedUserUSDCAmountCal +
        DepositedUserMSOLAmountCal +
        DepositedUserETHAmountCal +
        DepositedUserSRMAmountCal +
        DepositedUserUSDTAmountCal +
        DepositedUserstSOLAmountCal +
        DepositedUserscnSOLAmountCal +
        DepositedUserLpSOLAmountCal +
        DepositedUserLpUSDAmountCal +
        DepositedUserLpBTCAmountCal +
        DepositedUserLpETHAmountCal;

      const UserTotalBorrowedCal =
        BorrowedUserLpUSDAmountCal +
        BorrowedUserLpSOLAmountCal +
        BorrowedUserLpBTCAmountCal +
        BorrowedUserLpETHAmountCal;

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

      const BTCDepositedPercentage =
        (DepositedBTCAmountCal / TotalDepositedCal) * 100;

      const USDCDepositedPercentage =
        (DepositedUSDCAmountCal / TotalDepositedCal) * 100;

      const mSOLDepositedPercentage =
        (DepositedMSOLAmountCal / TotalDepositedCal) * 100;

      const ETHDepositedPercentage =
        (DepositedETHAmountCal / TotalDepositedCal) * 100;

      const SRMDepositedPercentage =
        (DepositedSRMAmountCal / TotalDepositedCal) * 100;

      const USDTDepositedPercentage =
        (DepositedUSDTAmountCal / TotalDepositedCal) * 100;

      const stSOLDepositedPercentage =
        (DepositedstSOLAmountCal / TotalDepositedCal) * 100;

      const scnSOLDepositedPercentage =
        (DepositedscnSOLAmountCal / TotalDepositedCal) * 100;

      const lpSOLDepositedPercentage =
        (DepositedLpSOLAmountCal / TotalDepositedCal) * 100;

      const lpUSDDepositedPercentage =
        (DepositedLpUSDAmountCal / TotalDepositedCal) * 100;

      const lpBTCDepositedPercentage =
        (DepositedLpBTCAmountCal / TotalDepositedCal) * 100;

      const lpETHDepositedPercentage =
        (DepositedLpETHAmountCal / TotalDepositedCal) * 100;

      // pieChart totalBorrowed
      const lpSOLBorrowedPercentage =
        (BorrowedLpSOLAmountCal / TotalBorrowedCal) * 100;

      const lpUSDBorrowedPercentage =
        (BorrowedLpUSDAmountCal / TotalBorrowedCal) * 100;

      const lpBTCBorrowedPercentage =
        (BorrowedLpBTCAmountCal / TotalBorrowedCal) * 100;
      const lpETHBorrowedPercentage =
        (BorrowedLpETHAmountCal / TotalBorrowedCal) * 100;

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
          // ===================
          // deposited
          DepositedSOLAmountCal,
          DepositedBTCAmountCal,
          DepositedUSDCAmountCal,
          DepositedMSOLAmountCal,
          DepositedETHAmountCal,
          DepositedSRMAmountCal,
          DepositedUSDTAmountCal,
          DepositedstSOLAmountCal,
          DepositedscnSOLAmountCal,
          DepositedLpSOLAmountCal,
          DepositedLpUSDAmountCal,
          DepositedLpBTCAmountCal,
          DepositedLpETHAmountCal,

          // borrowed
          BorrowedLpSOLAmountCal,
          BorrowedLpUSDAmountCal,
          BorrowedLpBTCAmountCal,
          BorrowedLpETHAmountCal,

          // user Account variables
          // =========================
          // deposited
          DepositedUserSOLAmountCal,
          DepositedUserBTCAmountCal,
          DepositedUserUSDCAmountCal,
          DepositedUserMSOLAmountCal,
          DepositedUserETHAmountCal,
          DepositedUserSRMAmountCal,
          DepositedUserUSDTAmountCal,
          DepositedUserstSOLAmountCal,
          DepositedUserscnSOLAmountCal,
          DepositedUserLpSOLAmountCal,
          DepositedUserLpUSDAmountCal,
          DepositedUserLpBTCAmountCal,
          DepositedUserLpETHAmountCal,

          // borrowed
          BorrowedUserLpUSDAmountCal,
          BorrowedUserLpSOLAmountCal,
          BorrowedUserLpBTCAmountCal,
          BorrowedUserLpETHAmountCal,
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
              //deposited
              SOLDepositedPercentage,
              BTCDepositedPercentage,
              USDCDepositedPercentage,
              mSOLDepositedPercentage,
              ETHDepositedPercentage,
              SRMDepositedPercentage,
              USDTDepositedPercentage,
              stSOLDepositedPercentage,
              scnSOLDepositedPercentage,
              lpSOLDepositedPercentage,
              lpUSDDepositedPercentage,
              lpBTCDepositedPercentage,
              lpETHDepositedPercentage,

              //borrowed
              lpSOLBorrowedPercentage,
              lpUSDBorrowedPercentage,
              lpBTCBorrowedPercentage,
              lpETHBorrowedPercentage,
            },
          },
        },
      };

    default:
      return state;
  }
};

export default SolBorrowReducers;
