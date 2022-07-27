import {
  getUserLptokenBalance,
  getLpFinanceTokenPrice,
} from "../../../../utils/Solana/SolLiquidityPoolFun";

import { Token } from "../../../../assets/api/global";

const { SOLANA } = Token;

//addLiquidityTokenActions
export const SolTopAddLiquidityTokenSelect = ({ img, name }) => {
  return {
    type: "SOL_TOP_ADD_LIQUIDITY_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const SolBottomAddLiquidityTokenSelect = ({ img, name }) => {
  return {
    type: "SOL_BOTTOM_ADD_LIQUIDITY_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

//RemoveAddLiquidityToken
export const SolRemoveAddLiquidityTokenSelect = ({ img1, img2, name }) => {
  return {
    type: "SOL_REMOVE_LIQUIDITY_TOKEN_SELECT",
    payload: {
      img1: img1,
      img2: img2,
      name: name,
    },
  };
};

//RemoveAddLiquidityToken
export const SolGetLiquidityPoolBalance = (wallet) => {
  return async (dispatch) => {
    try {
      const List = [
        {
          name: "lpUSD-USDC",
          img1: SOLANA.lpUSD,
          img2: SOLANA.USDC,
          Balance: wallet.publicKey
            ? await getUserLptokenBalance(wallet, "lpUSD-USDC")
            : 0,
        },
        {
          name: "lpSOL-wSOL",
          img1: SOLANA.lpSOL,
          img2: SOLANA.wSOL,
          Balance: wallet.publicKey
            ? await getUserLptokenBalance(wallet, "lpSOL-wSOL")
            : 0,
        },
        {
          name: "LPFi-USDC",
          img1: SOLANA.LPFi,
          img2: SOLANA.USDC,
          Balance: wallet.publicKey
            ? await getUserLptokenBalance(wallet, "LPFi-USDC")
            : 0,
        },
      ];

      dispatch({
        type: "GET_LP_TOKENS_BALANCE",
        payload: List,
      });
    } catch (error) {}
  };
};

//RemoveAddLiquidityToken
export const SolGetLiquidityPoolTokenPrice = (wallet) => {
  return async (dispatch) => {
    try {
      const List = [
        {
          name: "lpUSD-USDC",
          Price: wallet.publicKey
            ? await getLpFinanceTokenPrice(wallet, "lpUSD-USDC")
            : 0,
        },
        {
          name: "lpSOL-wSOL",
          Price: wallet.publicKey
            ? await getLpFinanceTokenPrice(wallet, "lpSOL-wSOL")
            : 0,
        },
        {
          name: "LPFi-USDC",
          Price: wallet.publicKey
            ? await getLpFinanceTokenPrice(wallet, "LPFi-USDC")
            : 0,
        },
      ];

      dispatch({
        type: "GET_LP_TOKENS_PRICES",
        payload: List,
      });
    } catch (error) {}
  };
};
