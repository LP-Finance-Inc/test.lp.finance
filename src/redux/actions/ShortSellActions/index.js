//addLiquidityTokenActions
export const ShortSellTokenSelect = (img, name) => {
  return {
    type: "SHORT_SELL_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};
