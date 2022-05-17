import { connection } from "../../../lib/Solana/connection";
import {
  usdcMint,
  btcMint,
  lpsolMint,
  lpusdMint,
  msolMint,
  lpbtcMint,
  lpethMint,
  ethMint,
  srmMint,
  usdtMint,
  stsolMint,
  scnsolMint,
} from "../../../lib/Solana/common";
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
      } else if (token === "USDC") {
        mintAddress = usdcMint;
      } else if (token === "BTC") {
        mintAddress = btcMint;
      } else if (token === "mSOL") {
        mintAddress = msolMint;
      } else if (token === "ETH") {
        mintAddress = ethMint;
      } else if (token === "lpETH") {
        mintAddress = lpethMint;
      } else if (token === "lpBTC") {
        mintAddress = lpbtcMint;
      } else if (token === "SRM") {
        mintAddress = srmMint;
      } else if (token === "USDT") {
        mintAddress = usdtMint;
      } else if (token === "stSOL") {
        mintAddress = stsolMint;
      } else if (token === "scnSOL") {
        mintAddress = scnsolMint;
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
