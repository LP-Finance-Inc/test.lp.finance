import * as anchor from "@project-serum/anchor";
import auction_idl from "../../../lib/Solana/idls/lpusd_auction.json";
import { config } from "../../../lib/Solana/Solana_constants/auction_constants";
import getProvider from "../../../lib/Solana/getProvider";
import {
  convert_from_wei,
  convert_from_percent,
} from "../../../lib/Solana/common";

export const readAuctionStateAccount = async (wallet) => {
  try {
    const { PublicKey } = anchor.web3;

    const provider = await getProvider(wallet);

    anchor.setProvider(provider);
    const programId = new PublicKey(auction_idl.metadata.address);

    const program = new anchor.Program(auction_idl, programId);

    const accountData = await program.account.config.fetch(config);

    const AuctionStakeTotalRewardPercent = convert_from_percent(
      accountData.totalPercent.toString()
    );

    const AuctionTotalLpUSD = convert_from_wei(
      accountData.totalLpusd.toString()
    );

    const AuctionStakeTotalDepositedLpUSD = convert_from_wei(
      accountData.totalLpusd.toString()
    );

    const AuctionLastEpochProfitPercent = convert_from_percent(
      accountData.lastEpochPercent.toString()
    );

    const AuctionLastEpochProfitAmount = convert_from_wei(
      accountData.lastEpochProfit.toString()
    );

    const AuctionStakeInfo = {
      AuctionStakeTotalRewardPercent,
      AuctionStakeTotalDepositedLpUSD,
      AuctionLastEpochProfitPercent,
      AuctionLastEpochProfitAmount,
      AuctionTotalLpUSD,
    };

    return AuctionStakeInfo;
  } catch (err) {
    const AuctionStakeInfo = {
      AuctionStakeTotalRewardPercent: 0,
      AuctionStakeTotalDepositedLpUSD: 0,
      AuctionLastEpochProfitPercent: 0,
      AuctionLastEpochProfitAmount: 0,
      AuctionTotalLpUSD: 0,
    };

    return AuctionStakeInfo;
  }
};
