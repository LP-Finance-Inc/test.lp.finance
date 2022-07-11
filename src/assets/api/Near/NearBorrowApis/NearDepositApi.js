const NearPoint = "/images/tokens/NearTokens/";
const SolanaPoint = "/images/tokens/SolanaTokens/";

var NearDepositTokens = [
  {
    id: 1,
    img: NearPoint + "NEAR.png",
    fullName: "NEAR Protocol",
    name: "NEAR",
  },
  {
    id: 3,
    img: NearPoint + "USN.png",
    fullName: "USN",
    name: "USN",
  },
  {
    id: 4,
    img: NearPoint + "wBTC.png",
    fullName: "Wrapped Bitcoin",
    name: "wBTC",
  },
  {
    id: 5,
    img: NearPoint + "stNEAR.png",
    fullName: "Staked NEAR",
    name: "stNEAR",
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
