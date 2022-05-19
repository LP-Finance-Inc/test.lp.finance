import axios from "axios";

export const setNearTokenPricesFun = () => {
  return async (dispatch) => {
    const { data } = await axios.get(
      "https://indexer.ref-finance.net/list-token-price"
    );

    const NEAR = parseInt(data["wrap.near"].price);
    const wNEAR = parseInt(data["wrap.near"].price);
    const USN = parseInt(data["usn"].price);
    const WBTC = parseInt(
      data["2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near"].price
    );
    const STNEAR = parseInt(data["meta-pool.near"].price);
    const ETH = parseInt(data["aurora"].price);
    const AURORA = parseInt(
      data["aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near"].price
    );
    const SOL = parseInt(data["sol.token.a11bd.near"].price);
    const CELO = parseInt(data["celo.token.a11bd.near"].price);
    const cUSD = parseInt(data["cusd.token.a11bd.near"].price);
    const lpUSD = 1;
    const lpBTC = parseInt(
      data["2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near"].price
    );
    const lpETH = parseInt(data["meta-pool.near"].price);
    const lpSOL = parseInt(data["meta-pool.near"].price);
    const lpNEAR = parseInt(data["wrap.near"].price);

    const NearTokenPriceObj = {
      NEARTokenPrice: NEAR,
      wNEARTokenPrice: wNEAR,
      USNTokenPrice: USN,
      WBTCTokenPrice: WBTC,
      STNEARTokenPrice: STNEAR,
      ETHTokenPrice: ETH,
      AURORATokenPrice: AURORA,
      SOLTokenPrice: SOL,
      CELOTokenPrice: CELO,
      cUSDTokenPrice: cUSD,
      lpUSDTokenPrice: lpUSD,
      lpBTCTokenPrice: lpBTC,
      lpETHTokenPrice: lpETH,
      lpSOLTokenPrice: lpSOL,
      lpNEARTokenPrice: lpNEAR,
    };

    const NearTokenPriceArr = [
      {
        id: 1,
        name: "NEAR",
        TokenPrice: NEAR,
      },
      {
        id: 2,
        name: "wNEAR",
        TokenPrice: wNEAR,
      },
      {
        id: 3,
        name: "USN",
        TokenPrice: USN,
      },
      {
        id: 4,
        name: "WBTC",
        TokenPrice: WBTC,
      },
      {
        id: 5,
        name: "STNEAR",
        TokenPrice: STNEAR,
      },
      {
        id: 6,
        name: "ETH",
        TokenPrice: ETH,
      },
      {
        id: 7,
        name: "AURORA",
        TokenPrice: AURORA,
      },
      {
        id: 8,
        name: "SOL",
        TokenPrice: SOL,
      },
      {
        id: 9,
        name: "CELO",
        TokenPrice: CELO,
      },
      {
        id: 10,
        name: "cUSD",
        TokenPrice: cUSD,
      },
      {
        id: 11,
        name: "lpUSD",
        TokenPrice: lpUSD,
      },
      {
        id: 12,
        name: "lpBTC",
        TokenPrice: lpBTC,
      },
      {
        id: 13,
        name: "lpETH",
        TokenPrice: lpETH,
      },
      {
        id: 14,
        name: "lpSOL",
        TokenPrice: lpSOL,
      },
      {
        id: 15,
        name: "lpNEAR",
        TokenPrice: lpNEAR,
      },
    ];

    dispatch({
      type: "SET_NEAR_TOKEN_PRICES",
      payload: {
        NearTokenPriceObj,
        NearTokenPriceArr,
      },
    });
  };
};
