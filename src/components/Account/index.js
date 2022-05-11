import React, { useState } from "react";
import Overview from "./Overview";
import Tabs from "./Tabs";
import BorrowWrapper from "./Borrow.style";
import { useSelector } from "react-redux";
import NotifyModel from "../../Models/Common/NotifyModel";

const Account = () => {
  const [notifyModel, setNotifyModel] = useState(false);
  const lpContractState = useSelector((state) => state.lpContractReducers);
  const PoolAssetsState = useSelector((state) => state.PoolAssetsReducer);

  const getAssetsMarketState = useSelector(
    (state) => state.getAssetsMarketReducer
  );

  return (
    <>
      {notifyModel && (
        <NotifyModel
          notifyModel={notifyModel}
          setNotifyModel={setNotifyModel}
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
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="notifyModel d-flex justify-content-center ">
                <button onClick={() => setNotifyModel(true)}>
                  <img src="/images/NotifyLogo.png" alt="Loading..." />
                  <span className="pl-2 mt-1">Get Notification</span>
                </button>
              </div>
            </div>
          </div>
          <Overview lpContractState={lpContractState} />
          <Tabs
            lpContractState={lpContractState}
            PoolAssetsState={PoolAssetsState}
            getAssetsMarketState={getAssetsMarketState}
          />
        </div>
      </BorrowWrapper>
    </>
  );
};

export default Account;
