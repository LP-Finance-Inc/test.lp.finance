import React from "react";
import Footer from "../Footer";
import { NetworkAuth } from "../../../Context/global/NetworkContext";
import SolHeader from "../../SolanaComponents/SolHeader";
import NearHeader from "../../NearComponents/NearHeader";

const Layout = ({ children }) => {
  const { Network } = NetworkAuth();

  switch (Network) {
    case "Solana":
      return (
        <>
          <SolHeader />
          {children}
          <Footer />
        </>
      );

    case "NEAR Protocol":
      return (
        <>
          <NearHeader />
          {children}
          <Footer />
        </>
      );

    default:
      return (
        <>
          <SolHeader />
          {children}
          <Footer />
        </>
      );
  }
};

export default Layout;
