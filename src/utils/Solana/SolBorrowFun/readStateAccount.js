import * as anchor from "@project-serum/anchor";
import getProvider from "../../../lib/Solana/getProvider";
import idl from "../../../lib/Solana/idls/cbs_protocol.json";
import { convert_from_wei } from "../../../lib/Solana/common";
import { config } from "../../../lib/Solana/Solana_constants/cbs_constants";

// CBS program
export const readStateAccount = async (wallet) => {
  try {
    const { PublicKey } = anchor.web3;
    const provider = await getProvider(wallet);
    anchor.setProvider(provider);

    const programId = new PublicKey(idl.metadata.address);

    const program = new anchor.Program(idl, programId);

    const configData = await program.account.config.fetch(config);

    const ReadStateAccountInfo = {
      //deposited
      TotalDepositedSOL: convert_from_wei(
        configData.totalDepositedSol?.toString()
      ),
      TotalDepositedBTC: convert_from_wei(
        configData.totalDepositedBtc?.toString()
      ),
      TotalDepositedUSDC: convert_from_wei(
        configData.totalDepositedUsdc?.toString()
      ),

      TotalDepositedMSOL: convert_from_wei(
        configData.totalDepositedMsol?.toString()
      ),

      TotalDepositedETH: convert_from_wei(
        configData.totalDepositedEth?.toString()
      ),

      TotalDepositedSRM: convert_from_wei(
        configData.totalDepositedSrm?.toString()
      ),

      TotalDepositedUSDT: convert_from_wei(
        configData.totalDepositedUsdt?.toString()
      ),

      TotalDepositedstSOL: convert_from_wei(
        configData.totalDepositedStsol?.toString()
      ),

      TotalDepositedscnSOL: convert_from_wei(
        configData.totalDepositedScnsol?.toString()
      ),

      TotalDepositedLpSOL: convert_from_wei(
        configData.totalDepositedLpsol?.toString()
      ),

      TotalDepositedLpUSD: convert_from_wei(
        configData.totalDepositedLpusd?.toString()
      ),

      TotalDepositedLpBTC: convert_from_wei(
        configData.totalDepositedLpbtc?.toString()
      ),

      TotalDepositedLpETH: convert_from_wei(
        configData.totalDepositedLpeth?.toString()
      ),

      //borrowed
      TotalBorrowLpSOL: convert_from_wei(
        configData.totalBorrowedLpsol?.toString()
      ),

      TotalBorrowLpUSD: convert_from_wei(
        configData.totalBorrowedLpusd?.toString()
      ),

      TotalBorrowLpBTC: convert_from_wei(
        configData.totalBorrowedLpbtc?.toString()
      ),

      TotalBorrowLpETH: convert_from_wei(
        configData.totalBorrowedLpeth?.toString()
      ),
    };

    return ReadStateAccountInfo;
  } catch (err) {
    const ReadStateAccountInfo = {
      //borrowed
      TotalBorrowLpSOL: "00.00",
      TotalBorrowLpUSD: "00.00",
      TotalBorrowLpBTC: "00.00",
      TotalBorrowLpETH: "00.00",
      //deposited
      TotalDepositedSOL: "00.00",
      TotalDepositedBTC: "00.00",
      TotalDepositedUSDC: "00.00",
      TotalDepositedMSOL: "00.00",
      TotalDepositedETH: "00.00",
      TotalDepositedSRM: "00.00",
      TotalDepositedUSDT: "00.00",
      TotalDepositedstSOL: "00.00",
      TotalDepositedscnSOL: "00.00",
      TotalDepositedLpSOL: "00.00",
      TotalDepositedLpUSD: "00.00",
      TotalDepositedLpBTC: "00.00",
      TotalDepositedLpETH: "00.00",
    };

    return ReadStateAccountInfo;
  }
};
