import { setSnackbar } from "../../redux/actions";

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
