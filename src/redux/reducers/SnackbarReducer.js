const initialState = {
  snackbarOpen: false,
  snackbarType: "",
  snackbarMessage: "",
  notFound: "",
};

const SnackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SNACKBAR":
      const { snackbarOpen, snackbarType, snackbarMessage, notFound } =
        action.payload;
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage,
        notFound,
      };
    default:
      return state;
  }
};

export default SnackbarReducer;
