import { useSelector } from "react-redux";

const SolanaPoint = "/images/tokens/SolanaTokens/";
const global = "/images/tokens/";

export const TableTitles = [
  {
    id: 1,
    title: "Name",
  },
  {
    id: 2,
    title: "Liquidity",
    img: "/images/figma/tableIcon.png",
  },
  {
    id: 3,
    title: "Fees (24hr)",
    img: "/images/figma/tableIcon.png",
  },
  {
    id: 4,
    title: "APY",
    img: "/images/figma/tableIcon.png",
  },
];

export const TableApi = [
  {
    id: 1,
    img1: SolanaPoint + "lpUSD.png",
    img2: SolanaPoint + "USDC.png",
    name: "lpUSD-USDC",
    val1: "$ 0",
    val2: "$ 0",
    val3: "0%",
  },
  {
    id: 2,
    img1: SolanaPoint + "lpSOL.png",
    img2: SolanaPoint + "SOL.png",
    name: "lpSOL-wSOL",
    val1: "$ 0",
    val2: "$ 0",
    val3: "0%",
  },
  {
    id: 3,
    img1: global + "LPFi.png",
    img2: SolanaPoint + "USDC.png",
    name: "LPFi-USDC",
    val1: "$ 0",
    val2: "$ 0",
    val3: "0%",
  },
];

var TopAddLiquidity = [
  {
    id: 1,
    img: SolanaPoint + "lpUSD.png",
    name: "lpUSD",
    fullName: "LP Finance USD",
  },
  {
    id: 2,
    img: SolanaPoint + "USDC.png",
    name: "USDC",
    fullName: "USD Coin",
  },
  {
    id: 3,
    img: SolanaPoint + "lpSOL.png",
    name: "lpSOL",
    fullName: "LP Finance SOL",
  },
  {
    id: 4,
    img: SolanaPoint + "SOL.png",
    name: "wSOL",
    fullName: "Wrapped Solana",
  },
  {
    id: 5,
    img: global + "LPFi.png",
    name: "LPFi",
    fullName: "LP Finance DAO",
  },
];

export const MatchAddLiquidityApi = [
  {
    id: 1,
    img1: SolanaPoint + "SOL.png",
    img2: SolanaPoint + "lpSOL.png",
    name1: "wSOL",
    name2: "lpSOL",
    fullName1: "Wrapped Solana",
    fullName2: "LP Finance SOL",
  },
  {
    id: 2,
    img1: SolanaPoint + "USDC.png",
    img2: SolanaPoint + "lpUSD.png",
    name1: "USDC",
    name2: "lpUSD",
    fullName1: "USD Coin",
    fullName2: "LP Finance USD",
  },
  {
    id: 3,
    img1: SolanaPoint + "USDC.png",
    img2: global + "LPFi.png",
    name1: "USDC",
    name2: "LPFi",
    fullName1: "USD Coin",
    fullName2: "LP Finance DAO",
  },
];

export const removeAddLiquidityApi = [
  {
    id: 1,
    img1: SolanaPoint + "lpUSD.png",
    img2: SolanaPoint + "USDC.png",
    name: "lpUSD-USDC",
    fullName2: "LP Finance USD",
    fullName1: "USD Coin",
  },
  {
    id: 2,
    img1: SolanaPoint + "lpSOL.png",
    img2: SolanaPoint + "SOL.png",
    name: "lpSOL-wSOL",
    fullName1: "LP Finance SOL",
    fullName2: "Wrapped Solana",
  },
  {
    id: 3,
    img1: SolanaPoint + "SOL.png",
    img2: SolanaPoint + "USDC.png",
    name: "wSOL-USDC",
    fullName1: "Wrapped Solana",
    fullName2: "USD Coin",
  },
];

export const TopAddLiquidityApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var NewTopAddLiquidityApi = [];

  for (var i = 0; i < TopAddLiquidity.length; i++) {
    for (var j = 0; j < getTokenBalState.BalArr.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[j].BalName === TopAddLiquidity[i].name &&
          getTokenBalState.TokenPriceArr[k].name === TopAddLiquidity[i].name
        ) {
          NewTopAddLiquidityApi.push({
            ...TopAddLiquidity[i],
            BalName: getTokenBalState.BalArr[j].BalName,
            Bal: getTokenBalState.BalArr[j].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return NewTopAddLiquidityApi;
};

export const BottomAddLiquidityApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  const SolTopAddLiquidityState = useSelector(
    (state) => state.SolTopAddLiquidityReducer
  );

  var NewBottomAddLiquidityApi = [];

  for (var i = 0; i < SolTopAddLiquidityState?.list.length; i++) {
    for (var j = 0; j < getTokenBalState.BalArr.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[j].BalName ===
            SolTopAddLiquidityState?.list[i].name &&
          getTokenBalState.TokenPriceArr[k].name ===
            SolTopAddLiquidityState?.list[i].name
        ) {
          NewBottomAddLiquidityApi.push({
            ...SolTopAddLiquidityState?.list[i],
            BalName: getTokenBalState.BalArr[j].BalName,
            Bal: getTokenBalState.BalArr[j].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return NewBottomAddLiquidityApi;
};
