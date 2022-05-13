import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Faucet from "./components/Faucet";
import Borrow from "./components/Borrow";
import Auction from "./components/Auction";
import Swap from "./components/Swap";
import Bridge from "./components/Bridge";
import Layout from "./components/Layout";
import SnackbarProviderMessage from "./components/SnackbarProviderMessage";
import Snackbar from "./helper/Snackbar";
import Liquidate from "./components/Liquidate";
import ContractsModel from "./Models/Common/ContractsModel";
import EthFaucet from "./components/Ethereum/components/EthFaucet";
import Error from "./components/Error";
import Near from "./components/Near";
import {
  getTokenBalanceFun,
  getReadUserAccountFun,
  getReadStateAccountFun,
} from "./redux/actions/LpContractActions";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch } from "react-redux";
import { getCR } from "./redux/actions/CBS_DAO";
import { NetworkAuth } from "./middleware/NetworkProvider";
import PrivateRoute from "./middleware/PrivateRoute";
import PublicRoute from "./middleware/PublicRoute";
import { getSolanaCryptoFun } from "./utils/SolanaApiCallFuntions/global";

const App = () => {
  const { Network } = NetworkAuth();
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReadStateAccountFun(wallet));
    dispatch(getSolanaCryptoFun(wallet, publicKey));
    dispatch(getCR());
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      dispatch(getSolanaCryptoFun(wallet, publicKey));
    }, 1500000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    dispatch(getReadUserAccountFun(wallet, publicKey));
    dispatch(getReadStateAccountFun(wallet));
    dispatch(getTokenBalanceFun(publicKey));
    dispatch(getSolanaCryptoFun(wallet, publicKey));
  }, [publicKey]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getSolanaCryptoFun(wallet, publicKey));
    }, 2000);
  }, [publicKey]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getSolanaCryptoFun(wallet, publicKey));
    }, 2000);
  }, []);

  return (
    <SnackbarProviderMessage>
      <Snackbar />
      <ContractsModel />
      <Layout>
        {Network === "Solana" && (
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Faucet />
                </PublicRoute>
              }
            />
            <Route
              path="/borrow"
              element={
                <PublicRoute>
                  <Borrow />
                </PublicRoute>
              }
            />
            <Route
              path="/auction"
              element={
                <PublicRoute>
                  <Auction />
                </PublicRoute>
              }
            />

            <Route
              path="/swap"
              element={
                <PublicRoute>
                  <Swap />
                </PublicRoute>
              }
            />

            <Route
              path="/bridge"
              element={
                <PublicRoute>
                  <Bridge />
                </PublicRoute>
              }
            />
            <Route
              path="/liquidate"
              element={
                <PublicRoute>
                  <Liquidate />
                </PublicRoute>
              }
            />

            <Route
              path="/near"
              element={
                <PublicRoute>
                  <Near />
                </PublicRoute>
              }
            />

            <Route path="*" element={<Error />} />
          </Routes>
        )}

        {Network === "Ethereum" && (
          <Routes>
            <Route
              path="/ethereum"
              element={
                <PrivateRoute>
                  <EthFaucet />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        )}
      </Layout>
    </SnackbarProviderMessage>
  );
};

export default App;
