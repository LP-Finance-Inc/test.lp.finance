const NearPoint = "/images/tokens/NearTokens/";
const SolanaPoint = "/images/tokens/SolanaTokens/";

export const NearRepayTokens = [
  {
    id: 1,
    img: NearPoint + "lpNEAR.png",
    fullName: "LP Finance NEAR",
    name: "lpNEAR",
  },
  {
    id: 2,
    img: NearPoint + "NEAR.png",
    fullName: "NEAR Protocol",
    name: "NEAR",
  },
  {
    id: 3,
    img: SolanaPoint + "lpUSD.png",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 4,
    img: NearPoint + "USN.png",
    fullName: "USN",
    name: "USN",
  },
  {
    id: 5,
    img: SolanaPoint + "lpBTC.png",
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 6,
    img: NearPoint + "wBTC.png",
    fullName: "Wrapped Bitcoin",
    name: "wBTC",
  },
  {
    id: 7,
    img: SolanaPoint + "lpETH.png",
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
  {
    id: 8,
    img: NearPoint + "ETH.png",
    fullName: "Ethereum",
    name: "ETH",
  },
  {
    id: 9,
    img: SolanaPoint + "lpSOL.png",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 10,
    img: SolanaPoint + "SOL.png",
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
