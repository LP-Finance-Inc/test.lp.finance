import * as anchor from "@project-serum/anchor";
import getProvider from "../../lib/helpers/getProvider";
import { setContracts } from "../../redux/actions";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import idl from "../../lib/idls/faucet.json";
import { NETWORK } from "../../lib/helpers/connection";
import { btcMint, usdcMint, msolMint } from "../../lib/helpers/common";
import {
  poolBtc,
  poolUsdc,
  poolTmsol,
  faucet_name,
} from "../../lib/helpers/lp_constants/faucet_constants";

const { PublicKey, Connection, SystemProgram, SYSVAR_RENT_PUBKEY } =
  anchor.web3;

const tmsolMint = msolMint;

const getTokenMint = (token_name) => {
  if (token_name == "tUSDC") return usdcMint;
  if (token_name == "tBTC") return btcMint;
  if (token_name == "tmSOL") return tmsolMint;
  return "";
};

const getPoolMint = (token_name) => {
  if (token_name == "tUSDC") return poolUsdc;
  if (token_name == "tBTC") return poolBtc;
  if (token_name == "tmSOL") return poolTmsol;
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
        const connection = new Connection(NETWORK, "processed");

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
            "Request Faucet failed. Click Ok to go back and try again.",
            "Faucet"
          )
        );
      }
      return;
    }

    const provider = await getProvider(wallet);
    anchor.setProvider(provider);
    // address of deployed program
    const programId = new PublicKey(idl.metadata.address);
    // Generate the program client from IDL.
    const program = new anchor.Program(idl, programId);

    const [stateAccount, stateAccountBump] = await PublicKey.findProgramAddress(
      [Buffer.from(faucet_name)],
      program.programId
    );

    const tokenMint = getTokenMint(keyword);
    const userToken = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      tokenMint,
      userAuthority
    );
    const poolToken = getPoolMint(keyword);

    try {
      await program.rpc.requestToken({
        accounts: {
          userAuthority,
          stateAccount,
          userToken,
          tokenMint,
          poolToken,
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
