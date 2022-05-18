import React from "react";
import { BiTransferAlt } from "react-icons/bi";
import { blockInvalidChar } from "../../../helper";
import SwapWrapper from "../../../styles/Common/components/Swap.style";

const NearSwap = () => {
  return (
    <>
      <SwapWrapper>
        <div className="container Swap">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="swap_title">
                <h2>Swap Tokens</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 pb-lg-3 my-lg-4 my-md-5 my-4 my-2">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12 d-flex justify-content-center">
                  <div className="swap_card py-4">
                    <div className="row mb-4 d-flex justify-content-center">
                      <div className="col-11">
                        <div className="swap_card_title">
                          <p>Trade</p>
                        </div>
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-lg-7 col-12">
                        <div className="box1">
                          <div className="row">
                            <div className="col-12">
                              <div className="title">
                                <p>From</p>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2 my-1 d-flex align-items-center">
                            <div className="col d-flex align-items-center">
                              <div className="number d-flex align-items-center">
                                <input
                                  type="number"
                                  placeholder="00.00"
                                  autoComplete="off"
                                  id="ToSwapInput"
                                  onKeyDown={blockInvalidChar}
                                  className="ml-2"
                                />
                              </div>
                            </div>
                            <div className="col-7 img_Section d-flex justify-content-end">
                              <button>
                                {/* <img
                                  src=""
                                  alt="Loading..."
                                  height="29"
                                  width="29"
                                /> */}

                                <span className="ml-3"></span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 d-flex justify-content-center ">
                            <div className="transfer_title my-1">
                              <BiTransferAlt className="trans_icon" />
                            </div>
                          </div>
                        </div>

                        <div className="box2">
                          <div className="row">
                            <div className="col-12">
                              <div className="title">
                                <p>To(estimated)</p>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2 my-1">
                            <div className="col-lg-5 col-md-5  col-4 d-flex align-items-center">
                              <div className="number d-flex align-items-center">
                                <input
                                  type="number"
                                  placeholder="00.00"
                                  autoComplete="off"
                                  id="BottomSwapInput"
                                  onKeyDown={blockInvalidChar}
                                />
                              </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-8 img_Section d-flex justify-content-end">
                              <button>
                                {/* <img
                                  src=""
                                  alt="Loading..."
                                  height="29"
                                  width="29"
                                /> */}

                                <span className="ml-3"></span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="btn d-flex justify-content-center pt-4">
                          <button>Swap</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwapWrapper>
    </>
  );
};

export default NearSwap;
