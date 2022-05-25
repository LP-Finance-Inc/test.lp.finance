import * as anchor from "@project-serum/anchor";
import { setContracts } from "../../../redux/actions";
import getProvider from "../../../lib/Solana/getProvider";
import idl from "../../../lib/Solana/idls/lpfinance_swap.json";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import {
  stateAccount,
  poolUsdc,
  poolBtc,
  poolMsol,
  poolEth,
  poolUst,
  poolScnsol,
  poolStsol,
  poolUsdt,
  poolSrm,
  poolLpsol,
  poolLpusd,
  poolLpbtc,
  poolLpeth,
} from "../../../lib/Solana/Solana_constants/swap_constants";
import {
  convert_to_wei,
  lpsolMint,
  lpusdMint,
  lpbtcMint,
  lpethMint,
  usdcMint,
  msolMint,
  btcMint,
  ethMint,
  ustMint,
  srmMint,
  scnsolMint,
  stsolMint,
  usdtMint,
  pythBtcAccount,
  pythMsolAccount,
  pythUsdcAccount,
  pythSolAccount,
  pythEthAccount,
  pythUstAccount,
  pythSrmAccount,
  pythScnsolAccount,
  pythStsolAccount,
  pythUsdtAccount,
} from "../../../lib/Solana/common";
const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

const getTokenMint = (token_name) => {
  if (token_name === "USDC") return usdcMint;
  if (token_name === "BTC") return btcMint;
  if (token_name === "mSOL") return msolMint;
  if (token_name === "ETH") return ethMint;
  if (token_name === "UST") return ustMint;
  if (token_name === "SRM") return srmMint;
  if (token_name === "scnSOL") return scnsolMint;
  if (token_name === "stSOL") return stsolMint;
  if (token_name === "USDT") return usdtMint;
  if (token_name === "lpSOL") return lpsolMint;
  if (token_name === "lpUSD") return lpusdMint;
  if (token_name === "lpBTC") return lpbtcMint;
  if (token_name === "lpETH") return lpethMint;
  return "";
};

const getPoolMint = (token_name) => {
  if (token_name === "USDC") return poolUsdc;
  if (token_name === "BTC") return poolBtc;
  if (token_name === "mSOL") return poolMsol;
  if (token_name === "ETH") return poolEth;
  if (token_name === "UST") return poolUst;
  if (token_name === "SRM") return poolSrm;
  if (token_name === "scnSOL") return poolScnsol;
  if (token_name === "stSOL") return poolStsol;
  if (token_name === "USDT") return poolUsdt;
  if (token_name === "lpSOL") return poolLpsol;
  if (token_name === "lpUSD") return poolLpusd;
  if (token_name === "lpBTC") return poolLpbtc;
  if (token_name === "lpETH") return poolLpeth;
  return "";
};

const getPythMint = (token_name) => {
  if (token_name === "USDC") return pythUsdcAccount;
  if (token_name === "BTC") return pythBtcAccount;
  if (token_name === "mSOL") return pythMsolAccount;
  if (token_name === "ETH") return pythEthAccount;
  if (token_name === "UST") return pythUstAccount;
  if (token_name === "SRM") return pythSrmAccount;
  if (token_name === "scnSOL") return pythScnsolAccount;
  if (token_name === "stSOL") return pythStsolAccount;
  if (token_name === "USDT") return pythUsdtAccount;
  if (token_name === "lpSOL") return pythSolAccount;
  if (token_name === "lpUSD") return pythUsdcAccount;
  if (token_name === "lpBTC") return pythBtcAccount;
  if (token_name === "lpETH") return pythEthAccount;
  return "";
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
