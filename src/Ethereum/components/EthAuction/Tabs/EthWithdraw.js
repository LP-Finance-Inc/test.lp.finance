import React from "react";
import { blockInvalidChar } from "../../../../helper";

const EthWithdraw = () => {
  return (
    <>
      <div className="row EthWithdraw d-flex justify-content-center">
        <div className="col-lg-9 col-md-10 col-11">
          <div className="EthWithdraw_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-7 col-6 EthWithdraw_card_left">
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
              <div className="col-lg-5 col-md-5 col-6 d-flex justify-content-end EthWithdraw_card_right">
                <button>
                  <img
                    src="/images/tokens/lpUSD.png"
                    alt="Loading..."
                    height="29"
                    width="29"
                  />

                  <span className="ml-3">lpUSD</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-3">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="row">
                <div className="col-12 d-flex justify-content-center mt-3">
                  <div className="btn_section">
                    <button>Withdraw</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EthWithdraw;
