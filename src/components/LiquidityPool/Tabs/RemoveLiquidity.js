import { useState } from "react";
import { Message } from "../../../redux/actions/Message";
import { useSelector, useDispatch } from "react-redux";
import RemoveLiquidityModel from "../../../Models/RemoveLiquidityModel";

const RemoveLiquidity = () => {
  const dispatch = useDispatch();
  const [removeLiquidityModel, setRemoveLiquidityModel] = useState(false);

  const RemoveLiquidityState = useSelector(
    (state) => state.RemoveLiquidityReducer
  );

  return (
    <>
      {removeLiquidityModel && (
        <RemoveLiquidityModel
          removeLiquidityModel={removeLiquidityModel}
          setRemoveLiquidityModel={setRemoveLiquidityModel}
        />
      )}

      <div className="row RemoveLiquidity d-flex justify-content-center">
        <div className="col-lg-11 col-md-10 col-12 mt-3 mb-1">
          <div className="RemoveLiquidity_card py-lg-1 py-md-1 py-sm-1 py-3">
            <div className="row d-flex align-items-center">
              <div className="col-lg-5 col-md-4 col-sm-6 col-6 RemoveLiquidity_card_left d-flex justify-content-start">
                <div className="d-flex align-items-center">
                  <span className="badge d-flex align-items-center">MAX</span>
                  <input
                    type="number"
                    placeholder="00.00"
                    autoComplete="off"
                    className="ml-2"
                  />
                </div>
              </div>
              <div className="col-lg-7 col-md-8 col-sm-6 col-6 mt-lg-0 mt-md-0 mt-sm-0 mt-3 col-md-8 col-sm-6 col-12 d-flex justify-content-end RemoveLiquidity_card_right">
                <button onClick={() => setRemoveLiquidityModel(true)}>
                  {RemoveLiquidityState.img1 && (
                    <img
                      src={RemoveLiquidityState.img1}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}

                  <div className="ml-2 d-flex align-items-center">
                    {RemoveLiquidityState.img2 && (
                      <img
                        src={RemoveLiquidityState.img2}
                        alt="Loading..."
                        height="29"
                        width="29"
                      />
                    )}
                  </div>

                  <span className="ml-3">{RemoveLiquidityState.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="row">
                <div className="col-12 d-flex justify-content-center mt-3">
                  <div className="btn_section">
                    <button onClick={() => dispatch(Message())}>
                      Remove Liquidity
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

export default RemoveLiquidity;
