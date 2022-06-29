import React from "react";
import Footer from "../Footer";
import { NetworkAuth } from "../../../Context/global/NetworkContext";
import SolHeader from "../../SolanaComponents/SolHeader";
import NearHeader from "../../NearComponents/NearHeader";
import styled from "styled-components";

const FooterWrapper = styled.div`
  min-height: calc(100vh - 131px - 160px);
`;

const Layout = ({ children }) => {
  const { Network } = NetworkAuth();

  switch (Network) {
    case "Solana":
      return (
        <>
          <SolHeader />
          <FooterWrapper>{children}</FooterWrapper>
          <Footer />
        </>
      );

    case "NEAR Protocol":
      return (
        <>
          <NearHeader />
          <FooterWrapper>{children}</FooterWrapper>
          <Footer />
        </>
      );

    default:
      return (
        <>
          <SolHeader />
          <FooterWrapper>{children}</FooterWrapper>
          <Footer />
        </>
      );
  }
};

export default Layout;
