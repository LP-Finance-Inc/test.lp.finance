import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { useSelector } from "react-redux";
import { CgMenuLeftAlt } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { NavbarApi } from "../../../assets/api/global/NavbarApi";
import HeaderWrapper from "../../../styles/Common/components/Header.style";
import NetworkModel from "../../../Models/Common/NetworkModel";
import NearWalletModel from "../../../Models/NearModels/NearWalletModel";
import { NearWallet } from "../../../Routes/NearRoute";
import { AiOutlineLogout } from "react-icons/ai";

const NearHeader = () => {
  const { currentUser, wallet } = NearWallet();
  const [networkModel, setNetworkModel] = useState(false);
  const [nearWalletModel, setNearWalletModel] = useState(false);
  const NetworkState = useSelector((state) => state.NetworkReducer);

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  const ConnectWallet = () => {
    setNearWalletModel(true);
    closeNav();
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <>
      {networkModel && (
        <NetworkModel
          networkModel={networkModel}
          setNetworkModel={setNetworkModel}
        />
      )}

      {nearWalletModel && (
        <NearWalletModel
          nearWalletModel={nearWalletModel}
          setNearWalletModel={setNearWalletModel}
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
                  {NavbarApi.map((nav) => {
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
              {currentUser?.accountId ? (
                <div className="btn-group">
                  <button
                    type="button"
                    className="dropdown_btn d-flex align-items-center"
                    data-toggle="dropdown"
                    data-display="static"
                    aria-expanded="false"
                  >
                    {currentUser?.accountId}
                  </button>
                  <div className="dropdown-menu dropdown-menu-lg-right">
                    <button
                      className="dropdown-item d-flex align-items-center"
                      type="button"
                      onClick={signOut}
                    >
                      <AiOutlineLogout className="_logout_icon" />
                      <span>Disconnect</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={ConnectWallet}>Connect Wallet</button>
              )}
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

                <ul className="navbar-nav left_ui_block ml-auto d-flex justify-content-center  align-items-center flex-row">
                  <div className="Network_section">
                    <div
                      className="Network_btn"
                      onClick={() => setNetworkModel(true)}
                    >
                      <img
                        src={NetworkState.img}
                        alt="Loading..."
                        className="network_img"
                      />
                    </div>
                  </div>
                  <div className="left_ui_block_hide d-flex align-items-center">
                    {NavbarApi.map((nav) => {
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

                    <li className="nav-item">
                      <div
                        className="img_section"
                        onClick={() => setNetworkModel(true)}
                      >
                        <img
                          src={NetworkState.img}
                          alt="Loading..."
                          className="network_img"
                        />
                      </div>
                    </li>

                    <li className="nav-item">
                      <div className="Wallet_section">
                        {currentUser?.accountId ? (
                          <div className="btn-group">
                            <button
                              type="button"
                              className="dropdown_btn d-flex align-items-center"
                              data-toggle="dropdown"
                              data-display="static"
                              aria-expanded="false"
                            >
                              {currentUser?.accountId}
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg-right">
                              <button
                                className="dropdown-item d-flex align-items-center"
                                type="button"
                                onClick={signOut}
                              >
                                <AiOutlineLogout className="_logout_icon" />
                                <span>Disconnect</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button onClick={ConnectWallet}>
                            Connect Wallet
                          </button>
                        )}
                      </div>
                    </li>
                  </div>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </HeaderWrapper>
    </>
  );
};

export default NearHeader;
