import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockInvalidChar } from "../../../../helper";
import TokenModel from "../../../../Models/Common/TokenModel";
import { NearWithdrawTokenApi } from "../../../../assets/api/Near/NearBorrowApis/NearWithdrawApi";
import { NearWithdrawTokenSelect } from "../../../../redux/actions/Near/NearBorrowActions";
import { Message } from "../../../../redux/actions/Message";

const Withdraw = ({ NearTokenPriceArr }) => {
  const dispatch = useDispatch();
  const NearWithdrawTokenApiNew = NearWithdrawTokenApi(NearTokenPriceArr);

  const [NearWithdrawModel, setNearWithdrawModel] = useState(false);

  const NearWithdrawState = useSelector((state) => state.NearWithdrawReducer);

  return (
    <>
      {NearWithdrawModel && (
        <TokenModel
          tokenModel={NearWithdrawModel}
          setTokenModel={setNearWithdrawModel}
          TokensApi={NearWithdrawTokenApiNew}
          TokenSelectFun={NearWithdrawTokenSelect}
        />
      )}

      <div className="row deposit d-flex justify-content-center">
        <div className="col-lg-10 col-md-10 col-12 my-3">
          <div className="deposit_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-7 col-6 deposit_card_left">
                <div className="d-flex align-items-center">
                  <p>
                    <span className="badge d-flex align-items-center">MAX</span>
                  </p>
                  <input
                    type="number"
                    placeholder="00.00"
                    autoComplete="off"
                    className="ml-2"
                    onKeyDown={blockInvalidChar}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-6 d-flex justify-content-end deposit_card_right">
                <button onClick={() => setNearWithdrawModel(true)}>
                  <img
                    src={NearWithdrawState.img}
                    alt="Loading..."
                    height="29"
                    width="29"
                  />
                  <span className="ml-3">{NearWithdrawState.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="btn_section">
                <button onClick={() => dispatch(Message())}>Withdraw</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdraw;
