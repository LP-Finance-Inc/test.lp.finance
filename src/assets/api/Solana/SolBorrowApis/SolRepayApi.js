import { useSelector } from "react-redux";
const point = "/images/tokens/SolanaTokens/";

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

export const RepayTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

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
