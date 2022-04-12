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
          localStorage.setItem("network", NetworkName);
          dispatch(
            setSnackbar(true, "success", `Switch network to ${NetworkName}`)
          );
          setNetwork(NetworkName);

          if (NetworkName === "Solana") {
            navigate("/");
          } else if (NetworkName === "Ethereum") {
            navigate("/ethereum");
          }
        }
      } catch (error) {}
    };
  };

  useEffect(() => {
    const getNetworkData = localStorage.getItem("network");

    if (getNetworkData) {
      setNetwork(getNetworkData);
      if (getNetworkData === "Solana") {
        navigate("/");
        dispatch(
          NetworkTokenSelect({
            img: "/images/icons/SOLNetwork.png",
            name: "SOL",
            fullName: "Solana",
          })
        );
      } else if (getNetworkData === "Ethereum") {
        navigate("/ethereum");
        dispatch(
          NetworkTokenSelect({
            img: "/images/icons/EthNetwork.png",
            name: "ETH",
            fullName: "Ethereum",
          })
        );
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
