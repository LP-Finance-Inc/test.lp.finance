import { useSelector } from "react-redux";
import { Token } from "../../global";
const { SOLANA } = Token;

var DepositTokens = [
  {
    id: 1,
    img: SOLANA.SOL,
    fullName: "Wrapped Solana",
    name: "wSOL",
  },
  {
    id: 2,
    img: SOLANA.mSOL,
    fullName: "Marinade Staked SOL",
    name: "mSOL",
  },
  {
    id: 3,
    img: SOLANA.stSOL,
    fullName: "Lido Staked Solana",
    name: "stSOL",
  },
  {
    id: 4,
    img: SOLANA.scnSOL,
    fullName: "Socean Staked SOL",
    name: "scnSOL",
  },
  {
    id: 5,
    img: SOLANA.RAY,
    fullName: "Raydium",
    name: "RAY",
  },
  {
    id: 6,
    img: SOLANA.SRM,
    fullName: "Serum",
    name: "SRM",
  },
  {
    id: 7,
    img: SOLANA.lpUSD,
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 8,
    img: SOLANA.lpSOL,
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 9,
    img: SOLANA.LPFi,
    fullName: "LP Finance DAO",
    name: "LPFi",
  },
];

export const DepositTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var DepositTokenApiNew = [];

  for (var i = 0; i < DepositTokens.length; i++) {
    for (var j = 0; j < getTokenBalState.BalArr.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[j].BalName === DepositTokens[i].name &&
          getTokenBalState.TokenPriceArr[k].name === DepositTokens[i].name
        ) {
          DepositTokenApiNew.push({
            ...DepositTokens[i],
            BalName: getTokenBalState.BalArr[j].BalName,
            Bal: getTokenBalState.BalArr[j].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return DepositTokenApiNew;
};
