import { useState, useEffect } from "react";
import { BiTransferAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "@solana/wallet-adapter-react";
import { blockInvalidChar } from "../../helper";
import SwapWrapper from "./Swap.style";
import {
  BottomSwapTokenCompare,
  TopSwapTokenCompare,
  TopSwapTokenChange,
  BottomSwapTokenChange,
} from "../../redux/actions/SwapActions";
import BottomSwapModel from "../../Models/swapModel/BottomSwapModel";
import TopSwapModel from "../../Models/swapModel/TopSwapModel";
import {
  SwapSOLToToken,
  SwapTokenToSOL,
  SwapTokenToToken,
} from "../../lp_contracts/Swap";
import { calc } from "../../helper";

const Swap = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const [SwapMessage, setSwapMessage] = useState("Select a token");
  const [TopSwapBalance, setTopSwapBalance] = useState("");
  const [BottomSwapBalance, setBottomSwapBalance] = useState("");
  const [Required, setRequired] = useState(false);

  const lpContractState = useSelector((state) => state.lpContractReducers);

  const [SwapChange, setSwapChange] = useState({
    img1: "",
    name1: "",
    img2: "",
    name2: "",
  });

  const [bottomSwapModel, setBottomSwapModel] = useState(false);
  const [topSwapModel, setTopSwapModel] = useState(false);

  const BottomSwapState = useSelector((state) => state.BottomSwapReducer);
  const TopSwapState = useSelector((state) => state.TopSwapReducer);

  const {
    SOLBalance,
    lpUSDBalance,
    lpSOLBalance,
    USDCBalance,
    BTCBalance,
    mSOLBalance,
  } = lpContractState.BalList;

  const {
    BtcTokenPrice,
    SolTokenPrice,
    UsdcTokenPrice,
    lpSOLTokenPrice,
    lpUSDTokenPrice,
    mSOLTokenPrice,
  } = lpContractState.TokenPriceList;

  const ChangeTokenSwap = () => {
    dispatch(TopSwapTokenChange(SwapChange));
    dispatch(BottomSwapTokenChange(SwapChange));
    setTopSwapBalance(BottomSwapBalance);
    setBottomSwapBalance(TopSwapBalance);
  };

  const topSwapNumber = (e) => {
    setTopSwapBalance(e.target.value);

    if (SwapChange.img1 && SwapChange.img2) {
      if (publicKey) {
        if (
          (SwapChange.name1 === "SOL" && e.target.value <= SOLBalance) ||
          (SwapChange.name1 === "lpUSD" && e.target.value <= lpUSDBalance) ||
          (SwapChange.name1 === "lpSOL" && e.target.value <= lpSOLBalance) ||
          (SwapChange.name1 === "tUSDC" && e.target.value <= USDCBalance) ||
          (SwapChange.name1 === "tBTC" && e.target.value <= BTCBalance) ||
          (SwapChange.name1 === "tmSOL" && e.target.value <= mSOLBalance)
        ) {
          setSwapMessage("Swap");

          let volToken = "";
          let targetToken = "";

          if (SwapChange.name1 === "SOL") {
            volToken = SolTokenPrice;
          } else if (SwapChange.name1 === "tBTC") {
            volToken = BtcTokenPrice;
          } else if (SwapChange.name1 === "tUSDC") {
            volToken = UsdcTokenPrice;
          } else if (SwapChange.name1 === "lpSOL") {
            volToken = lpSOLTokenPrice;
          } else if (SwapChange.name1 === "lpUSD") {
            volToken = lpUSDTokenPrice;
          } else if (SwapChange.name1 === "tmSOL") {
            volToken = mSOLTokenPrice;
          }

          if (SwapChange.name2 === "SOL") {
            targetToken = SolTokenPrice;
          } else if (SwapChange.name2 === "tBTC") {
            targetToken = BtcTokenPrice;
          } else if (SwapChange.name2 === "tUSDC") {
            targetToken = UsdcTokenPrice;
          } else if (SwapChange.name2 === "lpSOL") {
            targetToken = lpSOLTokenPrice;
          } else if (SwapChange.name2 === "lpUSD") {
            targetToken = lpUSDTokenPrice;
          } else if (SwapChange.name2 === "tmSOL") {
            targetToken = mSOLTokenPrice;
          }

          const calBal = (e.target.value * volToken) / targetToken;

          if (calBal > 0) {
            setBottomSwapBalance(calc(calBal));
            setRequired(true);
          } else {
            setBottomSwapBalance("");
            setRequired(false);
          }
        } else {
          setRequired(false);
          setSwapMessage("Insufficient Balance");
        }
      } else {
        setSwapMessage("Connect wallet");
        setBottomSwapBalance("");
      }
    } else {
      setBottomSwapBalance("");
    }
  };

  const bottomSwapNumber = (e) => {
    setBottomSwapBalance(e.target.value);

    if (SwapChange.img1 && SwapChange.img2) {
      if (publicKey) {
        if (
          (SwapChange.name2 === "SOL" && e.target.value <= SOLBalance) ||
          (SwapChange.name2 === "lpUSD" && e.target.value <= lpUSDBalance) ||
          (SwapChange.name2 === "lpSOL" && e.target.value <= lpSOLBalance) ||
          (SwapChange.name2 === "tUSDC" && e.target.value <= USDCBalance) ||
          (SwapChange.name2 === "tBTC" && e.target.value <= BTCBalance) ||
          (SwapChange.name2 === "tmSOL" && e.target.value <= mSOLBalance)
        ) {
          setSwapMessage("Swap");

          let volToken = "";
          let targetToken = "";

          if (SwapChange.name2 === "SOL") {
            volToken = SolTokenPrice;
          } else if (SwapChange.name2 === "tBTC") {
            volToken = BtcTokenPrice;
          } else if (SwapChange.name2 === "tUSDC") {
            volToken = UsdcTokenPrice;
          } else if (SwapChange.name2 === "lpSOL") {
            volToken = lpSOLTokenPrice;
          } else if (SwapChange.name2 === "lpUSD") {
            volToken = lpUSDTokenPrice;
          } else if (SwapChange.name2 === "tmSOL") {
            volToken = mSOLTokenPrice;
          }

          if (SwapChange.name1 === "SOL") {
            targetToken = SolTokenPrice;
          } else if (SwapChange.name1 === "tBTC") {
            targetToken = BtcTokenPrice;
          } else if (SwapChange.name1 === "tUSDC") {
            targetToken = UsdcTokenPrice;
          } else if (SwapChange.name1 === "lpSOL") {
            targetToken = lpSOLTokenPrice;
          } else if (SwapChange.name1 === "lpUSD") {
            targetToken = lpUSDTokenPrice;
          } else if (SwapChange.name1 === "tmSOL") {
            targetToken = mSOLTokenPrice;
          }

          const calBal = (e.target.value * volToken) / targetToken;

          if (calBal > 0) {
            setTopSwapBalance(calc(calBal));
            setRequired(true);
          } else {
            setTopSwapBalance("");
            setRequired(false);
          }
        } else {
          setRequired(false);
          setSwapMessage("Insufficient Balance");
        }
      } else {
        setSwapMessage("Connect wallet");
        setTopSwapBalance("");
      }
    } else {
      setTopSwapBalance("");
    }
  };

  const SwapFunction = () => {
    if (publicKey) {
      if (SwapChange.img1 && SwapChange.img2) {
        if (Required) {
          if (SwapChange.name1 === "SOL") {
            dispatch(
              SwapSOLToToken(
                SwapChange.name2,
                wallet,
                TopSwapBalance,
                setTopSwapBalance,
                setBottomSwapBalance,
                setRequired,
                setSwapMessage
              )
            );
          } else if (SwapChange.name2 === "SOL") {
            dispatch(
              SwapTokenToSOL(
                SwapChange.name1,
                wallet,
                TopSwapBalance,
                setTopSwapBalance,
                setBottomSwapBalance,
                setRequired,
                setSwapMessage
              )
            );
          } else {
            dispatch(
              SwapTokenToToken(
                SwapChange.name1,
                SwapChange.name2,
                wallet,
                TopSwapBalance,
                setTopSwapBalance,
                setBottomSwapBalance,
                setRequired,
                setSwapMessage
              )
            );
          }
        }
      } else {
        setSwapMessage("Select a token");
      }
    } else {
      setSwapMessage("Connect wallet");
    }
  };

  useEffect(() => {
    setSwapChange({
      ...SwapChange,
      img1: TopSwapState.img,
      name1: TopSwapState.name,
      img2: BottomSwapState.img,
      name2: BottomSwapState.name,
    });
    if (TopSwapState.name === BottomSwapState.name) {
      dispatch(BottomSwapTokenCompare());
      setTopSwapBalance("");
      setBottomSwapBalance("");
    }
  }, [TopSwapState.name]);

  useEffect(() => {
    setSwapChange({
      ...SwapChange,
      img1: TopSwapState.img,
      name1: TopSwapState.name,
      img2: BottomSwapState.img,
      name2: BottomSwapState.name,
    });
    if (BottomSwapState.name === TopSwapState.name) {
      dispatch(TopSwapTokenCompare());
      setTopSwapBalance("");
      setBottomSwapBalance("");
    }
  }, [BottomSwapState.name]);

  useEffect(() => {
    if (SwapChange.img1 && SwapChange.img2) {
      setSwapMessage("Enter an amount");
      setTopSwapBalance("");
      setBottomSwapBalance("");
    } else {
      setSwapMessage("Select a token");
    }
  }, [publicKey]);

  useEffect(() => {
    setSwapChange({
      ...SwapChange,
      img1: TopSwapState.img,
      name1: TopSwapState.name,
      img2: BottomSwapState.img,
      name2: BottomSwapState.name,
    });
  }, []);

  useEffect(() => {
    if (SwapChange.img1 && SwapChange.img2) {
      setSwapMessage("Enter an amount");
      setTopSwapBalance("");
      setBottomSwapBalance("");
    } else {
      setSwapMessage("Select a token");
    }
  }, [SwapChange]);

  return (
    <>
      {topSwapModel && (
        <TopSwapModel
          topSwapModel={topSwapModel}
          setTopSwapModel={setTopSwapModel}
        />
      )}

      {bottomSwapModel && (
        <BottomSwapModel
          bottomSwapModel={bottomSwapModel}
          setBottomSwapModel={setBottomSwapModel}
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
                          <div className="row mt-2 my-1">
                            <div className="col-lg-5 col-md-5 col-4 d-flex align-items-center">
                              <div className="number">
                                <input
                                  type="number"
                                  value={TopSwapBalance}
                                  placeholder="00.00"
                                  autoComplete="off"
                                  id="ToSwapInput"
                                  onKeyDown={blockInvalidChar}
                                  onChange={topSwapNumber}
                                />
                              </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-8 img_Section d-flex justify-content-end">
                              <button onClick={() => setTopSwapModel(true)}>
                                {TopSwapState && TopSwapState.img && (
                                  <img
                                    src={TopSwapState.img}
                                    alt="Loading..."
                                    height="29"
                                    width="29"
                                  />
                                )}
                                <span className="ml-3">
                                  {TopSwapState.name}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 d-flex justify-content-center ">
                            <div
                              className="transfer_title my-1"
                              onClick={() => ChangeTokenSwap()}
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
                                  value={BottomSwapBalance}
                                  id="BottomSwapInput"
                                  onKeyDown={blockInvalidChar}
                                  onChange={bottomSwapNumber}
                                />
                              </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-8 img_Section d-flex justify-content-end">
                              <button onClick={() => setBottomSwapModel(true)}>
                                {BottomSwapState.img && (
                                  <img
                                    src={BottomSwapState.img}
                                    alt="Loading..."
                                    height="29"
                                    width="29"
                                  />
                                )}
                                <span className="ml-3">
                                  {BottomSwapState.name}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="btn d-flex justify-content-center pt-4">
                          <button onClick={() => SwapFunction()}>
                            {SwapMessage}
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

export default Swap;
