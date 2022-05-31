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
