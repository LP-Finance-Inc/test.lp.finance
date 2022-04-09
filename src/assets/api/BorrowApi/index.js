import { useSelector } from "react-redux";
import { calc, numFormatter } from "../../../helper";
import { useWallet } from "@solana/wallet-adapter-react";

const point = "/images/tokens/";

var DepositTokens = [
  {
    id: 1,
    img: point + "lpUSD.png",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 2,
    img: point + "lpSOL.png",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 3,
    img: point + "SOL.png",
    fullName: "Solana",
    name: "SOL",
  },
  {
    id: 4,
    img: point + "BTC.png",
    fullName: "Bitcoin",
    name: "BTC",
  },
  {
    id: 5,
    img: point + "USDC.png",
    fullName: "USD Coin",
    name: "USDC",
  },
  {
    id: 6,
    img: point + "mSOL.png",
    fullName: "Marinade Staked SOL",
    name: "mSOL",
  },
  {
    id: 7,
    img: point + "ETH.png",
    fullName: "Test Ethereum",
    name: "ETH",
  },
  {
    id: 8,
    img: point + "SRM.png",
    fullName: "Serum",
    name: "SRM",
  },
  {
    id: 9,
    img: point + "USDT.png",
    fullName: "Tether",
    name: "USDT",
  },
  {
    id: 10,
    img: point + "UST.png",
    fullName: "TerraUSD",
    name: "UST",
  },
  {
    id: 11,
    img: point + "stSOL.png",
    fullName: "Lido for Solana",
    name: "stSOL",
  },
  {
    id: 12,
    img: point + "lpBTC.png",
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 13,
    img: point + "lpETH.png",
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
  {
    id: 14,
    img: point + "scnSOL.png",
    fullName: "Socean Staked SOL",
    name: "scnSOL",
  },
];

var BorrowTokens = [
  {
    id: 1,
    img: point + "lpUSD.png",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 2,
    img: point + "lpSOL.png",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 3,
    img: point + "lpBTC.png",
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 4,
    img: point + "lpETH.png",
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
];

var WithdrawTokens = [
  {
    id: 1,
    img: point + "lpUSD.png",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 2,
    img: point + "lpSOL.png",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 3,
    img: point + "SOL.png",
    fullName: "Solana",
    name: "SOL",
  },
  {
    id: 4,
    img: point + "BTC.png",
    fullName: "Bitcoin",
    name: "BTC",
  },
  {
    id: 5,
    img: point + "USDC.png",
    fullName: "USD Coin",
    name: "USDC",
  },
  {
    id: 6,
    img: point + "mSOL.png",
    fullName: "Marinade Staked SOL",
    name: "mSOL",
  },
  {
    id: 7,
    img: point + "ETH.png",
    fullName: "Ethereum",
    name: "ETH",
  },
  {
    id: 8,
    img: point + "SRM.png",
    fullName: "Serum",
    name: "SRM",
  },
  {
    id: 9,
    img: point + "USDT.png",
    fullName: "Tether",
    name: "USDT",
  },
  {
    id: 10,
    img: point + "UST.png",
    fullName: "TerraUSD",
    name: "UST",
  },
  {
    id: 11,
    img: point + "stSOL.png",
    fullName: "Lido for Solana",
    name: "stSOL",
  },
  {
    id: 12,
    img: point + "lpBTC.png",
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 13,
    img: point + "lpETH.png",
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
  {
    id: 14,
    img: point + "scnSOL.png",
    fullName: "Socean Staked SOL",
    name: "scnSOL",
  },
];

const RepayTokens = [
  {
    id: 1,
    img: point + "lpUSD.png",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 2,
    img: point + "lpSOL.png",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 3,
    img: point + "USDC.png",
    fullName: "USD Coin",
    name: "USDC",
  },
  {
    id: 4,
    img: point + "SOL.png",
    fullName: "Solana",
    name: "SOL",
  },
  {
    id: 5,
    img: point + "lpBTC.png",
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 6,
    img: point + "lpETH.png",
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
  {
    id: 7,
    img: point + "ETH.png",
    fullName: "Test Ethereum",
    name: "ETH",
  },
  {
    id: 8,
    img: point + "BTC.png",
    fullName: "Bitcoin",
    name: "BTC",
  },
];

export const AssetsList = [
  {
    id: 1,
    img: point + "SOL.png",
    AssetsName: "SOL",
  },
  {
    id: 2,
    img: point + "mSOL.png",
    AssetsName: "mSOL",
  },
  {
    id: 3,
    img: point + "stSOL.png",
    AssetsName: "stSOL",
  },
  {
    id: 4,
    img: point + "scnSOL.png",
    AssetsName: "scnSOL",
  },
  {
    id: 5,
    img: point + "BTC.png",
    AssetsName: "BTC",
  },
  {
    id: 6,
    img: point + "ETH.png",
    AssetsName: "ETH",
  },
  {
    id: 7,
    img: point + "SRM.png",
    AssetsName: "SRM",
  },
  {
    id: 8,
    img: point + "USDT.png",
    AssetsName: "USDT",
  },
  {
    id: 9,
    img: point + "USDC.png",
    AssetsName: "USDC",
  },
  {
    id: 10,
    img: point + "UST.png",
    AssetsName: "UST",
  },
];

export const AssetsMarketHeaderList = [
  {
    id: 1,
    name: "Asset",
  },
  {
    id: 2,
    name: "Market Deposited",
  },
  {
    id: 3,
    name: "Market Borrowed",
  },
  {
    id: 4,
    name: "Deposit APR",
  },
];

export const AssetsSolendHeaderList = [
  {
    id: 1,
    name: "Asset",
  },
  {
    id: 2,
    name: "LTV",
  },
  {
    id: 3,
    name: "Total supply",
  },
  {
    id: 4,
    name: "Supply APY",
  },
  {
    id: 5,
    name: "Total borrow",
  },
];

export const DepositTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.lpContractReducers);

  var DepositTokenApiNew = [];

  for (var i = 0; i < getTokenBalState.BalArr.length; i++) {
    for (var j = 0; j < DepositTokens.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[i].BalName === DepositTokens[j].name &&
          getTokenBalState.TokenPriceArr[k].name === DepositTokens[j].name
        ) {
          DepositTokenApiNew.push({
            ...DepositTokens[j],
            BalName: getTokenBalState.BalArr[i].BalName,
            Bal: getTokenBalState.BalArr[i].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return DepositTokenApiNew;
};

export const BorrowTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.lpContractReducers);

  var BorrowTokenApiNew = [];

  for (var i = 0; i < getTokenBalState.BalArr.length; i++) {
    for (var j = 0; j < BorrowTokens.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[i].BalName === BorrowTokens[j].name &&
          getTokenBalState.TokenPriceArr[k].name === DepositTokens[j].name
        ) {
          BorrowTokenApiNew.push({
            ...BorrowTokens[j],
            BalName: getTokenBalState.BalArr[i].BalName,
            Bal: getTokenBalState.BalArr[i].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return BorrowTokenApiNew;
};

export const WithdrawTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.lpContractReducers);

  var WithdrawTokenApiNew = [];

  for (var i = 0; i < getTokenBalState.BalArr.length; i++) {
    for (var j = 0; j < WithdrawTokens.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[i].BalName === WithdrawTokens[j].name &&
          getTokenBalState.TokenPriceArr[k].name === DepositTokens[j].name
        ) {
          WithdrawTokenApiNew.push({
            ...WithdrawTokens[j],
            BalName: getTokenBalState.BalArr[i].BalName,
            Bal: getTokenBalState.BalArr[i].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return WithdrawTokenApiNew;
};

export const RepayTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.lpContractReducers);

  var RepayTokenApiNew = [];

  for (var i = 0; i < getTokenBalState.BalArr.length; i++) {
    for (var j = 0; j < RepayTokens.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[i].BalName === RepayTokens[j].name &&
          getTokenBalState.TokenPriceArr[k].name === DepositTokens[j].name
        ) {
          RepayTokenApiNew.push({
            ...RepayTokens[j],
            BalName: getTokenBalState.BalArr[i].BalName,
            Bal: getTokenBalState.BalArr[i].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return RepayTokenApiNew;
};

export const AccountTokenApi = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;

  const lpContractState = useSelector((state) => state.lpContractReducers);

  const {
    BorrowedLpSOLAmount,
    BorrowedLpUsdAmount,
    DepositedBtcAmount,
    DepositedSolAmount,
    DepositedUsdcAmount,
    DepositedLpSolAmount,
    DepositedLpUsdAmount,
    DepositedMSOLAmount,
  } = lpContractState.UserAccountInfo;

  const {
    DepositedUserSOLAmountCal,
    DepositedUserBTCAmountCal,
    DepositedUserUSDCAmountCal,
    DepositedUserLpUSDAmountCal,
    DepositedUserLpSOLAmountCal,
    DepositedUserMSOLAmountCal,
    BorrowedUserLpUSDAmountCal,
    BorrowedUserLpSOLAmountCal,
  } = lpContractState.variables;

  const getAssetsMarketState = useSelector(
    (state) => state.getAssetsMarketReducer
  );

  const PoolAssetsState = useSelector((state) => state.PoolAssetsReducer);

  const { PoolAssetsList } = PoolAssetsState;
  const { AssetsMarketList } = getAssetsMarketState;

  const RewardObj = {
    BTCRewardAPY: {
      name: "",
      value: "",
    },
    SOLRewardAPY: {
      name: "",
      value: "",
    },
    USDCRewardAPY: {
      name: "",
      value: "",
    },
    mSOLRewardAPY: {
      name: "",
      value: "",
    },
  };

  for (var i = 0; i < PoolAssetsList.length; i++) {
    for (var j = 0; j < AssetsMarketList.length; j++) {
      if (PoolAssetsList[i].AssetsName === AssetsMarketList[j].AssetsName) {
        let RewardAPY = "";
        if (PoolAssetsList[i].SupplyAPY > AssetsMarketList[i].DepositAPR) {
          RewardAPY = PoolAssetsList[i].SupplyAPY / 10;

          if (PoolAssetsList[i].AssetsName === "BTC") {
            RewardObj.BTCRewardAPY.name = "solend";
          } else if (PoolAssetsList[i].AssetsName === "SOL") {
            RewardObj.SOLRewardAPY.name = "solend";
          } else if (PoolAssetsList[i].AssetsName === "USDC") {
            RewardObj.USDCRewardAPY.name = "solend";
          } else if (PoolAssetsList[i].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "solend";
          }
        } else if (
          AssetsMarketList[i].DepositAPR > PoolAssetsList[i].SupplyAPY
        ) {
          RewardAPY = AssetsMarketList[i].DepositAPR / 10;

          if (PoolAssetsList[i].AssetsName === "BTC") {
            RewardObj.BTCRewardAPY.name = "apricot";
          } else if (PoolAssetsList[i].AssetsName === "SOL") {
            RewardObj.SOLRewardAPY.name = "apricot";
          } else if (PoolAssetsList[i].AssetsName === "USDC") {
            RewardObj.USDCRewardAPY.name = "apricot";
          } else if (PoolAssetsList[i].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "apricot";
          }
        }

        if (PoolAssetsList[i].AssetsName === "BTC") {
          RewardObj.BTCRewardAPY.value = RewardAPY;
        } else if (PoolAssetsList[i].AssetsName === "SOL") {
          RewardObj.SOLRewardAPY.value = RewardAPY;
        } else if (PoolAssetsList[i].AssetsName === "USDC") {
          RewardObj.USDCRewardAPY.value = RewardAPY;
        } else if (PoolAssetsList[i].AssetsName === "mSOL") {
          RewardObj.mSOLRewardAPY.value = RewardAPY;
        }
      }
    }
  }

  var AccountTable = [
    {
      id: 1,
      title: "Collateral",
      TotalCollateral:
        publicKey &&
        numFormatter(lpContractState.variables.UserTotalDepositedCal),
      price: "0",
      css: "3px solid #FFFFFF80",
      userInfo: [
        {
          id: 2,
          Bal: DepositedBtcAmount,
          name: "BTC",
          img: "/images/tokens/BTC.png",
          TokenPrice: numFormatter(DepositedUserBTCAmountCal),
          RewardAPY: RewardObj.BTCRewardAPY.value,
          RewardAPYName: RewardObj.BTCRewardAPY.name,
        },
        {
          id: 3,
          Bal: DepositedSolAmount,
          name: "SOL",
          img: "/images/tokens/SOL.png",
          TokenPrice: numFormatter(DepositedUserSOLAmountCal),
          RewardAPY: RewardObj.SOLRewardAPY.value,
          RewardAPYName: RewardObj.SOLRewardAPY.name,
        },
        {
          id: 4,
          Bal: DepositedUsdcAmount,
          name: "USDC",
          img: "/images/tokens/USDC.png",
          TokenPrice: numFormatter(DepositedUserUSDCAmountCal),
          RewardAPY: RewardObj.USDCRewardAPY.value,
          RewardAPYName: RewardObj.USDCRewardAPY.name,
        },
        {
          id: 5,
          Bal: DepositedLpSolAmount,
          name: "lpSOL",
          img: "/images/tokens/lpSOL.png",
          TokenPrice: numFormatter(DepositedUserLpSOLAmountCal),
          RewardAPY: 0,
        },
        {
          id: 6,
          Bal: DepositedLpUsdAmount,
          name: "lpUSD",
          img: "/images/tokens/lpUSD.png",
          TokenPrice: numFormatter(DepositedUserLpUSDAmountCal),
          RewardAPY: 0,
        },
        {
          id: 7,
          Bal: DepositedMSOLAmount,
          name: "mSOL",
          img: "/images/tokens/mSOL.png",
          TokenPrice: numFormatter(DepositedUserMSOLAmountCal),
          RewardAPY: RewardObj.mSOLRewardAPY.value,
          RewardAPYName: RewardObj.mSOLRewardAPY.name,
        },
      ],
    },
    {
      id: 8,
      title: "Borrowed",
      TotalBorrowed:
        publicKey &&
        numFormatter(lpContractState.variables.UserTotalBorrowedCal),
      price: "0",
      css: "3px solid #FFFFFF80",
      userInfo: [
        {
          id: 9,
          Bal: BorrowedLpSOLAmount,
          name: "lpSOL",
          img: "/images/tokens/lpSOL.png",
          TokenPrice: numFormatter(BorrowedUserLpSOLAmountCal),
        },
        {
          id: 10,
          Bal: BorrowedLpUsdAmount,
          name: "lpUSD",
          img: "/images/tokens/lpUSD.png",
          TokenPrice: numFormatter(BorrowedUserLpUSDAmountCal),
        },
      ],
    },
    {
      id: 12,
      title: "Borrow Limit",
      price: `$ ${numFormatter(lpContractState.Borrow.Account.BorrowLimit)}`,
      css: "3px solid #FFFFFF80",
    },
    {
      id: 13,
      title: "Liquidation Threshold",
      price: `$ ${numFormatter(lpContractState.Borrow.Account.Liquidation)}`,
      css: "3px solid #FFFFFF80",
    },
    {
      id: 14,
      title: "LTV",
      price:
        lpContractState.Borrow.Account.LTV >= 0
          ? `${calc(lpContractState.Borrow.Account.LTV)} %`
          : "0 %",
    },
  ];

  return AccountTable;
};
