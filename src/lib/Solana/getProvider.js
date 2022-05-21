import * as anchor from "@project-serum/anchor";
import { NETWORK } from "./connection";
const { Connection } = anchor.web3;

const getProvider = async (wallet) => {
  const anchorWallet = {
    publicKey: wallet.publicKey,
    signAllTransactions: wallet.signAllTransactions,
    signTransaction: wallet.signTransaction,
  };
  const connection = new Connection(NETWORK, "processed");
  const provider = new anchor.Provider(connection, anchorWallet, {
    preflightCommitment: "processed",
  });

  return provider;
};

export default getProvider;
