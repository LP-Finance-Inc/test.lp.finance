import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import swap_base from "../../../lib/Solana/idls/swap_base.json";
import {
  lpSOLMint,
  lpUSDMint,
  USDCMint,
  wSOLMint,
  LPFiMint,
  convert_to_wei,
} from "../../../lib/Solana/common";
import getProvider from "../../../lib/Solana/getProvider";
import { setContracts } from "../../../redux/actions";
import {
  liquidity_pool_name,
  LpUSD_USDC_Pool,
  LpSOL_wSOL_Pool,
} from "../../../lib/Solana/Solana_constants/liquidity_pool_constants";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

const getMintAddress = (token) => {
  let MintAddress = "";

  if (token === "lpUSD") {
    MintAddress = lpUSDMint;
  } else if (token === "USDC") {
    MintAddress = USDCMint;
  } else if (token === "lpSOL") {
    MintAddress = lpSOLMint;
  } else if (token === "wSOL") {
    MintAddress = wSOLMint;
  } else if (token === "LPFi") {
    MintAddress = LPFiMint;
  }
  return MintAddress;
};

export const getAmountB = async (wallet, tokenA, tokenB, amountA) => {
  const provider = await getProvider(wallet);
  anchor.setProvider(provider);
  const programId = new PublicKey(swap_base.metadata.address);
  const program = new anchor.Program(swap_base, programId);

  let PoolAddress;

  console.log("===========", tokenA, tokenB, amountA)
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
  } else {
    console.log("Invalid token")
  }

  console.log("===========2", PoolAddress)
  let poolAccount = await program.account.pool.fetch(PoolAddress);
  const pool_amount_a = poolAccount.amountA;
  const pool_amount_b = poolAccount.amountB;

  let amount = "";

  if (
    (tokenA === "lpUSD" && tokenB === "USDC") ||
    (tokenA === "lpSOL" && tokenB === "wSOL")
  ) {
    amount = (pool_amount_b / pool_amount_a) * amountA;
  } else if (
    (tokenA === "USDC" && tokenB === "lpUSD") ||
    (tokenA === "wSOL" && tokenB === "lpSOL")
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

      // let TOKEN_A = "";
      // let TOKEN_B = "";
      let AMOUNT_A = "";
      let PoolAddress = "";

      if (tokenA === "lpUSD" && tokenB === "USDC") {
        // TOKEN_A = tokenA;
        // TOKEN_B = tokenB;
        AMOUNT_A = amountA;
        PoolAddress = LpUSD_USDC_Pool;
      } else if (tokenA === "USDC" && tokenB === "lpUSD") {
        // TOKEN_A = tokenB;
        // TOKEN_B = tokenA;
        AMOUNT_A = amountB;
        PoolAddress = LpUSD_USDC_Pool;
      } else if (tokenA === "lpSOL" && tokenB === "wSOL") {
        // TOKEN_A = tokenA;
        // TOKEN_B = tokenB;
        AMOUNT_A = amountA;
        PoolAddress = LpSOL_wSOL_Pool;
      } else if (tokenA === "wSOL" && tokenB === "lpSOL") {
        // TOKEN_A = tokenB;
        // TOKEN_B = tokenA;
        AMOUNT_A = amountB;
        PoolAddress = LpSOL_wSOL_Pool;
      }

      const userAuthority = wallet.publicKey;

      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_base.metadata.address);

      const program = new anchor.Program(swap_base, programId);

      const PDA = await PublicKey.findProgramAddress(
        [Buffer.from(liquidity_pool_name)],
        program.programId
      );


      try {
        let poolAccount = await program.account.pool.fetch(PoolAddress);

        const token_mint_a = poolAccount.tokenA; // getMintAddress(TOKEN_A);
        const token_mint_b = poolAccount.tokenB; // getMintAddress(TOKEN_B);
  
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

        console.log("AmountA:", AMOUNT_A)
        const amountA_wei = convert_to_wei(AMOUNT_A);
        console.log("AmountA2:", amountA_wei)
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

        console.log(
          tokenA,
          tokenB,
          amountA,
          amountB
        )

        console.log(token_mint_a.toBase58(), poolAccount.tokenA.toBase58())
        console.log(token_mint_b.toBase58(), poolAccount.tokenB.toBase58())

        console.log(ata_user_a.toBase58())
        console.log(ata_user_b.toBase58())
        console.log(token_acc_a.toBase58())
        console.log(token_acc_b.toBase58())
        console.log(token_lp.toBase58())
        console.log(ata_user_lp.toBase58())
        console.log(token_acc_lp.toBase58())
        console.log(ata_user_a.toBase58())

        await program.rpc.addLiquidity(amount_a, liquidity_pool_name, PDA[1], {
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
