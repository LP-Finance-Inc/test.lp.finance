const point = "/images/tokens/";

const initialState = {
  img: point + "ETH.png",
  name: "Ethereum",
};

const BridgeTargetNetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BRIDGE_TARGET_NETWORK_SELECT":
      const { img, name } = action.payload;

      return {
        ...state,
        img,
        name,
      };

    case "BRIDGE_SOURCE_NETWORK_COMPARE":
      return {
        ...state,
        img: "",
        name: "Select a network",
      };

    case "BRIDGE_TARGET_NETWORK_SWAP":
      const { SourceName, SourceImg } = action.payload;
      return {
        ...state,
        img: SourceImg,
        name: SourceName,
      };

    default:
      return state;
  }
};

export default BridgeTargetNetworkReducer;
