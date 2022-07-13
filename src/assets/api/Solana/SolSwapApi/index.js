import { useSelector } from "react-redux";
import { Token } from "../../global";

const { SOLANA } = Token;

var SwapTokens = [
  {
    id: 1,
    img: SOLANA.wSOL,
    fullName: "Wrapped Solana",
    name: "wSOL",
    MintAddress: "So11111111111111111111111111111111111111112",
  },
  {
    id: 2,
    img: SOLANA.LPFi,
    MintAddress: "So11111111111111111111111111111111111111112",
    fullName: "LP Finance DAO",
    name: "LPFi",
  },
  {
    id: 3,
    img: SOLANA.mSOL,
    MintAddress: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    fullName: "Marinade Staked SOL",
    name: "mSOL",
  },
  {
    id: 4,
    img: SOLANA.stSOL,
    MintAddress: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
    fullName: "Lido for Solana",
    name: "stSOL",
  },
  {
    id: 5,
    img: SOLANA.scnSOL,
    MintAddress: "5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm",
    fullName: "Socean Staked SOL",
    name: "scnSOL",
  },
  {
    id: 6,
    img: SOLANA.USDC,
    MintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    fullName: "USD Coin",
    name: "USDC",
  },
  {
    id: 7,
    img: SOLANA.wBTC,
    MintAddress: "Fd8xyHHRjTvxfZrBirb6MaxSmrZYw99gRSqFUKdFwFvw",
    fullName: "Wrapped Bitcoin",
    name: "wBTC",
  },
  {
    id: 8,
    img: SOLANA.wETH,
    MintAddress: "AaAEw2VCw1XzgvKB8Rj2DyK2ZVau9fbt2bE8hZFWsMyE",
    fullName: "Wrapped Ethereum",
    name: "wETH",
  },
  {
    id: 9,
    img: SOLANA.RAY,
    MintAddress: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    fullName: "Raydium",
    name: "RAY",
  },
  {
    id: 10,
    img: SOLANA.SRM,
    MintAddress: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
    fullName: "Serum",
    name: "SRM",
  },
  {
    id: 11,
    img: SOLANA.AVAX,
    MintAddress: "AUrMpCDYYcPuHhyNX8gEEqbmDPFUpBpHrNW3vPeCFn5Z",
    fullName: "Avalanche",
    name: "AVAX",
  },
  {
    id: 12,
    img: SOLANA.FIDA,
    MintAddress: "EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp",
    fullName: "Bonfida",
    name: "FIDA",
  },
  {
    id: 13,
    img: SOLANA.FTT,
    MintAddress: "EzfgjvkSwthhgHaceR3LnKXUoRkP6NUhfghdaHAj1tUv",
    fullName: "FTX Token",
    name: "FTT",
  },

  {
    id: 14,
    img: SOLANA.FTM,
    MintAddress: "So11111111111111111111111111111111111111112",
    fullName: "Fantom",
    name: "FTM",
  },

  {
    id: 15,
    img: SOLANA.GMT,
    MintAddress: "7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx",
    fullName: "GMT",
    name: "GMT",
  },
  {
    id: 16,
    img: SOLANA.LUNA,
    MintAddress: "F6v4wfAdJB8D8p77bMXZgYt8TDKsYxLYxH5AFhUkYx9W",
    fullName: "LUNA (Portal)",
    name: "LUNA",
  },
  {
    id: 17,
    img: SOLANA.MATIC,
    MintAddress: "So11111111111111111111111111111111111111112",
    fullName: "MATIC",
    name: "MATIC",
  },
  {
    id: 18,
    img: SOLANA.USDT,
    MintAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    fullName: "Tether",
    name: "USDT",
  },
  {
    id: 19,
    img: SOLANA.lpSOL,
    MintAddress: "So11111111111111111111111111111111111111112",
    fullName: "LP Finance SOL",
    name: "lpSOL",
  },
  {
    id: 20,
    img: SOLANA.lpUSD,
    MintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    fullName: "LP Finance USD",
    name: "lpUSD",
  },
];

export const TopSwapTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var TopSwapTokenApiNew = [];

  for (var i = 0; i < SwapTokens.length; i++) {
    for (var j = 0; j < getTokenBalState.BalArr.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[j].BalName === SwapTokens[i].name &&
          getTokenBalState.TokenPriceArr[k].name === SwapTokens[i].name
        ) {
          TopSwapTokenApiNew.push({
            ...SwapTokens[i],
            BalName: getTokenBalState.BalArr[j].BalName,
            Bal: getTokenBalState.BalArr[j].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return TopSwapTokenApiNew;
};

export const BottomSwapTokenApi = () => {
  const getTokenBalState = useSelector((state) => state.SolBorrowReducers);

  var BottomSwapTokenApiNew = [];

  for (var i = 0; i < SwapTokens.length; i++) {
    for (var j = 0; j < getTokenBalState.BalArr.length; j++) {
      for (var k = 0; k < getTokenBalState.TokenPriceArr.length; k++) {
        if (
          getTokenBalState.BalArr[j].BalName === SwapTokens[i].name &&
          getTokenBalState.TokenPriceArr[k].name === SwapTokens[i].name
        ) {
          BottomSwapTokenApiNew.push({
            ...SwapTokens[i],
            BalName: getTokenBalState.BalArr[j].BalName,
            Bal: getTokenBalState.BalArr[j].Bal,
            TokenPrice: getTokenBalState.TokenPriceArr[k].TokenPrice,
          });
        }
      }
    }
  }

  return BottomSwapTokenApiNew;
};
