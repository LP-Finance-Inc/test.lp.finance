import {
  getUserLpTokenBalance,
  getLpRewardTokenPrice,
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
export const SolRemoveAddLiquidityTokenSelect = ({
  img1,
  img2,
  name1,
  name2,
}) => {
  return {
    type: "SOL_REMOVE_LIQUIDITY_TOKEN_SELECT",
    payload: {
      img1: img1,
      img2: img2,
      name1: name1,
      name2: name2,
    },
  };
};

//RemoveAddLiquidityToken
export const SolGetLiquidityPoolBalance = (wallet) => {
  return async (dispatch) => {
    try {
      const List = [
        {
          name1: "lpUSD",
          name2: "USDC",
          img1: SOLANA.lpUSD,
          img2: SOLANA.USDC,
          Balance: wallet.publicKey
            ? await getUserLpTokenBalance(wallet, "lpUSD-USDC")
            : 0,
        },
        {
          name1: "lpSOL",
          name2: "wSOL",
          img1: SOLANA.lpSOL,
          img2: SOLANA.wSOL,
          Balance: wallet.publicKey
            ? await getUserLpTokenBalance(wallet, "lpSOL-wSOL")
            : 0,
        },
        {
          name1: "LPFi",
          name2: "USDC",
          img1: SOLANA.LPFi,
          img2: SOLANA.USDC,
          Balance: wallet.publicKey
            ? await getUserLpTokenBalance(wallet, "LPFi-USDC")
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
          name1: "lpUSD",
          name2: "USDC",
          Price: wallet.publicKey
            ? await getLpRewardTokenPrice(wallet, "lpUSD-USDC")
            : 0,
        },
        {
          name1: "lpSOL",
          name2: "wSOL",
          Price: wallet.publicKey
            ? await getLpRewardTokenPrice(wallet, "lpSOL-wSOL")
            : 0,
        },
        {
          name1: "LPFi",
          name2: "USDC",
          Price: wallet.publicKey
            ? await getLpRewardTokenPrice(wallet, "LPFi-USDC")
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
