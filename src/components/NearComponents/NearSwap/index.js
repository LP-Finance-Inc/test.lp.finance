import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiTransferAlt } from "react-icons/bi";
import { blockInvalidChar } from "../../../helper";
import SwapWrapper from "../../../styles/Common/components/Swap.style";
import { NearSwapTokenApi } from "../../../assets/api/Near/NearSwapApi";
import TokenModel from "../../../Models/Common/TokenModel";
import {
  NearTopSwapTokenSelect,
  NearBottomSwapTokenSelect,
  NearBottomSwapTokenCompare,
  NearTopSwapTokenCompare,
  NearTopSwapTokenChange,
  NearBottomSwapTokenChange,
} from "../../../redux/actions/Near/NearSwapActions";
import { Message } from "../../../redux/actions/Message";

const NearSwap = () => {
  const dispatch = useDispatch();

  const { NearTokenPriceArr } = useSelector(
    (state) => state.NearTokenPriceReducer
  );
  const NearSwapTokenApiNew = NearSwapTokenApi(NearTokenPriceArr);

  const [NearTopSwapBalance, setNearTopSwapBalance] = useState("");
  const [NearBottomSwapBalance, setNearBottomSwapBalance] = useState("");

  const [NearSwapChange, setNearSwapChange] = useState({
    img1: "",
    name1: "",
    img2: "",
    name2: "",
  });

  const [NearTopSwapModel, setNearTopSwapModel] = useState(false);

  const [NearBottomSwapModel, setNearBottomSwapModel] = useState(false);

  const NearTopSwapState = useSelector((state) => state.NearTopSwapReducer);

  const NearBottomSwapState = useSelector(
    (state) => state.NearBottomSwapReducer
  );

  const NearTopSwapNumber = (e) => {
    setNearTopSwapBalance(e.target.value);
  };

  const NearBottomSwapNumber = (e) => {
    setNearBottomSwapBalance(e.target.value);
  };

  const ChangeNearTokenSwap = () => {
    dispatch(NearTopSwapTokenChange(NearSwapChange));
    dispatch(NearBottomSwapTokenChange(NearSwapChange));
    setNearTopSwapBalance(NearBottomSwapBalance);
    setNearBottomSwapBalance(NearTopSwapBalance);
  };

  useEffect(() => {
    setNearSwapChange({
      ...NearSwapChange,
      img1: NearTopSwapState.img,
      name1: NearTopSwapState.name,
      img2: NearBottomSwapState.img,
      name2: NearBottomSwapState.name,
    });

    if (NearTopSwapState.name === NearBottomSwapState.name) {
      dispatch(NearBottomSwapTokenCompare());
      setNearTopSwapBalance("");
      setNearBottomSwapBalance("");
    }
  }, [NearTopSwapState.name]);

  useEffect(() => {
    setNearSwapChange({
      ...NearSwapChange,
      img1: NearTopSwapState.img,
      name1: NearTopSwapState.name,
      img2: NearBottomSwapState.img,
      name2: NearBottomSwapState.name,
    });
    if (NearBottomSwapState.name === NearTopSwapState.name) {
      dispatch(NearTopSwapTokenCompare());
      setNearTopSwapBalance("");
      setNearBottomSwapBalance("");
    }
  }, [NearBottomSwapState.name]);

  useEffect(() => {
    setNearSwapChange({
      ...NearSwapChange,
      img1: NearTopSwapState.img,
      name1: NearTopSwapState.name,
      img2: NearBottomSwapState.img,
      name2: NearBottomSwapState.name,
    });
  }, []);

  return (
    <>
      {NearTopSwapModel && (
        <TokenModel
          tokenModel={NearTopSwapModel}
          setTokenModel={setNearTopSwapModel}
          TokensApi={NearSwapTokenApiNew}
          TokenSelectFun={NearTopSwapTokenSelect}
        />
      )}

      {NearBottomSwapModel && (
        <TokenModel
          tokenModel={NearBottomSwapModel}
          setTokenModel={setNearBottomSwapModel}
          TokensApi={NearSwapTokenApiNew}
          TokenSelectFun={NearBottomSwapTokenSelect}
        />
      )}

      <SwapWrapper>
        <div className="container Swap">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="swap_title">
                <h2>Swap Tokens</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 pb-lg-3 my-lg-4 my-md-5 my-4 my-2">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12 d-flex justify-content-center">
                  <div className="swap_card py-4">
                    <div className="row mb-4 d-flex justify-content-center">
                      <div className="col-11">
                        <div className="swap_card_title">
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
                          <div className="row mt-2 my-1 d-flex align-items-center">
                            <div className="col d-flex align-items-center">
                              <div className="number d-flex align-items-center">
                                <input
                                  type="number"
                                  placeholder="00.00"
                                  autoComplete="off"
                                  value={NearTopSwapBalance}
                                  onChange={NearTopSwapNumber}
                                  id="ToSwapInput"
                                  onKeyDown={blockInvalidChar}
                                  className="ml-2"
                                />
                              </div>
                            </div>
                            <div className="col-7 img_Section d-flex justify-content-end">
                              <button onClick={() => setNearTopSwapModel(true)}>
                                {NearTopSwapState.img && (
                                  <img
                                    src={NearTopSwapState.img}
                                    alt="Loading..."
                                    height="29"
                                    width="29"
                                  />
                                )}

                                <span className="ml-3">
                                  {NearTopSwapState.name}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 d-flex justify-content-center ">
                            <div
                              className="transfer_title my-1"
                              onClick={ChangeNearTokenSwap}
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
                              <div className="number d-flex align-items-center">
                                <input
                                  type="number"
                                  placeholder="00.00"
                                  autoComplete="off"
                                  value={NearBottomSwapBalance}
                                  id="BottomSwapInput"
                                  onChange={NearBottomSwapNumber}
                                  onKeyDown={blockInvalidChar}
                                />
                              </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-8 img_Section d-flex justify-content-end">
                              <button
                                onClick={() => setNearBottomSwapModel(true)}
                              >
                                {NearBottomSwapState.img && (
                                  <img
                                    src={NearBottomSwapState.img}
                                    alt="Loading..."
                                    height="29"
                                    width="29"
                                  />
                                )}

                                <span className="ml-3">
                                  {NearBottomSwapState.name}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="btn d-flex justify-content-center pt-4">
                          <button onClick={() => dispatch(Message())}>
                            Swap
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwapWrapper>
    </>
  );
};

export default NearSwap;
