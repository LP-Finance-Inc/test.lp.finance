import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockInvalidChar } from "../../../../helper";
import TokenModel from "../../../../Models/Common/TokenModel";
import { NearBorrowTokenApi } from "../../../../assets/api/Near/NearBorrowApis/NearBorrowApi";
import { NearBorrowTokenSelect } from "../../../../redux/actions/Near/NearBorrowActions";
import { Message } from "../../../../redux/actions/Message";

const Borrow = ({ NearTokenPriceArr }) => {
  const dispatch = useDispatch();
  const NearBorrowTokenApiNew = NearBorrowTokenApi(NearTokenPriceArr);
  const [NearBorrowModel, setNearBorrowModel] = useState(false);

  const NearBorrowState = useSelector((state) => state.NearBorrowReducer);

  return (
    <>
      {NearBorrowModel && (
        <TokenModel
          tokenModel={NearBorrowModel}
          setTokenModel={setNearBorrowModel}
          TokensApi={NearBorrowTokenApiNew}
          TokenSelectFun={NearBorrowTokenSelect}
        />
      )}

      <div className="row deposit d-flex justify-content-center">
        <div className="col-lg-10 col-md-10 col-12 my-3">
          <div className="deposit_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-7 col-6  deposit_card_left">
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
                <button onClick={() => setNearBorrowModel(true)}>
                  <img
                    src={NearBorrowState.img}
                    alt="Loading..."
                    height="29"
                    width="29"
                  />
                  <span className="ml-3">{NearBorrowState.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="btn_section">
                <button onClick={() => dispatch(Message())}>Borrow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Borrow;
