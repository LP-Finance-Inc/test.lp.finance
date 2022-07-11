import { Token } from "../../global";
const { NEAR, SOLANA } = Token;

var NearDepositTokens = [
  {
    id: 1,
    img: NEAR.NEAR,
    fullName: "NEAR Protocol",
    name: "NEAR",
  },
  {
    id: 2,
    img: NEAR.USN,
    fullName: "USN",
    name: "USN",
  },
  {
    id: 3,
    img: NEAR.wBTC,
    fullName: "Wrapped Bitcoin",
    name: "wBTC",
  },
  {
    id: 4,
    img: NEAR.stNEAR,
    fullName: "Staked NEAR",
    name: "stNEAR",
  },
  {
    id: 5,
    img: NEAR.ETH,
    fullName: "Ethereum",
    name: "ETH",
  },
  {
    id: 6,
    img: NEAR.AURORA,
    fullName: "Aurora",
    name: "AURORA",
  },
  {
    id: 7,
    img: SOLANA.SOL,
    fullName: "Solana",
    name: "SOL",
  },
  {
    id: 8,
    img: NEAR.CELO,
    fullName: "Celo",
    name: "CELO",
  },
  {
    id: 9,
    img: NEAR.cUSD,
    fullName: "Celo Dollar",
    name: "cUSD",
  },
  {
    id: 10,
    img: SOLANA.lpUSD,
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 11,
    img: SOLANA.lpBTC,
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 12,
    img: SOLANA.lpETH,
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
  {
    id: 13,
    img: SOLANA.lpSOL,
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 14,
    img: NEAR.lpNEAR,
    fullName: "LP Finance NEAR",
    name: "lpNEAR",
  },
];

export const NearDepositTokenApi = (NearTokenPriceArr) => {
  var NearDepositTokenApiNew = [];

  for (var i = 0; i < NearDepositTokens?.length; i++) {
    for (var j = 0; j < NearTokenPriceArr?.length; j++) {
      if (NearDepositTokens[i].name === NearTokenPriceArr[j].name) {
        NearDepositTokenApiNew.push({
          ...NearDepositTokens[i],
          Bal: 0,
          TokenPrice: NearTokenPriceArr[j].TokenPrice,
        });
      }
    }
  }

  return NearDepositTokenApiNew;
};
