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
      //deposited
      DepositedSolAmount: convert_from_wei(accountData.solAmount?.toString()),
      DepositedBtcAmount: convert_from_wei(accountData.btcAmount?.toString()),
      DepositedUsdcAmount: convert_from_wei(accountData.usdcAmount?.toString()),
      DepositedMSOLAmount: convert_from_wei(accountData.msolAmount?.toString()),
      DepositedETHAmount: convert_from_wei(accountData.ethAmount?.toString()),
      DepositedSRMAmount: convert_from_wei(accountData.srmAmount?.toString()),
      DepositedUSDTAmount: convert_from_wei(accountData.usdtAmount?.toString()),
      DepositedUSTAmount: convert_from_wei(accountData.ustAmount?.toString()),
      DepositedstSOLAmount: convert_from_wei(
        accountData.stsolAmount?.toString()
      ),
      DepositedscnSOLAmount: convert_from_wei(
        accountData.scnsolAmount?.toString()
      ),
      DepositedLpSolAmount: convert_from_wei(
        accountData.lpsolAmount?.toString()
      ),
      DepositedLpUsdAmount: convert_from_wei(
        accountData.lpusdAmount?.toString()
      ),

      DepositedLpBTCAmount: convert_from_wei(
        accountData.lpbtcAmount?.toString()
      ),

      DepositedLpETHAmount: convert_from_wei(
        accountData.lpethAmount?.toString()
      ),

      //borrowed
      BorrowedLpSOLAmount: convert_from_wei(
        accountData.borrowedLpsol?.toString()
      ),
      BorrowedLpUsdAmount: convert_from_wei(
        accountData.borrowedLpusd?.toString()
      ),

      BorrowedLpBTCAmount: convert_from_wei(
        accountData.borrowedLpbtc?.toString()
      ),
      BorrowedLpETHAmount: convert_from_wei(
        accountData.borrowedLpeth?.toString()
      ),
    };

    return userAccountInfo;
  } catch (err) {
    const userAccountInfo = {
      //deposited
      DepositedSolAmount: "00.00",
      DepositedBtcAmount: "00.00",
      DepositedUsdcAmount: "00.00",
      DepositedMSOLAmount: "00.00",
      DepositedETHAmount: "00.00",
      DepositedSRMAmount: "00.00",
      DepositedUSDTAmount: "00.00",
      DepositedUSTAmount: "00.00",
      DepositedstSOLAmount: "00.00",
      DepositedscnSOLAmount: "00.00",
      DepositedLpSolAmount: "00.00",
      DepositedLpUsdAmount: "00.00",
      DepositedLpBTCAmount: "00.00",
      DepositedLpETHAmount: "00.00",
      //borrowed
      BorrowedLpSOLAmount: "00.00",
      BorrowedLpUsdAmount: "00.00",
      BorrowedLpBTCAmount: "00.00",
      BorrowedLpETHAmount: "00.00",
    };

    return userAccountInfo;
  }
};
