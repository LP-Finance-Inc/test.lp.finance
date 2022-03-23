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
