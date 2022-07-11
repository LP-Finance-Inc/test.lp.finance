import { useSelector } from "react-redux";
import { Token } from "../../global";

const { SOLANA } = Token;

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
    img1: SOLANA.lpUSD,
    img2: SOLANA.USDC,
    name: "lpUSD-USDC",
    val1: "$ 0",
    val2: "$ 0",
    val3: "0%",
  },
  {
    id: 2,
    img1: SOLANA.lpSOL,
    img2: SOLANA.SOL,
    name: "lpSOL-wSOL",
    val1: "$ 0",
    val2: "$ 0",
    val3: "0%",
  },
  {
    id: 3,
    img1: SOLANA.LPFi,
    img2: SOLANA.USDC,
    name: "LPFi-USDC",
    val1: "$ 0",
    val2: "$ 0",
    val3: "0%",
  },
];

var TopAddLiquidity = [
  {
    id: 1,
    img: SOLANA.lpUSD,
    name: "lpUSD",
    fullName: "LP Finance USD",
  },
  {
    id: 2,
    img: SOLANA.USDC,
    name: "USDC",
    fullName: "USD Coin",
  },
  {
    id: 3,
    img: SOLANA.lpSOL,
    name: "lpSOL",
    fullName: "LP Finance SOL",
  },
  {
    id: 4,
    img: SOLANA.SOL,
    name: "wSOL",
    fullName: "Wrapped Solana",
  },
  {
    id: 5,
    img: SOLANA.LPFi,
    name: "LPFi",
    fullName: "LP Finance DAO",
  },
];

export const MatchAddLiquidityApi = [
  {
    id: 1,
    img1: SOLANA.SOL,
    img2: SOLANA.lpSOL,
    name1: "wSOL",
    name2: "lpSOL",
    fullName1: "Wrapped Solana",
    fullName2: "LP Finance SOL",
  },
  {
    id: 2,
    img1: SOLANA.USDC,
    img2: SOLANA.lpUSD,
    name1: "USDC",
    name2: "lpUSD",
    fullName1: "USD Coin",
    fullName2: "LP Finance USD",
  },
  {
    id: 3,
    img1: SOLANA.USDC,
    img2: SOLANA.LPFi,
    name1: "USDC",
    name2: "LPFi",
    fullName1: "USD Coin",
    fullName2: "LP Finance DAO",
  },
];

export const removeAddLiquidityApi = [
  {
    id: 1,
    img1: SOLANA.lpUSD,
    img2: SOLANA.USDC,
    name: "lpUSD-USDC",
    fullName2: "LP Finance USD",
    fullName1: "USD Coin",
  },
  {
    id: 2,
    img1: SOLANA.lpSOL,
    img2: SOLANA.SOL,
    name: "lpSOL-wSOL",
    fullName1: "LP Finance SOL",
    fullName2: "Wrapped Solana",
  },
  {
    id: 3,
    img1: SOLANA.SOL,
    img2: SOLANA.USDC,
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
