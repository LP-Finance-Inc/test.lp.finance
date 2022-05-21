import * as anchor from "@project-serum/anchor";
import auction_idl from "../../../lib/Solana/idls/lpusd_auction.json";
import { auction_name } from "../../../lib/Solana/Solana_constants/auction_constants";
import getProvider from "../../../lib/Solana/getProvider";
import { convert_from_wei } from "../../../lib/Solana/common";

export const readAuctionUserAccount = async (wallet, publicKey) => {
  try {
    const { PublicKey } = anchor.web3;

    const provider = await getProvider(wallet);

    anchor.setProvider(provider);
    const programId = new PublicKey(auction_idl.metadata.address);

    const program = new anchor.Program(auction_idl, programId);

    const [userAccount] = await PublicKey.findProgramAddress(
      [Buffer.from(auction_name), Buffer.from(publicKey.toBuffer())],
      programId
    );

    const accountData = await program.account.userStateAccount.fetch(
      userAccount
    );

    const UserAuctionDepositedLpUSD = convert_from_wei(
      accountData.lpusdAmount?.toString()
    );
    const UserAuctionDiscountReward = convert_from_wei(
      accountData.discountReward?.toString()
    );

    const AuctionUserAccount = {
      UserAuctionDepositedLpUSD,
      UserAuctionDiscountReward,
    };

    return AuctionUserAccount;
  } catch (err) {
    const AuctionUserAccount = {
      UserAuctionDepositedLpUSD: 0,
      UserAuctionDiscountReward: 0,
    };
    return AuctionUserAccount;
  }
};
