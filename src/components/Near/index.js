import React from "react";
import Connection from "./Connection";

const Near = ({ contract, currentUser, nearConfig, wallet }) => {
  return (
    <>
      <Connection
        contract={contract}
        currentUser={currentUser}
        nearConfig={nearConfig}
        wallet={wallet}
      />
    </>
  );
};

export default Near;
