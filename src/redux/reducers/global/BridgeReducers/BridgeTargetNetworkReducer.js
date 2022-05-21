const initialState = {
  img: "",
  name: "",
};

const BridgeTargetNetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BRIDGE_TARGET_NETWORK_SELECT":
      const { img, name } = action.payload;

      return {
        img,
        name,
      };

    case "BRIDGE_SOURCE_NETWORK_COMPARE":
      return {
        img: "",
        name: "Select a network",
      };

    case "BRIDGE_TARGET_NETWORK_SWAP":
      const { SourceName, SourceImg } = action.payload;
      return {
        img: SourceImg,
        name: SourceName,
      };

    default:
      return state;
  }
};

export default BridgeTargetNetworkReducer;
