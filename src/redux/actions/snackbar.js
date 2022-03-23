export const setSnackbar = (
  snackbarOpen,
  snackbarType = "",
  snackbarMessage = "",
  notFound = ""
) => ({
  type: "SET_SNACKBAR",
  payload: {
    snackbarOpen,
    snackbarType,
    snackbarMessage,
    notFound,
  },
});
