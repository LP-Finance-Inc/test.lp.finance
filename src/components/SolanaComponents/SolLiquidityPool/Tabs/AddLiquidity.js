import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import TokenModel from "../../../../Models/Common/TokenModel";
import { topAddLiquidityApi } from "../../../../assets/api/Solana/SolLiquidityPoolApis";
import {
  SolTopAddLiquidityTokenSelect,
  SolBottomAddLiquidityTokenSelect,
} from "../../../../redux/actions/Solana/SolLiquidityPoolActions";
import { useSelector } from "react-redux";

const AddLiquidity = () => {
  const [SolTopAddLiquidityModel, setSolTopAddLiquidityModel] = useState(false);
  const [SolBottomAddLiquidityModel, setSolBottomAddLiquidityModel] =
    useState(false);

  const SolTopAddLiquidityState = useSelector(
    (state) => state.SolTopAddLiquidityReducer
  );

  return (
    <>
      {SolTopAddLiquidityModel && (
        <TokenModel
          tokenModel={SolTopAddLiquidityModel}
          setTokenModel={setSolTopAddLiquidityModel}
          TokensApi={topAddLiquidityApi}
          TokenSelectFun={SolTopAddLiquidityTokenSelect}
        />
      )}

      {SolBottomAddLiquidityModel && (
        <TokenModel
          tokenModel={SolBottomAddLiquidityModel}
          setTokenModel={setSolBottomAddLiquidityModel}
          TokensApi={SolTopAddLiquidityState?.list}
          TokenSelectFun={SolBottomAddLiquidityTokenSelect}
          height="auto"
        />
      )}

      <div className="row AddLiquidity d-flex justify-content-center">
        <div className="col-lg-8 col-md-10 col-12 mt-3 mb-1">
          <div className="AddLiquidity_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-5 col-md-5 col-5 AddLiquidity_card_left">
                <div className="d-flex align-items-center">
                  <input type="number" placeholder="00.00" autoComplete="off" />
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-7  d-flex justify-content-end AddLiquidity_card_right">
                <button onClick={() => setSolTopAddLiquidityModel(true)}>
                  {SolTopAddLiquidityState.img1 && (
                    <img
                      src={SolTopAddLiquidityState.img1}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{SolTopAddLiquidityState.name1}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-md-10 col-12 mb-1 d-flex justify-content-center">
          <div className="plus_icon_section">
            <BsPlusCircleFill className="icon" />
          </div>
        </div>

        <div className="col-lg-8 col-md-10 col-12 mb-2">
          <div className="AddLiquidity_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-5 col-md-5 col-5 AddLiquidity_card_left">
                <div className="d-flex align-items-center">
                  <input type="number" placeholder="00.00" autoComplete="off" />
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-7 d-flex justify-content-end AddLiquidity_card_right">
                <button onClick={() => setSolBottomAddLiquidityModel(true)}>
                  {SolTopAddLiquidityState.img2 && (
                    <img
                      src={SolTopAddLiquidityState.img2}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{SolTopAddLiquidityState.name2}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="row">
                <div className="col-12 d-flex justify-content-center mt-3">
                  <div className="btn_section">
                    <button>Add Liquidity</button>
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

export default AddLiquidity;
