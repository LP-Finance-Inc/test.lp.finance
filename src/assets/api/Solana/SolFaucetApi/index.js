import { useSelector } from "react-redux";

const point = "/images/tokens/SolanaTokens/";

var FaucetTokens = [
  {
    id: 1,
    img: point + "SOL.png",
    fullName: "Solana",
    name: "SOL",
    value: "1",
  },
  {
    id: 2,
    img: point + "BTC.png",
    fullName: "Bitcoin",
    name: "BTC",
    value: "0.2",
  },
  {
    id: 3,
    img: point + "USDC.png",
    fullName: "USD Coin",
    name: "USDC",
    value: "1000",
  },
  {
    id: 4,
    img: point + "mSOL.png",
    fullName: "Marinade Staked SOL",
    name: "mSOL",
    value: "10",
  },
  {
    id: 5,
    img: point + "ETH.png",
    fullName: "Test Ethereum",
    name: "ETH",
    value: "1",
  },
  {
    id: 6,
    img: point + "SRM.png",
    fullName: "Serum",
    name: "SRM",
    value: "500",
  },
  {
    id: 7,
    img: point + "USDT.png",
    fullName: "Tether",
    name: "USDT",
    value: "1000",
  },
  {
    id: 8,
    img: point + "stSOL.png",
    fullName: "Lido for Solana",
    name: "stSOL",
    value: "10",
  },
  {
    id: 9,
    img: point + "scnSOL.png",
    fullName: "Socean Staked SOL",
    name: "scnSOL",
    value: "10",
  },
];

export const FaucetTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var FaucetTokenApiNew = [];

  for (var i = 0; i < getTokenBalState.BalArr.length; i++) {
    for (var j = 0; j < FaucetTokens.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[i].BalName === FaucetTokens[j].name &&
          getTokenBalState.TokenPriceArr[k].name === FaucetTokens[j].name
        ) {
          FaucetTokenApiNew.push({
            ...FaucetTokens[j],
            BalName: getTokenBalState.BalArr[i].BalName,
            Bal: getTokenBalState.BalArr[i].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return FaucetTokenApiNew;
};
