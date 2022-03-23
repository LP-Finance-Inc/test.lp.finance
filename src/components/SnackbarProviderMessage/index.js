import React from "react";
import { SnackbarProvider } from "notistack";
import { setSnackbar } from "../../redux/actions/snackbar";
import { useDispatch, useSelector } from "react-redux";

const css = {
  backgroundColor: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(20px)",
  fontWeight: "600",
  fontSize: "0.9rem",
  paddingLeft: "20px",
};

const iconCss = {
  fontSize: "1.2rem",
};

const closeCSS = {
  fontSize: "1.1rem",
  marginRight: "8px",
  cursor: "pointer",
};

const SnackbarProviderMessage = ({ children }) => {
  const dispatch = useDispatch();
  const ostackRef = React.createRef();

  const snackbarType = useSelector(
    (state) => state.SnackbarReducer.snackbarType
  );
  const snackbarMessage = useSelector(
    (state) => state.SnackbarReducer.snackbarMessage
  );
  const notFound = useSelector((state) => state.SnackbarReducer.notFound);

  const onClickDismiss = (key) => () => {
    ostackRef.current.closeSnackbar(key);
    dispatch(setSnackbar(false, snackbarType, snackbarMessage, notFound));
  };

  return (
    <>
      <SnackbarProvider
        ref={ostackRef}
        action={(key) => (
          <i
            className="zmdi zmdi-close"
            style={closeCSS}
            onClick={onClickDismiss(key)}
          ></i>
        )}
        maxSnack={7}
        sx={{
          "& .SnackbarItem-variantSuccess": css,
          "& .SnackbarItem-variantError": css,
          "& .SnackbarItem-variantWarning": css,
          "& .SnackbarItem-variantInfo": css,
        }}
        iconVariant={{
          success: (
            <i className="zmdi zmdi-check-circle mr-2" style={iconCss}></i>
          ),
          error: (
            <i className="zmdi zmdi-close-circle-o mr-2" style={iconCss}></i>
          ),
          warning: (
            <i className="zmdi zmdi-info-outline mr-2" style={iconCss}></i>
          ),
          info: <i className="zmdi zmdi-info-outline mr-2" style={iconCss}></i>,
        }}
      >
        {children}
      </SnackbarProvider>
    </>
  );
};

export default SnackbarProviderMessage;
