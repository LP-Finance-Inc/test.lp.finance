import React from "react";
import LiquidateWrapper from "../../../styles/Common/components/Liquidate.style";

const NearLiquidate = () => {
  return (
    <LiquidateWrapper>
      <div className="container liquidate">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-12 liquidate_top">
            <div className="title text-center">
              <h2>Liquidate</h2>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-5 mb-5">
          <div className="col-lg-10 col-12 table_section">
            <div className="table_card" style={{ minHeight: "400px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Debt</th>
                    <th scope="col">Collateral</th>
                    <th scope="col">Address</th>
                    <th scope="col">LR (%)</th>
                    <th scope="col">LTV (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <div className="row">
                    <div className="col-12 NoList">
                      <div className="message">
                        <span>No Positions in Liquidation Risk</span>
                      </div>
                    </div>
                  </div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LiquidateWrapper>
  );
};

export default NearLiquidate;
