const point = "/images/network/";

const initialState = {
  img: point + "Solana.png",
  name: "Solana",
};

const NearBridgeTargetNetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEAR_BRIDGE_TARGET_NETWORK_SELECT":
      const { img, name } = action.payload;

      return {
        ...state,
        img,
        name,
      };

    case "NEAR_BRIDGE_SOURCE_NETWORK_COMPARE":
      return {
        ...state,
        img: "",
        name: "Select a network",
      };

    case "NEAR_BRIDGE_TARGET_NETWORK_SWAP":
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

export default NearBridgeTargetNetworkReducer;
