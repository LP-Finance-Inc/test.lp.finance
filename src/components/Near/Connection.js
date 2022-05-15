import React from "react";

const Connection = ({ contract, currentUser, nearConfig, wallet }) => {
  const signIn = () => {
    wallet.requestSignIn(
      {
        contractId: nearConfig.contractName,
        methodNames: [contract.addMessage.name],
      },
      "NEAR LP Finance",
      null,
      null
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="btn_section">
            <main>
              <header>
                <h1>NEAR wallet connection</h1>
                {currentUser ? (
                  <button onClick={signOut}>Log out</button>
                ) : (
                  <button onClick={signIn}>Log in</button>
                )}
              </header>

              <p style={{ color: "white" }}>
                AccountID - {currentUser?.accountId}!
              </p>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connection;
