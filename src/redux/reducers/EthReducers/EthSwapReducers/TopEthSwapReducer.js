const EthPoint = "/images/tokens/EthToken/";

const initialState = {
  name: "SOL",
  img: EthPoint + "SOL.png",
};

const TopEthSwapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOP_ETH_SWAP_TOKEN_SELECT":
      const { img, name } = action.payload;

      return {
        ...state,
        name: name,
        img: img,
      };

    case "TOP_ETH_SWAP_TOKEN_COMPARE":
      return {
        ...state,
        name: "Select a token",
        img: "",
      };

    case "TOP_ETH_SWAP_TOKEN_CHANGE":
      const { name2, img2 } = action.payload;

      return {
        ...state,
        name: name2,
        img: img2,
      };

    default:
      return state;
  }
};

export default TopEthSwapReducer;
