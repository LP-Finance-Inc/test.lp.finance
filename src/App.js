import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Faucet from "./components/Faucet";
import Borrow from "./components/Borrow";
import Auction from "./components/Auction";
import LiquidityPool from "./components/LiquidityPool";
import Swap from "./components/Swap";
import Layout from "./components/Layout";
import SnackbarProviderMessage from "./components/SnackbarProviderMessage";
import Snackbar from "./helper/Snackbar";
import ShortSell from "./components/ShortSell";
import Liquidate from "./components/Liquidate";
import ContractsModel from "./Models/ContractsModel";
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

const App = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const [TokenPriceList, setTokenPriceList] = useState();

  useEffect(() => {
    async function getTokenPrice() {
      try {
        const List = await getTokensPriceList(connection);

        const getTokensPriceListInfo = {
          BtcTokenPrice: List[0].Price ? List[0].Price : 0,
          SolTokenPrice: List[1].Price ? List[1].Price : 0,
          UsdcTokenPrice: List[2].Price ? List[2].Price : 0,
          lpSOLTokenPrice: List[1].Price ? List[1].Price : 0,
          lpUSDTokenPrice: List[2].Price ? List[2].Price : 0,
          mSOLTokenPrice: List[3].Price ? List[3].Price : 0,
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
          <Routes>
            <Route path="/" element={<Faucet />} />
            <Route path="/borrow" element={<Borrow />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/liquidity-pool" element={<LiquidityPool />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/liquidate" element={<Liquidate />} />
            <Route path="/short-sell" element={<ShortSell />} />
          </Routes>
        </Layout>
      </SnackbarProviderMessage>
    </>
  );
};

export default App;
