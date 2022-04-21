import React from "react";
import EthLiquidateWrapper from "./EthLiquidate.style";

const EthLiquidate = () => {
  return (
    <EthLiquidateWrapper>
      <div className="container EthLiquidate">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-12 EthLiquidate_top">
            <div className="title text-center">
              <h2>Liquidate</h2>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-5 mb-2">
          <div className="col-lg-10 col-12 table_section">
            <div className="table_card" style={{ minHeight: "auto" }}>
              <table className="table table-hover">
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
    </EthLiquidateWrapper>
  );
};

export default EthLiquidate;
