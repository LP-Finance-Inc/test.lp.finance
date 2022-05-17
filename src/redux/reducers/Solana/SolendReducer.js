const initialState = {
  process: false,
  status: "",
  PoolAssetsList: [],
};

const SolendReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};

export default SolendReducer;
