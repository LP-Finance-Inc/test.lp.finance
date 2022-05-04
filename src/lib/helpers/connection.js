import * as anchor from "@project-serum/anchor";
const { Connection } = anchor.web3;

const NETWORK = "https://lively-silent-waterfall.solana-devnet.quiknode.pro/9c293b47cf73c7c49e0f760fabbc803b94b5c10a/";

const NETWORK_MAINNET = "https://young-black-sun.solana-mainnet.quiknode.pro/";

const netConfig = "devnet";

const connection = new Connection(NETWORK, "processed");
const MainnetConnection = new Connection(NETWORK_MAINNET, "processed");

export { connection, NETWORK, netConfig, NETWORK_MAINNET,MainnetConnection };
