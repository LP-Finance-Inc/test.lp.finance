import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setContracts } from "../../redux/actions";
import ContractWrapper from "./ContractWrapper.style";

const ServerErrorIssue = ({ serverErrorIssue, setServerErrorIssue }) => {
  const dispatch = useDispatch();

  const removeOverLay = () => {
    setServerErrorIssue(false);
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
                                <img src="/images/MLogo.png" alt="Loading" />
                                <h1 className="mt-1">Welcome Testers!</h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-4 messages_Section">
                        <div className="message text-center d-flex justify-content-center flex-column align-items-center">
                          <p>
                            This is a test application developed by LP Finance.
                            Please test out our functions, and let us know your
                            ideas or issues by reaching out to
                          </p>
                          <a href="mailto:contact@lp.finance" target="__blank">
                            contact@lp.finance
                          </a>
                          <p> Thank you.</p>
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
