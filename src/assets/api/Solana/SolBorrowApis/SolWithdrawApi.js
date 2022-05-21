import { useSelector } from "react-redux";
const point = "/images/tokens/SolanaTokens/";

var WithdrawTokens = [
  {
    id: 1,
    img: point + "lpUSD.png",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
  {
    id: 2,
    img: point + "lpSOL.png",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 3,
    img: point + "SOL.png",
    fullName: "Solana",
    name: "SOL",
  },
  {
    id: 4,
    img: point + "BTC.png",
    fullName: "Bitcoin",
    name: "BTC",
  },
  {
    id: 5,
    img: point + "USDC.png",
    fullName: "USD Coin",
    name: "USDC",
  },
  {
    id: 6,
    img: point + "mSOL.png",
    fullName: "Marinade Staked SOL",
    name: "mSOL",
  },
  {
    id: 7,
    img: point + "ETH.png",
    fullName: "Ethereum",
    name: "ETH",
  },
  {
    id: 8,
    img: point + "SRM.png",
    fullName: "Serum",
    name: "SRM",
  },
  {
    id: 9,
    img: point + "USDT.png",
    fullName: "Tether",
    name: "USDT",
  },
  {
    id: 11,
    img: point + "stSOL.png",
    fullName: "Lido for Solana",
    name: "stSOL",
  },
  {
    id: 12,
    img: point + "lpBTC.png",
    fullName: "LP Finance BTC",
    name: "lpBTC",
  },
  {
    id: 13,
    img: point + "lpETH.png",
    fullName: "LP Finance ETH",
    name: "lpETH",
  },
  {
    id: 14,
    img: point + "scnSOL.png",
    fullName: "Socean Staked SOL",
    name: "scnSOL",
  },
];

export const WithdrawTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var WithdrawTokenApiNew = [];

  for (var i = 0; i < getTokenBalState.BalArr.length; i++) {
    for (var j = 0; j < WithdrawTokens.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[i].BalName === WithdrawTokens[j].name &&
          getTokenBalState.TokenPriceArr[k].name === WithdrawTokens[j].name
        ) {
          WithdrawTokenApiNew.push({
            ...WithdrawTokens[j],
            BalName: getTokenBalState.BalArr[i].BalName,
            Bal: getTokenBalState.BalArr[i].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return WithdrawTokenApiNew;
};
