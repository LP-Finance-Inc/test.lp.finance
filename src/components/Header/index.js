import React, { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { CgMenuLeftAlt } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { NavbarSolanaApi, NavbarEthereumApi } from "../../assets/api/navbarApi";
import { WalletMultiButton } from "../../wallet-adapter";
import HeaderWrapper from "./Header.style";
import Countdown from "../Countdown";
import { useDispatch, useSelector } from "react-redux";
import NetworkModel from "../../Models/NetworkModel";
import { NetworkAuth } from "../../middleware/NetworkProvider";
import styled from "styled-components";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../../Ethereum/helpers/ProviderOptions";

const Header = () => {
  const dispatch = useDispatch();
  const { Network } = NetworkAuth();
  const [networkModel, setNetworkModel] = useState(false);

  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();

  const NetworkTokenState = useSelector((state) => state.NetworkTokenReducer);

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
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

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setNetwork(network);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setProvider();
    setLibrary();
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
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
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
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
    <>
      {networkModel && (
        <NetworkModel
          networkModel={networkModel}
          setNetworkModel={setNetworkModel}
        />
      )}
      <HeaderWrapper>
        <div id="mySidenav" className="sideNav mb-4">
          <div className="container-fluid">
            <div className="row d-flex align-items-center mt-2">
              <div className="col-8 d-flex justify-content-center">
                <img
                  src="/images/LP_Finance_Logo.png"
                  alt="Loading..."
                  className="small_logo"
                />
              </div>
              <div className="col-4 d-flex justify-content-end">
                <p className="closeBtn" onClick={closeNav}>
                  <BiX className="close_icon" />
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-12 d-flex justify-content-start">
                <ul className="mt-5 ml-3 pl-1">
                  {NavbarSolanaApi.map((nav) => {
                    return (
                      <li key={nav.id}>
                        <NavLink to={nav.href} onClick={closeNav}>
                          {nav.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="Wallet">
              <WalletMultiButton />
            </div>
          </div>
        </div>

        <div className="container navbar_component">
          <div className="row">
            <div className="col-12 m-0 p-0">
              <nav className="navbar navbar-light">
                <CgMenuLeftAlt
                  className="navbar-icon"
                  onClick={openNav}
                ></CgMenuLeftAlt>

                <NavLink to="/" className="navbar-brand mb-2 ml-3">
                  <img src="/images/LP_Finance_Logo.png" alt="Loading..." />
                </NavLink>

                <ul className="navbar-nav left_ui_block ml-auto d-flex justify-content-center align-items-center flex-row">
                  <div className="left_ui_block_hide d-flex align-items-center">
                    {Network === "Solana" ? (
                      <>
                        {NavbarSolanaApi.map((nav) => {
                          return (
                            <li className="nav-item" key={nav.id}>
                              <NavLink
                                exact="true"
                                to={nav.href}
                                className="nav-link"
                                activeclassname="active"
                              >
                                {nav.name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {NavbarEthereumApi.map((nav) => {
                          return (
                            <li className="nav-item" key={nav.id}>
                              <NavLink
                                exact="true"
                                to={nav.href}
                                className="nav-link"
                                activeclassname="active"
                              >
                                {nav.name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </>
                    )}

                    <li className="nav-item">
                      <div
                        className="img_section"
                        onClick={() => setNetworkModel(true)}
                      >
                        <img
                          src={NetworkTokenState.img}
                          alt="Loading..."
                          className="network_img"
                        />
                      </div>
                    </li>

                    <li className="nav-item">
                      {Network === "Solana" ? (
                        <WalletMultiButton />
                      ) : (
                        <>
                          {account ? (
                            <div className="btn-group">
                              <button
                                type="button"
                                data-toggle="dropdown"
                                className="dropdown_btn"
                              >
                                {account}
                              </button>
                              <div className="dropdown-menu dropdown-menu-right">
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={disconnect}
                                >
                                  Disconnect
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button className="eth_btn" onClick={connectWallet}>
                              Connect wallet
                            </button>
                          )}
                        </>
                      )}
                    </li>
                  </div>
                  <li className="nav-item ml-lg-3 ml-md-1 ml-0">
                    <Countdown />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </HeaderWrapper>
    </>
  );
};

export default Header;
