const NearPoint = "/images/tokens/NearTokens/";
const SolanaPoint = "/images/tokens/SolanaTokens/";

export const NearWithdrawTokens = [
  {
    id: 1,
    img: NearPoint + "NEAR.png",
    fullName: "NEAR Protocol",
    name: "NEAR",
  },
  // {
  //   id: 2,
  //   img: NearPoint + "wNEAR.png",
  //   fullName: "Wrapped Near",
  //   name: "wNEAR",
  // },
  {
    id: 3,
    img: NearPoint + "USN.png",
    fullName: "USN",
    name: "USN",
  },
  {
    id: 4,
    img: NearPoint + "WBTC.png",
    fullName: "Wrapped Bitcoin",
    name: "WBTC",
  },
  {
    id: 5,
    img: NearPoint + "STNEAR.png",
    fullName: "Staked NEAR",
    name: "STNEAR",
  },
  {
    id: 6,
    img: NearPoint + "ETH.png",
    fullName: "Ethereum",
    name: "ETH",
  },
  {
    id: 7,
    img: NearPoint + "AURORA.png",
    fullName: "Aurora",
    name: "AURORA",
  },
  {
    id: 8,
    img: SolanaPoint + "SOL.png",
    fullName: "Solana",
    name: "SOL",
  },
  {
    id: 9,
    img: NearPoint + "CELO.png",
    fullName: "Celo",
    name: "CELO",
  },
  {
    id: 10,
    img: NearPoint + "cUSD.png",
    fullName: "Celo Dollar",
    name: "cUSD",
  },
  {
    id: 11,
    img: SolanaPoint + "lpUSD.png",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 12,
    img: SolanaPoint + "lpBTC.png",
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 13,
    img: SolanaPoint + "lpETH.png",
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
  {
    id: 14,
    img: SolanaPoint + "lpSOL.png",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 15,
    img: NearPoint + "lpNEAR.png",
    fullName: "LP Finance NEAR",
    name: "lpNEAR",
  },
];

export const NearWithdrawTokenApi = (NearTokenPriceArr) => {
  var NearWithdrawTokenApiNew = [];

  for (var i = 0; i < NearWithdrawTokens?.length; i++) {
    for (var j = 0; j < NearTokenPriceArr?.length; j++) {
      if (NearWithdrawTokens[i].name === NearTokenPriceArr[j].name) {
        NearWithdrawTokenApiNew.push({
          ...NearWithdrawTokens[i],
          Bal: 0,
          TokenPrice: NearTokenPriceArr[j].TokenPrice,
        });
      }
    }
  }

  return NearWithdrawTokenApiNew;
};
