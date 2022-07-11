import { useSelector } from "react-redux";
import { Token } from "../../global";

const { SOLANA } = Token;

var FaucetTokens = [
  {
    id: 1,
    img: SOLANA.SOL,
    fullName: "Solana",
    name: "SOL",
    value: "1",
  },
  {
    id: 1,
    img: SOLANA.USDC,
    fullName: "USD Coin",
    name: "USDC",
    value: "1000",
  },
];

export const FaucetTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var FaucetTokenApiNew = [];

  for (var i = 0; i < getTokenBalState.BalArr.length; i++) {
    for (var j = 0; j < FaucetTokens.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[i].BalName === FaucetTokens[j].name &&
          getTokenBalState.TokenPriceArr[k].name === FaucetTokens[j].name
        ) {
          FaucetTokenApiNew.push({
            ...FaucetTokens[j],
            BalName: getTokenBalState.BalArr[i].BalName,
            Bal: getTokenBalState.BalArr[i].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return FaucetTokenApiNew;
};
