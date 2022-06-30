import { connection } from "../../../lib/Solana/connection";
import {
  lpSOLMint,
  lpUSDMint,
  LPFiMint,
  wSOLMint,
  mSOLMint,
  stSOLMint,
  scnSOLMint,
  USDCMint,
  wBTCMint,
  wETHMint,
  RAYMint,
  SRMMint,
  AVAXMint,
  FIDAMint,
  FTTMint,
  FTMMint,
  GMTMint,
  LUNAMint,
  MATICMint,
  USDTMint,
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
        mintAddress = wSOLMint;
      } else if (token === "LPFi") {
        mintAddress = LPFiMint;
      } else if (token === "mSOL") {
        mintAddress = mSOLMint;
      } else if (token === "stSOL") {
        mintAddress = stSOLMint;
      } else if (token === "scnSOL") {
        mintAddress = scnSOLMint;
      } else if (token === "USDC") {
        mintAddress = USDCMint;
      } else if (token === "wBTC") {
        mintAddress = wBTCMint;
      } else if (token === "wETH") {
        mintAddress = wETHMint;
      } else if (token === "RAY") {
        mintAddress = RAYMint;
      } else if (token === "SRM") {
        mintAddress = SRMMint;
      } else if (token === "AVAX") {
        mintAddress = AVAXMint;
      } else if (token === "FIDA") {
        mintAddress = FIDAMint;
      } else if (token === "FTT") {
        mintAddress = FTTMint;
      } else if (token === "FTM") {
        mintAddress = FTMMint;
      } else if (token === "GMT") {
        mintAddress = GMTMint;
      } else if (token === "LUNA") {
        mintAddress = LUNAMint;
      } else if (token === "MATIC") {
        mintAddress = MATICMint;
      } else if (token === "USDT") {
        mintAddress = USDTMint;
      } else if (token === "lpSOL") {
        mintAddress = lpSOLMint;
      } else if (token === "lpUSD") {
        mintAddress = lpUSDMint;
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
