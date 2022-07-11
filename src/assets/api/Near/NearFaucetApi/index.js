import { Token } from "../../global";
const { NEAR, SOLANA } = Token;

var NearFaucetTokens = [
  {
    id: 1,
    img: NEAR.NEAR,
    fullName: "NEAR Protocol",
    name: "NEAR",
    value: "1",
  },
  {
    id: 2,
    img: NEAR.USN,
    fullName: "USN",
    name: "USN",
    value: "0.2",
  },
  {
    id: 3,
    img: NEAR.wBTC,
    fullName: "Wrapped Bitcoin",
    name: "wBTC",
    value: "1000",
  },
  {
    id: 4,
    img: NEAR.stNEAR,
    fullName: "Staked NEAR",
    name: "stNEAR",
    value: "10",
  },
  {
    id: 5,
    img: NEAR.ETH,
    fullName: "Ethereum",
    name: "ETH",
    value: "1",
  },
  {
    id: 6,
    img: NEAR.AURORA,
    fullName: "Aurora",
    name: "AURORA",
    value: "500",
  },
  {
    id: 7,
    img: SOLANA.SOL,
    fullName: "Solana",
    name: "SOL",
    value: "1",
  },
  {
    id: 8,
    img: NEAR.CELO,
    fullName: "Celo",
    name: "CELO",
    value: "10",
  },
  {
    id: 9,
    img: NEAR.cUSD,
    fullName: "Celo Dollar",
    name: "cUSD",
    value: "10",
  },
];

export const NearFaucetTokenApi = (NearTokenPriceArr) => {
  var NearFaucetTokenApiNew = [];

  for (var i = 0; i < NearFaucetTokens?.length; i++) {
    for (var j = 0; j < NearTokenPriceArr?.length; j++) {
      if (NearFaucetTokens[i].name === NearTokenPriceArr[j].name) {
        NearFaucetTokenApiNew.push({
          ...NearFaucetTokens[i],
          Bal: 0,
          TokenPrice: NearTokenPriceArr[j].TokenPrice,
        });
      }
    }
  }

  return NearFaucetTokenApiNew;
};
