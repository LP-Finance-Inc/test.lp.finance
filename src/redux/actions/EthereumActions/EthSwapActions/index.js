//Eth swapTokenActions
export const BottomEthSwapTokenSelect = ({ img, name }) => {
  return {
    type: "BOTTOM_ETH_SWAP_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const BottomEthSwapTokenCompare = () => {
  return {
    type: "BOTTOM_ETH_SWAP_TOKEN_COMPARE",
  };
};

export const BottomEthSwapTokenChange = (SwapChange) => {
  const { name1, img1 } = SwapChange;
  return {
    type: "BOTTOM_ETH_SWAP_TOKEN_CHANGE",
    payload: {
      name1,
      img1,
    },
  };
};

export const TopEthSwapTokenSelect = ({ img, name }) => {
  return {
    type: "TOP_ETH_SWAP_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const TopEthSwapTokenCompare = () => {
  return {
    type: "TOP_ETH_SWAP_TOKEN_COMPARE",
  };
};

export const TopEthSwapTokenChange = (SwapChange) => {
  const { name2, img2 } = SwapChange;
  return {
    type: "TOP_ETH_SWAP_TOKEN_CHANGE",
    payload: {
      name2,
      img2,
    },
  };
};
