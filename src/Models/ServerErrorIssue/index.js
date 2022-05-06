import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setContracts } from "../../redux/actions";
import ServerErrorIssueWrapper from "./ServerErrorIssue.style";

const ServerErrorIssue = ({ serverErrorIssue, setServerErrorIssue }) => {
  const dispatch = useDispatch();

  const CloseModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      setServerErrorIssue(false);
      dispatch(setContracts(false, false, "", "", ""));
    }, 400);
  };

  useEffect(() => {
    if (serverErrorIssue) {
      document.querySelector(".popup").classList.add("active");
    }
  }, []);

  return (
    <>
      {serverErrorIssue && (
        <>
          <ServerErrorIssueWrapper>
            <div className="popup">
              <div className="popup-container">
                <div className="contract_wrapper">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
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

                      <div className="col-12 mt-4 other_Section mt-4">
                        <div className="row d-flex justify-content-center">
                          <div className="col-9">
                            <div className="btn_Section">
                              <button onClick={CloseModel}>OK</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ServerErrorIssueWrapper>
        </>
      )}
    </>
  );
};

export default ServerErrorIssue;
