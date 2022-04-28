import React from "react";
import Overview from "./Overview";
import Tabs from "./Tabs";
import BorrowWrapper from "./Borrow.style";
import { useSelector } from "react-redux";

const Borrow = () => {
  const lpContractState = useSelector((state) => state.lpContractReducers);
  const PoolAssetsState = useSelector((state) => state.PoolAssetsReducer);

  const getAssetsMarketState = useSelector(
    (state) => state.getAssetsMarketReducer
  );

  console.log(lpContractState);

  return (
    <>
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

export default Borrow;
