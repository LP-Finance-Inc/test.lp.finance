import { Token } from "../../global";
const { NEAR, SOLANA } = Token;

export const NearRepayTokens = [
  {
    id: 1,
    img: NEAR.lpNEAR,
    fullName: "LP Finance NEAR",
    name: "lpNEAR",
  },
  {
    id: 2,
    img: NEAR.NEAR,
    fullName: "NEAR Protocol",
    name: "NEAR",
  },
  {
    id: 3,
    img: SOLANA.lpUSD,
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 4,
    img: NEAR.USN + "USN.png",
    fullName: "USN",
    name: "USN",
  },
  {
    id: 5,
    img: SOLANA.lpBTC,
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 6,
    img: NEAR.wBTC,
    fullName: "Wrapped Bitcoin",
    name: "wBTC",
  },
  {
    id: 7,
    img: SOLANA.lpETH,
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
  {
    id: 8,
    img: NEAR.ETH,
    fullName: "Ethereum",
    name: "ETH",
  },
  {
    id: 9,
    img: SOLANA.lpSOL,
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 10,
    img: SOLANA.SOL,
    fullName: "Solana",
    name: "SOL",
  },
];

export const NearRepayTokenApi = (NearTokenPriceArr) => {
  var NearRepayTokenApiNew = [];

  for (var i = 0; i < NearRepayTokens?.length; i++) {
    for (var j = 0; j < NearTokenPriceArr?.length; j++) {
      if (NearRepayTokens[i].name === NearTokenPriceArr[j].name) {
        NearRepayTokenApiNew.push({
          ...NearRepayTokens[i],
          Bal: 0,
          TokenPrice: NearTokenPriceArr[j].TokenPrice,
        });
      }
    }
  }

  return NearRepayTokenApiNew;
};
