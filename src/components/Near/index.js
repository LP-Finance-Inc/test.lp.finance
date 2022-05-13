import React from "react";
import * as nearAPI from "near-api-js";
const { connect, keyStores, WalletConnection } = nearAPI;

const Near = () => {
  const connectNear = async () => {
    const config = {
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };

    // connect to NEAR
    const near = await connect(config);

    // create wallet connection
    const wallet = new WalletConnection(near);

    wallet.requestSignIn(
      "example-contract.testnet" // contract requesting access
    );

    const walletAccountId = wallet.getAccountId();
    const walletAccountObj = wallet.account();
    console.log(wallet);
    console.log(walletAccountId);
    console.log(walletAccountObj);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="btn_section">
            <button onClick={connectNear}>connect to near</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Near;
