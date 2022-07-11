import { useSelector } from "react-redux";
import { Token } from "../../global";
const { SOLANA } = Token;

const RepayTokens = [
  {
    id: 1,
    img: SOLANA.lpUSD,
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 2,
    img: SOLANA.lpSOL,
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },

  {
    id: 3,
    img: SOLANA.SOL,
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
