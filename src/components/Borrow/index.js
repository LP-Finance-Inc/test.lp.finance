import React, { useEffect, useState } from "react";
import Overview from "./Overview";
import Tabs from "./Tabs";
import BorrowWrapper from "./Borrow.style";
import { useSelector } from "react-redux";
import ServerErrorIssue from "../../Models/ServerErrorIssue";

const Borrow = () => {
  const lpContractState = useSelector((state) => state.lpContractReducers);
  const [serverErrorIssue, setServerErrorIssue] = useState(false);

  useEffect(() => {
    setServerErrorIssue(true);
  }, []);

  return (
    <>
      {serverErrorIssue && (
        <ServerErrorIssue
          title="Borrow"
          serverErrorIssue={serverErrorIssue}
          setServerErrorIssue={setServerErrorIssue}
        />
      )}
      <BorrowWrapper pie={lpContractState.Borrow.Overview.NetLTV}>
        <div className="container borrow">
          <div className="row">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="borrow_title text-center">
                <h1>CBS Protocol</h1>
              </div>
              <div className="borrow_subtitle text-center">
                <h1>Borrow Stablecoin at 0% APY</h1>
              </div>
            </div>
          </div>
          <Overview lpContractState={lpContractState} />
          <Tabs lpContractState={lpContractState} />
        </div>
      </BorrowWrapper>
    </>
  );
};

export default Borrow;
