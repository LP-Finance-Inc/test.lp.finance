import React from "react";
import BridgeWrapper from "../../../styles/Common/components/Bridge.style";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiTransferAlt } from "react-icons/bi";
import { Message } from "../../../redux/actions/Message";
import { useDispatch } from "react-redux";

const NearBridge = () => {
  const dispatch = useDispatch();

  return (
    <>
      <BridgeWrapper>
        <div className="container Bridge">
          <div className="Bridge_top">
            <div className="col-12">
              <div className="title text-center">
                <h1>Bridge</h1>
              </div>
              <div className="subtitle text-center mt-1">
                <h1>Bridge CBS between networks</h1>
              </div>
            </div>
          </div>
          <div className="row Bridge_bottom  d-flex justify-content-center align-items-center my-4">
            <div className="col-lg-7 col-md-8 col-12 d-flex align-items-center justify-content-center">
              <div className="Token_Network_card">
                <div className="row">
                  <div className="col-12">
                    <div className="Title">
                      <p>NETWORK</p>
                    </div>
                  </div>
                </div>
                <div className="row Token_Network_section mt-4">
                  <div className="col-12">
                    <div className="row d-flex align-items-center justify-content-center">
                      <div className="col-lg-5 col-md-5 col-12 Input_Section">
                        <div className="Input_Section_Title">
                          <p>Source</p>
                        </div>
                        <div className="Input_Section_Box mt-1">
                          <div className="row">
                            <div className="col-9 Input_Section_Box_left">
                              <div className="Details">
                                {/* <img src="" alt="Loading..." /> */}

                                <span className="ml-2"></span>
                              </div>
                            </div>
                            <div className="col-3 Input_Section_Box_right d-flex align-items-center justify-content-end">
                              <IoMdArrowDropdown className="icon" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-center mt-lg-4 mt-md-4 mt-2">
                        <div className="swap_section d-flex align-items-center">
                          <BiTransferAlt className="icon" />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-12 Input_Section">
                        <div className="Input_Section_Title">
                          <p>Target</p>
                        </div>
                        <div className="Input_Section_Box mt-1">
                          <div className="row">
                            <div className="col-9 Input_Section_Box_left">
                              <div className="Details">
                                {/* <img src="" alt="Loading..." /> */}

                                <span className="ml-2"></span>
                              </div>
                            </div>
                            <div className="col-3 Input_Section_Box_right d-flex align-items-center justify-content-end">
                              <IoMdArrowDropdown className="icon" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-12 d-flex justify-content-center">
                    <div className="Btn_section">
                      <button onClick={() => dispatch(Message())}>Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BridgeWrapper>
    </>
  );
};

export default NearBridge;
