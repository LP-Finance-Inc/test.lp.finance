import { connection } from "../../../lib/Solana/connection";
import {
  lpsolMint,
  lpusdMint,
  lpfiMint,
  wsolMint,
  msolMint,
  stsolMint,
  scnsolMint,
  usdcMint,
  wbtcMint,
  wethMint,
  rayMint,
  srmMint,
  avaxMint,
  fidaMint,
  fttMint,
  ftmMint,
  gmtMint,
  lunaMint,
  maticMint,
  usdtMint,
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
      if (token === "wSOL") {
        mintAddress = wsolMint;
      } else if (token === "LPFi") {
        mintAddress = lpfiMint;
      } else if (token === "mSOL") {
        mintAddress = msolMint;
      } else if (token === "stSOL") {
        mintAddress = stsolMint;
      } else if (token === "scnSOL") {
        mintAddress = scnsolMint;
      } else if (token === "USDC") {
        mintAddress = usdcMint;
      } else if (token === "wBTC") {
        mintAddress = wbtcMint;
      } else if (token === "wETH") {
        mintAddress = wethMint;
      } else if (token === "RAY") {
        mintAddress = rayMint;
      } else if (token === "SRM") {
        mintAddress = srmMint;
      } else if (token === "AVAX") {
        mintAddress = avaxMint;
      } else if (token === "FIDA") {
        mintAddress = fidaMint;
      } else if (token === "FTT") {
        mintAddress = fttMint;
      } else if (token === "FTM") {
        mintAddress = ftmMint;
      } else if (token === "GMT") {
        mintAddress = gmtMint;
      } else if (token === "LUNA") {
        mintAddress = lunaMint;
      } else if (token === "MATIC") {
        mintAddress = maticMint;
      } else if (token === "USDT") {
        mintAddress = usdtMint;
      } else if (token === "lpSOL") {
        mintAddress = lpsolMint;
      } else if (token === "lpUSD") {
        mintAddress = lpusdMint;
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
