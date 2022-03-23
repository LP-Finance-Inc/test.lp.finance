import * as anchor from "@project-serum/anchor";
import { setContracts } from "../../redux/actions";
import getProvider from "../../lib/helpers/getProvider";
import idl from "../../lib/idls/lpfinance_swap.json";
import { convert_to_wei } from "../../lib/helpers/common";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import {
  stateAccount,
  poolUsdc,
  poolBtc,
  poolLpsol,
  poolLpusd,
  poolMsol,
} from "../../lib/helpers/lp_constants/swap_constants";
import {
  lpsolMint,
  lpusdMint,
  usdcMint,
  msolMint,
  btcMint,
  pythBtcAccount,
  pythMsolAccount,
  pythUsdcAccount,
  pythSolAccount,
} from "../../lib/helpers/common";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

const getTokenMint = (token_name) => {
  if (token_name == "tUSDC") return usdcMint;
  if (token_name == "tBTC") return btcMint;
  if (token_name == "lpSOL") return lpsolMint;
  if (token_name == "lpUSD") return lpusdMint;
  if (token_name == "tmSOL") return msolMint;
  return "";
};

const getPoolMint = (token_name) => {
  if (token_name == "tUSDC") return poolUsdc;
  if (token_name == "tBTC") return poolBtc;
  if (token_name == "lpSOL") return poolLpsol;
  if (token_name == "lpUSD") return poolLpusd;
  if (token_name == "tmSOL") return poolMsol;
  return "";
};

const getPythMint = (token_name) => {
  if (token_name == "tUSDC") return pythUsdcAccount;
  if (token_name == "tBTC") return pythBtcAccount;
  if (token_name == "lpSOL") return pythSolAccount;
  if (token_name == "lpUSD") return pythUsdcAccount;
  if (token_name == "tmSOL") return pythMsolAccount;
  return "";
};

// Enter depositing
export const SwapSOLToToken = (
  keyword,
  wallet,
  swapAmount,
  setTopSwapBalance,
  setBottomSwapBalance,
  setRequired,
  setSwapMessage
) => {
  return async (dispatch) => {
    dispatch(setContracts(true, true, "progress", "Start Swap...", "Swap"));

    const userAuthority = wallet.publicKey;
    const provider = await getProvider(wallet);
    anchor.setProvider(provider);
    // address of deployed program
    const programId = new PublicKey(idl.metadata.address);
    // Generate the program client from IDL.
    const program = new anchor.Program(idl, programId);

    const userDest = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      getTokenMint(keyword),
      userAuthority
    );

    try {
      // SOL decimal is 9
      const amout_wei = convert_to_wei(swapAmount);
      const swap_amount = new anchor.BN(amout_wei); // '100000000'

      await program.rpc.swapSolToToken(swap_amount, {
        accounts: {
          userAuthority,
          stateAccount,
          destMint: getTokenMint(keyword),
          userDest,
          destPool: getPoolMint(keyword),
          pythQuoteAccount: pythSolAccount,
          pythDestAccount: getPythMint(keyword),
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
          `Successfully swapped to ${keyword}. Click Ok to go Back.`,
          "Swap"
        )
      );
      setRequired(false);
      setTopSwapBalance("");
      setBottomSwapBalance("");
      setSwapMessage("Enter an amount");
    } catch (err) {
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Swap failed. Click Ok to go back and try again.",
          "Swap"
        )
      );
    }
  };
};
// Enter depositing
export const SwapTokenToSOL = (
  keyword,
  wallet,
  swapAmount,
  setTopSwapBalance,
  setBottomSwapBalance,
  setRequired,
  setSwapMessage
) => {
  return async (dispatch) => {
    dispatch(setContracts(true, true, "progress", "Start Swap...", "Swap"));

    const userAuthority = wallet.publicKey;
    const provider = await getProvider(wallet);
    anchor.setProvider(provider);
    // address of deployed program
    const programId = new PublicKey(idl.metadata.address);
    // Generate the program client from IDL.
    const program = new anchor.Program(idl, programId);

    const userQuote = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      getTokenMint(keyword),
      userAuthority
    );

    try {
      // SOL decimal is 9
      const amout_wei = convert_to_wei(swapAmount);
      const swap_amount = new anchor.BN(amout_wei); // '100000000'

      await program.rpc.swapTokenToSol(swap_amount, {
        accounts: {
          userAuthority,
          stateAccount,
          quoteMint: getTokenMint(keyword),
          userQuote,
          quotePool: getPoolMint(keyword),
          pythQuoteAccount: getPythMint(keyword),
          pythDestAccount: pythSolAccount,
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
          `Successfully swapped to ${keyword}. Click Ok to go back.`,
          "Swap"
        )
      );
      setRequired(false);
      setTopSwapBalance("");
      setBottomSwapBalance("");
      setSwapMessage("Enter an amount");
    } catch (err) {
      console.log(err);
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Swap failed. Click Ok to go back and try again.",
          "Swap"
        )
      );
    }
  };
};

// Enter depositing
export const SwapTokenToToken = (
  quote_key,
  dest_key,
  wallet,
  swapAmount,
  setTopSwapBalance,
  setBottomSwapBalance,
  setRequired,
  setSwapMessage
) => {
  return async (dispatch) => {
    console.log(
      quote_key,
      dest_key,
      wallet,
      swapAmount,
      setTopSwapBalance,
      setBottomSwapBalance,
      setRequired,
      setSwapMessage
    );
    dispatch(setContracts(true, true, "progress", "Start Swap...", "Swap"));

    const userAuthority = wallet.publicKey;
    const provider = await getProvider(wallet);
    anchor.setProvider(provider);
    // address of deployed program
    const programId = new PublicKey(idl.metadata.address);
    // Generate the program client from IDL.
    const program = new anchor.Program(idl, programId);

    const userQuote = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      getTokenMint(quote_key),
      userAuthority
    );
    const userDest = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      getTokenMint(dest_key),
      userAuthority
    );

    try {
      // SOL decimal is 9
      const amout_wei = convert_to_wei(swapAmount);
      const swap_amount = new anchor.BN(amout_wei);

      await program.rpc.swapTokenToToken(swap_amount, {
        accounts: {
          userAuthority,
          stateAccount,
          quoteMint: getTokenMint(quote_key),
          destMint: getTokenMint(dest_key),
          userQuote,
          userDest,
          quotePool: getPoolMint(quote_key),
          destPool: getPoolMint(dest_key),
          pythQuoteAccount: getPythMint(quote_key),
          pythDestAccount: getPythMint(dest_key),
          systemProgram: SystemProgram.programId,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      dispatch(
        setContracts(
          true,
          false,
          "success",
          `Successfully swapped to ${dest_key}. Click Ok to go back.`,
          "Swap"
        )
      );
      setRequired(false);
      setTopSwapBalance("");
      setBottomSwapBalance("");
      setSwapMessage("Enter an amount");
    } catch (err) {
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Swap failed. Click Ok to go back and try again.",
          "Swap"
        )
      );
    }
  };
};
