import React, { useEffect, useState, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import NearFaucet from "../components/NearComponents/NearFaucet";
import NearBorrow from "../components/NearComponents/NearBorrow";
import NearAuction from "../components/NearComponents/NearAuction";
import NearLiquidate from "../components/NearComponents/NearLiquidate";
import NearSwap from "../components/NearComponents/NearSwap";
import NearBridge from "../components/NearComponents/NearBridge";

import Error from "../components/Error";
import initContract from "../utils/Near/global/InitContract";

export const NearWalletContext = createContext();

const NearRoute = () => {
  const [contract, setContract] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [nearConfig, setNearConfig] = useState();
  const [walletConnection, setWalletConnection] = useState();

  useEffect(() => {
    const getWalletConfig = async () => {
      const { contract, currentUser, nearConfig, walletConnection } =
        await initContract();
      setContract(contract);
      setCurrentUser(currentUser);
      setNearConfig(nearConfig);
      setWalletConnection(walletConnection);
    };

    getWalletConfig();

    return () => {
      setContract();
      setCurrentUser();
      setNearConfig();
      setWalletConnection();
    };
  }, []);

  return (
    <NearWalletContext.Provider
      value={{ contract, currentUser, nearConfig, wallet: walletConnection }}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<NearFaucet />} />
          <Route path="/borrow" element={<NearBorrow />} />
          <Route path="/auction" element={<NearAuction />} />
          <Route path="/liquidate" element={<NearLiquidate />} />
          <Route path="/swap" element={<NearSwap />} />
          <Route path="/bridge" element={<NearBridge />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </NearWalletContext.Provider>
  );
};

export const NearWallet = () => useContext(NearWalletContext);

export default NearRoute;
