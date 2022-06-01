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
    img: point + "SOL.png",
    fullName: "Wrapped Solana",
    name: "wSOL",
  },
];

export const RepayTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var RepayTokenApiNew = [];

  for (var i = 0; i < RepayTokens.length; i++) {
    for (var j = 0; j < getTokenBalState.BalArr.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[j].BalName === RepayTokens[i].name &&
          getTokenBalState.TokenPriceArr[k].name === RepayTokens[i].name
        ) {
          RepayTokenApiNew.push({
            ...RepayTokens[i],
            BalName: getTokenBalState.BalArr[j].BalName,
            Bal: getTokenBalState.BalArr[j].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return RepayTokenApiNew;
};
