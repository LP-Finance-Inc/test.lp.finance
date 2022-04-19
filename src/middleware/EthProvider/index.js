import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../../Ethereum/helpers/ProviderOptions";

export const EthContext = createContext();

export const EthProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [publickey, setPublickey] = useState();
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();

  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
    theme: {
      background: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
      main: "rgb(199, 199, 199)",
      secondary: "rgb(136, 136, 136)",
      hover: "rgba(255, 255, 255,0.2)",
    },
  });

  const connectWallet = () => {
    return async (dispatch) => {
      try {
        const provider = await web3Modal.connect();
        const library = new ethers.providers.Web3Provider(provider);
        const accounts = await library.listAccounts();
        const network = await library.getNetwork();
        setProvider(provider);
        setLibrary(library);
        if (accounts) setPublickey(accounts[0]);
        setNetwork(network);
      } catch (error) {
        console.error(error);
      }
    };
  };

  const refreshState = () => {
    setPublickey();
    setChainId();
    setNetwork("");
    setProvider();
    setLibrary();
  };

  const disconnectWallet = () => {
    return async (dispatch) => {
      await web3Modal.clearCachedProvider();
      refreshState();
    };
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setPublickey(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnectWallet();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <EthContext.Provider
      value={{ provider, connectWallet, disconnectWallet, publickey }}
    >
      {children}
    </EthContext.Provider>
  );
};

export const EthAuth = () => useContext(EthContext);
