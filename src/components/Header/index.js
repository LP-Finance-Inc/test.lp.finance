import React, { useState } from "react";
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
import { EthAuth } from "../../middleware/EthProvider";

const Header = () => {
  const dispatch = useDispatch();
  const { Network } = NetworkAuth();
  const { connectWallet, disconnectWallet, publickey } = EthAuth();
  const [networkModel, setNetworkModel] = useState(false);

  const NetworkTokenState = useSelector((state) => state.NetworkTokenReducer);

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

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
                          {publickey ? (
                            <div className="btn-group">
                              <button
                                type="button"
                                data-toggle="dropdown"
                                className="dropdown_btn"
                              >
                                {publickey}
                              </button>
                              <div className="dropdown-menu dropdown-menu-right">
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() => dispatch(disconnectWallet())}
                                >
                                  Disconnect
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              className="eth_btn"
                              onClick={() => dispatch(connectWallet())}
                            >
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
