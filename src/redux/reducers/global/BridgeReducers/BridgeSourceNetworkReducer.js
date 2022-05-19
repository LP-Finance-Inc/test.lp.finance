const initialState = {
  img: "",
  name: "",
};

const BridgeSourceNetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BRIDGE_SOURCE_NETWORK_SELECT":
      const { img, name } = action.payload;

      return {
        img,
        name,
      };

    case "BRIDGE_TARGET_NETWORK_COMPARE":
      return {
        img: "",
        name: "Select a network",
      };

    case "BRIDGE_SOURCE_NETWORK_SWAP":
      const { TargetName, TargetImg } = action.payload;
      return {
        img: TargetImg,
        name: TargetName,
      };

    default:
      return state;
  }
};

export default BridgeSourceNetworkReducer;
