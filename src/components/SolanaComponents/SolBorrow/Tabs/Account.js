import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  calc,
  CalcFiveDigit,
  CalcFourDigit,
  numFormatter,
} from "../../../../helper";
import { AccountTokenApi } from "../../../../assets/api/Solana/SolBorrowApis";

const Account = ({ SolBorrowState, ApricotState, SolendState }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const AccountTable = AccountTokenApi(
    SolBorrowState,
    ApricotState,
    SolendState
  );

  return (
    <>
      <div className="row d-flex justify-content-center borrow_Account mt-lg-0 mt-5">
        <div className="col-lg-10 col-md-10 col-sm-11 col-12">
          <div className="row my-2">
            <div className="col-lg-5 col-md-5 col-sm-6 col-12">
              <div className="Account_title pl-1 pl-md-1 pl-sm-1 pl-0">
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
            <div className="col-lg-1 col-md-1 col-sm-1 col-12 d-flex justify-content-end">
              <div className=" bottom_arrow_img text-center justify-content-end">
                <hr />
                <img src="/images/diamond.png" alt="Loading..." />
              </div>
            </div>
            <div className="col-lg-11 col-md-11 col-sm-11 col-12">
              <div className="Account_card">
                <div className="row">
                  <div className="col-12 mt-3">
                    <div className="chart_miters">
                      <div className="pie1">
                        <span className="pie1_tooltip">
                          Borrowed:
                          <br />${" "}
                          {publicKey &&
                            calc(
                              SolBorrowState.variables.UserTotalBorrowedCal
                            )}{" "}
                          ( {calc(SolBorrowState.Borrow.Account.LTV)}% )
                        </span>
                      </div>
                      <div className="pie2">
                        <span className="pie2_tooltip">
                          {" "}
                          Liquidation Threshold : 94%
                        </span>
                      </div>
                      <div className="pie3">
                        <span className="pie3_tooltip">Borrow Limit: 85%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <table width="100%" className="mt-3">
                  <tbody>
                    {AccountTable &&
                      AccountTable.map((val, ind) => {
                        return (
                          <tr
                            key={ind}
                            style={
                              val.css
                                ? { borderBottom: val.css }
                                : { borderBottom: "" }
                            }
                          >
                            <td className="left">
                              <p>{val.title}</p>
                              {publicKey && <span>{val.TotalCollateral} </span>}

                              {publicKey && <span>{val.TotalBorrowed} </span>}
                            </td>
                            <td className="right text-right">
                              {ind === 0 || ind === 1 ? (
                                <>
                                  {val.userInfo.map((list, index) => {
                                    return (
                                      <>
                                        {list.Bal > 0 && (
                                          <div
                                            className={
                                              list.id === 1
                                                ? "row mt-1"
                                                : "row mt-3"
                                            }
                                            key={index}
                                          >
                                            <div className="col-12 Collateral_list d-flex justify-content-end flex-column">
                                              <div className="row">
                                                <div className="col-12 Collateral_list_details mr-2 d-flex align-items-center justify-content-end">
                                                  <p>
                                                    {CalcFourDigit(list.Bal)}
                                                  </p>
                                                  <span className="ml-1">
                                                    {list.name}
                                                  </span>
                                                  <img
                                                    src={list.img}
                                                    alt="Loading..."
                                                    className="ml-2"
                                                  />
                                                </div>

                                                <div className=" col-12 mt-1 Collateral_list_Price d-flex justify-content-end flex-column align-items-end">
                                                  <p>
                                                    ${" "}
                                                    {numFormatter(
                                                      list.TokenPrice
                                                    )}
                                                  </p>
                                                </div>
                                                {ind === 0 && (
                                                  <div className=" col-12 mt-1 Collateral_list_APY d-flex justify-content-end flex-column align-items-end">
                                                    <p>
                                                      {list.RewardAPYName ===
                                                        "solend" && (
                                                        <img
                                                          src="/images/solendLogo.png"
                                                          alt="logo"
                                                          className="mr-2"
                                                        />
                                                      )}
                                                      {list.RewardAPYName ===
                                                        "apricot" && (
                                                        <img
                                                          src="/images/apricotLogo.png"
                                                          alt="logo"
                                                          className="mr-2"
                                                        />
                                                      )}
                                                      {list.name} Reward APY:{" "}
                                                      {list.RewardAPY
                                                        ? CalcFiveDigit(
                                                            list.RewardAPY
                                                          )
                                                        : 0}
                                                      %
                                                    </p>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    );
                                  })}
                                </>
                              ) : (
                                <>{publicKey && <p>{val.price}</p>}</>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
