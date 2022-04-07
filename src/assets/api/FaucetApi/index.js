import { useSelector } from "react-redux";

const point = "/images/tokens/";

var FaucetTokens = [
  {
    id: 1,
    img: point + "BTC.png",
    fullName: "Test Bitcoin (LP Finance Devnet)",
    name: "tBTC",
    value: "0.2",
  },
  {
    id: 2,
    img: point + "SOL.png",
    fullName: "Solana",
    name: "SOL",
    value: "1",
  },
  {
    id: 3,
    img: point + "USDC.png",
    fullName: "Test USD Coin (LP Finance Devnet)",
    name: "tUSDC",
    value: "1000",
  },
  {
    id: 4,
    img: point + "mSOL.png",
    fullName: "Test Marinade Staked SOL",
    name: "tmSOL",
    value: "10",
  },
  {
    id: 5,
    img: point + "ETH.png",
    fullName: "Ethereum",
    name: "ETH",
    value: "0",
  },
  {
    id: 6,
    img: point + "SRM.png",
    fullName: "Serum",
    name: "SRM",
    value: "0",
  },
  {
    id: 7,
    img: point + "USDT.png",
    fullName: "Tether",
    name: "USDT",
    value: "0",
  },
  {
    id: 8,
    img: point + "UST.png",
    fullName: "TerraUSD",
    name: "UST",
    value: "0",
  },
  {
    id: 9,
    img: point + "stSOL.png",
    fullName: "Lido for Solana",
    name: "stSOL",
    value: "0",
  },
];

export const FaucetTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.lpContractReducers);

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
