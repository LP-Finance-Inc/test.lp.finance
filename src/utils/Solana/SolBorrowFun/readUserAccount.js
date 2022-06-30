import * as anchor from "@project-serum/anchor";
import getProvider from "../../../lib/Solana/getProvider";
import idl from "../../../lib/Solana/idls/cbs_protocol.json";
import { cbs_name } from "../../../lib/Solana/Solana_constants/cbs_constants";
import { convert_from_wei } from "../../../lib/Solana/common";

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
      DepositedwSolAmount: convert_from_wei(accountData.wsolAmount?.toString()),
      DepositedmSOLAmount: convert_from_wei(accountData.msolAmount?.toString()),
      DepositedscnSOLAmount: convert_from_wei(
        accountData.scnsolAmount?.toString()
      ),
      DepositedstSOLAmount: convert_from_wei(
        accountData.stsolAmount?.toString()
      ),
      DepositedRAYAmount: convert_from_wei(accountData.rayAmount?.toString()),
      DepositedSRMAmount: convert_from_wei(accountData.srmAmount?.toString()),

      DepositedlpSolAmount: convert_from_wei(
        accountData.lpsolAmount?.toString()
      ),
      DepositedlpUsdAmount: convert_from_wei(
        accountData.lpusdAmount?.toString()
      ),
      DepositedLPFiAmount: convert_from_wei(accountData.lpfiAmount?.toString()),

      //lending amount

      LendingwSOLAmount: convert_from_wei(
        accountData.lendingWsolAmount?.toString()
      ),
      LendingmSOLAmount: convert_from_wei(
        accountData.lendingMsolAmount?.toString()
      ),
      LendingscnSOLAmount: convert_from_wei(
        accountData.lendingScnsolAmount?.toString()
      ),
      LendingstSOLAmount: convert_from_wei(
        accountData.lendingStsolAmount?.toString()
      ),
      LendingSRMAmount: convert_from_wei(
        accountData.lendingSrmAmount?.toString()
      ),
      LendingRAYAmount: convert_from_wei(
        accountData.lendingRayAmount?.toString()
      ),

      //borrowed
      BorrowedlpSOLAmount: convert_from_wei(
        accountData.borrowedLpsol?.toString()
      ),
      BorrowedlpUsdAmount: convert_from_wei(
        accountData.borrowedLpusd?.toString()
      ),
    };

    return userAccountInfo;
  } catch (err) {
    console.log(err);
    const userAccountInfo = {
      //deposited
      DepositedwSolAmount: 0,
      DepositedmSOLAmount: 0,
      DepositedscnSOLAmount: 0,
      DepositedstSOLAmount: 0,
      DepositedRAYAmount: 0,
      DepositedSRMAmount: 0,
      DepositedlpSolAmount: 0,
      DepositedlpUsdAmount: 0,
      DepositedLPFiAmount: 0,

      //lending amount

      LendingwSOLAmount: 0,
      LendingmSOLAmount: 0,
      LendingscnSOLAmount: 0,
      LendingstSOLAmount: 0,
      LendingSRMAmount: 0,
      LendingRAYAmount: 0,

      //borrowed
      BorrowedlpSOLAmount: 0,
      BorrowedlpUsdAmount: 0,
    };

    return userAccountInfo;
  }
};
