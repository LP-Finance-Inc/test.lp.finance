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
      infuraId: "481a8d82aeb541b8925973d836c49375",
    },
  },
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: "481a8d82aeb541b8925973d836c49375",
    },
  },
};
