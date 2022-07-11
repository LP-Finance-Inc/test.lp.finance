import { useSelector } from "react-redux";
import { Token } from "../../global";
const { SOLANA } = Token;

var BorrowTokens = [
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
];

export const BorrowTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var BorrowTokenApiNew = [];

  for (var i = 0; i < BorrowTokens.length; i++) {
    for (var j = 0; j < getTokenBalState.BalArr.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[j].BalName === BorrowTokens[i].name &&
          getTokenBalState.TokenPriceArr[k].name === BorrowTokens[i].name
        ) {
          BorrowTokenApiNew.push({
            ...BorrowTokens[i],
            BalName: getTokenBalState.BalArr[j].BalName,
            Bal: getTokenBalState.BalArr[j].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return BorrowTokenApiNew;
};
