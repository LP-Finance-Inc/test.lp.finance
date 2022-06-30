const initialState = {
  BalArr: [],
  BalList: {
    SOLBalance: "00.00",
    wSOLBalance: "00.00",
    LPFiBalance: "00.00",
    mSOLBalance: "00.00",
    stSOLBalance: "00.00",
    scnSOLBalance: "00.00",
    USDCBalance: "00.00",
    wBTCBalance: "00.00",
    wETHBalance: "00.00",
    RAYBalance: "00.00",
    SRMBalance: "00.00",
    AVAXBalance: "00.00",
    FIDABalance: "00.00",
    FTTBalance: "00.00",
    FTMBalance: "00.00",
    GMTBalance: "00.00",
    LUNABalance: "00.00",
    MATICBalance: "00.00",
    USDTBalance: "00.00",
    lpSOLBalance: "00.00",
    lpUSDBalance: "00.00",
  },
  TokenPriceArr: [],
  TokenPriceList: {
    SOLTokenPrice: 0,
    wSOLTokenPrice: 0,
    LPFiTokenPrice: 0,
    mSOLTokenPrice: 0,
    stSOLTokenPrice: 0,
    scnSOLTokenPrice: 0,
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
    USDTTokenPrice: 0,
    lpSOLTokenPrice: 0,
    lpUSDTokenPrice: 0,
  },
  variables: {
    TotalDepositedCal: 0,
    TotalBorrowedCal: 0,

    UserTotalDepositedCal: 0,
    UserTotalBorrowedCal: 0,

    //Cbs global variable
    // ===================
    // deposited
    DepositedwSOLAmountCal: 0,
    DepositedmSOLAmountCal: 0,
    DepositedscnSOLAmountCal: 0,
    DepositedstSOLAmountCal: 0,
    DepositedRAYAmountCal: 0,
    DepositedSRMAmountCal: 0,
    DepositedlpSOLAmountCal: 0,
    DepositedlpUSDAmountCal: 0,
    DepositedLPFiAmountCal: 0,

    // borrowed
    BorrowedlpSOLAmountCal: 0,
    BorrowedlpUSDAmountCal: 0,

    // user Account variables
    // =========================
    // deposited
    DepositedUserwSOLAmountCal: 0,
    DepositedUsermSOLAmountCal: 0,
    DepositedUserscnSOLAmountCal: 0,
    DepositedUserstSOLAmountCal: 0,
    DepositedUserRAYAmountCal: 0,
    DepositedUserSRMAmountCal: 0,
    DepositedUserLpSOLAmountCal: 0,
    DepositedUserLpUSDAmountCal: 0,
    DepositedUserLPFiAmountCal: 0,

    // borrowed
    BorrowedUserLpUSDAmountCal: 0,
    BorrowedUserLpSOLAmountCal: 0,
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
        wSOLDepositedPercentage: 0,
        mSOLDepositedPercentage: 0,
        scnSOLDepositedPercentage: 0,
        stSOLDepositedPercentage: 0,
        RAYDepositedPercentage: 0,
        SRMDepositedPercentage: 0,
        LPFiDepositedPercentage: 0,
        lpSOLDepositedPercentage: 0,
        lpUSDDepositedPercentage: 0,
        //borrowed
        lpSOLBorrowedPercentage: 0,
        lpUSDBorrowedPercentage: 0,
      },
    },
  },

  UserAccountInfo: {
    //deposited
    DepositedwSolAmount: 0,
    DepositedmSOLAmount: 0,
    DepositedscnSOLAmount: 0,
    DepositedstSOLAmount: 0,
    DepositedRAYAmount: 0,
    DepositedSRMAmount: 0,
    DepositedlpSolAmount: 0,
    DepositedlpUsdAmount: 0,
    DepositedLPFiAmount: 0,

    //lending amount
    LendingwSOLAmount: 0,
    LendingmSOLAmount: 0,
    LendingscnSOLAmount: 0,
    LendingstSOLAmount: 0,
    LendingSRMAmount: 0,
    LendingRAYAmount: 0,

    //borrowed
    BorrowedlpSOLAmount: 0,
    BorrowedlpUsdAmount: 0,
  },
  StateAccountInfo: {
    //deposited
    TotalDepositedwSOL: 0,
    TotalDepositedmSOL: 0,
    TotalDepositedstSOL: 0,
    TotalDepositedscnSOL: 0,
    TotalDepositedRAY: 0,
    TotalDepositedSRM: 0,
    TotalDepositedLPFi: 0,
    TotalDepositedlpSOL: 0,
    TotalDepositedlpUSD: 0,

    //borrowed
    TotalBorrowedlpSOL: 0,
    TotalBorrowedlpUSD: 0,
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
            //deposited
            DepositedwSolAmount: 0,
            DepositedmSOLAmount: 0,
            DepositedscnSOLAmount: 0,
            DepositedstSOLAmount: 0,
            DepositedRAYAmount: 0,
            DepositedSRMAmount: 0,
            DepositedlpSolAmount: 0,
            DepositedlpUsdAmount: 0,
            DepositedLPFiAmount: 0,

            //lending amount
            LendingwSOLAmount: 0,
            LendingmSOLAmount: 0,
            LendingscnSOLAmount: 0,
            LendingstSOLAmount: 0,
            LendingSRMAmount: 0,
            LendingRAYAmount: 0,

            //borrowed
            BorrowedlpSOLAmount: 0,
            BorrowedlpUsdAmount: 0,
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
        wSOLTokenPrice,
        LPFiTokenPrice,
        mSOLTokenPrice,
        stSOLTokenPrice,
        scnSOLTokenPrice,
        RAYTokenPrice,
        SRMTokenPrice,
        lpSOLTokenPrice,
        lpUSDTokenPrice,
      } = state.TokenPriceList;

      const {
        TotalDepositedwSOL,
        TotalDepositedmSOL,
        TotalDepositedstSOL,
        TotalDepositedscnSOL,
        TotalDepositedRAY,
        TotalDepositedSRM,
        TotalDepositedLPFi,
        TotalDepositedlpSOL,
        TotalDepositedlpUSD,
        TotalBorrowedlpSOL,
        TotalBorrowedlpUSD,
      } = state.StateAccountInfo;

      const {
        DepositedwSolAmount,
        DepositedmSOLAmount,
        DepositedscnSOLAmount,
        DepositedstSOLAmount,
        DepositedRAYAmount,
        DepositedSRMAmount,
        DepositedlpSolAmount,
        DepositedlpUsdAmount,
        DepositedLPFiAmount,

        LendingwSOLAmount,
        LendingmSOLAmount,
        LendingscnSOLAmount,
        LendingstSOLAmount,
        LendingSRMAmount,
        LendingRAYAmount,

        BorrowedlpSOLAmount,
        BorrowedlpUsdAmount,
      } = state.UserAccountInfo;

      // ====================================================
      //  global variables start
      const DepositedwSOLAmountCal = TotalDepositedwSOL * wSOLTokenPrice;
      const DepositedmSOLAmountCal = TotalDepositedmSOL * mSOLTokenPrice;
      const DepositedscnSOLAmountCal = TotalDepositedscnSOL * scnSOLTokenPrice;
      const DepositedstSOLAmountCal = TotalDepositedstSOL * stSOLTokenPrice;
      const DepositedRAYAmountCal = TotalDepositedRAY * RAYTokenPrice;
      const DepositedSRMAmountCal = TotalDepositedSRM * SRMTokenPrice;
      const DepositedlpSOLAmountCal = TotalDepositedlpSOL * lpSOLTokenPrice;
      const DepositedlpUSDAmountCal = TotalDepositedlpUSD * lpUSDTokenPrice;
      const DepositedLPFiAmountCal = TotalDepositedLPFi * LPFiTokenPrice;

      const BorrowedlpSOLAmountCal = TotalBorrowedlpSOL * lpSOLTokenPrice;
      const BorrowedlpUSDAmountCal = TotalBorrowedlpUSD * lpUSDTokenPrice;

      const TotalDepositedCal =
        DepositedwSOLAmountCal +
        DepositedmSOLAmountCal +
        DepositedscnSOLAmountCal +
        DepositedstSOLAmountCal +
        DepositedRAYAmountCal +
        DepositedSRMAmountCal +
        DepositedlpSOLAmountCal +
        DepositedlpUSDAmountCal +
        DepositedLPFiAmountCal;

      const TotalBorrowedCal = BorrowedlpSOLAmountCal + BorrowedlpUSDAmountCal;

      //  global end
      // ====================================================

      // ===================================================
      //Borrow Page start
      const DepositedUserwSOLAmountCal =
        (DepositedwSolAmount + LendingwSOLAmount) * wSOLTokenPrice;

      const DepositedUsermSOLAmountCal =
        (DepositedmSOLAmount + LendingmSOLAmount) * mSOLTokenPrice;

      const DepositedUserscnSOLAmountCal =
        (DepositedscnSOLAmount + LendingscnSOLAmount) * scnSOLTokenPrice;

      const DepositedUserstSOLAmountCal =
        (DepositedstSOLAmount + LendingstSOLAmount) * stSOLTokenPrice;

      const DepositedUserRAYAmountCal =
        (DepositedRAYAmount + LendingRAYAmount) * RAYTokenPrice;

      const DepositedUserSRMAmountCal =
        (DepositedSRMAmount + LendingSRMAmount) * SRMTokenPrice;

      const DepositedUserLpSOLAmountCal =
        DepositedlpSolAmount * lpSOLTokenPrice;
      const DepositedUserLpUSDAmountCal =
        DepositedlpUsdAmount * lpUSDTokenPrice;

      const DepositedUserLPFiAmountCal = DepositedLPFiAmount * LPFiTokenPrice;

      const BorrowedUserLpSOLAmountCal = BorrowedlpSOLAmount * lpSOLTokenPrice;
      const BorrowedUserLpUSDAmountCal = BorrowedlpUsdAmount * lpUSDTokenPrice;

      const UserTotalDepositedCal =
        DepositedUserwSOLAmountCal +
        DepositedUsermSOLAmountCal +
        DepositedUserscnSOLAmountCal +
        DepositedUserstSOLAmountCal +
        DepositedUserRAYAmountCal +
        DepositedUserSRMAmountCal +
        DepositedUserLpSOLAmountCal +
        DepositedUserLpUSDAmountCal +
        DepositedUserLPFiAmountCal;

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
      const wSOLDepositedPercentage =
        (DepositedwSOLAmountCal / TotalDepositedCal) * 100;

      const mSOLDepositedPercentage =
        (DepositedmSOLAmountCal / TotalDepositedCal) * 100;

      const scnSOLDepositedPercentage =
        (DepositedscnSOLAmountCal / TotalDepositedCal) * 100;

      const stSOLDepositedPercentage =
        (DepositedstSOLAmountCal / TotalDepositedCal) * 100;

      const RAYDepositedPercentage =
        (DepositedSRMAmountCal / TotalDepositedCal) * 100;

      const SRMDepositedPercentage =
        (DepositedRAYAmountCal / TotalDepositedCal) * 100;

      const lpSOLDepositedPercentage =
        (DepositedlpSOLAmountCal / TotalDepositedCal) * 100;

      const lpUSDDepositedPercentage =
        (DepositedlpUSDAmountCal / TotalDepositedCal) * 100;

      const LPFiDepositedPercentage =
        (DepositedLPFiAmountCal / TotalDepositedCal) * 100;

      // pieChart totalBorrowed
      const lpSOLBorrowedPercentage =
        (BorrowedlpSOLAmountCal / TotalBorrowedCal) * 100;

      const lpUSDBorrowedPercentage =
        (BorrowedlpUSDAmountCal / TotalBorrowedCal) * 100;

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

          //Cbs global variable
          // ===================
          // deposited
          DepositedwSOLAmountCal,
          DepositedmSOLAmountCal,
          DepositedscnSOLAmountCal,
          DepositedstSOLAmountCal,
          DepositedRAYAmountCal,
          DepositedSRMAmountCal,
          DepositedlpSOLAmountCal,
          DepositedlpUSDAmountCal,
          DepositedLPFiAmountCal,

          // borrowed
          BorrowedlpSOLAmountCal,
          BorrowedlpUSDAmountCal,

          // user Account variables
          // =========================
          // deposited
          DepositedUserwSOLAmountCal,
          DepositedUsermSOLAmountCal,
          DepositedUserscnSOLAmountCal,
          DepositedUserstSOLAmountCal,
          DepositedUserRAYAmountCal,
          DepositedUserSRMAmountCal,
          DepositedUserLpSOLAmountCal,
          DepositedUserLpUSDAmountCal,
          DepositedUserLPFiAmountCal,

          // borrowed
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
              //deposited
              wSOLDepositedPercentage,
              mSOLDepositedPercentage,
              scnSOLDepositedPercentage,
              stSOLDepositedPercentage,
              RAYDepositedPercentage,
              SRMDepositedPercentage,
              LPFiDepositedPercentage,
              lpSOLDepositedPercentage,
              lpUSDDepositedPercentage,

              //borrowed
              lpSOLBorrowedPercentage,
              lpUSDBorrowedPercentage,
            },
          },
        },
      };

    default:
      return state;
  }
};

export default SolBorrowReducers;
