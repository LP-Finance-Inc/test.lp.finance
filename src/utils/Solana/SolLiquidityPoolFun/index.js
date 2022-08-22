import * as anchor from "@project-serum/anchor";
import { connection } from "../../../lib/Solana/connection";
import { PublicKey } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import stable_swap from "../../../lib/Solana/idls/stable_swap.json";
import uniswap from "../../../lib/Solana/idls/uniswap.json";
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
      const programId = new PublicKey(stable_swap.metadata.address);
      const program = new anchor.Program(stable_swap, programId);
      let poolAccount = await program.account.stableswapPool.fetch(pooladdress);
      token_lp = poolAccount.tokenLp;
    } else if (lpTokenName === "LPFi-USDC") {
      const programId = new PublicKey(uniswap.metadata.address);
      const program = new anchor.Program(uniswap, programId);
      let poolAccount = await program.account.uniswapPool.fetch(pooladdress);
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
    const programId = new PublicKey(stable_swap.metadata.address);
    const program = new anchor.Program(stable_swap, programId);
    let poolAccount = await program.account.stableswapPool.fetch(pooladdress);
    const poolData = poolAccount;

    const p0 = poolData.amountA;
    const p1 = poolData.amountB;
    price = p1 / p0;
  } else if (lpTokenName === "LPFi-USDC") {
    const programId = new PublicKey(uniswap.metadata.address);
    const program = new anchor.Program(uniswap, programId);
    let poolData = await program.account.uniswapPool.fetch(pooladdress);

    const p0 = poolData.amountA;
    const p1 = poolData.amountB;
    price = p1 / p0;
  }

  return price;
};

export const get_Liquidity_pool = async (wallet, tokenA, tokenB, price) => {
  try {
    const provider = await getProvider(wallet);
    anchor.setProvider(provider);

    let program;

    if (
      (tokenA === "lpUSDC" && tokenB === "USDC") ||
      (tokenA === "lpSOL" && tokenB === "wSOL")
    ) {
      const programId = new PublicKey(stable_swap.metadata.address);
      program = new anchor.Program(stable_swap, programId);
    } else if (tokenA === "LPFi" && tokenB === "USDC") {
      const programId = new PublicKey(uniswap.metadata.address);
      program = new anchor.Program(uniswap, programId);
    }

    let poolAccount;

    if (tokenA === "lpUSDC" && tokenB === "USDC") {
      poolAccount = await program.account.stableswapPool.fetch(LpUSD_USDC_Pool);
    } else if (tokenA === "lpSOL" && tokenB === "wSOL") {
      poolAccount = await program.account.stableswapPool.fetch(LpSOL_wSOL_Pool);
    } else if (tokenA === "LPFi" && tokenB === "USDC") {
      poolAccount = await program.account.uniswapPool.fetch(LPFi_USDC_Pool);
    }

    const total_lp_amount = Number(poolAccount.totalLpAmount);
    console.log(tokenA, tokenB);
    console.log(total_lp_amount, price);
    // const feeRate = Number(poolAccount.fee) / ; // 0.5 % = return 0.005
    const Liquidity = price * total_lp_amount;
    return {
      Liquidity,
    };
  } catch (error) {
    return {
      Liquidity: 0,
    };
  }
};
