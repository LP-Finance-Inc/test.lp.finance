import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SolFaucet from "../components/SolanaComponents/SolFaucet";
import SolBorrow from "../components/SolanaComponents/SolBorrow";
import SolAuction from "../components/SolanaComponents/SolAuction";
import SolSwap from "../components/SolanaComponents/SolSwap";
import SolBridge from "../components/SolanaComponents/SolBridge";
import SolLiquidate from "../components/SolanaComponents/SolLiquidate";
import Error from "../components/Error";
import {
  getTokenBalanceFun,
  getReadUserAccountFun,
  getReadStateAccountFun,
} from "../redux/actions/LpContractActions";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch } from "react-redux";
import { getCR } from "../redux/actions/CBS_DAO";
import { getSolanaCryptoFun } from "../utils/SolanaApiCallFuntions/global";

const SolanaRoute = () => {
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
    <Routes>
      <Route path="/" element={<SolFaucet />} />
      <Route path="/borrow" element={<SolBorrow />} />
      <Route path="/auction" element={<SolAuction />} />
      <Route path="/swap" element={<SolSwap />} />
      <Route path="/bridge" element={<SolBridge />} />
      <Route path="/liquidate" element={<SolLiquidate />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default SolanaRoute;
