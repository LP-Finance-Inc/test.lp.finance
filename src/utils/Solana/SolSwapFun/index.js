import * as anchor from "@project-serum/anchor";
import getProvider from "../../../lib/Solana/getProvider";
import idl from "../../../lib/Solana/idls/lpfinance_swap.json";
import { convert_from_wei } from "../../../lib/Solana/common";
import { LiquidityPool } from "../../../lib/Solana/Solana_constants/swap_constants";

// Swap program
export const getPriceFromPool = async (wallet) => {
  try {
    const { PublicKey } = anchor.web3;
    const provider = await getProvider(wallet);
    anchor.setProvider(provider);

    const programId = new PublicKey(idl.metadata.address);

    const program = new anchor.Program(idl, programId);

    const priceData = await program.account.poolInfo.fetch(LiquidityPool);
    const price = priceData.tokenbAmount / priceData.tokenaAmount;

    return price;
  } catch (err) {
    return 0;
  }
};
