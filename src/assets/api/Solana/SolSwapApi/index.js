import { useSelector } from "react-redux";

const point = "/images/tokens/SolanaTokens/";

var SwapTokens = [
  {
    id: 1,
    img: point + "SOL.png",
    Symbol: "wSOLUSD",
    fullName: "Wrapped Solana",
    name: "wSOL",
  },
  {
    id: 2,
    img: point + "LPFi.png",
    Symbol: "LPFiUSD",
    fullName: "LP Finance DAO",
    name: "LPFi",
  },
  {
    id: 3,
    img: point + "mSOL.png",
    Symbol: "mSOLUSD",
    fullName: "Marinade Staked SOL",
    name: "mSOL",
  },
  {
    id: 4,
    img: point + "stSOL.png",
    Symbol: "stSOLUSD",
    fullName: "Lido for Solana",
    name: "stSOL",
  },
  {
    id: 5,
    img: point + "scnSOL.png",
    Symbol: "scnSOLUSD",
    fullName: "Socean Staked SOL",
    name: "scnSOL",
  },
  {
    id: 6,
    img: point + "USDC.png",
    Symbol: "USDCUSD",
    fullName: "USD Coin",
    name: "USDC",
  },
  {
    id: 7,
    img: point + "wBTC.png",
    Symbol: "wBTCUSD",
    fullName: "Wrapped Bitcoin ",
    name: "wBTC",
  },
  {
    id: 8,
    img: point + "wETH.png",
    Symbol: "wETHUSD",
    fullName: "Wrapped Ethereum",
    name: "wETH",
  },
  {
    id: 9,
    img: point + "RAY.png",
    Symbol: "RAYUSD",
    fullName: "Raydium",
    name: "RAY",
  },
  {
    id: 10,
    img: point + "SRM.png",
    Symbol: "SRMUSD",
    fullName: "Serum",
    name: "SRM",
  },
  {
    id: 11,
    img: point + "AVAX.png",
    Symbol: "AVAXUSD",
    fullName: "Avalanche",
    name: "AVAX",
  },
  {
    id: 12,
    img: point + "FIDA.png",
    Symbol: "FIDAUSD",
    fullName: "Bonfida",
    name: "FIDA",
  },
  {
    id: 13,
    img: point + "FTT.png",
    Symbol: "FTTUSD",
    fullName: "FTX Token",
    name: "FTT",
  },

  {
    id: 14,
    img: point + "FTM.png",
    Symbol: "FTMUSD",
    fullName: "Fantom",
    name: "FTM",
  },

  {
    id: 15,
    img: point + "GMT.png",
    Symbol: "GMTUSD",
    fullName: "GMT",
    name: "GMT",
  },
  {
    id: 16,
    img: point + "LUNA.png",
    Symbol: "LUNAUSD",
    fullName: "LUNA",
    name: "LUNA",
  },
  {
    id: 17,
    img: point + "MATIC.png",
    Symbol: "MATICUSD",
    fullName: "MATIC",
    name: "MATIC",
  },
  {
    id: 18,
    img: point + "USDT.png",
    Symbol: "USDTUSD",
    fullName: "Tether",
    name: "USDT",
  },
  {
    id: 19,
    img: point + "lpSOL.png",
    Symbol: "lpSOLUSD",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 20,
    img: point + "lpUSD.png",
    Symbol: "lpUSDUSD",
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
