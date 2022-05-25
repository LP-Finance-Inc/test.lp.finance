import { useState, useEffect } from "react";
import { BiTransferAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "@solana/wallet-adapter-react";
import { blockInvalidChar } from "../../../helper";
import SwapWrapper from "../../../styles/Common/components/Swap.style";
import {
  BottomSwapTokenCompare,
  TopSwapTokenCompare,
  TopSwapTokenChange,
  BottomSwapTokenChange,
  BottomSwapTokenSelect,
  TopSwapTokenSelect,
} from "../../../redux/actions/Solana/SolSwapActions";
import { SwapTokenToToken } from "../../../interfaces/Solana/SolSwapContracts";
import { CalcEightDigit } from "../../../helper";
import { CreateFromSwapTokenPrice } from "../../../helper/Solana/SwapHelper";
import {
  TopSwapTokenApi,
  BottomSwapTokenApi,
} from "../../../assets/api/Solana/SolSwapApi";
import TokenModel from "../../../Models/Common/TokenModel";

const SolSwap = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const TopSwapTokenApiNew = TopSwapTokenApi();
  const BottomSwapTokenApiNew = BottomSwapTokenApi();

  const [SwapMessage, setSwapMessage] = useState("Select a token");
  const [TopSwapBalance, setTopSwapBalance] = useState("");
  const [BottomSwapBalance, setBottomSwapBalance] = useState("");
  const [Required, setRequired] = useState(false);

  const lpContractState = useSelector((state) => state.SolBorrowReducers);

  const [SwapChange, setSwapChange] = useState({
    img1: "",
    name1: "",
    img2: "",
    name2: "",
  });

  const [bottomSwapModel, setBottomSwapModel] = useState(false);
  const [topSwapModel, setTopSwapModel] = useState(false);

  const SolBottomSwapState = useSelector((state) => state.SolBottomSwapReducer);
  const SolTopSwapState = useSelector((state) => state.SolTopSwapReducer);

  const {
    BTCBalance,
    USDCBalance,
    mSOLBalance,
    ETHBalance,
    SRMBalance,
    USDTBalance,
    scnSOLBalance,
    stSOLBalance,
    lpSOLBalance,
    lpUSDBalance,
    lpBTCBalance,
    lpETHBalance,
  } = lpContractState.BalList;

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
          (SwapChange.name1 === "BTC" && e.target.value <= BTCBalance) ||
          (SwapChange.name1 === "USDC" && e.target.value <= USDCBalance) ||
          (SwapChange.name1 === "mSOL" && e.target.value <= mSOLBalance) ||
          (SwapChange.name1 === "ETH" && e.target.value <= ETHBalance) ||
          (SwapChange.name1 === "SRM" && e.target.value <= SRMBalance) ||
          (SwapChange.name1 === "USDT" && e.target.value <= USDTBalance) ||
          (SwapChange.name1 === "stSOL" && e.target.value <= stSOLBalance) ||
          (SwapChange.name1 === "scnSOL" && e.target.value <= scnSOLBalance) ||
          (SwapChange.name1 === "lpSOL" && e.target.value <= lpSOLBalance) ||
          (SwapChange.name1 === "lpUSD" && e.target.value <= lpUSDBalance) ||
          (SwapChange.name1 === "lpBTC" && e.target.value <= lpBTCBalance) ||
          (SwapChange.name1 === "lpETH" && e.target.value <= lpETHBalance)
        ) {
          setSwapMessage("Swap");

          const volToken = CreateFromSwapTokenPrice(
            SwapChange.name1,
            lpContractState
          );

          const targetToken = CreateFromSwapTokenPrice(
            SwapChange.name2,
            lpContractState
          );

          const calBal = (e.target.value * volToken) / targetToken;

          if (calBal > 0) {
            setBottomSwapBalance(CalcEightDigit(calBal));
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
          (SwapChange.name2 === "BTC" && e.target.value <= BTCBalance) ||
          (SwapChange.name2 === "USDC" && e.target.value <= USDCBalance) ||
          (SwapChange.name2 === "mSOL" && e.target.value <= mSOLBalance) ||
          (SwapChange.name2 === "ETH" && e.target.value <= ETHBalance) ||
          (SwapChange.name2 === "SRM" && e.target.value <= SRMBalance) ||
          (SwapChange.name2 === "USDT" && e.target.value <= USDTBalance) ||
          (SwapChange.name2 === "stSOL" && e.target.value <= stSOLBalance) ||
          (SwapChange.name2 === "scnSOL" && e.target.value <= scnSOLBalance) ||
          (SwapChange.name2 === "lpSOL" && e.target.value <= lpSOLBalance) ||
          (SwapChange.name2 === "lpUSD" && e.target.value <= lpUSDBalance) ||
          (SwapChange.name2 === "lpBTC" && e.target.value <= lpBTCBalance) ||
          (SwapChange.name2 === "lpETH" && e.target.value <= lpETHBalance)
        ) {
          setSwapMessage("Swap");

          const volToken = CreateFromSwapTokenPrice(
            SwapChange.name2,
            lpContractState
          );

          const targetToken = CreateFromSwapTokenPrice(
            SwapChange.name1,
            lpContractState
          );

          const calBal = (e.target.value * volToken) / targetToken;

          if (calBal > 0) {
            setTopSwapBalance(CalcEightDigit(calBal));
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
      img1: SolTopSwapState.img,
      name1: SolTopSwapState.name,
      img2: SolBottomSwapState.img,
      name2: SolBottomSwapState.name,
    });
    if (SolTopSwapState.name === SolBottomSwapState.name) {
      dispatch(BottomSwapTokenCompare());
      setTopSwapBalance("");
      setBottomSwapBalance("");
    }
  }, [SolTopSwapState.name]);

  useEffect(() => {
    setSwapChange({
      ...SwapChange,
      img1: SolTopSwapState.img,
      name1: SolTopSwapState.name,
      img2: SolBottomSwapState.img,
      name2: SolBottomSwapState.name,
    });
    if (SolBottomSwapState.name === SolTopSwapState.name) {
      dispatch(TopSwapTokenCompare());
      setTopSwapBalance("");
      setBottomSwapBalance("");
    }
  }, [SolBottomSwapState.name]);

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
      img1: SolTopSwapState.img,
      name1: SolTopSwapState.name,
      img2: SolBottomSwapState.img,
      name2: SolBottomSwapState.name,
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
        <TokenModel
          tokenModel={topSwapModel}
          setTokenModel={setTopSwapModel}
          TokensApi={TopSwapTokenApiNew}
          TokenSelectFun={TopSwapTokenSelect}
        />
      )}

      {bottomSwapModel && (
        <TokenModel
          tokenModel={bottomSwapModel}
          setTokenModel={setBottomSwapModel}
          TokensApi={BottomSwapTokenApiNew}
          TokenSelectFun={BottomSwapTokenSelect}
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
                                {/* <p>
                                  <span
                                    className="badge d-flex align-items-center"
                                    onClick={setTopMaxValue}
                                  >
                                    MAX
                                  </span>
                                </p> */}
                                <input
                                  type="number"
                                  value={TopSwapBalance}
                                  placeholder="00.00"
                                  autoComplete="off"
                                  id="ToSwapInput"
                                  onKeyDown={blockInvalidChar}
                                  onChange={topSwapNumber}
                                  className="ml-2"
                                />
                              </div>
                            </div>
                            <div className="col-7 img_Section d-flex justify-content-end">
                              <button onClick={() => setTopSwapModel(true)}>
                                {SolTopSwapState && SolTopSwapState.img && (
                                  <img
                                    src={SolTopSwapState.img}
                                    alt="Loading..."
                                    height="29"
                                    width="29"
                                  />
                                )}
                                <span className="ml-3">
                                  {SolTopSwapState.name}
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
                              <div className="number d-flex align-items-center">
                                {/* <p>
                                  <span className="badge d-flex align-items-center">
                                    MAX
                                  </span>
                                </p> */}
                                <input
                                  type="number"
                                  placeholder="00.00"
                                  autoComplete="off"
                                  value={BottomSwapBalance}
                                  id="BottomSwapInput"
                                  onKeyDown={blockInvalidChar}
                                  onChange={bottomSwapNumber}
                                  // className="ml-2"
                                />
                              </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-8 img_Section d-flex justify-content-end">
                              <button onClick={() => setBottomSwapModel(true)}>
                                {SolBottomSwapState.img && (
                                  <img
                                    src={SolBottomSwapState.img}
                                    alt="Loading..."
                                    height="29"
                                    width="29"
                                  />
                                )}
                                <span className="ml-3">
                                  {SolBottomSwapState.name}
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

export default SolSwap;
