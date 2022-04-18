import { useState } from "react";
import { useSelector } from "react-redux";
import EthRepayModel from "../../../../Models/EthereumModels/EthBorrowModels/EthRepayModel";
import { blockInvalidChar } from "../../../../helper";

const EthRepay = () => {
  const [ethRepayModel, setEthRepayModel] = useState(false);
  const EthRepayState = useSelector((state) => state.EthRepayReducer);

  return (
    <>
      {ethRepayModel && (
        <EthRepayModel
          ethRepayModel={ethRepayModel}
          setEthRepayModel={setEthRepayModel}
        />
      )}

      <div className="row EthBorrow d-flex justify-content-center align-items-center">
        <div className="col-lg-10 col-md-10 col-12 my-3">
          <div className="EthBorrow_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-7 col-6 EthBorrow_card_left">
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
              <div className="col-lg-5 col-md-5 col-6 d-flex justify-content-end EthBorrow_card_right">
                <button onClick={() => setEthRepayModel(true)}>
                  {EthRepayState.img && (
                    <img
                      src={EthRepayState.img}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{EthRepayState.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 EthBorrow_details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="btn_section">
                <button>Repay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EthRepay;
