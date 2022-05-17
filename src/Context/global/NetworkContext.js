import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/actions";
import { NetworkTokenSelect } from "../../redux/actions";
export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [Network, setNetwork] = useState(null);

  const SwitchNetwork = (NetworkName) => {
    return async (dispatch) => {
      if (Network !== NetworkName) {
        localStorage.setItem("network", NetworkName);
        dispatch(
          setSnackbar(true, "success", `Switch network to ${NetworkName}`)
        );
        setNetwork(NetworkName);
        // window.location.reload(false);
      }
    };
  };

  useEffect(() => {
    const getNetworkData = localStorage.getItem("network");

    if (getNetworkData) {
      if (getNetworkData === "Solana") {
        setNetwork(getNetworkData);
        dispatch(
          NetworkTokenSelect({
            img: "/images/network/Solana.png",
            name: "SOL",
            fullName: "Solana",
          })
        );
      } else if (getNetworkData === "NEAR Protocol") {
        setNetwork(getNetworkData);
        dispatch(
          NetworkTokenSelect({
            img: "/images/network/Near.png",
            name: "Near",
            fullName: "Near",
          })
        );
      }
    }

    return () => {
      setNetwork(null);
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ SwitchNetwork, Network }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const NetworkAuth = () => useContext(NetworkContext);
