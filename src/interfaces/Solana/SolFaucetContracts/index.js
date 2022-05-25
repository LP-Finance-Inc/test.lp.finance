import * as anchor from "@project-serum/anchor";
import getProvider from "../../../lib/Solana/getProvider";
import { setContracts } from "../../../redux/actions";
import lendingIDL from "../../../lib/Solana/idls/lending_tokens.json";
import * as LENDING_Constants from "../../../lib/Solana/Solana_constants/lending_constants";
import {
  btcMint,
  usdcMint,
  msolMint,
  ethMint,
  ustMint,
  srmMint,
  scnsolMint,
  stsolMint,
  usdtMint,
  lpbtcMint,
  lpethMint,
  lpsolMint,
  lpusdMint,
} from "../../../lib/Solana/common";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";

const { PublicKey, Connection, SystemProgram, SYSVAR_RENT_PUBKEY } =
  anchor.web3;

const tmsolMint = msolMint;

const getTokenMint = (token_name) => {
  if (token_name === "USDC") return usdcMint;
  if (token_name === "BTC") return btcMint;
  if (token_name === "mSOL") return tmsolMint;
  if (token_name === "ETH") return ethMint;
  if (token_name === "UST") return ustMint;
  if (token_name === "SRM") return srmMint;
  if (token_name === "scnSOL") return scnsolMint;
  if (token_name === "stSOL") return stsolMint;
  if (token_name === "USDT") return usdtMint;
  if (token_name === "lpBTC") return lpbtcMint;
  if (token_name === "lpETH") return lpethMint;
  if (token_name === "lpSOL") return lpsolMint;
  if (token_name === "lpUSD") return lpusdMint;
  return "";
};

// Enter depositing
export const request_faucet = (keyword, wallet, amount) => {
  return async (dispatch) => {
    dispatch(
      setContracts(true, true, "progress", "Requesting Faucet...", "Faucet")
    );

    const userAuthority = wallet.publicKey;

    if (keyword === "SOL") {
      try {
        const NATIVE_NETWORK = "https://api.devnet.solana.com";
        const connection = new Connection(NATIVE_NETWORK, "processed");

        let airdropSignature = await connection.requestAirdrop(
          userAuthority,
          anchor.web3.LAMPORTS_PER_SOL
        );

        await connection.confirmTransaction(airdropSignature);

        dispatch(
          setContracts(
            true,
            false,
            "success",
            `Successfully transferred ${amount} ${keyword} to your account. Click Ok to go back.`,
            "Faucet"
          )
        );
      } catch (err) {
        dispatch(
          setContracts(
            true,
            false,
            "error",
            "Request Faucet failed. Claim manually on solfaucet.com.",
            "Faucet"
          )
        );
      }
      return;
    }

    const provider = await getProvider(wallet);
    anchor.setProvider(provider);

    const tokenMint = getTokenMint(keyword);

    const userToken = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      tokenMint,
      userAuthority
    );

    const programId = new PublicKey(lendingIDL.metadata.address);
    const program = new anchor.Program(lendingIDL, programId);
    const stateAccount = LENDING_Constants.lendingStateAccount;
    const mintAmount = new anchor.BN(amount * 1e9);

    try {
      await program.rpc.mintToken(mintAmount, {
        accounts: {
          owner: userAuthority,
          stateAccount,
          userToken,
          tokenMint,
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
          `Successfully transferred ${amount} ${keyword} to your account. Click Ok to go back.`,
          "Faucet"
        )
      );
    } catch (err) {
      console.log(err);
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Request Faucet failed. Click Ok to go back and try again.",
          "Faucet"
        )
      );
    }
  };
};
