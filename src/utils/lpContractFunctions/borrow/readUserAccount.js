import * as anchor from "@project-serum/anchor";
import getProvider from "../../../lib/helpers/getProvider";
import idl from "../../../lib/idls/cbs_protocol.json";
import { cbs_name } from "../../../lib/helpers/lp_constants/cbs_constants";
import { convert_from_wei } from "../../../lib/helpers/common";

export const readUserAccount = async (wallet, userAuthority) => {
  try {
    const { PublicKey } = anchor.web3;

    const provider = await getProvider(wallet);
    anchor.setProvider(provider);
    const programId = new PublicKey(idl.metadata.address);
    const program = new anchor.Program(idl, programId);

    const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
      [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
      programId
    );

    const accountData = await program.account.userAccount.fetch(userAccount);

    const userAccountInfo = {
      DepositedBtcAmount: convert_from_wei(accountData.btcAmount?.toString()),
      DepositedSolAmount: convert_from_wei(accountData.solAmount?.toString()),
      DepositedUsdcAmount: convert_from_wei(accountData.usdcAmount?.toString()),
      DepositedLpSolAmount: convert_from_wei(
        accountData.lpsolAmount?.toString()
      ),
      DepositedLpUsdAmount: convert_from_wei(
        accountData.lpusdAmount?.toString()
      ),
      DepositedMSOLAmount: convert_from_wei(accountData.msolAmount?.toString()),
      BorrowedLpSOLAmount: convert_from_wei(
        accountData.borrowedLpsol?.toString()
      ),
      BorrowedLpUsdAmount: convert_from_wei(
        accountData.borrowedLpusd?.toString()
      ),
    };

    return userAccountInfo;
  } catch (err) {
    const userAccountInfo = {
      DepositedBtcAmount: "00.00",
      DepositedSolAmount: "00.00",
      DepositedUsdcAmount: "00.00",
      DepositedLpSolAmount: "00.00",
      DepositedLpUsdAmount: "00.00",
      DepositedMSOLAmount: "00.00",
      BorrowedLpSOLAmount: "00.00",
      BorrowedLpUsdAmount: "00.00",
    };

    return userAccountInfo;
  }
};
