import React from "react";
import ModeProvider from "../assets/theme";
import { BrowserRouter } from "react-router-dom";
import store from "../redux/store";
import { Provider } from "react-redux";
import { NetworkProvider } from "../Context/global/NetworkContext";
import SnackbarProviderMessage from "../components/globalComponents/SnackbarProviderMessage";
import CustomizedSnackbar from "../components/globalComponents/CustomizedSnackbar";
import ContractsModel from "../Models/Common/ContractsModel";

export const CommonRoot = ({ children }) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ModeProvider>
          <Provider store={store}>
            <NetworkProvider>{children}</NetworkProvider>
          </Provider>
        </ModeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export const AppCommon = ({ children }) => {
  return (
    <SnackbarProviderMessage>
      <CustomizedSnackbar>
        <ContractsModel />
        {children}
      </CustomizedSnackbar>
    </SnackbarProviderMessage>
  );
};
