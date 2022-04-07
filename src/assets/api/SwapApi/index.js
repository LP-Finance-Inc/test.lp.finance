import { useSelector } from "react-redux";

const point = "/images/tokens/";

var TopSwapTokens = [
  {
    id: 1,
    img: point + "SOL.png",
    fullName: "Solana",
    name: "SOL",
  },
  {
    id: 2,
    img: point + "BTC.png",
    fullName: "Test Bitcoin (LP Finance Devnet)",
    name: "tBTC",
  },
  {
    id: 3,
    img: point + "USDC.png",
    fullName: "Test USD Coin (LP Finance Devnet)",
    name: "tUSDC",
  },
  {
    id: 4,
    img: point + "lpUSD.png",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 5,
    img: point + "lpSOL.png",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 6,
    img: point + "mSOL.png",
    fullName: "Test Marinade Staked SOL",
    name: "tmSOL",
  },
  // {
  //   id: 7,
  //   img: point + "ETH.png",
  //   fullName: "Ethereum",
  //   name: "ETH",
  // },
  // {
  //   id: 8,
  //   img: point + "SRM.png",
  //   fullName: "Serum",
  //   name: "SRM",
  // },
  // {
  //   id: 9,
  //   img: point + "USDT.png",
  //   fullName: "Tether",
  //   name: "USDT",
  // },
  // {
  //   id: 10,
  //   img: point + "UST.png",
  //   fullName: "TerraUSD",
  //   name: "UST",
  // },
  // {
  //   id: 11,
  //   img: point + "stSOL.png",
  //   fullName: "Lido for Solana",
  //   name: "stSOL",
  // },
  // {
  //   id: 12,
  //   img: point + "lpBTC.png",
  //   fullName: "LP Finance BTC",
  //   name: "lpBTC",
  // },
  // {
  //   id: 13,
  //   img: point + "lpETH.png",
  //   fullName: "LP Finance ETH",
  //   name: "lpETH",
  // },
];

var BottomSwapTokens = [
  {
    id: 1,
    img: point + "SOL.png",
    fullName: "Solana",
    name: "SOL",
  },
  {
    id: 2,
    img: point + "BTC.png",
    fullName: "Test Bitcoin (LP Finance Devnet)",
    name: "tBTC",
  },
  {
    id: 3,
    img: point + "USDC.png",
    fullName: "Test USD Coin (LP Finance Devnet)",
    name: "tUSDC",
  },
  {
    id: 4,
    img: point + "lpUSD.png",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 5,
    img: point + "lpSOL.png",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 6,
    img: point + "mSOL.png",
    fullName: "Test Marinade Staked SOL",
    name: "tmSOL",
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
];

export const TopSwapTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.lpContractReducers);

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
  const getTokenBalState = useSelector((state) => state.lpContractReducers);

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
