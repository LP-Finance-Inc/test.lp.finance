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

export const add_liquidity = (wallet, tokenA, tokenB, amountA, amountB) => {
  return async (dispatch) => {
    try {
      console.log(tokenA, tokenB, amountA, amountB);
      const userAuthority = wallet.publicKey;

      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_base.metadata.address);

      console.log(programId.toString());

      const program = new anchor.Program(swap_base, programId);

      const PDA = await PublicKey.findProgramAddress(
        [Buffer.from(liquidity_pool_name)],
        program.programId
      );

      const token_mint_a = getMintAddress(tokenA);
      const token_mint_b = getMintAddress(tokenB);

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

      console.log(ata_user_a.toString());
      console.log(ata_user_b.toString());

      try {
        console.log(LpUSD_USDC_Pool.toString());
        let poolAccount = await program.account.pool.fetch(LpUSD_USDC_Pool);

        console.log(poolAccount);

        const amountA_wei = convert_to_wei(amountA);
        const amount_a = new anchor.BN(amountA_wei);

        const token_acc_a = poolAccount.tokenAccA;
        const token_acc_b = poolAccount.tokenAccB;
        const token_acc_lp = poolAccount.tokenAccLp;
        const token_lp = poolAccount.tokenLp;

        console.log(token_acc_a.toString());
        console.log(token_acc_b.toString());
        console.log(token_acc_lp.toString());
        console.log(token_lp.toString());

        const ata_user_lp = await PublicKey.findProgramAddress(
          [
            Buffer.from(userAuthority.toBuffer()),
            TOKEN_PROGRAM_ID.toBuffer(),
            token_lp.toBuffer(),
          ],
          ASSOCIATED_TOKEN_PROGRAM_ID
        );

        console.log(ata_user_lp);

        const x = await program.rpc.addLiquidity(
          amount_a,
          liquidity_pool_name,
          PDA[1],
          {
            accounts: {
              pool: LpUSD_USDC_Pool,
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

        console.log(x);
      } catch (err) {
        console.log(err);
      }
    } catch (error) {}
  };
};
