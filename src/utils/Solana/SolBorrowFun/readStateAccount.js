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

      TotalDepositedwSOL: convert_from_wei(
        configData.totalDepositedWsol?.toString()
      ),

      TotalDepositedmSOL: convert_from_wei(
        configData.totalDepositedMsol?.toString()
      ),

      TotalDepositedstSOL: convert_from_wei(
        configData.totalDepositedStsol?.toString()
      ),

      TotalDepositedscnSOL: convert_from_wei(
        configData.totalDepositedScnsol?.toString()
      ),

      TotalDepositedRAY: convert_from_wei(
        configData.totalDepositedRay?.toString()
      ),

      TotalDepositedSRM: convert_from_wei(
        configData.totalDepositedSrm?.toString()
      ),

      TotalDepositedLPFi: convert_from_wei(
        configData.totalDepositedLpfi?.toString()
      ),

      TotalDepositedlpSOL: convert_from_wei(
        configData.totalDepositedLpsol?.toString()
      ),

      TotalDepositedlpUSD: convert_from_wei(
        configData.totalDepositedLpusd?.toString()
      ),

      TotalBorrowedlpSOL: convert_from_wei(
        configData.totalBorrowedLpsol?.toString()
      ),

      TotalBorrowedlpUSD: convert_from_wei(
        configData.totalBorrowedLpusd?.toString()
      ),
    };

    return ReadStateAccountInfo;
  } catch (err) {
    const ReadStateAccountInfo = {
      //deposited
      TotalDepositedwSOL: 0,
      TotalDepositedmSOL: 0,
      TotalDepositedstSOL: 0,
      TotalDepositedscnSOL: 0,
      TotalDepositedRAY: 0,
      TotalDepositedSRM: 0,
      TotalDepositedLPFi: 0,
      TotalDepositedlpSOL: 0,
      TotalDepositedlpUSD: 0,

      //borrowed
      TotalBorrowedlpSOL: 0,
      TotalBorrowedlpUSD: 0,
    };

    return ReadStateAccountInfo;
  }
};
