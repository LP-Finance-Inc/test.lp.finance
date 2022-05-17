import React, { useEffect, useState } from "react";
import BridgeWrapper from "../../../styles/Common/components/Bridge.style";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiTransferAlt } from "react-icons/bi";
import {
  BridgeSourceNetworkCompare,
  BridgeTargetNetworkCompare,
  SwapBridgeSourceNetworkFun,
  SwapBridgeTargetNetworkFun,
  BridgeSourceNetworkSelect,
  BridgeTargetNetworkSelect,
} from "../../../redux/actions/Solana/SolBridgeActions";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../../redux/actions/Message";
import BridgeModel from "../../../Models/Common/BridgeModel";
import {
  BridgeSourceNetworkList,
  BridgeTargetNetworkList,
} from "../../../assets/api/Solana/SolBridgeApi";

const SolBridge = () => {
  const dispatch = useDispatch();

  const [StoreNetwork, setStoreNetwork] = useState({
    SourceName: "",
    SourceImg: "",
    TargetName: "",
    TargetImg: "",
  });
  const [bridgeSourceModel, setBridgeSourceModel] = useState(false);

  const [bridgeTargetModel, setBridgeTargetModel] = useState(false);

  const SolBridgeSourceNetworkState = useSelector(
    (state) => state.SolBridgeSourceNetworkReducer
  );

  const SolBridgeTargetNetworkState = useSelector(
    (state) => state.SolBridgeTargetNetworkReducer
  );

  const SwapBridgeNetwork = () => {
    dispatch(SwapBridgeSourceNetworkFun(StoreNetwork));
    dispatch(SwapBridgeTargetNetworkFun(StoreNetwork));
  };

  useEffect(() => {
    setStoreNetwork({
      ...StoreNetwork,
      SourceName: SolBridgeSourceNetworkState.name,
      SourceImg: SolBridgeSourceNetworkState.img,
      TargetName: SolBridgeTargetNetworkState.name,
      TargetImg: SolBridgeTargetNetworkState.img,
    });
    if (SolBridgeSourceNetworkState.name === SolBridgeTargetNetworkState.name) {
      dispatch(BridgeSourceNetworkCompare());
    }
  }, [SolBridgeSourceNetworkState.name]);

  useEffect(() => {
    setStoreNetwork({
      ...StoreNetwork,
      SourceName: SolBridgeSourceNetworkState.name,
      SourceImg: SolBridgeSourceNetworkState.img,
      TargetName: SolBridgeTargetNetworkState.name,
      TargetImg: SolBridgeTargetNetworkState.img,
    });
    if (SolBridgeTargetNetworkState.name === SolBridgeSourceNetworkState.name) {
      dispatch(BridgeTargetNetworkCompare());
    }
  }, [SolBridgeTargetNetworkState.name]);

  useEffect(() => {
    setStoreNetwork({
      ...StoreNetwork,
      SourceName: SolBridgeSourceNetworkState.name,
      SourceImg: SolBridgeSourceNetworkState.img,
      TargetName: SolBridgeTargetNetworkState.name,
      TargetImg: SolBridgeTargetNetworkState.img,
    });
  }, []);

  return (
    <>
      {bridgeSourceModel && (
        <BridgeModel
          bridgeModel={bridgeSourceModel}
          setBridgeModel={setBridgeSourceModel}
          BridgeSelectFun={BridgeSourceNetworkSelect}
          BridgeApi={BridgeSourceNetworkList}
        />
      )}

      {bridgeTargetModel && (
        <BridgeModel
          bridgeModel={bridgeTargetModel}
          setBridgeModel={setBridgeTargetModel}
          BridgeSelectFun={BridgeTargetNetworkSelect}
          BridgeApi={BridgeTargetNetworkList}
        />
      )}

      <BridgeWrapper>
        <div className="container Bridge">
          <div className="Bridge_top">
            <div className="col-12">
              <div className="title text-center">
                <h1>Bridge</h1>
              </div>
              <div className="subtitle text-center mt-1">
                <h1>Bridge CBS between networks</h1>
              </div>
            </div>
          </div>
          <div className="row Bridge_bottom  d-flex justify-content-center align-items-center my-4">
            <div className="col-lg-7 col-md-8 col-12 d-flex align-items-center justify-content-center">
              <div className="Token_Network_card">
                <div className="row">
                  <div className="col-12">
                    <div className="Title">
                      <p>NETWORK</p>
                    </div>
                    {/* <div className="subtitle mt-3">
                      <span>Select network</span>
                    </div> */}
                  </div>
                </div>
                <div className="row Token_Network_section mt-4">
                  <div className="col-12">
                    <div className="row d-flex align-items-center justify-content-center">
                      <div className="col-lg-5 col-md-5 col-12 Input_Section">
                        <div className="Input_Section_Title">
                          <p>Source</p>
                        </div>
                        <div
                          className="Input_Section_Box mt-1"
                          onClick={() => setBridgeSourceModel(true)}
                        >
                          <div className="row">
                            <div className="col-9 Input_Section_Box_left">
                              <div className="Details">
                                {SolBridgeSourceNetworkState.img && (
                                  <img
                                    src={SolBridgeSourceNetworkState.img}
                                    alt="Loading..."
                                  />
                                )}

                                <span className="ml-2">
                                  {SolBridgeSourceNetworkState.name}
                                </span>
                              </div>
                            </div>
                            <div className="col-3 Input_Section_Box_right d-flex align-items-center justify-content-end">
                              <IoMdArrowDropdown className="icon" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-center mt-lg-4 mt-md-4 mt-2">
                        <div
                          className="swap_section d-flex align-items-center"
                          onClick={SwapBridgeNetwork}
                        >
                          <BiTransferAlt className="icon" />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-12 Input_Section">
                        <div className="Input_Section_Title">
                          <p>Target</p>
                        </div>
                        <div
                          className="Input_Section_Box mt-1"
                          onClick={() => setBridgeTargetModel(true)}
                        >
                          <div className="row">
                            <div className="col-9 Input_Section_Box_left">
                              <div className="Details">
                                {SolBridgeTargetNetworkState.img && (
                                  <img
                                    src={SolBridgeTargetNetworkState.img}
                                    alt="Loading..."
                                  />
                                )}

                                <span className="ml-2">
                                  {SolBridgeTargetNetworkState.name}
                                </span>
                              </div>
                            </div>
                            <div className="col-3 Input_Section_Box_right d-flex align-items-center justify-content-end">
                              <IoMdArrowDropdown className="icon" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-12 d-flex justify-content-center">
                    <div className="Btn_section">
                      <button onClick={() => dispatch(Message())}>Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BridgeWrapper>
    </>
  );
};

export default SolBridge;
