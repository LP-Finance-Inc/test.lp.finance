export const NearBridgeSourceNetworkSelect = ({ img, name }) => {
  return {
    type: "NEAR_BRIDGE_SOURCE_NETWORK_SELECT",
    payload: {
      img,
      name,
    },
  };
};

export const NearBridgeTargetNetworkSelect = ({ img, name }) => {
  return {
    type: "NEAR_BRIDGE_TARGET_NETWORK_SELECT",
    payload: {
      img,
      name,
    },
  };
};

export const NearBridgeSourceNetworkCompare = () => {
  return {
    type: "NEAR_BRIDGE_SOURCE_NETWORK_COMPARE",
  };
};

export const NearBridgeTargetNetworkCompare = () => {
  return {
    type: "NEAR_BRIDGE_TARGET_NETWORK_COMPARE",
  };
};

export const NearSwapBridgeSourceNetworkFun = (StoreNetwork) => {
  return {
    type: "NEAR_BRIDGE_SOURCE_NETWORK_SWAP",
    payload: StoreNetwork,
  };
};

export const NearSwapBridgeTargetNetworkFun = (StoreNetwork) => {
  return {
    type: "NEAR_BRIDGE_TARGET_NETWORK_SWAP",
    payload: StoreNetwork,
  };
};
