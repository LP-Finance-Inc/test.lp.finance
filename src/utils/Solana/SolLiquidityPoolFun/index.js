import * as anchor from "@project-serum/anchor";
import api from "../../../api";
import axios from "axios";
import { connection } from "../../../lib/Solana/connection";
import { PublicKey } from "@solana/web3.js";
import stable_swap from "../../../lib/Solana/idls/stable_swap.json";
import uniswap from "../../../lib/Solana/idls/uniswap.json";
import getProvider from "../../../lib/Solana/getProvider";
import {
  lpUSD_USDC_Pool,
  lpSOL_wSOL_Pool,
  LPFi_USDC_Pool,
} from "../../../lib/Solana/Solana_constants/swap_constants";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export const getFees = async () => {
  try {
    const response = await axios.get(api.solana.getFees);

    if (response.status === 200) {
      const { lpUSD_USDC_Fees, lpSOL_wSOL_Fees, LPFi_USDC_Fees } =
        response.data;

      return {
        lpUSD_USDC_Fees,
        lpSOL_wSOL_Fees,
        LPFi_USDC_Fees,
      };
    }
  } catch (error) {
    return {
      lpUSD_USDC_Fees: 0,
      lpSOL_wSOL_Fees: 0,
      LPFi_USDC_Fees: 0,
    };
  }
};

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
      pooladdress = lpUSD_USDC_Pool;
    } else if (lpTokenName === "lpSOL-wSOL") {
      pooladdress = lpSOL_wSOL_Pool;
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
    pooladdress = lpUSD_USDC_Pool;
  } else if (lpTokenName === "lpSOL-wSOL") {
    pooladdress = lpSOL_wSOL_Pool;
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

    const { lpUSD_USDC_Fees, lpSOL_wSOL_Fees, LPFi_USDC_Fees } =
      await getFees();

    if (
      (tokenA === "lpUSD" && tokenB === "USDC") ||
      (tokenA === "lpSOL" && tokenB === "wSOL")
    ) {
      const programId = new PublicKey(stable_swap.metadata.address);
      program = new anchor.Program(stable_swap, programId);
    } else if (tokenA === "LPFi" && tokenB === "USDC") {
      const programId = new PublicKey(uniswap.metadata.address);
      program = new anchor.Program(uniswap, programId);
    }

    let poolAccount;
    var feeRate = "";

    if (tokenA === "lpUSD" && tokenB === "USDC") {
      poolAccount = await program.account.stableswapPool.fetch(lpUSD_USDC_Pool);
      feeRate = lpUSD_USDC_Fees;
    } else if (tokenA === "lpSOL" && tokenB === "wSOL") {
      poolAccount = await program.account.stableswapPool.fetch(lpSOL_wSOL_Pool);
      feeRate = lpSOL_wSOL_Fees;
    } else if (tokenA === "LPFi" && tokenB === "USDC") {
      poolAccount = await program.account.uniswapPool.fetch(LPFi_USDC_Pool);
      feeRate = LPFi_USDC_Fees;
    }

    const total_lp_amount = Number(poolAccount.totalLpAmount);

    const Liquidity = price * total_lp_amount;

    return {
      Liquidity,
      feeRate,
    };
  } catch (error) {
    return {
      Liquidity: 0,
      feeRate: 0,
    };
  }
};

export const StoreFees = async (pairName, priceFee) => {
  try {
    await axios.post(api.solana.storeFees, {
      pairName,
      priceFee,
    });
  } catch (error) {}
};
