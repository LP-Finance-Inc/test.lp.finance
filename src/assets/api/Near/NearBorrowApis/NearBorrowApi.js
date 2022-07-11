import { Token } from "../../global";
const { NEAR, SOLANA } = Token;

export const NearBorrowTokens = [
  {
    id: 1,
    img: NEAR.lpNEAR,
    fullName: "LP Finance NEAR",
    name: "lpNEAR",
  },
  {
    id: 2,
    img: SOLANA.lpUSD,
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 3,
    img: SOLANA.lpBTC,
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 4,
    img: SOLANA.lpETH,
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
  {
    id: 5,
    img: SOLANA.lpSOL,
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
];

export const NearBorrowTokenApi = (NearTokenPriceArr) => {
  var NearBorrowTokenApiNew = [];

  for (var i = 0; i < NearBorrowTokens?.length; i++) {
    for (var j = 0; j < NearTokenPriceArr?.length; j++) {
      if (NearBorrowTokens[i].name === NearTokenPriceArr[j].name) {
        NearBorrowTokenApiNew.push({
          ...NearBorrowTokens[i],
          Bal: 0,
          TokenPrice: NearTokenPriceArr[j].TokenPrice,
        });
      }
    }
  }

  return NearBorrowTokenApiNew;
};
