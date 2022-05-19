const NearPoint = "/images/tokens/NearTokens/";
const SolanaPoint = "/images/tokens/SolanaTokens/";

export const NearBorrowTokens = [
  {
    id: 1,
    img: NearPoint + "lpNEAR.png",
    fullName: "LP Finance NEAR",
    name: "lpNEAR",
  },
  {
    id: 2,
    img: SolanaPoint + "lpUSD.png",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 3,
    img: SolanaPoint + "lpBTC.png",
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 4,
    img: SolanaPoint + "lpETH.png",
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
  {
    id: 5,
    img: SolanaPoint + "lpSOL.png",
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
