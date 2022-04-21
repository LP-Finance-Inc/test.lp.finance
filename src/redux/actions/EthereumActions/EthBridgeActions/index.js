import { setSnackbar } from "../../snackbar";

export const EthBridgeSourceNetworkSelect = ({ img, name }) => {
  return {
    type: "ETH_BRIDGE_SOURCE_NETWORK_SELECT",
    payload: {
      img,
      name,
    },
  };
};

export const EthSwapBridgeSourceNetworkFun = (StoreNetwork) => {
  return {
    type: "ETH_BRIDGE_SOURCE_NETWORK_SWAP",
    payload: StoreNetwork,
  };
};

export const EthBridgeSourceNetworkCompare = () => {
  return {
    type: "ETH_BRIDGE_SOURCE_NETWORK_COMPARE",
  };
};

export const EthBridgeTargetNetworkSelect = ({ img, name }) => {
  return {
    type: "ETH_BRIDGE_TARGET_NETWORK_SELECT",
    payload: {
      img,
      name,
    },
  };
};

export const EthBridgeTargetNetworkCompare = () => {
  return {
    type: "ETH_BRIDGE_TARGET_NETWORK_COMPARE",
  };
};

export const EthSwapBridgeTargetNetworkFun = (StoreNetwork) => {
  return {
    type: "ETH_BRIDGE_TARGET_NETWORK_SWAP",
    payload: StoreNetwork,
  };
};

export const EthBridgeMessage = () => {
  return async (dispatch) => {
    dispatch(setSnackbar(true, "info", "Not supported yet"));
  };
};
