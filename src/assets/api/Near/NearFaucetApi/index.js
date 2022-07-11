const NearPoint = "/images/tokens/NearTokens/";
const SolanaPoint = "/images/tokens/SolanaTokens/";

var NearFaucetTokens = [
  {
    id: 1,
    img: NearPoint + "NEAR.png",
    fullName: "NEAR Protocol",
    name: "NEAR",
    value: "1",
  },
  {
    id: 3,
    img: NearPoint + "USN.png",
    fullName: "USN",
    name: "USN",
    value: "0.2",
  },
  {
    id: 4,
    img: NearPoint + "wBTC.png",
    fullName: "Wrapped Bitcoin",
    name: "wBTC",
    value: "1000",
  },
  {
    id: 5,
    img: NearPoint + "stNEAR.png",
    fullName: "Staked NEAR",
    name: "stNEAR",
    value: "10",
  },
  {
    id: 6,
    img: NearPoint + "ETH.png",
    fullName: "Ethereum",
    name: "ETH",
    value: "1",
  },
  {
    id: 7,
    img: NearPoint + "AURORA.png",
    fullName: "Aurora",
    name: "AURORA",
    value: "500",
  },
  {
    id: 8,
    img: SolanaPoint + "SOL.png",
    fullName: "Solana",
    name: "SOL",
    value: "1",
  },
  {
    id: 9,
    img: NearPoint + "CELO.png",
    fullName: "Celo",
    name: "CELO",
    value: "10",
  },
  {
    id: 10,
    img: NearPoint + "cUSD.png",
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
