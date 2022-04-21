import React, { useState, useEffect } from "react";
import { BiTransferAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { blockInvalidChar } from "../../../helper";
import EthSwapWrapper from "./EthSwap.style";
import {
  BottomEthSwapTokenCompare,
  TopEthSwapTokenCompare,
  TopEthSwapTokenChange,
  BottomEthSwapTokenChange,
} from "../../../redux/actions/EthereumActions/EthSwapActions";
import BottomEthSwapModel from "../../../Models/EthereumModels/EthSwapModels/BottomEthSwapModel";
import TopEthSwapModel from "../../../Models/EthereumModels/EthSwapModels/TopEthSwapModel";

const EthSwap = () => {
  const dispatch = useDispatch();

  const [bottomEthSwapModel, setBottomEthSwapModel] = useState(false);
  const [topEthSwapModel, setTopEthSwapModel] = useState(false);

  const [TopEthSwapBalance, setTopEthSwapBalance] = useState("");
  const [BottomEthSwapBalance, setBottomEthSwapBalance] = useState("");

  const [SwapChange, setSwapChange] = useState({
    img1: "",
    name1: "",
    img2: "",
    name2: "",
  });

  const BottomEthSwapState = useSelector((state) => state.BottomEthSwapReducer);
  const TopEthSwapState = useSelector((state) => state.TopEthSwapReducer);

  const topSwapNumber = (e) => {
    setTopEthSwapBalance(e.target.value);
  };
  const bottomSwapNumber = (e) => {
    setBottomEthSwapBalance(e.target.value);
  };

  const ChangeTokenEthSwap = () => {
    dispatch(TopEthSwapTokenChange(SwapChange));
    dispatch(BottomEthSwapTokenChange(SwapChange));
    setTopEthSwapBalance(BottomEthSwapBalance);
    setBottomEthSwapBalance(TopEthSwapBalance);
  };

  useEffect(() => {
    setSwapChange({
      ...SwapChange,
      img1: TopEthSwapState.img,
      name1: TopEthSwapState.name,
      img2: BottomEthSwapState.img,
      name2: BottomEthSwapState.name,
    });
    if (TopEthSwapState.name === BottomEthSwapState.name) {
      dispatch(BottomEthSwapTokenCompare());
      setTopEthSwapBalance("");
      setBottomEthSwapBalance("");
    }
  }, [TopEthSwapState.name]);

  useEffect(() => {
    setSwapChange({
      ...SwapChange,
      img1: TopEthSwapState.img,
      name1: TopEthSwapState.name,
      img2: BottomEthSwapState.img,
      name2: BottomEthSwapState.name,
    });
    if (BottomEthSwapState.name === TopEthSwapState.name) {
      dispatch(TopEthSwapTokenCompare());
      setTopEthSwapBalance("");
      setBottomEthSwapBalance("");
    }
  }, [BottomEthSwapState.name]);

  useEffect(() => {
    setSwapChange({
      ...SwapChange,
      img1: TopEthSwapState.img,
      name1: TopEthSwapState.name,
      img2: BottomEthSwapState.img,
      name2: BottomEthSwapState.name,
    });
  }, []);

  return (
    <>
      {topEthSwapModel && (
        <TopEthSwapModel
          topEthSwapModel={topEthSwapModel}
          setTopEthSwapModel={setTopEthSwapModel}
        />
      )}

      {bottomEthSwapModel && (
        <BottomEthSwapModel
          bottomEthSwapModel={bottomEthSwapModel}
          setBottomEthSwapModel={setBottomEthSwapModel}
        />
      )}

      <EthSwapWrapper>
        <div className="container EthSwap">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="EthSwap_title">
                <h2>Swap Tokens</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 pb-lg-3 my-lg-4 my-md-5 my-4 my-2">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12 d-flex justify-content-center">
                  <div className="EthSwap_card py-4">
                    <div className="row mb-4 d-flex justify-content-center">
                      <div className="col-11">
                        <div className="EthSwap_card_title">
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
                          <div className="row mt-2 my-1">
                            <div className="col-lg-5 col-md-5 col-4 d-flex align-items-center">
                              <div className="number">
                                <input
                                  type="number"
                                  placeholder="00.00"
                                  autoComplete="off"
                                  id="ToSwapInput"
                                  value={TopEthSwapBalance}
                                  onKeyDown={blockInvalidChar}
                                  onChange={topSwapNumber}
                                />
                              </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-8 img_Section d-flex justify-content-end">
                              <button onClick={() => setTopEthSwapModel(true)}>
                                {TopEthSwapState && TopEthSwapState.img && (
                                  <img
                                    src={TopEthSwapState.img}
                                    alt="Loading..."
                                    height="29"
                                    width="29"
                                  />
                                )}
                                <span className="ml-3">
                                  {TopEthSwapState.name}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 d-flex justify-content-center ">
                            <div
                              className="transfer_title my-1"
                              onClick={() => ChangeTokenEthSwap()}
                            >
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
                              <div className="number">
                                <input
                                  type="number"
                                  placeholder="00.00"
                                  autoComplete="off"
                                  id="BottomSwapInput"
                                  value={BottomEthSwapBalance}
                                  onKeyDown={blockInvalidChar}
                                  onChange={bottomSwapNumber}
                                />
                              </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-8 img_Section d-flex justify-content-end">
                              <button
                                onClick={() => setBottomEthSwapModel(true)}
                              >
                                {BottomEthSwapState.img && (
                                  <img
                                    src={BottomEthSwapState.img}
                                    alt="Loading..."
                                    height="29"
                                    width="29"
                                  />
                                )}
                                <span className="ml-3">
                                  {BottomEthSwapState.name}
                                </span>
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
      </EthSwapWrapper>
    </>
  );
};

export default EthSwap;
