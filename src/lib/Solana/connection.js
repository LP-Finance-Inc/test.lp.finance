import * as anchor from "@project-serum/anchor";
const { Connection } = anchor.web3;

const NETWORK = "https://fragrant-dry-butterfly.solana-devnet.quiknode.pro/16d1c9ded067bd503dc8e393355d89e38e61834f/";

const NETWORK_MAINNET = "https://withered-cool-brook.solana-mainnet.quiknode.pro/b44d1222c014690f954ef6bce03952c76dbfc691/";

const netConfig = "devnet";

const connection = new Connection(NETWORK, "processed");
const MainnetConnection = new Connection(NETWORK_MAINNET, "processed");

export { connection, NETWORK, netConfig, NETWORK_MAINNET,MainnetConnection };
