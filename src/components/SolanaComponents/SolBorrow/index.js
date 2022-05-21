import React, { useState } from "react";
import Overview from "./Overview";
import Tabs from "./Tabs";
import BorrowWrapper from "../../../styles/Common/components/Borrow.style";
import { useSelector } from "react-redux";
import NotifyModel from "../../../Models/SolanaModels/NotifyModel";

const SolBorrow = () => {
  const [notifyModel, setNotifyModel] = useState(false);
  const SolBorrowState = useSelector((state) => state.SolBorrowReducers);
  const SolendState = useSelector((state) => state.SolendReducer);

  const ApricotState = useSelector((state) => state.ApricotReducer);

  return (
    <>
      {notifyModel && (
        <NotifyModel
          notifyModel={notifyModel}
          setNotifyModel={setNotifyModel}
        />
      )}

      <BorrowWrapper pie={SolBorrowState.Borrow.Overview.NetLTV}>
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
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="notifyModel d-flex justify-content-center ">
                <button onClick={() => setNotifyModel(true)}>
                  <img src="/images/NotifyLogo.png" alt="Loading..." />
                  <span className="pl-2 mt-1">Get Notification</span>
                </button>
              </div>
            </div>
          </div>
          <Overview SolBorrowState={SolBorrowState} />
          <Tabs
            SolBorrowState={SolBorrowState}
            SolendState={SolendState}
            ApricotState={ApricotState}
          />
        </div>
      </BorrowWrapper>
    </>
  );
};

export default SolBorrow;
