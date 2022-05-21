import React from "react";
import Tabs from "./Tabs";
import Overview from "./Overview";
import AuctionWrapper from "../../../styles/Common/components/Auction.style";

const NearAuction = () => {
  return (
    <>
      <AuctionWrapper pie={100}>
        <div className="container Auction">
          <div className="row">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="Auction_title text-center">
                <h1>Auction Pool</h1>
              </div>
              <div className="Auction_subtitle text-center mt-1">
                <h1>Purchase Tokens at a Discount</h1>
              </div>
            </div>
          </div>
          <Overview />
          <Tabs />
        </div>
      </AuctionWrapper>
    </>
  );
};

export default NearAuction;
