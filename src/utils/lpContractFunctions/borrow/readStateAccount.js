import * as anchor from "@project-serum/anchor";
import getProvider from "../../../lib/helpers/getProvider";
import idl from "../../../lib/idls/cbs_protocol.json";
import { convert_from_wei } from "../../../lib/helpers/common";
import { stateAccount } from "../../../lib/helpers/lp_constants/cbs_constants";

// CBS program
export const readStateAccount = async (wallet) => {
  try {
    const { PublicKey } = anchor.web3;
    const provider = await getProvider(wallet);
    anchor.setProvider(provider);

    const programId = new PublicKey(idl.metadata.address);

    const program = new anchor.Program(idl, programId);

    const accountData = await program.account.stateAccount.fetch(stateAccount);

    const ReadStateAccountInfo = {
      TotalBorrowLpSOL: convert_from_wei(
        accountData.totalBorrowedLpsol?.toString()
      ),
      TotalBorrowLpUSD: convert_from_wei(
        accountData.totalBorrowedLpusd?.toString()
      ),
      TotalDepositedSOL: convert_from_wei(
        accountData.totalDepositedSol?.toString()
      ),
      TotalDepositedUSDC: convert_from_wei(
        accountData.totalDepositedUsdc?.toString()
      ),
      TotalDepositedBTC: convert_from_wei(
        accountData.totalDepositedBtc?.toString()
      ),
      TotalDepositedLpSOL: convert_from_wei(
        accountData.totalDepositedLpsol?.toString()
      ),
      TotalDepositedLpUSD: convert_from_wei(
        accountData.totalDepositedLpusd?.toString()
      ),
      TotalDepositedMSOL: convert_from_wei(
        accountData.totalDepositedMsol?.toString()
      ),
    };

    return ReadStateAccountInfo;
  } catch (err) {
    const ReadStateAccountInfo = {
      TotalBorrowLpSOL: "00.00",
      TotalBorrowLpUSD: "00.00",
      TotalDepositedSOL: "00.00",
      TotalDepositedUSDC: "00.00",
      TotalDepositedBTC: "00.00",
      TotalDepositedLpSOL: "00.00",
      TotalDepositedLpUSD: "00.00",
      TotalDepositedMSOL: "00.00",
    };
    return ReadStateAccountInfo;
  }
};
