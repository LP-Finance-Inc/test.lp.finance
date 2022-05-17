import React, { useState } from "react";
import TotalSupplyModel from "../../../Models/SolanaModels/SolBorrowModels/TotalSupplyModel";
import TotalBorrowModel from "../../../Models/SolanaModels/SolBorrowModels/TotalBorrowModel";
import DAOModel from "../../../Models/SolanaModels/SolBorrowModels/DAOModel";
import { calc, numFormatter } from "../../../helper";
import ApricotModel from "../../../Models/SolanaModels/SolBorrowModels/ApricotModel";
import SolendModel from "../../../Models/SolanaModels/SolBorrowModels/SolendModel";

const Overview = ({ SolBorrowState }) => {
  const [totalSupplyModel, setTotalSupplyModel] = useState(false);
  const [totalBorrowModel, setTotalBorrowModel] = useState(false);
  const [daOModel, setDAOModel] = useState(false);
  const [apricotFR, setApricotFR] = useState(false);
  const [solendModel, setSolendModel] = useState(false);

  return (
    <>
      {daOModel && <DAOModel daOModel={daOModel} setDAOModel={setDAOModel} />}

      {apricotFR && (
        <ApricotModel apricotFR={apricotFR} setApricotFR={setApricotFR} />
      )}

      {solendModel && (
        <SolendModel
          solendModel={solendModel}
          setSolendModel={setSolendModel}
        />
      )}

      {totalSupplyModel && (
        <TotalSupplyModel
          totalSupplyModel={totalSupplyModel}
          setTotalSupplyModel={setTotalSupplyModel}
        />
      )}

      {totalBorrowModel && (
        <TotalBorrowModel
          totalBorrowModel={totalBorrowModel}
          setTotalBorrowModel={setTotalBorrowModel}
        />
      )}

      <div className="row py-lg-5 py-my-5 py-sm-3 py-3 d-flex justify-content-center borrow_overview_section">
        <div className="col-lg-10 col-md-11 col-12">
          <div className="row py-2">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="protocol_overview_title ml-lg-4 pl-lg-4 pl-md-4 pl-sm-4 pl-0">
                <p>Protocol Overview</p>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-6 col-12">
              <div className="protocol_overview_img">
                <hr />
                <img src="/images/diamond.png" alt="Loading..." />
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-center overview_section_card">
            <div className="col-lg-1 col-md-1 col-sm-1 col-12 d-flex justify-content-end">
              <div className="bottom_arrow_img text-center">
                <hr />
                <img src="/images/diamond.png" alt="Loading..." />
              </div>
            </div>
            <div className="col-lg-11 col-md-11 col-sm-11 col-12">
              <div className="borrow_card py-4">
                <div className="row d-flex align-items-center">
                  <div className="col-lg-6 col-md-8 col-12 borrow_card_left mt-2">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-4">
                        <div className="borrow_cart">
                          <div
                            className="pie animate no-round"
                            onClick={() => setTotalBorrowModel(true)}
                          ></div>
                          <div
                            className="totalSupplyPie"
                            onClick={() => setTotalSupplyModel(true)}
                          >
                            <img
                              src="/images/figma/ellipse.png"
                              alt="Loading..."
                            />
                          </div>
                        </div>

                        <div className="miter1">
                          <p className="ml-5 pl-2">100%</p>
                          <img
                            src="/images/figma/cartLine1.png"
                            alt="Loading..."
                          />
                        </div>
                        <div className="miter2">
                          <p className="ml-4 pl-2">
                            {SolBorrowState?.Borrow?.Overview?.NetLTV
                              ? `${calc(
                                  SolBorrowState.Borrow.Overview.NetLTV
                                )}%`
                              : `0%`}
                          </p>
                          <img
                            src="/images/figma/cartLine2.png"
                            alt="loading..."
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex justify-content-center">
                        <div className="row py-lg-0 py-md-0 py-3 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-6 mt-lg-3 mt-md-3 mt-0">
                            <div className="cart_details ml-3">
                              <p>Total Supply</p>
                              <span>
                                ${" "}
                                {numFormatter(
                                  SolBorrowState?.Borrow?.Overview?.TotalSupply
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-6">
                            <div className="cart_details ml-3 mt-lg-4 mt-md-0 pt-lg-3 mt-md-3 mt-0">
                              <p>Total Borrowed</p>
                              <span>
                                ${" "}
                                {numFormatter(
                                  SolBorrowState?.Borrow?.Overview?.TotalBorrow
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-8 col-12 borrow_card_right mt-lg-0 mt-md-0 mt-4 ">
                    <div className="list_section p-lg-3 p-md-2 p-0">
                      <table>
                        <tbody>
                          <tr>
                            <td>TVL : </td>
                            <td className="list_section_right">
                              ${" "}
                              {numFormatter(
                                SolBorrowState?.Borrow?.Overview?.TVL
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td> Net LTV :</td>
                            <td className="list_section_right">
                              {SolBorrowState?.Borrow?.Overview?.NetLTV
                                ? `${calc(
                                    SolBorrowState.Borrow.Overview.NetLTV
                                  )}%`
                                : `0%`}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-8 col-12 mt-lg-0 mt-md-0 mt-4 CBS_DAO d-flex justify-content-center flex-column p-0 m-0">
                    <button onClick={() => setDAOModel(true)}>CBS DAO</button>
                    <button onClick={() => setApricotFR(true)} className="mt-2">
                      <img
                        src="/images/apricotLogo.png"
                        alt="Loading..."
                        className="mr-2"
                      />
                      Apricot
                    </button>
                    <button
                      onClick={() => setSolendModel(true)}
                      className="mt-2"
                    >
                      <img
                        src="/images/solendLogo.png"
                        alt="Loading..."
                        className="mr-2"
                      />
                      Solend
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
