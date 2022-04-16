import React, { useEffect, useState } from "react";
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
import EthFaucet from "./Ethereum/components/EthFaucet";
import Error from "./components/Error";
import {
  getTokenBalanceFun,
  getReadUserAccountFun,
  getReadStateAccountFun,
  getTokenPriceListFun,
  getAssetsPoolMarketFun,
  getPoolAssetsInfoFun,
} from "./redux/actions/LpContractActions";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch } from "react-redux";
import { getTokensPriceList } from "./utils/lpContractFunctions/global/getTokensPriceList";
import { connection } from "./lib/helpers/connection";
import { getLiquidateAccountListFun } from "./redux/actions/LpContractActions";
import { getCR } from "./redux/actions/CBS_DAO";
import { getPoolAssetsInfo } from "./utils/lpContractFunctions/global/getPoolAssetsInfo";
import { NetworkAuth } from "./middleware/NetworkProvider";
import PrivateRoute from "./middleware/PrivateRoute";
import PublicRoute from "./middleware/PublicRoute";

const App = () => {
  const { Network } = NetworkAuth();
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const [TokenPriceList, setTokenPriceList] = useState();

  useEffect(() => {
    async function getTokenPrice() {
      try {
        let scnTokenPrice = "";
        const getPoolAssetsList = await getPoolAssetsInfo();

        for (var i = 0; i < getPoolAssetsList.length; i++) {
          if (getPoolAssetsList[i].TokenPriceName === "scnSOL") {
            scnTokenPrice = getPoolAssetsList[i].TokenPrice;
          }
        }
        const List = await getTokensPriceList(connection);

        const getTokensPriceListInfo = {
          BtcTokenPrice: List[0].Price ? List[0].Price : 0,
          ETHTokenPrice: List[1].Price ? List[1].Price : 0,
          SolTokenPrice: List[2].Price ? List[2].Price : 0,
          SRMTokenPrice: List[3].Price ? List[3].Price : 0,
          UsdcTokenPrice: List[4].Price ? List[4].Price : 0,
          USDTTokenPrice: List[5].Price ? List[5].Price : 0,
          mSOLTokenPrice: List[6].Price ? List[6].Price : 0,
          USTTokenPrice: List[7].Price ? List[7].Price : 0,
          STSOLTokenPrice: List[8].Price ? List[8].Price : 0,
          scnSOLTokenPrice: scnTokenPrice,
          lpSOLTokenPrice: List[2].Price ? List[2].Price : 0,
          lpUSDTokenPrice: List[4].Price ? List[4].Price : 0,
          lpETHTokenPrice: List[1].Price ? List[1].Price : 0,
          lpBTCTokenPrice: List[0].Price ? List[0].Price : 0,
        };

        setTokenPriceList(getTokensPriceListInfo);
      } catch (error) {}
    }

    getTokenPrice();

    return () => {
      setTokenPriceList();
    };
  }, []);

  useEffect(() => {
    if (TokenPriceList) {
      dispatch(getTokenPriceListFun(TokenPriceList));
    }
  }, [TokenPriceList]);

  useEffect(() => {
    if (TokenPriceList) {
      dispatch(getLiquidateAccountListFun(wallet, publicKey, TokenPriceList));
    }
  }, [TokenPriceList && publicKey]);

  useEffect(() => {
    dispatch(getTokenBalanceFun(publicKey));
    dispatch(getReadUserAccountFun(wallet, publicKey));
  }, [publicKey]);

  useEffect(() => {
    dispatch(getReadStateAccountFun(wallet));
    dispatch(getCR());
    dispatch(getAssetsPoolMarketFun());
    dispatch(getPoolAssetsInfoFun());
  }, []);

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
