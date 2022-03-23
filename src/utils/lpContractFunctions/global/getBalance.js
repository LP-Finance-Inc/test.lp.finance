import { connection } from "../../../lib/helpers/connection";
import {
  usdcMint,
  btcMint,
  lpsolMint,
  lpusdMint,
  msolMint,
} from "../../../lib/helpers/common";
import * as anchor from "@project-serum/anchor";

export const getBalance = async (publicKey, token) => {
  try {
    if (token === "SOL") {
      if (publicKey) {
        const bal = await connection.getBalance(publicKey);
        return bal;
      } else {
        return 0;
      }
    } else {
      let mintAddress = "";
      if (token === "lpUSD") {
        mintAddress = lpusdMint;
      } else if (token === "lpSOL") {
        mintAddress = lpsolMint;
      } else if (token === "tUSDC") {
        mintAddress = usdcMint;
      } else if (token === "tBTC") {
        mintAddress = btcMint;
      } else if (token === "tmSOL") {
        mintAddress = msolMint;
      }
      const res = await connection.getTokenAccountsByOwner(publicKey, {
        mint: mintAddress,
      });
      if (res.value.length !== 0) {
        const balance = await connection.getParsedAccountInfo(
          new anchor.web3.PublicKey(res.value[0].pubkey.toString())
        );
        if (balance && balance.value) {
          return balance.value.data.parsed.info.tokenAmount.uiAmount;
        }
      } else {
        return 0;
      }
    }
  } catch (error) {
    return 0;
  }
};
