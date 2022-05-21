import * as anchor from "@project-serum/anchor";
import getProvider from "../../../lib/helpers/getProvider";
import wallet_idl from "../../../lib/Solana/idls/lpfinance_accounts.json";

export const readWalletStateAccount = async (wallet, stateAccount) => {
  try {
    const { PublicKey } = anchor.web3;

    const provider = await getProvider(wallet);

    anchor.setProvider(provider);

    // address of deployed program
    const programId = new PublicKey(wallet_idl.metadata.address);

    // Generate the program client from IDL.
    const program = new anchor.Program(wallet_idl, programId);

    const accountData = await program.account.stateAccount.fetch(stateAccount);
    return accountData;
  } catch (err) {
    return null;
  }
};
