//swapTokenActions
export const BottomSwapTokenSelect = ({ img, name, Symbol }) => {
  return {
    type: "BOTTOM_SWAP_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
      Symbol: Symbol,
    },
  };
};

export const BottomSwapTokenCompare = () => {
  return {
    type: "BOTTOM_SWAP_TOKEN_COMPARE",
  };
};

export const TopSwapTokenSelect = ({ img, name,Symbol }) => {
  return {
    type: "TOP_SWAP_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
      Symbol: Symbol,
    },
  };
};

export const TopSwapTokenCompare = () => {
  return {
    type: "TOP_SWAP_TOKEN_COMPARE",
  };
};

export const TopSwapTokenChange = (SwapChange) => {
  const { name2, img2 } = SwapChange;
  return {
    type: "TOP_SWAP_TOKEN_CHANGE",
    payload: {
      name2,
      img2,
    },
  };
};

export const BottomSwapTokenChange = (SwapChange) => {
  const { name1, img1 } = SwapChange;
  return {
    type: "BOTTOM_SWAP_TOKEN_CHANGE",
    payload: {
      name1,
      img1,
    },
  };
};
