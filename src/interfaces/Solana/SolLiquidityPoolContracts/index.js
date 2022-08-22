import * as anchor from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import stable_swap from "../../../lib/Solana/idls/stable_swap.json";
import uniswap from "../../../lib/Solana/idls/uniswap.json";
import { convert_to_wei } from "../../../lib/Solana/common";
import getProvider from "../../../lib/Solana/getProvider";
import { setContracts } from "../../../redux/actions";
import {
  lpUSD_USDC_Pool,
  lpSOL_wSOL_Pool,
  LPFi_USDC_Pool,
} from "../../../lib/Solana/Solana_constants/swap_constants";
import { RefreshLiquidityPoolData } from "../../../helper/Solana/global";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

async function findAssociatedTokenAddress(walletAddress, tokenMintAddress) {
  console.log(walletAddress);
  return (
    await PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  )[0];
}

export const getAmountB = async (wallet, tokenA, tokenB, amountA) => {
  const provider = await getProvider(wallet);
  anchor.setProvider(provider);

  let pool_amount_a;
  let pool_amount_b;

  if (
    (tokenA === "lpUSD" && tokenB === "USDC") ||
    (tokenA === "USDC" && tokenB === "lpUSD") ||
    (tokenA === "lpSOL" && tokenB === "wSOL") ||
    (tokenA === "wSOL" && tokenB === "lpSOL")
  ) {
    let PoolAddress;

    if (
      (tokenA === "lpUSD" && tokenB === "USDC") ||
      (tokenA === "USDC" && tokenB === "lpUSD")
    ) {
      PoolAddress = lpUSD_USDC_Pool;
    } else if (
      (tokenA === "lpSOL" && tokenB === "wSOL") ||
      (tokenA === "wSOL" && tokenB === "lpSOL")
    ) {
      PoolAddress = lpSOL_wSOL_Pool;
    }

    const programId = new PublicKey(stable_swap.metadata.address);
    const program = new anchor.Program(stable_swap, programId);

    let poolAccount = await program.account.stableswapPool.fetch(PoolAddress);
    pool_amount_a = poolAccount.amountA;
    pool_amount_b = poolAccount.amountB;
  } else if (
    (tokenA === "LPFi" && tokenB === "USDC") ||
    (tokenA === "USDC" && tokenB === "LPFi")
  ) {
    const programId = new PublicKey(uniswap.metadata.address);
    const program = new anchor.Program(uniswap, programId);

    const PoolData = await program.account.uniswapPool.fetch(LPFi_USDC_Pool);

    pool_amount_a = PoolData.amountA;
    pool_amount_b = PoolData.amountB;
  }

  let amount = "";

  if (
    (tokenA === "lpUSD" && tokenB === "USDC") ||
    (tokenA === "lpSOL" && tokenB === "wSOL") ||
    (tokenA === "LPFi" && tokenB === "USDC")
  ) {
    amount = (pool_amount_b / pool_amount_a) * amountA;
  } else if (
    (tokenA === "USDC" && tokenB === "lpUSD") ||
    (tokenA === "wSOL" && tokenB === "lpSOL") ||
    (tokenA === "USDC" && tokenB === "LPFi")
  ) {
    amount = (pool_amount_a / pool_amount_b) * amountA;
  }
  return amount;
};

// add liquidity pool for StableSwap
export const add_liquidity_StableSwap = (
  wallet,
  tokenA,
  tokenB,
  amountA,
  amountB,
  setTopAmount,
  setBottomAmount,
  setRequired
) => {
  return async (dispatch) => {
    try {
      dispatch(
        setContracts(
          true,
          true,
          "progress",
          "Start Add Liquidity...",
          "Add Liquidity"
        )
      );

      let AMOUNT_A = "";
      let PoolAddress = "";

      if (tokenA === "lpUSD" && tokenB === "USDC") {
        AMOUNT_A = amountA;
        PoolAddress = lpUSD_USDC_Pool;
      } else if (tokenA === "USDC" && tokenB === "lpUSD") {
        AMOUNT_A = amountB;
        PoolAddress = lpUSD_USDC_Pool;
      } else if (tokenA === "lpSOL" && tokenB === "wSOL") {
        AMOUNT_A = amountA;
        PoolAddress = lpSOL_wSOL_Pool;
      } else if (tokenA === "wSOL" && tokenB === "lpSOL") {
        AMOUNT_A = amountB;
        PoolAddress = lpSOL_wSOL_Pool;
      }

      const userAuthority = wallet.publicKey;

      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(stable_swap.metadata.address);

      const program = new anchor.Program(stable_swap, programId);

      try {
        let poolAccount = await program.account.stableswapPool.fetch(
          PoolAddress
        );

        const token_a = poolAccount.tokenA;
        const token_b = poolAccount.tokenB;
        const token_lp = poolAccount.tokenLp;

        const author_ata_a = await findAssociatedTokenAddress(
          userAuthority,
          token_a
        );

        const author_ata_b = await findAssociatedTokenAddress(
          userAuthority,
          token_b
        );

        const pool_ata_a = await findAssociatedTokenAddress(
          PoolAddress,
          token_a
        );

        const pool_ata_b = await findAssociatedTokenAddress(
          PoolAddress,
          token_b
        );

        const author_ata_lp = await findAssociatedTokenAddress(
          userAuthority,
          token_lp
        );

        const amountA_wei = convert_to_wei(AMOUNT_A);

        const amount_a = new anchor.BN(amountA_wei);

        await program.rpc.addLiquidityStableswap(amount_a, {
          accounts: {
            stableSwapPool: PoolAddress,
            adder: userAuthority,
            tokenA: token_a,
            tokenB: token_b,
            adderAtaA: author_ata_a,
            adderAtaB: author_ata_b,
            poolAtaA: pool_ata_a,
            poolAtaB: pool_ata_b,
            tokenLp: token_lp,
            adderAtaLp: author_ata_lp,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });

        dispatch(
          setContracts(
            true,
            false,
            "success",
            "Successfully Added Liquidity. Click Ok to go back.",
            "Add Liquidity"
          )
        );

        setTopAmount("");
        setBottomAmount("");
        setRequired(false);

        dispatch(RefreshLiquidityPoolData(wallet, userAuthority));
      } catch (err) {
        console.log(err);
        dispatch(
          setContracts(
            true,
            false,
            "error",
            "Add Liquidity failed. Click Ok to go back and try again.",
            "Add Liquidity"
          )
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Add Liquidity failed. Click Ok to go back and try again.",
          "Add Liquidity"
        )
      );
    }
  };
};

// add liquidity pool for NormalSwap
export const add_liquidity_NormalSwap = (
  wallet,
  tokenA,
  tokenB,
  amountA,
  amountB,
  setTopAmount,
  setBottomAmount,
  setRequired
) => {
  return async (dispatch) => {
    try {
      dispatch(
        setContracts(
          true,
          true,
          "progress",
          "Start Add Liquidity...",
          "Add Liquidity"
        )
      );

      let AMOUNT_A;

      if (tokenA === "LPFi" && tokenB === "USDC") {
        AMOUNT_A = amountA;
      } else if (tokenA === "USDC" && tokenB === "LPFi") {
        AMOUNT_A = amountB;
      }

      const userAuthority = wallet.publicKey;

      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(uniswap.metadata.address);

      const program = new anchor.Program(uniswap, programId);

      const PoolData = await program.account.uniswapPool.fetch(LPFi_USDC_Pool);

      const token_a = PoolData.tokenA;
      const token_b = PoolData.tokenB;
      const token_lp = PoolData.tokenLp;

      const author_ata_a = await findAssociatedTokenAddress(
        userAuthority,
        token_a
      );

      const author_ata_b = await findAssociatedTokenAddress(
        userAuthority,
        token_b
      );

      const pool_ata_a = await findAssociatedTokenAddress(
        LPFi_USDC_Pool,
        token_a
      );

      const pool_ata_b = await findAssociatedTokenAddress(
        LPFi_USDC_Pool,
        token_b
      );

      const author_ata_lp = await findAssociatedTokenAddress(
        userAuthority,
        token_lp
      );

      const a_wei = convert_to_wei(AMOUNT_A);
      const amount_a = new anchor.BN(a_wei);

      await program.rpc.addLiquidityUniswap(amount_a, {
        accounts: {
          uniswapPool: LPFi_USDC_Pool,
          adder: userAuthority,
          tokenA: token_a,
          tokenB: token_b,
          adderAtaA: author_ata_a,
          adderAtaB: author_ata_b,
          poolAtaA: pool_ata_a,
          poolAtaB: pool_ata_b,
          tokenLp: token_lp,
          adderAtaLp: author_ata_lp,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      dispatch(
        setContracts(
          true,
          false,
          "success",
          "Successfully Added Liquidity. Click Ok to go back.",
          "Add Liquidity"
        )
      );
      setTopAmount("");
      setBottomAmount("");
      setRequired(false);
      dispatch(RefreshLiquidityPoolData(wallet, userAuthority));
    } catch (error) {
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Add Liquidity failed. Click Ok to go back and try again.",
          "Add Liquidity"
        )
      );
    }
  };
};

// remove liquidity pool for NormalSwap
export const remove_liquidity_NormalSwap = (
  wallet,
  amount,
  setAmount,
  setRequired
) => {
  return async (dispatch) => {
    try {
      dispatch(
        setContracts(
          true,
          true,
          "progress",
          "Start Remove Liquidity...",
          "Remove Liquidity"
        )
      );

      const userAuthority = wallet.publicKey;

      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(uniswap.metadata.address);

      const program = new anchor.Program(uniswap, programId);

      let poolAccount = await program.account.uniswapPool.fetch(LPFi_USDC_Pool);

      const token_a = poolAccount.tokenA;
      const token_b = poolAccount.tokenB;
      const token_lp = poolAccount.tokenLp;

      const author_ata_a = await findAssociatedTokenAddress(
        userAuthority,
        token_a
      );

      const author_ata_b = await findAssociatedTokenAddress(
        userAuthority,
        token_b
      );

      const pool_ata_a = await findAssociatedTokenAddress(
        LPFi_USDC_Pool,
        token_a
      );

      const pool_ata_b = await findAssociatedTokenAddress(
        LPFi_USDC_Pool,
        token_b
      );

      const author_ata_lp = await findAssociatedTokenAddress(
        userAuthority,
        token_lp
      );

      const amount_wei = parseInt(parseFloat(amount) * 1e5).toString();

      const amount_lp = new anchor.BN(amount_wei);

      await program.rpc.removeLiquidityUniswap(amount_lp, {
        accounts: {
          uniswapPool: LPFi_USDC_Pool,
          taker: userAuthority,
          tokenA: token_a,
          tokenB: token_b,
          takerAtaA: author_ata_a,
          takerAtaB: author_ata_b,
          poolAtaA: pool_ata_a,
          poolAtaB: pool_ata_b,
          tokenLp: token_lp,
          takerAtaLp: author_ata_lp,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      dispatch(
        setContracts(
          true,
          false,
          "success",
          "Successfully Remove Liquidity. Click Ok to go back.",
          "Remove Liquidity"
        )
      );

      setAmount("");
      setRequired(false);
      dispatch(RefreshLiquidityPoolData(wallet, userAuthority));
    } catch (error) {
      console.log(error);
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Remove Liquidity failed. Click Ok to go back and try again.",
          "Remove Liquidity"
        )
      );
    }
  };
};

// add liquidity pool for NormalSwap
export const remove_liquidity_StableSwap = (
  wallet,
  amount,
  TokenA,
  TokenB,
  setAmount,
  setRequired
) => {
  return async (dispatch) => {
    try {
      dispatch(
        setContracts(
          true,
          true,
          "progress",
          "Start Remove Liquidity...",
          "Remove Liquidity"
        )
      );

      const userAuthority = wallet.publicKey;

      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(stable_swap.metadata.address);

      const program = new anchor.Program(stable_swap, programId);

      let pool_pubkey;

      if (TokenA === "lpUSD" && TokenB === "USDC") {
        pool_pubkey = lpUSD_USDC_Pool;
      } else if (TokenA === "lpSOL" && TokenB === "wSOL") {
        pool_pubkey = lpSOL_wSOL_Pool;
      }

      let poolAccount = await program.account.stableswapPool.fetch(pool_pubkey);

      const token_a = poolAccount.tokenA;
      const token_b = poolAccount.tokenB;
      const token_lp = poolAccount.tokenLp;

      const author_ata_a = await findAssociatedTokenAddress(
        userAuthority,
        token_a
      );

      const author_ata_b = await findAssociatedTokenAddress(
        userAuthority,
        token_b
      );

      const pool_ata_a = await findAssociatedTokenAddress(pool_pubkey, token_a);

      const pool_ata_b = await findAssociatedTokenAddress(pool_pubkey, token_b);

      const author_ata_lp = await findAssociatedTokenAddress(
        userAuthority,
        token_lp
      );

      const amount_wei = parseInt(parseFloat(amount) * 1e5).toString();

      const amount_lp = new anchor.BN(amount_wei);

      await program.rpc.removeLiquidityStableswap(amount_lp, {
        accounts: {
          stableSwapPool: pool_pubkey,
          taker: userAuthority,
          tokenA: token_a,
          tokenB: token_b,
          takerAtaA: author_ata_a,
          takerAtaB: author_ata_b,
          poolAtaA: pool_ata_a,
          poolAtaB: pool_ata_b,
          tokenLp: token_lp,
          takerAtaLp: author_ata_lp,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      dispatch(
        setContracts(
          true,
          false,
          "success",
          "Successfully Remove Liquidity. Click Ok to go back.",
          "Remove Liquidity"
        )
      );

      setAmount("");
      setRequired(false);
      dispatch(RefreshLiquidityPoolData(wallet, userAuthority));
    } catch (error) {
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Remove Liquidity failed. Click Ok to go back and try again.",
          "Remove Liquidity"
        )
      );
    }
  };
};
