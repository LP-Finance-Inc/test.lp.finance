import React, { useState, useEffect } from "react";
import Loader from "./components/globalComponents/Loader";
import { NetworkAuth } from "./Context/global/NetworkContext";
import SolanaRoute from "./Routes/SolanaRoute";
import NearRoute from "./Routes/NearRoute";
import SolanaWalletFunction from "./utils/Solana/SolanaWalletFun";

const App = () => {
  const [Loading, setLoading] = useState(true);
  const { Network } = NetworkAuth();

  useEffect(() => {
    setLoading(true);
    let LoadingTimeOut = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(LoadingTimeOut);
    };
  }, []);

  if (Loading) {
    return <Loader />;
  }

  switch (Network) {
    case "Solana":
      return (
        <SolanaWalletFunction>
          <SolanaRoute />
        </SolanaWalletFunction>
      );
    case "NEAR Protocol":
      return <NearRoute />;

    default:
      return (
        <SolanaWalletFunction>
          <SolanaRoute />
        </SolanaWalletFunction>
      );
  }
};

export default App;
