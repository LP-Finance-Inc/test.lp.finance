import { useSelector } from "react-redux";

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
    fullName: "Test Bitcoin (LP Finance Devnet)",
    name: "tBTC",
  },
  {
    id: 5,
    img: point + "USDC.png",
    fullName: "Test USD Coin (LP Finance Devnet)",
    name: "tUSDC",
  },
  {
    id: 6,
    img: point + "mSOL.png",
    fullName: "Test Marinade Staked SOL",
    name: "tmSOL",
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
    fullName: "Test Bitcoin (LP Finance Devnet)",
    name: "tBTC",
  },
  {
    id: 5,
    img: point + "USDC.png",
    fullName: "Test USD Coin (LP Finance Devnet)",
    name: "tUSDC",
  },
  {
    id: 6,
    img: point + "mSOL.png",
    fullName: "Test Marinade Staked  SOL",
    name: "tmSOL",
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
    fullName: "Test USD Coin (LP Finance Devnet)",
    name: "tUSDC",
  },
  {
    id: 4,
    img: point + "SOL.png",
    fullName: "Solana",
    name: "SOL",
  },
];

export const AssetsList = [
  {
    id: 1,
    img: point + "/SOL.png",
    AssetsName: "SOL",
  },
  {
    id: 2,
    img: point + "/mSOL.png",
    AssetsName: "mSOL",
  },
  {
    id: 3,
    img: point + "/stSOL.png",
    AssetsName: "stSOL",
  },
  {
    id: 4,
    img: point + "/scnSOL.png",
    AssetsName: "scnSOL",
  },
  {
    id: 5,
    img: point + "/BTC.png",
    AssetsName: "BTC",
  },
  {
    id: 6,
    img: point + "/ETH.png",
    AssetsName: "ETH",
  },
  {
    id: 7,
    img: point + "/SRM.png",
    AssetsName: "SRM",
  },
  {
    id: 8,
    img: point + "/USDT.png",
    AssetsName: "USDT",
  },
  {
    id: 9,
    img: point + "/USDC.png",
    AssetsName: "USDC",
  },
  {
    id: 10,
    img: point + "/UST.png",
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
  // {
  //   id: 5,
  //   name: "Borrow APR",
  // },
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
