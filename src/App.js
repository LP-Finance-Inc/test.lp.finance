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
import ContractsModel from "./Models/ContractsModel";
import EthFaucet from "./components/Ethereum/components/EthFaucet";
import Error from "./components/Error";
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
import {
  StoreTokenPricesFun,
  StoreSolendPoolAssetsFun,
  StoreApricotPoolAssetsFun,
  FetchSolanaCryptoFun,
} from "./utils/SolanaApiCallFuntions/global";

const App = () => {
  const { Network } = NetworkAuth();
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReadStateAccountFun(wallet));
    dispatch(FetchSolanaCryptoFun(wallet, publicKey));
    dispatch(StoreTokenPricesFun());
    dispatch(StoreSolendPoolAssetsFun());
    dispatch(StoreApricotPoolAssetsFun());
    dispatch(getCR());
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      dispatch(FetchSolanaCryptoFun(wallet, publicKey));
      dispatch(StoreTokenPricesFun());
      dispatch(StoreSolendPoolAssetsFun());
      dispatch(StoreApricotPoolAssetsFun());
    }, 600000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    dispatch(FetchSolanaCryptoFun(wallet, publicKey));
    dispatch(getTokenBalanceFun(publicKey));
    dispatch(getReadUserAccountFun(wallet, publicKey));
  }, [publicKey]);

  return (
    <>
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
    </>
  );
};

export default App;
