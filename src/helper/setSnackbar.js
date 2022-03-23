export const setSnackbar = (open, type, mess, notFound) => {
  return {
    type: "SET_SNACKBAR",
    payload: {
      snackbarOpen: open,
      snackbarType: type,
      snackbarMessage: mess,
      notFound: notFound,
    },
  };
};
