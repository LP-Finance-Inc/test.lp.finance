import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContracts } from "../../../redux/actions";
import ContractWrapper from "../../../styles/Common/model/ContractWrapper.style";

const ContractsModel = () => {
  const dispatch = useDispatch();

  const removeOverLay = () => {
    var overlay = document.getElementById("overlay");
    overlay.classList.remove("modal-fade-in");
    dispatch(setContracts(false, false, "", "", ""));
  };

  const ContractState = useSelector((state) => state.ContractReducer);

  useEffect(() => {
    if (ContractState.contractOpen) {
      var overlay = document.getElementById("overlay");
      overlay.classList.add("modal-fade-in");
    }
  }, []);

  return (
    <>
      {ContractState.contractOpen && (
        <>
          <ContractWrapper>
            <div className="contract_model" id="overlay">
              <div className="contract_overlay">
                <div className="contract_wrapper">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12 mt-5 pt-3">
                        <div className="Process_Status">
                          <div className="row d-flex justify-content-center">
                            {ContractState.contractType === "progress" && (
                              <div className="col-12 d-flex justify-content-center">
                                <div className="onGoing">
                                  <img
                                    src="/images/status/loader.png"
                                    alt="Loading"
                                  />
                                </div>
                              </div>
                            )}
                            {ContractState.contractType === "success" && (
                              <div className="col-12 d-flex justify-content-center">
                                <div className="success d-flex justify-content-center align-items-center flex-column">
                                  <img
                                    src="/images/status/success.png"
                                    alt="Loading..."
                                  />
                                  <h1 className="mt-1">
                                    {ContractState.processType} Confirmed!
                                  </h1>
                                </div>
                              </div>
                            )}
                            {ContractState.contractType === "error" && (
                              <div className="col-12 d-flex justify-content-center">
                                <div className="error d-flex justify-content-center align-items-center flex-column">
                                  <img
                                    src="/images/status/error.png"
                                    alt="Loading"
                                  />
                                  <h1 className="mt-1">
                                    {ContractState.processType} Failed!
                                  </h1>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-4 messages_Section">
                        <div className="message text-center d-flex justify-content-center align-items-center">
                          <p>{ContractState.ContractMessage}</p>
                        </div>
                      </div>
                      {ContractState.contractProcess === false && (
                        <div className="col-12 mt-4 other_Section mt-5">
                          <div className="row d-flex justify-content-center">
                            <div className="col-9">
                              <div className="btn_Section">
                                <button onClick={() => removeOverLay()}>
                                  OK
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ContractWrapper>
        </>
      )}
    </>
  );
};

export default ContractsModel;
