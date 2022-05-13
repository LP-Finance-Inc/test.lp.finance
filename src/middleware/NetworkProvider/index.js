import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSnackbar } from "../../helper/setSnackbar";
import { NetworkTokenSelect } from "../../redux/actions";
export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Network, setNetwork] = useState(null);

  const SwitchNetwork = (NetworkName) => {
    return async (dispatch) => {
      try {
        if (Network !== NetworkName) {
          if (NetworkName === "Solana") {
            localStorage.setItem("network", NetworkName);
            dispatch(
              setSnackbar(true, "success", `Switch network to ${NetworkName}`)
            );
            setNetwork(NetworkName);
            navigate("/");
          } else if (NetworkName === "NEAR Protocol") {
            dispatch(
              NetworkTokenSelect({
                img: "/images/network/Solana.png",
                name: "SOL",
                fullName: "Solana",
              })
            );
            dispatch(
              setSnackbar(true, "info", `NEAR Protocol not supported yet`)
            );
          }
        }
      } catch (error) {}
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
      } else if (getNetworkData === "Near") {
        setNetwork(getNetworkData);
        dispatch(
          NetworkTokenSelect({
            img: "/images/icons/Near.png",
            name: "Near",
            fullName: "Near",
          })
        );
        navigate("/near");
      }
    } else {
      localStorage.setItem("network", "Solana");
      setNetwork("Solana");
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
