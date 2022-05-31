import { useSelector } from "react-redux";

const point = "/images/tokens/SolanaTokens/";

var TopSwapTokens = [
  {
    id: 2,
    img: point + "BTC.png",
    Symbol: "BTCUSD",
    fullName: "Bitcoin",
    name: "BTC",
  },
  {
    id: 3,
    img: point + "USDC.png",
    Symbol: "USDCUSD",
    fullName: "USD Coin",
    name: "USDC",
  },
  {
    id: 4,
    img: point + "mSOL.png",
    Symbol: "mSOLUSD",
    fullName: "Marinade Staked SOL",
    name: "mSOL",
  },
  {
    id: 5,
    img: point + "ETH.png",
    Symbol: "ETHUSD",
    fullName: "Test Ethereum",
    name: "ETH",
  },
  {
    id: 6,
    img: point + "SRM.png",
    Symbol: "SRMUSD",
    fullName: "Serum",
    name: "SRM",
  },
  {
    id: 7,
    img: point + "USDT.png",
    Symbol: "USDTUSD",
    fullName: "Tether",
    name: "USDT",
  },
  {
    id: 9,
    img: point + "stSOL.png",
    Symbol: "stSOLUSD",
    fullName: "Lido for Solana",
    name: "stSOL",
  },
  {
    id: 10,
    img: point + "scnSOL.png",
    Symbol: "scnSOLUSD",
    fullName: "Socean Staked SOL",
    name: "scnSOL",
  },
  {
    id: 11,
    img: point + "lpSOL.png",
    Symbol: "lpSOLUSD",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 12,
    img: point + "lpUSD.png",
    Symbol: "lpUSDUSD",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 13,
    img: point + "lpBTC.png",
    Symbol: "lpBTCUSD",
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 14,
    img: point + "lpETH.png",
    Symbol: "lpETHUSD",
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
];

var BottomSwapTokens = [
  {
    id: 2,
    img: point + "BTC.png",
    Symbol: "BTCUSD",
    fullName: "Bitcoin",
    name: "BTC",
  },
  {
    id: 3,
    img: point + "USDC.png",
    Symbol: "USDCUSD",
    fullName: "USD Coin",
    name: "USDC",
  },
  {
    id: 4,
    img: point + "mSOL.png",
    Symbol: "mSOLUSD",
    fullName: "Marinade Staked SOL",
    name: "mSOL",
  },
  {
    id: 5,
    img: point + "ETH.png",
    Symbol: "ETHUSD",
    fullName: "Test Ethereum",
    name: "ETH",
  },
  {
    id: 6,
    img: point + "SRM.png",
    Symbol: "SRMUSD",
    fullName: "Serum",
    name: "SRM",
  },
  {
    id: 7,
    img: point + "USDT.png",
    Symbol: "USDTUSD",
    fullName: "Tether",
    name: "USDT",
  },
  {
    id: 9,
    img: point + "stSOL.png",
    Symbol: "stSOLUSD",
    fullName: "Lido for Solana",
    name: "stSOL",
  },
  {
    id: 10,
    img: point + "scnSOL.png",
    Symbol: "scnSOLUSD",
    fullName: "Socean Staked SOL",
    name: "scnSOL",
  },
  {
    id: 11,
    img: point + "lpSOL.png",
    Symbol: "lpSOLUSD",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 12,
    img: point + "lpUSD.png",
    Symbol: "lpUSDUSD",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 13,
    img: point + "lpBTC.png",
    Symbol: "lpBTCUSD",
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 14,
    img: point + "lpETH.png",
    Symbol: "lpETHUSD",
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
];

export const TopSwapTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var TopSwapTokenApiNew = [];

  for (var i = 0; i < getTokenBalState.BalArr.length; i++) {
    for (var j = 0; j < TopSwapTokens.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[i].BalName === TopSwapTokens[j].name &&
          getTokenBalState.TokenPriceArr[k].name === TopSwapTokens[j].name
        ) {
          TopSwapTokenApiNew.push({
            ...TopSwapTokens[j],
            BalName: getTokenBalState.BalArr[i].BalName,
            Bal: getTokenBalState.BalArr[i].Bal,
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

  for (var i = 0; i < getTokenBalState.BalArr.length; i++) {
    for (var j = 0; j < BottomSwapTokens.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[i].BalName === BottomSwapTokens[j].name &&
          getTokenBalState.TokenPriceArr[k].name === BottomSwapTokens[j].name
        ) {
          BottomSwapTokenApiNew.push({
            ...BottomSwapTokens[j],
            BalName: getTokenBalState.BalArr[i].BalName,
            Bal: getTokenBalState.BalArr[i].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return BottomSwapTokenApiNew;
};
