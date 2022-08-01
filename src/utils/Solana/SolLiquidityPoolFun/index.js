import * as anchor from "@project-serum/anchor";
import { connection } from "../../../lib/Solana/connection";
import { PublicKey } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import swap_base from "../../../lib/Solana/idls/swap_base.json";
import lpfinance_swap from "../../../lib/Solana/idls/lpfinance_swap.json";
import getProvider from "../../../lib/Solana/getProvider";
import {
  LpUSD_USDC_Pool,
  LpSOL_wSOL_Pool,
  LPFi_USDC_Pool,
} from "../../../lib/Solana/Solana_constants/liquidity_pool_constants";

async function findAssociatedTokenAddress(publicKey, token_lp) {
  return (
    await PublicKey.findProgramAddress(
      [publicKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), token_lp.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  )[0];
}

export const getUserLpTokenBalance = async (wallet, lpTokenName) => {
  try {
    const userAuthority = wallet.publicKey;

    const provider = await getProvider(wallet);
    anchor.setProvider(provider);

    let token_lp;

    let pooladdress;

    if (lpTokenName === "lpUSD-USDC") {
      pooladdress = LpUSD_USDC_Pool;
    } else if (lpTokenName === "lpSOL-wSOL") {
      pooladdress = LpSOL_wSOL_Pool;
    } else if (lpTokenName === "LPFi-USDC") {
      pooladdress = LPFi_USDC_Pool;
    }

    if (lpTokenName === "lpUSD-USDC" || lpTokenName === "lpSOL-wSOL") {
      const programId = new PublicKey(swap_base.metadata.address);
      const program = new anchor.Program(swap_base, programId);
      let poolAccount = await program.account.pool.fetch(pooladdress);
      token_lp = poolAccount.tokenLp;
    } else if (lpTokenName === "LPFi-USDC") {
      const programId = new PublicKey(lpfinance_swap.metadata.address);
      const program = new anchor.Program(lpfinance_swap, programId);
      let poolAccount = await program.account.poolInfo.fetch(pooladdress);
      token_lp = poolAccount.tokenLp;
    }

    const ata_user_lp = await findAssociatedTokenAddress(
      userAuthority,
      token_lp
    );

    let userLptokenBalance = await connection.getTokenAccountBalance(
      ata_user_lp
    );

    return userLptokenBalance.value.uiAmount;
  } catch (error) {
    return 0;
  }
};

export const getLpRewardTokenPrice = async (wallet, lpTokenName) => {
  const provider = await getProvider(wallet);
  anchor.setProvider(provider);

  let pooladdress;
  let price;
  if (lpTokenName === "lpUSD-USDC") {
    pooladdress = LpUSD_USDC_Pool;
  } else if (lpTokenName === "lpSOL-wSOL") {
    pooladdress = LpSOL_wSOL_Pool;
  } else if (lpTokenName === "LPFi-USDC") {
    pooladdress = LPFi_USDC_Pool;
  }

  if (lpTokenName === "lpUSD-USDC" || lpTokenName === "lpSOL-wSOL") {
    const programId = new PublicKey(swap_base.metadata.address);
    const program = new anchor.Program(swap_base, programId);
    let poolAccount = await program.account.pool.fetch(pooladdress);
    const poolData = poolAccount;

    const p0 = poolData.amountA;
    const p1 = poolData.amountB;
    price = p1 / p0;
  } else if (lpTokenName === "LPFi-USDC") {
    const programId = new PublicKey(lpfinance_swap.metadata.address);
    const program = new anchor.Program(lpfinance_swap, programId);
    let poolData = await program.account.poolInfo.fetch(pooladdress);

    const p0 = poolData.tokenaAmount;
    const p1 = poolData.tokenbAmount;
    price = p1 / p0;
  }

  return price;
};
