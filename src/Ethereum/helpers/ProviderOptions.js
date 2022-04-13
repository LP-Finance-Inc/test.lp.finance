import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";

const customNetworkOptions = {
  rpcUrl: "https://rpc-mainnet.maticvigil.com",
  chainId: 137,
};

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "CoinbaseWallet",
      infuraId: process.env.INFURA_KEY,
    },
  },
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: process.env.INFURA_KEY,
    },
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: "FORTMATIC_KEY",
      network: customNetworkOptions,
    },
  },
};
