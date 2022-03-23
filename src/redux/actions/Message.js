import { setSnackbar } from "../../helper/setSnackbar";

export const Message = () => {
  return async (dispatch) => {
    dispatch(setSnackbar(true, "info", "The service isn't live yet"));
  };
};

export const MessageAssets = () => {
  return async (dispatch) => {
    dispatch(setSnackbar(true, "info", "Other tokens are not supported!"));
  };
};
