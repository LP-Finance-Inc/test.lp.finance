import { setSnackbar } from "../../snackbar";

export const BridgeSourceNetworkSelect = ({ img, name }) => {
  return {
    type: "BRIDGE_SOURCE_NETWORK_SELECT",
    payload: {
      img,
      name,
    },
  };
};

export const BridgeTargetNetworkSelect = ({ img, name }) => {
  return {
    type: "BRIDGE_TARGET_NETWORK_SELECT",
    payload: {
      img,
      name,
    },
  };
};

export const BridgeSourceNetworkCompare = () => {
  return {
    type: "BRIDGE_SOURCE_NETWORK_COMPARE",
  };
};

export const BridgeTargetNetworkCompare = () => {
  return {
    type: "BRIDGE_TARGET_NETWORK_COMPARE",
  };
};

export const SwapBridgeSourceNetworkFun = (StoreNetwork) => {
  return {
    type: "BRIDGE_SOURCE_NETWORK_SWAP",
    payload: StoreNetwork,
  };
};

export const SwapBridgeTargetNetworkFun = (StoreNetwork) => {
  return {
    type: "BRIDGE_TARGET_NETWORK_SWAP",
    payload: StoreNetwork,
  };
};

export const BridgeMessage = (message) => {
  return async (dispatch) => {
    dispatch(setSnackbar(true, "info", message));
  };
};
