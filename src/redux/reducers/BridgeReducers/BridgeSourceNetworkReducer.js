const point = "/images/tokens/";

const initialState = {
  img: point + "SOL.png",
  name: "Solana",
};

const BridgeSourceNetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BRIDGE_SOURCE_NETWORK_SELECT":
      const { img, name } = action.payload;

      return {
        ...state,
        img,
        name,
      };

    case "BRIDGE_TARGET_NETWORK_COMPARE":
      return {
        ...state,
        img: "",
        name: "Select a network",
      };

    case "BRIDGE_SOURCE_NETWORK_SWAP":
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

export default BridgeSourceNetworkReducer;
