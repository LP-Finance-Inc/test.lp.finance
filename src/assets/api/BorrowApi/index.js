import { useSelector } from "react-redux";
import { calc, numFormatter, CalcOneDigit } from "../../../helper";
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
          getTokenBalState.TokenPriceArr[k].name === BorrowTokens[j].name
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
          getTokenBalState.TokenPriceArr[k].name === WithdrawTokens[j].name
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
          getTokenBalState.TokenPriceArr[k].name === RepayTokens[j].name
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

export const AccountTokenApi = (
  lpContractState,
  getAssetsMarketState,
  PoolAssetsState
) => {
  const {
    DepositedSolAmount,
    DepositedBtcAmount,
    DepositedUsdcAmount,
    DepositedMSOLAmount,
    DepositedETHAmount,
    DepositedSRMAmount,
    DepositedUSDTAmount,
    DepositedUSTAmount,
    DepositedstSOLAmount,
    DepositedscnSOLAmount,

    LendingSolAmount,
    LendingBtcAmount,
    LendingUsdcAmount,
    LendingMSOLAmount,
    LendingETHAmount,
    LendingSRMAmount,
    LendingUSDTAmount,
    LendingUSTAmount,
    LendingstSOLAmount,
    LendingscnSOLAmount,

    DepositedLpSolAmount,
    DepositedLpUsdAmount,
    DepositedLpBTCAmount,
    DepositedLpETHAmount,
    BorrowedLpSOLAmount,
    BorrowedLpUsdAmount,
    BorrowedLpBTCAmount,
    BorrowedLpETHAmount,
  } = lpContractState.UserAccountInfo;

  const {
    DepositedUserSOLAmountCal,
    DepositedUserBTCAmountCal,
    DepositedUserUSDCAmountCal,
    DepositedUserMSOLAmountCal,
    DepositedUserETHAmountCal,
    DepositedUserSRMAmountCal,
    DepositedUserUSDTAmountCal,
    DepositedUserUSTAmountCal,
    DepositedUserstSOLAmountCal,
    DepositedUserscnSOLAmountCal,
    DepositedUserLpSOLAmountCal,
    DepositedUserLpUSDAmountCal,
    DepositedUserLpBTCAmountCal,
    DepositedUserLpETHAmountCal,
    BorrowedUserLpUSDAmountCal,
    BorrowedUserLpSOLAmountCal,
    BorrowedUserLpBTCAmountCal,
    BorrowedUserLpETHAmountCal,
  } = lpContractState.variables;

  const { PoolAssetsList } = PoolAssetsState;
  const { AssetsMarketList } = getAssetsMarketState;

  const RewardObj = {
    SOLRewardAPY: {
      name: "",
      value: "",
    },
    BTCRewardAPY: {
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
    ETHRewardAPY: {
      name: "",
      value: "",
    },
    SRMRewardAPY: {
      name: "",
      value: "",
    },
    USDTRewardAPY: {
      name: "",
      value: "",
    },
    USTRewardAPY: {
      name: "",
      value: "",
    },
    stSOLRewardAPY: {
      name: "",
      value: "",
    },
    scnSOLRewardAPY: {
      name: "",
      value: "",
    },
    lpSOLRewardAPY: {
      name: "",
      value: "",
    },
    lpUSDRewardAPY: {
      name: "",
      value: "",
    },
    lpBTCRewardAPY: {
      name: "",
      value: "",
    },
    lpETHRewardAPY: {
      name: "",
      value: "",
    },
  };

  for (var i = 0; i < PoolAssetsList?.length; i++) {
    for (var j = 0; j < AssetsMarketList?.length; j++) {
      if (PoolAssetsList[i].AssetsName === AssetsMarketList[j].AssetsName) {
        if (PoolAssetsList[i].SupplyAPY > AssetsMarketList[i].DepositAPR) {
          const RewardAPY = PoolAssetsList[i].SupplyAPY / 10;

          if (PoolAssetsList[i].AssetsName === "SOL") {
            RewardObj.SOLRewardAPY.name = "solend";
            RewardObj.SOLRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "BTC") {
            RewardObj.BTCRewardAPY.name = "solend";
            RewardObj.BTCRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "USDC") {
            RewardObj.USDCRewardAPY.name = "solend";
            RewardObj.USDCRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "solend";
            RewardObj.mSOLRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "ETH") {
            RewardObj.ETHRewardAPY.name = "solend";
            RewardObj.ETHRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "SRM") {
            RewardObj.SRMRewardAPY.name = "solend";
            RewardObj.SRMRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "USDT") {
            RewardObj.USDTRewardAPY.name = "solend";
            RewardObj.USDTRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "UST") {
            RewardObj.USTRewardAPY.name = "solend";
            RewardObj.USTRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "stSOL") {
            RewardObj.stSOLRewardAPY.name = "solend";
            RewardObj.stSOLRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "scnSOL") {
            RewardObj.scnSOLRewardAPY.name = "solend";
            RewardObj.scnSOLRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "lpSOL") {
            RewardObj.lpSOLRewardAPY.name = "solend";
            RewardObj.lpSOLRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "lpUSD") {
            RewardObj.lpUSDRewardAPY.name = "solend";
            RewardObj.lpUSDRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "lpBTC") {
            RewardObj.lpBTCRewardAPY.name = "solend";
            RewardObj.lpBTCRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "lpETH") {
            RewardObj.lpETHRewardAPY.name = "solend";
            RewardObj.lpETHRewardAPY.value = RewardAPY;
          }
        } else if (
          AssetsMarketList[i].DepositAPR > PoolAssetsList[i].SupplyAPY
        ) {
          const RewardAPY = AssetsMarketList[i].DepositAPR / 10;

          if (AssetsMarketList[i].AssetsName === "SOL") {
            RewardObj.SOLRewardAPY.name = "apricot";
            RewardObj.SOLRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "BTC") {
            RewardObj.BTCRewardAPY.name = "apricot";
            RewardObj.BTCRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "USDC") {
            RewardObj.USDCRewardAPY.name = "apricot";
            RewardObj.USDCRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "apricot";
            RewardObj.mSOLRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "ETH") {
            RewardObj.ETHRewardAPY.name = "apricot";
            RewardObj.ETHRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "SRM") {
            RewardObj.SRMRewardAPY.name = "apricot";
            RewardObj.SRMRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "USDT") {
            RewardObj.USDTRewardAPY.name = "apricot";
            RewardObj.USDTRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "UST") {
            RewardObj.USTRewardAPY.name = "apricot";
            RewardObj.USTRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "stSOL") {
            RewardObj.stSOLRewardAPY.name = "apricot";
            RewardObj.stSOLRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "scnSOL") {
            RewardObj.scnSOLRewardAPY.name = "apricot";
            RewardObj.scnSOLRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "lpSOL") {
            RewardObj.lpSOLRewardAPY.name = "apricot";
            RewardObj.lpSOLRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "lpUSD") {
            RewardObj.lpUSDRewardAPY.name = "apricot";
            RewardObj.lpUSDRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "lpBTC") {
            RewardObj.lpBTCRewardAPY.name = "apricot";
            RewardObj.lpBTCRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[i].AssetsName === "lpETH") {
            RewardObj.lpETHRewardAPY.name = "apricot";
            RewardObj.lpETHRewardAPY.value = RewardAPY;
          }
        }
      }
    }
  }

  var AccountTable = [
    {
      id: 1,
      title: "Collateral",
      TotalCollateral: lpContractState?.variables?.UserTotalDepositedCal
        ? `$ ${numFormatter(lpContractState.variables.UserTotalDepositedCal)}`
        : "$ 0",
      price: "0",
      css: "3px solid #FFFFFF80",
      userInfo: [
        {
          id: 1,
          Bal: DepositedSolAmount + LendingSolAmount,
          name: "SOL",
          img: "/images/tokens/SOL.png",
          TokenPrice: DepositedUserSOLAmountCal,
          RewardAPY: RewardObj.SOLRewardAPY.value,
          RewardAPYName: RewardObj.SOLRewardAPY.name,
        },
        {
          id: 2,
          Bal: DepositedBtcAmount + LendingBtcAmount,
          name: "BTC",
          img: "/images/tokens/BTC.png",
          TokenPrice: DepositedUserBTCAmountCal,
          RewardAPY: RewardObj.BTCRewardAPY.value,
          RewardAPYName: RewardObj.BTCRewardAPY.name,
        },
        {
          id: 3,
          Bal: DepositedUsdcAmount + LendingUsdcAmount,
          name: "USDC",
          img: "/images/tokens/USDC.png",
          TokenPrice: DepositedUserUSDCAmountCal,
          RewardAPY: RewardObj.USDCRewardAPY.value,
          RewardAPYName: RewardObj.USDCRewardAPY.name,
        },
        {
          id: 4,
          Bal: DepositedMSOLAmount + LendingMSOLAmount,
          name: "mSOL",
          img: "/images/tokens/mSOL.png",
          TokenPrice: DepositedUserMSOLAmountCal,
          RewardAPY: RewardObj.mSOLRewardAPY.value,
          RewardAPYName: RewardObj.mSOLRewardAPY.name,
        },
        {
          id: 5,
          Bal: DepositedETHAmount + LendingETHAmount,
          name: "ETH",
          img: "/images/tokens/ETH.png",
          TokenPrice: DepositedUserETHAmountCal,
          RewardAPY: RewardObj.ETHRewardAPY.value,
          RewardAPYName: RewardObj.ETHRewardAPY.name,
        },
        {
          id: 6,
          Bal: DepositedSRMAmount + LendingSRMAmount,
          name: "SRM",
          img: "/images/tokens/SRM.png",
          TokenPrice: DepositedUserSRMAmountCal,
          RewardAPY: RewardObj.SRMRewardAPY.value,
          RewardAPYName: RewardObj.SRMRewardAPY.name,
        },
        {
          id: 7,
          Bal: DepositedUSDTAmount + LendingUSDTAmount,
          name: "USDT",
          img: "/images/tokens/USDT.png",
          TokenPrice: DepositedUserUSDTAmountCal,
          RewardAPY: RewardObj.USDTRewardAPY.value,
          RewardAPYName: RewardObj.USDTRewardAPY.name,
        },
        {
          id: 8,
          Bal: DepositedUSTAmount + LendingUSTAmount,
          name: "UST",
          img: "/images/tokens/UST.png",
          TokenPrice: DepositedUserUSTAmountCal,
          RewardAPY: RewardObj.USTRewardAPY.value,
          RewardAPYName: RewardObj.USTRewardAPY.name,
        },
        {
          id: 9,
          Bal: DepositedstSOLAmount + LendingstSOLAmount,
          name: "stSOL",
          img: "/images/tokens/stSOL.png",
          TokenPrice: DepositedUserstSOLAmountCal,
          RewardAPY: RewardObj.stSOLRewardAPY.value,
          RewardAPYName: RewardObj.stSOLRewardAPY.name,
        },
        {
          id: 10,
          Bal: DepositedscnSOLAmount + LendingscnSOLAmount,
          name: "scnSOL",
          img: "/images/tokens/scnSOL.png",
          TokenPrice: DepositedUserscnSOLAmountCal,
          RewardAPY: RewardObj.scnSOLRewardAPY.value,
          RewardAPYName: RewardObj.scnSOLRewardAPY.name,
        },
        {
          id: 11,
          Bal: DepositedLpSolAmount,
          name: "lpSOL",
          img: "/images/tokens/lpSOL.png",
          TokenPrice: DepositedUserLpSOLAmountCal,
          RewardAPY: RewardObj.lpSOLRewardAPY.value,
          RewardAPYName: RewardObj.lpSOLRewardAPY.name,
        },
        {
          id: 12,
          Bal: DepositedLpUsdAmount,
          name: "lpUSD",
          img: "/images/tokens/lpUSD.png",
          TokenPrice: DepositedUserLpUSDAmountCal,
          RewardAPY: RewardObj.lpUSDRewardAPY.value,
          RewardAPYName: RewardObj.lpUSDRewardAPY.name,
        },
        {
          id: 13,
          Bal: DepositedLpBTCAmount,
          name: "lpBTC",
          img: "/images/tokens/lpBTC.png",
          TokenPrice: DepositedUserLpBTCAmountCal,
          RewardAPY: RewardObj.lpBTCRewardAPY.value,
          RewardAPYName: RewardObj.lpBTCRewardAPY.name,
        },
        {
          id: 14,
          Bal: DepositedLpETHAmount,
          name: "lpETH",
          img: "/images/tokens/lpETH.png",
          TokenPrice: DepositedUserLpETHAmountCal,
          RewardAPY: RewardObj.lpETHRewardAPY.value,
          RewardAPYName: RewardObj.lpETHRewardAPY.name,
        },
      ],
    },
    {
      id: 2,
      title: "Borrowed",
      TotalBorrowed: lpContractState?.variables?.UserTotalBorrowedCal
        ? `$ ${numFormatter(lpContractState.variables.UserTotalBorrowedCal)}`
        : "$ 0",
      price: "0",
      css: "3px solid #FFFFFF80",
      userInfo: [
        {
          id: 1,
          Bal: BorrowedLpSOLAmount,
          name: "lpSOL",
          img: "/images/tokens/lpSOL.png",
          TokenPrice: BorrowedUserLpSOLAmountCal,
        },
        {
          id: 2,
          Bal: BorrowedLpUsdAmount,
          name: "lpUSD",
          img: "/images/tokens/lpUSD.png",
          TokenPrice: BorrowedUserLpUSDAmountCal,
        },
        {
          id: 3,
          Bal: BorrowedLpBTCAmount,
          name: "lpBTC",
          img: "/images/tokens/lpBTC.png",
          TokenPrice: BorrowedUserLpBTCAmountCal,
        },
        {
          id: 4,
          Bal: BorrowedLpETHAmount,
          name: "lpETH",
          img: "/images/tokens/lpETH.png",
          TokenPrice: BorrowedUserLpETHAmountCal,
        },
      ],
    },
    {
      id: 3,
      title: "Borrow Limit",
      price: lpContractState?.Borrow?.Account?.BorrowLimit
        ? `$ ${numFormatter(lpContractState?.Borrow?.Account?.BorrowLimit)}`
        : `$ 0`,
      css: "3px solid #FFFFFF80",
    },
    {
      id: 4,
      title: "Liquidation Threshold",
      price: lpContractState?.Borrow?.Account?.Liquidation
        ? `$ ${numFormatter(lpContractState?.Borrow?.Account?.Liquidation)}`
        : `$ 0`,
      css: "3px solid #FFFFFF80",
    },
    {
      id: 5,
      title: "LTV",
      price:
        lpContractState.Borrow.Account.LTV >= 0
          ? `${calc(lpContractState.Borrow.Account.LTV)} %`
          : "0%",
    },
  ];
  return AccountTable;
};

export const CBSDepositedPieChartList = () => {
  const lpContractState = useSelector((state) => state.lpContractReducers);

  const {
    SOLDepositedPercentage,
    BTCDepositedPercentage,
    USDCDepositedPercentage,
    mSOLDepositedPercentage,
    ETHDepositedPercentage,
    SRMDepositedPercentage,
    USDTDepositedPercentage,
    USTDepositedPercentage,
    stSOLDepositedPercentage,
    scnSOLDepositedPercentage,
    lpSOLDepositedPercentage,
    lpUSDDepositedPercentage,
    lpBTCDepositedPercentage,
    lpETHDepositedPercentage,
  } = lpContractState.Borrow.pieChart.TotalSupply;

  const {
    TotalDepositedSOL,
    TotalDepositedBTC,
    TotalDepositedUSDC,
    TotalDepositedMSOL,
    TotalDepositedETH,
    TotalDepositedSRM,
    TotalDepositedUSDT,
    TotalDepositedUST,
    TotalDepositedstSOL,
    TotalDepositedscnSOL,
    TotalDepositedLpSOL,
    TotalDepositedLpUSD,
    TotalDepositedLpBTC,
    TotalDepositedLpETH,
  } = lpContractState.StateAccountInfo;

  const {
    DepositedSOLAmountCal,
    DepositedBTCAmountCal,
    DepositedUSDCAmountCal,
    DepositedMSOLAmountCal,
    DepositedETHAmountCal,
    DepositedSRMAmountCal,
    DepositedUSDTAmountCal,
    DepositedUSTAmountCal,
    DepositedstSOLAmountCal,
    DepositedscnSOLAmountCal,
    DepositedLpSOLAmountCal,
    DepositedLpUSDAmountCal,
    DepositedLpBTCAmountCal,
    DepositedLpETHAmountCal,
  } = lpContractState.variables;

  const SOL_PERCENTAGE = CalcOneDigit(SOLDepositedPercentage);
  const BTC_PERCENTAGE = CalcOneDigit(BTCDepositedPercentage);
  const USDC_PERCENTAGE = CalcOneDigit(USDCDepositedPercentage);
  const mSOL_PERCENTAGE = CalcOneDigit(mSOLDepositedPercentage);
  const ETH_PERCENTAGE = CalcOneDigit(ETHDepositedPercentage);
  const SRM_PERCENTAGE = CalcOneDigit(SRMDepositedPercentage);
  const USDT_PERCENTAGE = CalcOneDigit(USDTDepositedPercentage);
  const UST_PERCENTAGE = CalcOneDigit(USTDepositedPercentage);
  const stSOL_PERCENTAGE = CalcOneDigit(stSOLDepositedPercentage);
  const scnSOL_PERCENTAGE = CalcOneDigit(scnSOLDepositedPercentage);
  const lpSOL_PERCENTAGE = CalcOneDigit(lpSOLDepositedPercentage);
  const lpUSD_PERCENTAGE = CalcOneDigit(lpUSDDepositedPercentage);
  const lpBTC_PERCENTAGE = CalcOneDigit(lpBTCDepositedPercentage);
  const lpETH_PERCENTAGE = CalcOneDigit(lpETHDepositedPercentage);

  const BorrowDepositedPieChartLegend = [
    {
      id: 1,
      name: "SOL",
      bg: "#c45dd4",
      img: "/images/tokens/SOL.png",
      price: DepositedSOLAmountCal,
    },
    {
      id: 2,
      name: "BTC",
      bg: "#d4b25d",
      img: "/images/tokens/BTC.png",
      price: DepositedBTCAmountCal,
    },
    {
      id: 3,
      name: "USDC",
      bg: "#7BB6B3",
      img: "/images/tokens/USDC.png",
      price: DepositedUSDCAmountCal,
    },
    {
      id: 4,
      name: "mSOL",
      bg: "#5dd4a8",
      img: "/images/tokens/mSOL.png",
      price: DepositedMSOLAmountCal,
    },
    {
      id: 5,
      name: "ETH",
      bg: "#A3A2A5",
      img: "/images/tokens/ETH.png",
      price: DepositedETHAmountCal,
    },
    {
      id: 6,
      name: "SRM",
      bg: "#77DAD1",
      img: "/images/tokens/SRM.png",
      price: DepositedSRMAmountCal,
    },
    {
      id: 7,
      name: "USDT",
      bg: "#3F8C86",
      img: "/images/tokens/USDT.png",
      price: DepositedUSDTAmountCal,
    },
    {
      id: 8,
      name: "UST",
      bg: "#65869B",
      img: "/images/tokens/UST.png",
      price: DepositedUSTAmountCal,
    },
    {
      id: 9,
      name: "stSOL",
      bg: "#24B7BE",
      img: "/images/tokens/stSOL.png",
      price: DepositedstSOLAmountCal,
    },
    {
      id: 10,
      name: "scnSOL",
      bg: "pink",
      img: "/images/tokens/scnSOL.png",
      price: DepositedscnSOLAmountCal,
    },
    {
      id: 11,
      name: "lpSOL",
      bg: "#2085ec",
      img: "/images/tokens/lpSOL.png",
      price: DepositedLpSOLAmountCal,
    },
    {
      id: 12,
      name: "lpUSD",
      bg: "#72b4eb",
      img: "/images/tokens/lpUSD.png",
      price: DepositedLpUSDAmountCal,
    },
    {
      id: 13,
      name: "lpBTC",
      bg: "#0a417a",
      img: "/images/tokens/lpBTC.png",
      price: DepositedLpBTCAmountCal,
    },
    {
      id: 14,
      name: "lpETH",
      bg: "#8464a0",
      img: "/images/tokens/lpETH.png",
      price: DepositedLpETHAmountCal,
    },
  ];

  const CBSDepositedPieChartLegendDetails = [
    {
      name: "SOL",
      per: SOL_PERCENTAGE,
      price: calc(TotalDepositedSOL),
    },
    {
      name: "BTC",
      per: BTC_PERCENTAGE,
      price: calc(TotalDepositedBTC),
    },
    {
      name: "USDC",
      per: USDC_PERCENTAGE,
      price: calc(TotalDepositedUSDC),
    },
    {
      name: "mSOL",
      per: mSOL_PERCENTAGE,
      price: calc(TotalDepositedMSOL),
    },
    {
      name: "ETH",
      per: ETH_PERCENTAGE,
      price: calc(TotalDepositedETH),
    },
    {
      name: "SRM",
      per: SRM_PERCENTAGE,
      price: calc(TotalDepositedSRM),
    },
    {
      name: "USDT",
      per: USDT_PERCENTAGE,
      price: calc(TotalDepositedUSDT),
    },
    {
      name: "UST",
      per: UST_PERCENTAGE,
      price: calc(TotalDepositedUST),
    },
    {
      name: "stSOL",
      per: stSOL_PERCENTAGE,
      price: calc(TotalDepositedstSOL),
    },
    {
      name: "scnSOL",
      per: scnSOL_PERCENTAGE,
      price: calc(TotalDepositedscnSOL),
    },
    {
      name: "lpSOL",
      per: lpSOL_PERCENTAGE,
      price: calc(TotalDepositedLpSOL),
    },
    {
      name: "lpUSD",
      per: lpUSD_PERCENTAGE,
      price: calc(TotalDepositedLpUSD),
    },
    {
      name: "lpBTC",
      per: lpBTC_PERCENTAGE,
      price: calc(TotalDepositedLpBTC),
    },
    {
      name: "lpETH",
      per: lpETH_PERCENTAGE,
      price: calc(TotalDepositedLpETH),
    },
  ];

  const NewAllTokenPerList = [];
  const NewAllTokenPerColorList = [];

  const NewBorrowDepositedPieChartLegend = BorrowDepositedPieChartLegend.sort(
    function (a, b) {
      return b.price - a.price;
    }
  );

  const NewCBSDepositedPieChartLegendDetails =
    CBSDepositedPieChartLegendDetails.sort((a, b) => b.price - a.price).sort(
      (a, b) => b.per - a.per
    );

  for (var i = 0; i < NewCBSDepositedPieChartLegendDetails.length; i++) {
    NewAllTokenPerList.push(NewCBSDepositedPieChartLegendDetails[i].per);
  }

  for (var j = 0; j < NewBorrowDepositedPieChartLegend.length; j++) {
    NewAllTokenPerColorList.push(NewBorrowDepositedPieChartLegend[j].bg);
  }

  return {
    NewBorrowDepositedPieChartLegend,
    NewCBSDepositedPieChartLegendDetails,
    NewAllTokenPerList,
    NewAllTokenPerColorList,
  };
};

export const CBSBorrowedPieChartList = () => {
  const lpContractState = useSelector((state) => state.lpContractReducers);

  const {
    lpSOLBorrowedPercentage,
    lpUSDBorrowedPercentage,
    lpBTCBorrowedPercentage,
    lpETHBorrowedPercentage,
  } = lpContractState.Borrow.pieChart.TotalSupply;

  const {
    TotalBorrowLpSOL,
    TotalBorrowLpUSD,
    TotalBorrowLpBTC,
    TotalBorrowLpETH,
  } = lpContractState.StateAccountInfo;

  const {
    BorrowedLpSOLAmountCal,
    BorrowedLpUSDAmountCal,
    BorrowedLpBTCAmountCal,
    BorrowedLpETHAmountCal,
  } = lpContractState.variables;

  const lpSOL_PERCENTAGE = CalcOneDigit(lpSOLBorrowedPercentage);
  const lpUSD_PERCENTAGE = CalcOneDigit(lpUSDBorrowedPercentage);
  const lpBTC_PERCENTAGE = CalcOneDigit(lpBTCBorrowedPercentage);
  const lpETH_PERCENTAGE = CalcOneDigit(lpETHBorrowedPercentage);

  const BorrowBorrowedPieChartLegend = [
    {
      id: 1,
      name: "lpSOL",
      bg: "#2085ec",
      img: "/images/tokens/lpSOL.png",
      price: BorrowedLpSOLAmountCal,
    },
    {
      id: 2,
      name: "lpUSD",
      bg: "#72b4eb",
      img: "/images/tokens/lpUSD.png",
      price: BorrowedLpUSDAmountCal,
    },
    {
      id: 3,
      name: "lpBTC",
      bg: "#0a417a",
      img: "/images/tokens/lpBTC.png",
      price: BorrowedLpBTCAmountCal,
    },
    {
      id: 4,
      name: "lpETH",
      bg: "#8464a0",
      img: "/images/tokens/lpETH.png",
      price: BorrowedLpETHAmountCal,
    },
  ];

  const CBSBorrowedPieChartLegendDetails = [
    {
      name: "lpSOL",
      per: lpSOL_PERCENTAGE,
      price: calc(TotalBorrowLpSOL),
    },
    {
      name: "lpUSD",
      per: lpUSD_PERCENTAGE,
      price: calc(TotalBorrowLpUSD),
    },
    {
      name: "lpBTC",
      per: lpBTC_PERCENTAGE,
      price: calc(TotalBorrowLpBTC),
    },
    {
      name: "lpETH",
      per: lpETH_PERCENTAGE,
      price: calc(TotalBorrowLpETH),
    },
  ];

  const NewAllTokenPerList = [];
  const NewAllTokenPerColorList = [];

  const NewBorrowBorrowedPieChartLegend = BorrowBorrowedPieChartLegend.sort(
    function (a, b) {
      return b.price - a.price;
    }
  );

  const NewCBSBorrowedPieChartLegendDetails =
    CBSBorrowedPieChartLegendDetails.sort((a, b) => b.price - a.price).sort(
      (a, b) => b.per - a.per
    );

  for (var i = 0; i < NewCBSBorrowedPieChartLegendDetails.length; i++) {
    NewAllTokenPerList.push(NewCBSBorrowedPieChartLegendDetails[i].per);
  }

  for (var j = 0; j < NewBorrowBorrowedPieChartLegend.length; j++) {
    NewAllTokenPerColorList.push(NewBorrowBorrowedPieChartLegend[j].bg);
  }

  return {
    NewBorrowBorrowedPieChartLegend,
    NewCBSBorrowedPieChartLegendDetails,
    NewAllTokenPerList,
    NewAllTokenPerColorList,
  };
};
