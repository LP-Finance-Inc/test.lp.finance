import axios from "axios";

export const setNearTokenPricesFun = () => {
  return async (dispatch) => {
    const { data } = await axios.get(
      "https://indexer.ref-finance.net/list-token-price"
    );

    const NEAR = Number(data["wrap.near"].price);
    const wNEAR = Number(data["wrap.near"].price);
    const USN = Number(data["usn"].price);
    const WBTC = Number(
      data["2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near"].price
    );
    const STNEAR = Number(data["meta-pool.near"].price);
    const ETH = Number(data["aurora"].price);
    const AURORA = Number(
      data["aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near"].price
    );
    const SOL = Number(data["sol.token.a11bd.near"].price);
    const CELO = Number(data["celo.token.a11bd.near"].price);
    const cUSD = Number(data["cusd.token.a11bd.near"].price);
    const lpUSD = 1;
    const lpBTC = Number(
      data["2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near"].price
    );
    const lpETH = Number(data["aurora"].price);
    const lpSOL = Number(data["sol.token.a11bd.near"].price);
    const lpNEAR = Number(data["wrap.near"].price);

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

    console.log(NearTokenPriceArr);

    dispatch({
      type: "SET_NEAR_TOKEN_PRICES",
      payload: {
        NearTokenPriceObj,
        NearTokenPriceArr,
      },
    });
  };
};
