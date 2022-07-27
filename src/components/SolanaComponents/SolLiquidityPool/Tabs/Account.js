import React from "react";
import { calc } from "../../../../helper";

const Account = ({ BalanceList }) => {
  return (
    <>
      <div className="row d-flex justify-content-center LiquidityPool_Account mt-lg-0 mt-4">
        <div className="col-lg-10 col-md-10 col-sm-11 col-12">
          <div className="row my-2">
            <div className="col-lg-5 col-md-5 col-sm-6 col-12">
              <div className="Account_title">
                <p>Your Account</p>
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-6 col-12">
              <div className="right_arrow_img text-center">
                <hr />
                <img src="/images/diamond.png" alt="Loading..." />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-1 col-md-1 col-sm-1 col-12 bottom_arrow_img text-center pl-3">
              <hr />
              <img src="/images/diamond.png" alt="Loading..." />
            </div>
            <div className="col-lg-11 col-md-11 col-sm-11 col-12">
              <div className="Account_card">
                <div className="row">
                  <div className="col-12">
                    <div className="title">
                      <span>LP Tokens</span>
                    </div>
                  </div>
                </div>
                <div className="row Account_Details mt-2">
                  {BalanceList.map((list) => {
                    return (
                      <div className="col-12">
                        <div className="list_card">
                          <div className="row">
                            <div className="col-8">
                              <div className="d-flex align-items-center">
                                <img src={list.img1} alt={list.name} />
                                <img
                                  src={list.img2}
                                  alt={list.name}
                                  className="ml-1"
                                />
                                <div className="ml-2">
                                  <span>{list.name}</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                              {list.Bal > 0 && (
                                <div>
                                  <div className="balance d-flex flex-column text-right">
                                    <span>{calc(list.Bal)}</span>
                                    <p className="pt-1">
                                      $ {calc(list.TokenPrice * list.Bal)}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
