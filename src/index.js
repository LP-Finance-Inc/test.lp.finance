import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { CommonRoot, AppCommon } from "./Routes";
import App from "./App";

ReactDOM.render(
  <CommonRoot>
    <AppCommon>
      <App />
    </AppCommon>
  </CommonRoot>,
  document.getElementById("root")
);

reportWebVitals();
