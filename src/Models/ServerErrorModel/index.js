import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContracts } from "../../redux/actions";
import ServerErrorIssueWrapper from "./ServerErrorIssue.style";

const ServerErrorModel = ({ serverErrorModel, setServerErrorModel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CloseModel = () => {
    navigate(-1);
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      setServerErrorModel(false);
      dispatch(setContracts(false, false, "", "", ""));
    }, 400);
  };

  useEffect(() => {
    if (serverErrorModel) {
      document.querySelector(".popup").classList.add("active");
    }
  }, []);

  return (
    <>
      {serverErrorModel && (
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
                                <img
                                  src="/images/status/error.png"
                                  alt="Loading"
                                />
                                <h1 className="mt-1">Auction in Maintenance</h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-4 messages_Section">
                        <div className="message text-center d-flex justify-content-center flex-column align-items-center">
                          <p>Currently our team is investigating the issue..</p>
                        </div>
                      </div>

                      <div className="col-12 mt-5 other_Section">
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

export default ServerErrorModel;
