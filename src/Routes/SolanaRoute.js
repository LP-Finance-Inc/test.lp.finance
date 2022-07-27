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
import SolLiquidityPool from "../components/SolanaComponents/SolLiquidityPool";
import Error from "../components/globalComponents/Error";
import {
  getTokenBalanceFun,
  getReadUserAccountFun,
  getReadStateAccountFun,
} from "../redux/actions/Solana/SolBorrowActions";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch } from "react-redux";
import { getCR } from "../redux/actions/Solana/CBS_DAO";
import { getSolanaCryptoFun } from "../utils/Solana/global";
import {
  getLastEpochProfitFun,
  getAPYFun,
} from "../utils/Solana/SolAuctionFun";
import {
  getAuctionStateAccountFun,
  getAuctionUserAccountFun,
} from "../redux/actions/Solana/SolBorrowActions";
import {
  SolGetLiquidityPoolBalance,
  SolGetLiquidityPoolTokenPrice,
} from "../redux/actions/Solana/SolLiquidityPoolActions";

const SolanaRoute = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const ContractState = useSelector((state) => state.ContractReducer);

  useEffect(() => {
    dispatch(getSolanaCryptoFun());
    dispatch(SolGetLiquidityPoolBalance(wallet));
    dispatch(SolGetLiquidityPoolTokenPrice(wallet));
    dispatch(getReadStateAccountFun(wallet));
    dispatch(getAuctionStateAccountFun(wallet));
    dispatch(getLastEpochProfitFun());
    dispatch(getAPYFun());
    dispatch(getCR());
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      dispatch(getSolanaCryptoFun());
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    dispatch(getTokenBalanceFun(publicKey, wallet));
    dispatch(getReadUserAccountFun(wallet, publicKey));
    dispatch(getAuctionUserAccountFun(wallet, publicKey));
    dispatch(getReadStateAccountFun(wallet));
    dispatch(SolGetLiquidityPoolBalance(wallet));
    dispatch(SolGetLiquidityPoolTokenPrice(wallet));

    let getLpTokenPriceTimeOut = setTimeout(() => {
      dispatch(SolGetLiquidityPoolTokenPrice(wallet));
    }, 5000);

    let SolanaCryptoTimeOut = setTimeout(() => {
      dispatch(getSolanaCryptoFun());
    }, 2000);

    return () => {
      clearTimeout(getLpTokenPriceTimeOut);
      clearTimeout(SolanaCryptoTimeOut);
    };
  }, [publicKey]);

  useEffect(() => {
    dispatch(getTokenBalanceFun(publicKey, wallet));
    dispatch(SolGetLiquidityPoolTokenPrice(wallet));
    dispatch(getSolanaCryptoFun());
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
        <Route path="/liquidityPool" element={<SolLiquidityPool />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Layout>
  );
};

export default SolanaRoute;
