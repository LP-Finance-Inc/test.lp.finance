import * as anchor from "@project-serum/anchor";
import auction_idl from "../../../lib/idls/lpusd_auction.json";
import { stateAccount } from "../../../lib/helpers/lp_constants/auction_constants";
import getProvider from "../../../lib/helpers/getProvider";
import { convert_from_wei } from "../../../lib/helpers/common";

export const readAuctionStateAccount = async (wallet) => {
  try {
    const { PublicKey } = anchor.web3;

    const provider = await getProvider(wallet);

    anchor.setProvider(provider);
    const programId = new PublicKey(auction_idl.metadata.address);

    const program = new anchor.Program(auction_idl, programId);
    const accountData = await program.account.auctionStateAccount.fetch(
      stateAccount
    );

    const AuctionStakeTotalRewardPercent = accountData.totalPercent.toString();
    const AuctionStakeTotalDepositedLpUSD = convert_from_wei(
      accountData.totalLpusd.toString()
    );
    const AuctionLastEpochProfitPercent =
      accountData.lastEpochPercent.toString();
    const AuctionLastEpochProfitAmount = convert_from_wei(
      accountData.lastEpochProfit.toString()
    );

    const AuctionStakeInfo = {
      AuctionStakeTotalRewardPercent,
      AuctionStakeTotalDepositedLpUSD,
      AuctionLastEpochProfitPercent,
      AuctionLastEpochProfitAmount,
    };

    return AuctionStakeInfo;
  } catch (err) {
    const AuctionStakeInfo = {
      AuctionStakeTotalRewardPercent: "0",
      AuctionStakeTotalDepositedLpUSD: "0",
      AuctionLastEpochProfitPercent: "0",
      AuctionLastEpochProfitAmount: "0",
    };

    return AuctionStakeInfo;
  }
};
