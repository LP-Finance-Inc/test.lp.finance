import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "./Tabs";
import Overview from "./Overview";
import AuctionWrapper from "./Auction.style";
import { calc } from "../../helper";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getAuctionStateAccountFun,
  getAuctionUserAccountFun,
} from "../../redux/actions/LpContractActions";
import ServerErrorModel from "../../Models/ServerErrorModel";

const Auction = () => {
  const wallet = useWallet();
  const dispatch = useDispatch();
  const { publicKey } = wallet;

  const [serverErrorModel, setServerErrorModel] = useState(false);
  const lpContractState = useSelector((state) => state.lpContractReducers);

  const lpAuctionState = useSelector((state) => state.lpAuctionReducer);

  const { UserAuctionDepositedLpUSD } = lpAuctionState.AuctionUserAccount;

  const {
    AuctionStakeTotalRewardPercent,
    AuctionLastEpochProfitAmount,
    AuctionLastEpochProfitPercent,
    AuctionTotalLpUSD,
  } = lpAuctionState.AuctionStakeInfo;

  const { lpUSDTokenPrice } = lpAuctionState.TokenPriceList;

  //auction cbs calculation
  const TotalSupply = lpContractState.Borrow.Overview.TotalSupply;

  const LiquidatorFunds = AuctionTotalLpUSD * lpUSDTokenPrice;

  const LF_PieChartPercentage = (LiquidatorFunds / TotalSupply) * 100;

  const LastEpochProfit = AuctionLastEpochProfitAmount * lpUSDTokenPrice;

  const APY = (AuctionLastEpochProfitPercent - 100) * 365;
  // const APY = (AuctionLastEpochProfitPercent / LiquidatorFunds) * 100;

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

  useEffect(() => {
    dispatch(getAuctionUserAccountFun(wallet, publicKey));
  }, [publicKey]);

  useEffect(() => {
    setServerErrorModel(true);
    dispatch(getAuctionStateAccountFun(wallet));
  }, []);

  return (
    <>
      {serverErrorModel && (
        <ServerErrorModel
          serverErrorModel={serverErrorModel}
          setServerErrorModel={setServerErrorModel}
        />
      )}

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

export default Auction;
