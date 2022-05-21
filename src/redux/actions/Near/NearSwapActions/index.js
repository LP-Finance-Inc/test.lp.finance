//swapTokenActions
export const NearBottomSwapTokenSelect = ({ img, name }) => {
  return {
    type: "NEAR_BOTTOM_SWAP_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const NearBottomSwapTokenCompare = () => {
  return {
    type: "NEAR_BOTTOM_SWAP_TOKEN_COMPARE",
  };
};

export const NearTopSwapTokenSelect = ({ img, name }) => {
  return {
    type: "NEAR_TOP_SWAP_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const NearTopSwapTokenCompare = () => {
  return {
    type: "NEAR_TOP_SWAP_TOKEN_COMPARE",
  };
};

export const NearTopSwapTokenChange = (SwapChange) => {
  const { name2, img2 } = SwapChange;
  return {
    type: "NEAR_TOP_SWAP_TOKEN_CHANGE",
    payload: {
      name2,
      img2,
    },
  };
};

export const NearBottomSwapTokenChange = (SwapChange) => {
  const { name1, img1 } = SwapChange;
  return {
    type: "NEAR_BOTTOM_SWAP_TOKEN_CHANGE",
    payload: {
      name1,
      img1,
    },
  };
};
