import { connection } from "../../../lib/helpers/connection";
import {
  usdcMint,
  btcMint,
  lpsolMint,
  lpusdMint,
  stateAccount,
} from "../../../lib/helpers/common";
import * as anchor from "@project-serum/anchor";

export const getTotalSupply = async (token) => {
  try {
    if (token === "SOL") {
      const getSupply = await connection.getBalance(stateAccount);
      return getSupply;
    } else {
      let PoolMint = null;
      if (token === "lpUSD") {
        PoolMint = lpusdMint;
      } else if (token === "lpSOL") {
        PoolMint = lpsolMint;
      } else if (token === "tUSDC") {
        PoolMint = usdcMint;
      } else if (token === "tBTC") {
        PoolMint = btcMint;
      }

      const res = await connection.getTokenAccountsByOwner(stateAccount, {
        mint: PoolMint,
      });

      if (res.value.length !== 0) {
        const PoolBalance = await connection.getParsedAccountInfo(
          new anchor.web3.PublicKey(res.value[0].pubkey.toString())
        );

        if (PoolBalance && PoolBalance.value) {
          return PoolBalance.value.data.parsed.info.tokenAmount.uiAmount;
        }
      } else {
        return 0;
      }
    }
  } catch (error) {
    return 0;
  }
};
