import React, { useEffect, useState } from "react";
import Overview from "./Overview";
import Tabs from "./Tabs";
import BorrowWrapper from "./Borrow.style";
import { useSelector } from "react-redux";
import ServerErrorModel from "../../Models/ServerErrorModel";

const Borrow = () => {
  const lpContractState = useSelector((state) => state.lpContractReducers);

  const [serverErrorModel, setServerErrorModel] = useState(false);

  useEffect(() => {
    setServerErrorModel(true);
  }, []);

  return (
    <>
      {serverErrorModel && (
        <ServerErrorModel
          serverErrorModel={serverErrorModel}
          setServerErrorModel={setServerErrorModel}
          title="Borrow"
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
          <Overview />
          <Tabs />
        </div>
      </BorrowWrapper>
    </>
  );
};

export default Borrow;
