import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContracts } from "../../redux/actions";
import ContractWrapper from "./ContractWrapper.style";

const ServerErrorIssue = ({ title, serverErrorIssue, setServerErrorIssue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeOverLay = () => {
    setServerErrorIssue(false);
    navigate(-1);
    var overlay = document.getElementById("overlay");
    overlay.classList.remove("modal-fade-in");
    dispatch(setContracts(false, false, "", "", ""));
  };

  useEffect(() => {
    if (serverErrorIssue) {
      var overlay = document.getElementById("overlay");
      overlay.classList.add("modal-fade-in");
    }
  }, []);

  return (
    <>
      {serverErrorIssue && (
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
                            <div className="col-12 d-flex justify-content-center">
                              <div className="error d-flex justify-content-center align-items-center flex-column">
                                <img
                                  src="/images/status/error.png"
                                  alt="Loading"
                                />
                                <h1 className="mt-1">
                                  {title} Currently Unavailable
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-4 messages_Section">
                        <div className="message text-center d-flex justify-content-center align-items-center">
                          <p>Our team is currently looking into the issue</p>
                        </div>
                      </div>

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

export default ServerErrorIssue;