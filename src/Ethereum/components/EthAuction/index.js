import React from "react";
import Tabs from "./Tabs";
import Overview from "./Overview";
import EthAuctionWrapper from "./EthAuction.style";

const EthAuction = () => {
  return (
    <>
      <EthAuctionWrapper pie={100}>
        <div className="container EthAuction_section">
          <div className="row">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="EthAuction_section_title text-center">
                <h1>Auction Pool</h1>
              </div>
              <div className="EthAuction_section_subtitle text-center mt-1">
                <h1>Purchase Tokens at a Discount</h1>
              </div>
            </div>
          </div>
          <Overview />
          <Tabs />
        </div>
      </EthAuctionWrapper>
    </>
  );
};

export default EthAuction;
