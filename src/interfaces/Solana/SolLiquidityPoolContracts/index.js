import * as anchor from "@project-serum/anchor";
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import swap_base from "../../../lib/Solana/idls/swap_base.json";
import lpfinance_swap from "../../../lib/Solana/idls/lpfinance_swap.json";
import { convert_to_wei } from "../../../lib/Solana/common";
import getProvider from "../../../lib/Solana/getProvider";
import { setContracts } from "../../../redux/actions";
import {
  liquidityPoolStableSwap_name,
  LpUSD_USDC_Pool,
  LpSOL_wSOL_Pool,
  LPFi_Pool,
  USDC_Pool,
  LiquidityPool,
  LPFi_USDC_Pool,
} from "../../../lib/Solana/Solana_constants/liquidity_pool_constants";

import { RefreshLiquidityPoolData } from "../../../helper/Solana/global";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

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
      PoolAddress = LpUSD_USDC_Pool;
    } else if (
      (tokenA === "lpSOL" && tokenB === "wSOL") ||
      (tokenA === "wSOL" && tokenB === "lpSOL")
    ) {
      PoolAddress = LpSOL_wSOL_Pool;
    }

    const programId = new PublicKey(swap_base.metadata.address);
    const program = new anchor.Program(swap_base, programId);

    let poolAccount = await program.account.pool.fetch(PoolAddress);
    pool_amount_a = poolAccount.amountA;
    pool_amount_b = poolAccount.amountB;
  } else if (
    (tokenA === "LPFi" && tokenB === "USDC") ||
    (tokenA === "USDC" && tokenB === "LPFi")
  ) {
    const programId = new PublicKey(lpfinance_swap.metadata.address);
    const program = new anchor.Program(lpfinance_swap, programId);

    const PoolData = await program.account.poolInfo.fetch(LPFi_USDC_Pool);

    pool_amount_a = PoolData.tokenaAmount;
    pool_amount_b = PoolData.tokenbAmount;
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
        PoolAddress = LpUSD_USDC_Pool;
      } else if (tokenA === "USDC" && tokenB === "lpUSD") {
        AMOUNT_A = amountB;
        PoolAddress = LpUSD_USDC_Pool;
      } else if (tokenA === "lpSOL" && tokenB === "wSOL") {
        AMOUNT_A = amountA;
        PoolAddress = LpSOL_wSOL_Pool;
      } else if (tokenA === "wSOL" && tokenB === "lpSOL") {
        AMOUNT_A = amountB;
        PoolAddress = LpSOL_wSOL_Pool;
      }

      const userAuthority = wallet.publicKey;

      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_base.metadata.address);

      const program = new anchor.Program(swap_base, programId);

      const PDA = await PublicKey.findProgramAddress(
        [Buffer.from(liquidityPoolStableSwap_name)],
        program.programId
      );

      try {
        let poolAccount = await program.account.pool.fetch(PoolAddress);

        const token_mint_a = poolAccount.tokenA;
        const token_mint_b = poolAccount.tokenB;

        const ata_user_a = await Token.getAssociatedTokenAddress(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          token_mint_a,
          userAuthority
        );

        const ata_user_b = await Token.getAssociatedTokenAddress(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          token_mint_b,
          userAuthority
        );

        const amountA_wei = convert_to_wei(AMOUNT_A);

        const amount_a = new anchor.BN(amountA_wei);

        const token_acc_a = poolAccount.tokenAccA;
        const token_acc_b = poolAccount.tokenAccB;
        const token_acc_lp = poolAccount.tokenAccLp;
        const token_lp = poolAccount.tokenLp;

        const [ata_user_lp, bump] = await PublicKey.findProgramAddress(
          [
            Buffer.from(userAuthority.toBuffer()),
            TOKEN_PROGRAM_ID.toBuffer(),
            token_lp.toBuffer(),
          ],
          ASSOCIATED_TOKEN_PROGRAM_ID
        );

        await program.rpc.addLiquidity(
          amount_a,
          liquidityPoolStableSwap_name,
          PDA[1],
          {
            accounts: {
              pool: PoolAddress,
              adder: userAuthority,
              adderAccA: ata_user_a,
              adderAccB: ata_user_b,
              tokenAccA: token_acc_a,
              tokenAccB: token_acc_b,
              tokenLp: token_lp,
              ataAdderLp: ata_user_lp,
              tokenAccLp: token_acc_lp,
              poolPda: PDA[0],
              systemProgram: SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
              associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
              rent: SYSVAR_RENT_PUBKEY,
            },
          }
        );

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
      let AMOUNT_B;

      if (tokenA === "LPFi" && tokenB === "USDC") {
        AMOUNT_A = amountA;
        AMOUNT_B = amountB;
      } else if (tokenA === "USDC" && tokenB === "LPFi") {
        AMOUNT_A = amountB;
        AMOUNT_B = amountA;
      }

      const userAuthority = wallet.publicKey;

      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(lpfinance_swap.metadata.address);

      const program = new anchor.Program(lpfinance_swap, programId);

      const PoolData = await program.account.poolInfo.fetch(LPFi_USDC_Pool);

      const tokena_mint = PoolData.tokenaMint;
      const tokenb_mint = PoolData.tokenbMint;

      try {
        const userTokena = await Token.getAssociatedTokenAddress(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          tokena_mint,
          userAuthority,
          true
        );

        const userTokenb = await Token.getAssociatedTokenAddress(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          tokenb_mint,
          userAuthority,
          true
        );

        const a_wei = convert_to_wei(AMOUNT_A);
        const b_wei = convert_to_wei(AMOUNT_B);
        const tokena_amount = new anchor.BN(a_wei);
        const tokenb_amount = new anchor.BN(b_wei);

        await program.rpc.addLiquidity(tokena_amount, tokenb_amount, {
          accounts: {
            authority: userAuthority,
            tokenaMint: tokena_mint,
            tokenbMint: tokenb_mint,
            liquidityPool: LiquidityPool,
            userTokena: userTokena,
            userTokenb: userTokenb,
            tokenaPool: LPFi_Pool,
            tokenbPool: USDC_Pool,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
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
