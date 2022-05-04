import * as anchor from "@project-serum/anchor";
const { Connection } = anchor.web3;

const NETWORK = "https://api.devnet.solana.com";

const NETWORK_MAINNET = "https://young-black-sun.solana-mainnet.quiknode.pro/";

const netConfig = "devnet";

const connection = new Connection(NETWORK, "processed");
const MainnetConnection = new Connection(NETWORK_MAINNET, "processed");

export { connection, NETWORK, netConfig, NETWORK_MAINNET,MainnetConnection };
