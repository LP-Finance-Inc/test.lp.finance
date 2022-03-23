import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { setSnackbar } from "../redux/actions/snackbar";
import SnackbarWrapper from "./Snackbar.style";

const CustomizedSnackbar = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const snackbarOpen = useSelector(
    (state) => state.SnackbarReducer.snackbarOpen
  );
  const snackbarType = useSelector(
    (state) => state.SnackbarReducer.snackbarType
  );
  const snackbarMessage = useSelector(
    (state) => state.SnackbarReducer.snackbarMessage
  );

  const notFound = useSelector((state) => state.SnackbarReducer.notFound);

  const Message = () => {
    return (
      <>
        <SnackbarWrapper>
          <div className="snackbar">
            <p>
              {snackbarMessage}
              {notFound ? (
                <a href={notFound} className="ml-2" target="_blank">
                  Click here
                </a>
              ) : (
                ""
              )}
            </p>
          </div>
        </SnackbarWrapper>
      </>
    );
  };

  useEffect(() => {
    if (snackbarOpen) {
      enqueueSnackbar(<Message />, {
        variant: snackbarType,
        persist: false,
        autoHideDuration: 7000,
        preventDuplicate: false,
      });
    }

    return () => {
      dispatch(setSnackbar(false, snackbarType, snackbarMessage, notFound));
    };
  }, [snackbarOpen]);

  return <></>;
};

export default CustomizedSnackbar;
