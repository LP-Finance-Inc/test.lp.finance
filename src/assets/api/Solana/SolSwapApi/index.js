import { useSelector } from "react-redux";
import { Token } from "../../global";

const { SOLANA } = Token;

var SwapTokens = [
  {
    id: 1,
    img: SOLANA.wSOL,
    fullName: "Wrapped Solana",
    name: "wSOL",
    apiID: "solana",
  },
  {
    id: 2,
    img: SOLANA.LPFi,
    apiID: "solana",
    fullName: "LP Finance DAO",
    name: "LPFi",
  },
  {
    id: 3,
    img: SOLANA.mSOL,
    apiID: "msol",
    fullName: "Marinade Staked SOL",
    name: "mSOL",
  },
  {
    id: 4,
    img: SOLANA.stSOL,
    apiID: "lido-staked-sol",
    fullName: "Lido for Solana",
    name: "stSOL",
  },
  {
    id: 5,
    img: SOLANA.scnSOL,
    apiID: "socean-staked-sol",
    fullName: "Socean Staked SOL",
    name: "scnSOL",
  },
  {
    id: 6,
    img: SOLANA.USDC,
    apiID: "usd-coin",
    fullName: "USD Coin",
    name: "USDC",
  },
  {
    id: 7,
    img: SOLANA.wBTC,
    apiID: "wrapped-bitcoin",
    fullName: "Wrapped Bitcoin",
    name: "wBTC",
  },
  {
    id: 8,
    img: SOLANA.wETH,
    apiID: "weth",
    fullName: "Wrapped Ethereum",
    name: "wETH",
  },
  {
    id: 9,
    img: SOLANA.RAY,
    apiID: "raydium",
    fullName: "Raydium",
    name: "RAY",
  },
  {
    id: 10,
    img: SOLANA.SRM,
    apiID: "serum",
    fullName: "Serum",
    name: "SRM",
  },
  {
    id: 11,
    img: SOLANA.AVAX,
    apiID: "avalanche-2",
    fullName: "Avalanche",
    name: "AVAX",
  },
  {
    id: 12,
    img: SOLANA.FIDA,
    apiID: "bonfida",
    fullName: "Bonfida",
    name: "FIDA",
  },
  {
    id: 13,
    img: SOLANA.FTT,
    apiID: "ftx-token",
    fullName: "FTX Token",
    name: "FTT",
  },

  {
    id: 14,
    img: SOLANA.FTM,
    apiID: "fantom",
    fullName: "Fantom",
    name: "FTM",
  },

  {
    id: 15,
    img: SOLANA.GMT,
    apiID: "stepn",
    fullName: "GMT",
    name: "GMT",
  },
  // {
  //   id: 16,
  //   img: SOLANA.LUNA,
  //   apiID: "terra-luna-2",
  //   fullName: "LUNA (Portal)",
  //   name: "LUNA",
  // },
  {
    id: 17,
    img: SOLANA.MATIC,
    apiID: "matic-network",
    fullName: "Polygon",
    name: "MATIC",
  },
  {
    id: 18,
    img: SOLANA.USDT,
    apiID: "tether",
    fullName: "Tether",
    name: "USDT",
  },
  {
    id: 19,
    img: SOLANA.lpSOL,
    apiID: "solana",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 20,
    img: SOLANA.lpUSD,
    apiID: "usd-coin",
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
