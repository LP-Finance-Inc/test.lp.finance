import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Overview from "./Overview";
import Tabs from "./Tabs";
import BorrowWrapper from "../../../styles/Common/components/Borrow.style";
import { Message } from "../../../redux/actions/Message";

const NearBorrow = () => {
  const dispatch = useDispatch();
  const NearTokenPriceState = useSelector(
    (state) => state.NearTokenPriceReducer
  );

  return (
    <>
      <BorrowWrapper pie={100}>
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
                <button onClick={() => dispatch(Message())}>
                  <img src="/images/NotifyLogo.png" alt="Loading..." />
                  <span className="pl-2 mt-1">Get Notification</span>
                </button>
              </div>
            </div>
          </div>
          <Overview />
          <Tabs {...NearTokenPriceState} />
        </div>
      </BorrowWrapper>
    </>
  );
};

export default NearBorrow;
