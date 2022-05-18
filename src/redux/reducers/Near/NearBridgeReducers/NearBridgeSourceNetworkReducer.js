const point = "/images/network/";

const initialState = {
  img: point + "Near.png",
  name: "NEAR Protocol",
};

const NearBridgeSourceNetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEAR_BRIDGE_SOURCE_NETWORK_SELECT":
      const { img, name } = action.payload;

      return {
        ...state,
        img,
        name,
      };

    case "NEAR_BRIDGE_TARGET_NETWORK_COMPARE":
      return {
        ...state,
        img: "",
        name: "Select a network",
      };

    case "NEAR_BRIDGE_SOURCE_NETWORK_SWAP":
      const { TargetName, TargetImg } = action.payload;
      return {
        ...state,
        img: TargetImg,
        name: TargetName,
      };

    default:
      return state;
  }
};

export default NearBridgeSourceNetworkReducer;
