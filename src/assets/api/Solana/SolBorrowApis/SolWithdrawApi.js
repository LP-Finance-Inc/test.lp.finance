import { useSelector } from "react-redux";
const point = "/images/tokens/SolanaTokens/";

var WithdrawTokens = [
  {
    id: 1,
    img: point + "SOL.png",
    fullName: "Wrapped Solana",
    name: "wSOL",
  },
  {
    id: 2,
    img: point + "mSOL.png",
    fullName: "Marinade Staked SOL",
    name: "mSOL",
  },
  {
    id: 3,
    img: point + "stSOL.png",
    fullName: "Lido Staked Solana",
    name: "stSOL",
  },
  {
    id: 4,
    img: point + "scnSOL.png",
    fullName: "Socean Staked SOL",
    name: "scnSOL",
  },
  {
    id: 5,
    img: point + "RAY.png",
    fullName: "Raydium",
    name: "RAY",
  },
  {
    id: 6,
    img: point + "SRM.png",
    fullName: "Serum",
    name: "SRM",
  },
  {
    id: 7,
    img: point + "lpUSD.png",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 8,
    img: point + "lpSOL.png",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 9,
    img: point + "LPFi.png",
    fullName: "LP Finance DAO",
    name: "LPFi",
  },
];

export const WithdrawTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var WithdrawTokenApiNew = [];

  for (var i = 0; i < WithdrawTokens.length; i++) {
    for (var j = 0; j < getTokenBalState.BalArr.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[j].BalName === WithdrawTokens[i].name &&
          getTokenBalState.TokenPriceArr[k].name === WithdrawTokens[i].name
        ) {
          WithdrawTokenApiNew.push({
            ...WithdrawTokens[i],
            BalName: getTokenBalState.BalArr[j].BalName,
            Bal: getTokenBalState.BalArr[j].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return WithdrawTokenApiNew;
};
