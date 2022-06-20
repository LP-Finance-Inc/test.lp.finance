import React from "react";
import { useSelector } from "react-redux";
import Tabs from "./Tabs";
import Overview from "./Overview";
import AuctionWrapper from "../../../styles/Common/components/Auction.style";
import { calc } from "../../../helper";

const SolAuction = () => {
  const SolBorrowState = useSelector((state) => state.SolBorrowReducers);

  const SolAuctionState = useSelector((state) => state.SolAuctionReducer);

  const { UserAuctionDepositedLpUSD } = SolAuctionState?.AuctionUserAccount;

  const { AuctionStakeTotalRewardPercent, AuctionTotalLpUSD } =
    SolAuctionState.AuctionStakeInfo;

  const { lpUSDTokenPrice } = SolAuctionState.TokenPriceList;

  //auction cbs calculation
  const TotalSupply = SolBorrowState?.Borrow?.Overview?.TotalSupply;

  const LiquidatorFunds = AuctionTotalLpUSD * lpUSDTokenPrice;

  const LF_PieChartPercentage = (LiquidatorFunds / TotalSupply) * 100;

  // const APY = (AuctionLastEpochProfitPercent - 100) * 365;
  const APY = SolAuctionState.APY;

  // const LastEpochProfit = AuctionLastEpochProfitAmount * lpUSDTokenPrice;
  const LastEpochProfit = SolAuctionState.LastEpochProfit;

  //auction user account calculation
  const Profit =
    (UserAuctionDepositedLpUSD * (AuctionStakeTotalRewardPercent - 100)) / 100;

  const Deposit =
    (AuctionStakeTotalRewardPercent * UserAuctionDepositedLpUSD) / 100;

  const lpUSDValue = lpUSDTokenPrice * Deposit;

  const calCbsAuction = {
    LiquidatorFunds,
    TotalSupply,
    LF_PieChartPercentage,
    APY,
    LastEpochProfit,
  };

  const calAuctionAccountInfo = {
    Profit,
    Deposit,
    lpUSDValue,
  };

  return (
    <>
      <AuctionWrapper pie={calc(LF_PieChartPercentage)}>
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
          <Overview {...calCbsAuction} />
          <Tabs {...calAuctionAccountInfo} />
        </div>
      </AuctionWrapper>
    </>
  );
};

export default SolAuction;
