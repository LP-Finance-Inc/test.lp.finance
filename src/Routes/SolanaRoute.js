import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../components/globalComponents/Layout";
import SolFaucet from "../components/SolanaComponents/SolFaucet";
import SolBorrow from "../components/SolanaComponents/SolBorrow";
import SolAuction from "../components/SolanaComponents/SolAuction";
import SolSwap from "../components/SolanaComponents/SolSwap";
import SolBridge from "../components/SolanaComponents/SolBridge";
import SolLiquidate from "../components/SolanaComponents/SolLiquidate";
import Error from "../components/globalComponents/Error";
import {
  getTokenBalanceFun,
  getReadUserAccountFun,
  getReadStateAccountFun,
} from "../redux/actions/Solana/SolBorrowActions";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch } from "react-redux";
import { getCR } from "../redux/actions/Solana/CBS_DAO";
import { getSolanaCryptoFun, StoreWallet } from "../utils/Solana/global";
import {
  getAuctionStateAccountFun,
  getAuctionUserAccountFun,
} from "../redux/actions/Solana/SolBorrowActions";
import {
  getLastEpochProfitFun,
  getAPYFun,
} from "../utils/Solana/SolAuctionFun";

const SolanaRoute = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const ContractState = useSelector((state) => state.ContractReducer);

  useEffect(() => {
    dispatch(getReadStateAccountFun(wallet));
    dispatch(getSolanaCryptoFun(wallet, publicKey));
    dispatch(getCR());
    dispatch(getLastEpochProfitFun());
    dispatch(getAPYFun());
    dispatch(getAuctionStateAccountFun(wallet));
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      dispatch(getSolanaCryptoFun(wallet, publicKey));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const SolanaCryptoTimeOut = setTimeout(() => {
      dispatch(getSolanaCryptoFun(wallet, publicKey));
    }, 2000);

    return () => {
      clearTimeout(SolanaCryptoTimeOut);
    };
  }, []);

  useEffect(() => {
    dispatch(StoreWallet(publicKey));
    dispatch(getReadUserAccountFun(wallet, publicKey));
    dispatch(getReadStateAccountFun(wallet));
    dispatch(getTokenBalanceFun(publicKey));
    dispatch(getSolanaCryptoFun(wallet, publicKey));
    dispatch(getAuctionUserAccountFun(wallet, publicKey));
  }, [publicKey]);

  useEffect(() => {
    let SolanaCryptoTimeOut = setTimeout(() => {
      dispatch(getSolanaCryptoFun(wallet, publicKey));
    }, 2000);

    return () => {
      clearTimeout(SolanaCryptoTimeOut);
    };
  }, [publicKey]);

  useEffect(() => {
    dispatch(getTokenBalanceFun(publicKey));
    dispatch(getSolanaCryptoFun(wallet, publicKey));
  }, [ContractState.contractType === "success"]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SolFaucet />} />
        <Route path="/borrow" element={<SolBorrow />} />
        <Route path="/auction" element={<SolAuction />} />
        <Route path="/swap" element={<SolSwap />} />
        <Route path="/bridge" element={<SolBridge />} />
        <Route path="/liquidate" element={<SolLiquidate />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Layout>
  );
};

export default SolanaRoute;
