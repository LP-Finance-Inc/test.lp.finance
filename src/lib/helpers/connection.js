import * as anchor from "@project-serum/anchor";
const { Connection } = anchor.web3;

const NETWORK = "https://api.devnet.solana.com";

const netConfig = "devnet";

const connection = new Connection(NETWORK, "processed");

export { connection, NETWORK, netConfig };
