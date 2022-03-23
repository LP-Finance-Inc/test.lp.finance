//addLiquidityTokenActions
export const TopAddLiquidityTokenSelect = (img, name) => {
  return {
    type: "TOP_ADD_LIQUIDITY_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const bottomAddLiquidityTokenSelect = (img, name) => {
  return {
    type: "BOTTOM_ADD_LIQUIDITY_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

//RemoveAddLiquidityToken
export const RemoveAddLiquidityTokenSelect = (img1, img2, name) => {
  return {
    type: "REMOVE_LIQUIDITY_TOKEN_SELECT",
    payload: {
      img1: img1,
      img2: img2,
      name: name,
    },
  };
};
