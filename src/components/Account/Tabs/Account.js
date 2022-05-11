import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { BorrowUserAccountApi } from "../../../assets/api/BorrowApi";

const Account = ({
  getAssetsMarketState,
  PoolAssetsState,
  lpContractState,
}) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const {
    TotalCollateral,
    TotalBorrowed,
    BorrowLimit,
    LiquidationThreshold,
    ltv,
    BorrowedTokenListHTML,
    CollateralTokenListHTML,
  } = BorrowUserAccountApi(
    getAssetsMarketState,
    PoolAssetsState,
    lpContractState?.TokenPriceList,
    wallet,
    publicKey
  );

  useEffect(() => {
    if (TotalBorrowed && CollateralTokenListHTML) {
      const id1 = document.getElementById("borrowed_html");
      const id2 = document.getElementById("collateral_html");
      id1.insertAdjacentHTML("afterbegin", BorrowedTokenListHTML);
      id2.insertAdjacentHTML("afterbegin", CollateralTokenListHTML);
    }
  }, [CollateralTokenListHTML]);

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
                          Borrowed:$ {TotalBorrowed} ( {ltv} )
                        </span>
                      </div>
                      <div className="pie2">
                        <span className="pie2_tooltip">
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
                    <tr style={{ borderBottom: "3px solid #FFFFFF80" }}>
                      <td className="left">
                        <p>Collateral</p>
                        <span>{TotalCollateral}</span>
                      </td>
                      <td className="right text-right">
                        <div className="row" id="collateral_html"></div>
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "3px solid #FFFFFF80" }}>
                      <td className="left">
                        <p>Borrowed</p>
                        <span>{TotalBorrowed}</span>
                      </td>
                      <td className="right text-right">
                        <div className="row" id="borrowed_html"></div>
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "3px solid #FFFFFF80" }}>
                      <td className="left">
                        <p>Borrow Limit</p>
                      </td>
                      <td className="right text-right">
                        <p>{BorrowLimit}</p>
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "3px solid #FFFFFF80" }}>
                      <td className="left">
                        <p>Liquidation Threshold</p>
                      </td>
                      <td className="right text-right">
                        <p>{LiquidationThreshold}</p>
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "3px solid #FFFFFF80" }}>
                      <td className="left">
                        <p>LTV</p>
                      </td>
                      <td className="right text-right">
                        <p>{ltv}</p>
                      </td>
                    </tr>
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
