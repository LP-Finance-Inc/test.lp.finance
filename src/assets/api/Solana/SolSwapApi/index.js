import { useSelector } from "react-redux";
import { Token } from "../../global";

const { SOLANA } = Token;

var SwapTokens = [
  {
    id: 1,
    img: SOLANA.wSOL,
    Symbol: "wSOL",
    fullName: "Wrapped Solana",
    name: "wSOL",
  },
  {
    id: 2,
    img: SOLANA.LPFi,
    Symbol: "LPFi",
    fullName: "LP Finance DAO",
    name: "LPFi",
  },
  {
    id: 3,
    img: SOLANA.mSOL,
    Symbol: "mSOL",
    fullName: "Marinade Staked SOL",
    name: "mSOL",
  },
  {
    id: 4,
    img: SOLANA.stSOL,
    Symbol: "stSOL",
    fullName: "Lido for Solana",
    name: "stSOL",
  },
  {
    id: 5,
    img: SOLANA.scnSOL,
    Symbol: "scnSOL",
    fullName: "Socean Staked SOL",
    name: "scnSOL",
  },
  {
    id: 6,
    img: SOLANA.USDC,
    Symbol: "USDC",
    fullName: "USD Coin",
    name: "USDC",
  },
  {
    id: 7,
    img: SOLANA.wBTC,
    Symbol: "wBTC",
    fullName: "Wrapped Bitcoin ",
    name: "wBTC",
  },
  {
    id: 8,
    img: SOLANA.wETH,
    Symbol: "wETH",
    fullName: "Wrapped Ethereum",
    name: "wETH",
  },
  {
    id: 9,
    img: SOLANA.RAY,
    Symbol: "RAY",
    fullName: "Raydium",
    name: "RAY",
  },
  {
    id: 10,
    img: SOLANA.SRM,
    Symbol: "SRM",
    fullName: "Serum",
    name: "SRM",
  },
  {
    id: 11,
    img: SOLANA.AVAX,
    Symbol: "AVAX",
    fullName: "Avalanche",
    name: "AVAX",
  },
  {
    id: 12,
    img: SOLANA.FIDA,
    Symbol: "FIDA",
    fullName: "Bonfida",
    name: "FIDA",
  },
  {
    id: 13,
    img: SOLANA.FTT,
    Symbol: "FTT",
    fullName: "FTX Token",
    name: "FTT",
  },

  {
    id: 14,
    img: SOLANA.FTM,
    Symbol: "FTM",
    fullName: "Fantom",
    name: "FTM",
  },

  {
    id: 15,
    img: SOLANA.GMT,
    Symbol: "GMT",
    fullName: "GMT",
    name: "GMT",
  },
  {
    id: 16,
    img: SOLANA.LUNA,
    Symbol: "LUNA",
    fullName: "LUNA",
    name: "LUNA",
  },
  {
    id: 17,
    img: SOLANA.MATIC,
    Symbol: "MATIC",
    fullName: "MATIC",
    name: "MATIC",
  },
  {
    id: 18,
    img: SOLANA.USDT,
    Symbol: "USDT",
    fullName: "Tether",
    name: "USDT",
  },
  {
    id: 19,
    img: SOLANA.lpSOL,
    Symbol: "lpSOL",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 20,
    img: SOLANA.lpUSD,
    Symbol: "lpUSD",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
];

export const TopSwapTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var TopSwapTokenApiNew = [];

  for (var i = 0; i < SwapTokens.length; i++) {
    for (var j = 0; j < getTokenBalState.BalArr.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[j].BalName === SwapTokens[i].name &&
          getTokenBalState.TokenPriceArr[k].name === SwapTokens[i].name
        ) {
          TopSwapTokenApiNew.push({
            ...SwapTokens[i],
            BalName: getTokenBalState.BalArr[j].BalName,
            Bal: getTokenBalState.BalArr[j].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return TopSwapTokenApiNew;
};

export const BottomSwapTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var BottomSwapTokenApiNew = [];

  for (var i = 0; i < SwapTokens.length; i++) {
    for (var j = 0; j < getTokenBalState.BalArr.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[j].BalName === SwapTokens[i].name &&
          getTokenBalState.TokenPriceArr[k].name === SwapTokens[i].name
        ) {
          BottomSwapTokenApiNew.push({
            ...SwapTokens[i],
            BalName: getTokenBalState.BalArr[j].BalName,
            Bal: getTokenBalState.BalArr[j].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return BottomSwapTokenApiNew;
};
