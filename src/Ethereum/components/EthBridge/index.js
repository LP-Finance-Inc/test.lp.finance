import React, { useEffect, useState } from "react";
import EthBridgeWrapper from "./EthBridge.style";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiTransferAlt } from "react-icons/bi";
import EthBridgeSourceModel from "../../../Models/EthereumModels/EthBridgeModels/EthBridgeSourceModel";
import EthBridgeTargetModel from "../../../Models/EthereumModels/EthBridgeModels/EthBridgeTargetModel";
import {
  EthBridgeSourceNetworkCompare,
  EthBridgeTargetNetworkCompare,
  EthSwapBridgeSourceNetworkFun,
  EthSwapBridgeTargetNetworkFun,
} from "../../../redux/actions/EthereumActions/EthBridgeActions";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../../redux/actions/Message";

const EthBridge = () => {
  const dispatch = useDispatch();

  const [ethBridgeSourceModel, setEthBridgeSourceModel] = useState(false);

  const [ethBridgeTargetModel, setEthBridgeTargetModel] = useState(false);

  const [EthStoreNetwork, setEthStoreNetwork] = useState({
    SourceName: "",
    SourceImg: "",
    TargetName: "",
    TargetImg: "",
  });

  const EthBridgeSourceNetworkState = useSelector(
    (state) => state.EthBridgeSourceNetworkReducer
  );

  const EthBridgeTargetNetworkState = useSelector(
    (state) => state.EthBridgeTargetNetworkReducer
  );

  const EthSwapBridgeNetwork = () => {
    dispatch(EthSwapBridgeSourceNetworkFun(EthStoreNetwork));
    dispatch(EthSwapBridgeTargetNetworkFun(EthStoreNetwork));
  };

  useEffect(() => {
    setEthStoreNetwork({
      ...EthStoreNetwork,
      SourceName: EthBridgeSourceNetworkState.name,
      SourceImg: EthBridgeSourceNetworkState.img,
      TargetName: EthBridgeTargetNetworkState.name,
      TargetImg: EthBridgeTargetNetworkState.img,
    });
    if (EthBridgeSourceNetworkState.name === EthBridgeTargetNetworkState.name) {
      dispatch(EthBridgeSourceNetworkCompare());
    }
  }, [EthBridgeSourceNetworkState.name]);

  useEffect(() => {
    setEthStoreNetwork({
      ...EthStoreNetwork,
      SourceName: EthBridgeSourceNetworkState.name,
      SourceImg: EthBridgeSourceNetworkState.img,
      TargetName: EthBridgeTargetNetworkState.name,
      TargetImg: EthBridgeTargetNetworkState.img,
    });
    if (EthBridgeTargetNetworkState.name === EthBridgeSourceNetworkState.name) {
      dispatch(EthBridgeTargetNetworkCompare());
    }
  }, [EthBridgeTargetNetworkState.name]);

  useEffect(() => {
    setEthStoreNetwork({
      ...EthStoreNetwork,
      SourceName: EthBridgeSourceNetworkState.name,
      SourceImg: EthBridgeSourceNetworkState.img,
      TargetName: EthBridgeTargetNetworkState.name,
      TargetImg: EthBridgeTargetNetworkState.img,
    });
  }, []);

  return (
    <>
      {ethBridgeSourceModel && (
        <EthBridgeSourceModel
          ethBridgeSourceModel={ethBridgeSourceModel}
          setEthBridgeSourceModel={setEthBridgeSourceModel}
        />
      )}

      {ethBridgeTargetModel && (
        <EthBridgeTargetModel
          ethBridgeTargetModel={ethBridgeTargetModel}
          setEthBridgeTargetModel={setEthBridgeTargetModel}
        />
      )}

      <EthBridgeWrapper>
        <div className="container EthBridge">
          <div className="EthBridge_top">
            <div className="col-12">
              <div className="title text-center">
                <h1>Bridge</h1>
              </div>
              <div className="subtitle text-center mt-1">
                <h1>Bridge CBS between networks</h1>
              </div>
            </div>
          </div>
          <div className="row EthBridge_bottom  d-flex justify-content-center align-items-center my-4">
            <div className="col-lg-6 col-md-8 col-12 d-flex align-items-center justify-content-center">
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
                          onClick={() => setEthBridgeSourceModel(true)}
                        >
                          <div className="row">
                            <div className="col-9 Input_Section_Box_left">
                              <div className="Details">
                                {EthBridgeSourceNetworkState.img && (
                                  <img
                                    src={EthBridgeSourceNetworkState.img}
                                    alt="Loading..."
                                  />
                                )}

                                <span className="ml-2">
                                  {EthBridgeSourceNetworkState.name}
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
                          onClick={EthSwapBridgeNetwork}
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
                          onClick={() => setEthBridgeTargetModel(true)}
                        >
                          <div className="row">
                            <div className="col-9 Input_Section_Box_left">
                              <div className="Details">
                                {EthBridgeTargetNetworkState.img && (
                                  <img
                                    src={EthBridgeTargetNetworkState.img}
                                    alt="Loading..."
                                  />
                                )}

                                <span className="ml-2">
                                  {EthBridgeTargetNetworkState.name}
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
      </EthBridgeWrapper>
    </>
  );
};

export default EthBridge;
