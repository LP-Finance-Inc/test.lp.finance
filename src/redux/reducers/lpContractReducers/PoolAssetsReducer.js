const initialState = {
  process: false,
  status: "",
  PoolAssetsList: [],
};

const PoolAssetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_POOL_ASSETS_PROGRESS":
      return {
        ...state,
        status: "progress",
        process: true,
      };

    case "SEND_POOL_ASSETS_INFO":
      return {
        ...state,
        PoolAssetsList: action.payload,
        status: "success",
        process: false,
      };

    case "SEND_POOL_ASSETS_ERROR":
      return {
        ...state,
        status: "error",
        process: false,
      };
    default:
      return state;
  }
};

export default PoolAssetsReducer;
