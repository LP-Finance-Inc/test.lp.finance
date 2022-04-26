import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Faucet from "./components/Faucet";
import Borrow from "./components/Borrow";
import Auction from "./components/Auction";
import LiquidityPool from "./components/LiquidityPool";
import Swap from "./components/Swap";
import Bridge from "./components/Bridge";
import Layout from "./components/Layout";
import SnackbarProviderMessage from "./components/SnackbarProviderMessage";
import Snackbar from "./helper/Snackbar";
import ShortSell from "./components/ShortSell";
import Liquidate from "./components/Liquidate";
import ContractsModel from "./Models/ContractsModel";
import EthFaucet from "./Ethereum/components/EthFaucet";
import Error from "./components/Error";
import {
  getTokenBalanceFun,
  getReadUserAccountFun,
  getReadStateAccountFun,
  getAssetsPoolMarketFun,
  getPoolAssetsInfoFun,
  setTokenPriceListFun,
} from "./redux/actions/LpContractActions";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch } from "react-redux";
import { getCR } from "./redux/actions/CBS_DAO";
import { NetworkAuth } from "./middleware/NetworkProvider";
import PrivateRoute from "./middleware/PrivateRoute";
import PublicRoute from "./middleware/PublicRoute";
import io from "socket.io-client";

const socket = io.connect("https://backend.lpblock.org");

const App = () => {
  const { Network } = NetworkAuth();
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();

  useEffect(() => {
    const RunSocket = async () => {
      await socket.emit("store_crypto");
      await socket.emit("fetch_crypto");
    };
    RunSocket();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      await socket.emit("store_crypto");
      await socket.emit("fetch_crypto");
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    dispatch(getTokenBalanceFun(publicKey));
    dispatch(getReadUserAccountFun(wallet, publicKey));
  }, [publicKey]);

  useEffect(() => {
    dispatch(getReadStateAccountFun(wallet));
    dispatch(getPoolAssetsInfoFun());
    dispatch(getCR());
    dispatch(getAssetsPoolMarketFun());
  }, []);

  useEffect(() => {
    socket.on("receive_crypto", (data) => {
      const { TokenPrice } = data;
      dispatch(setTokenPriceListFun(TokenPrice));
    });
  }, [socket]);

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
              <Route path="/liquidity-pool" element={<LiquidityPool />} />
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
                path="/short-sell"
                element={
                  <PublicRoute>
                    <ShortSell />
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
