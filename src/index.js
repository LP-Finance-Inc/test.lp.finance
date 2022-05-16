import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { CommonRoot, AppCommon } from "./Routes";
import SolanaRoute from "./Routes/SolanaRoute";
import SolanaWalletFunction from "./utils/Solana/SolanaWalletFun";
require("./assets/css/wallet.css");

const Network = localStorage.getItem("network");

switch (Network) {
  case "Solana":
    ReactDOM.render(
      <CommonRoot>
        <SolanaWalletFunction>
          <AppCommon>
            <SolanaRoute />
          </AppCommon>
        </SolanaWalletFunction>
      </CommonRoot>,
      document.getElementById("root")
    );
    break;

  case "NEAR Protocol":
    break;

  default:
    ReactDOM.render(
      <CommonRoot>
        <SolanaWalletFunction>
          <AppCommon>
            <SolanaRoute />
          </AppCommon>
        </SolanaWalletFunction>
      </CommonRoot>,
      document.getElementById("root")
    );
    break;
}

reportWebVitals();
