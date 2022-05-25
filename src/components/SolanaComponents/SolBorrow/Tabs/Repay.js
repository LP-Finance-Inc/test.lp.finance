import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { blockInvalidChar, CalcFourDigit } from "../../../../helper";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  repay_sol,
  repay_token,
} from "../../../../interfaces/Solana/SolBorrowContracts";
import { CalRepayMaxValue } from "../../../../helper/Solana/BorrowHelper";
import TokenModel from "../../../../Models/Common/TokenModel";
import { RepayTokenApi } from "../../../../assets/api/Solana/SolBorrowApis/SolRepayApi";
import { RepayTokenSelect } from "../../../../redux/actions/Solana/SolBorrowActions";

const Repay = ({ SolBorrowState }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();

  const RepayTokenApiNew = RepayTokenApi();
  const [RepayAmount, setRepayAmount] = useState("");
  const [RepayMessage, setRepayMessage] = useState("Repay");
  const [Required, setRequired] = useState(false);
  const SolRepayState = useSelector((state) => state.SolRepayReducer);

  const [repayModel, setRepayModel] = useState(false);

  const {
    SOLBalance,
    BTCBalance,
    USDCBalance,
    ETHBalance,
    lpSOLBalance,
    lpUSDBalance,
    lpBTCBalance,
    lpETHBalance,
  } = SolBorrowState.BalList;

  const {
    BorrowedLpSOLAmount,
    BorrowedLpUsdAmount,
    BorrowedLpBTCAmount,
    BorrowedLpETHAmount,
  } = SolBorrowState.UserAccountInfo;

  const getRepayTokenValue = (e) => {
    setRepayAmount(e.target.value);

    if (SolRepayState.img && publicKey) {
      if (e.target.value > 0) {
        if (
          (SolRepayState.name === "SOL" && e.target.value <= SOLBalance) ||
          (SolRepayState.name === "BTC" && e.target.value <= BTCBalance) ||
          (SolRepayState.name === "USDC" && e.target.value <= USDCBalance) ||
          (SolRepayState.name === "ETH" && e.target.value <= ETHBalance) ||
          (SolRepayState.name === "lpSOL" && e.target.value <= lpSOLBalance) ||
          (SolRepayState.name === "lpUSD" && e.target.value <= lpUSDBalance) ||
          (SolRepayState.name === "lpBTC" && e.target.value <= lpBTCBalance) ||
          (SolRepayState.name === "lpETH" && e.target.value <= lpETHBalance)
        ) {
          if (SolRepayState.name === "SOL" || SolRepayState.name === "lpSOL") {
            if (e.target.value <= CalcFourDigit(BorrowedLpSOLAmount)) {
              setRequired(true);
              setRepayMessage("Repay");
            } else {
              setRequired(false);
              setRepayMessage("Repay amount exceeded");
            }
          } else if (
            SolRepayState.name === "lpUSD" ||
            SolRepayState.name === "USDC"
          ) {
            if (e.target.value <= CalcFourDigit(BorrowedLpUsdAmount)) {
              setRequired(true);
              setRepayMessage("Repay");
            } else {
              setRepayMessage("Repay amount exceeded");
              setRequired(false);
            }
          } else if (
            SolRepayState.name === "lpBTC" ||
            SolRepayState.name === "BTC"
          ) {
            if (e.target.value <= CalcFourDigit(BorrowedLpBTCAmount)) {
              setRequired(true);
              setRepayMessage("Repay");
            } else {
              setRepayMessage("Repay amount exceeded");
              setRequired(false);
            }
          } else if (
            SolRepayState.name === "lpETH" ||
            SolRepayState.name === "ETH"
          ) {
            if (e.target.value <= CalcFourDigit(BorrowedLpETHAmount)) {
              setRequired(true);
              setRepayMessage("Repay");
            } else {
              setRepayMessage("Repay amount exceeded");
              setRequired(false);
            }
          }
        } else {
          setRepayMessage("Insufficient Balance");
          setRequired(false);
        }
      } else {
        setRepayMessage("Enter an amount");
        setRequired(false);
      }
    } else {
      setRepayMessage("Connect wallet");
      setRequired(false);
    }
  };

  const RepayProcess = (TokenName) => {
    if (publicKey) {
      if (RepayAmount > 0) {
        if (Required) {
          if (TokenName === "SOL") {
            dispatch(
              repay_sol(
                wallet,
                RepayAmount,
                TokenName,
                setRepayAmount,
                setRepayMessage,
                setRequired,
                SolBorrowState.TokenPriceList
              )
            );
          } else {
            dispatch(
              repay_token(
                wallet,
                RepayAmount,
                TokenName,
                setRepayAmount,
                setRepayMessage,
                setRequired,
                SolBorrowState.TokenPriceList
              )
            );
          }
        }
      } else {
        setRepayMessage("Enter an amount");
      }
    } else {
      setRepayMessage("Connect wallet");
    }
  };

  const setRepayMaxValue = (TokenName) => {
    if (publicKey) {
      const getCalRepayMaxValue = CalRepayMaxValue(TokenName, SolBorrowState);

      setRepayAmount(CalcFourDigit(getCalRepayMaxValue));
      setRequired(true);
      setRepayMessage("Repay");
    } else {
      setRepayMessage("Connect wallet");
      setRequired(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      setRepayMessage("Repay");
      setRepayAmount("");
    } else {
      setRequired(false);
      setRepayAmount("");
      setRepayMessage("Repay");
    }
  }, [publicKey]);

  useEffect(() => {
    setRepayAmount("");
    setRepayMessage("Repay");
  }, [SolRepayState.name]);

  return (
    <>
      {repayModel && (
        <TokenModel
          tokenModel={repayModel}
          setTokenModel={setRepayModel}
          TokensApi={RepayTokenApiNew}
          TokenSelectFun={RepayTokenSelect}
        />
      )}

      <div className="row deposit d-flex justify-content-center">
        <div className="col-lg-10 col-md-10 col-12 my-3">
          <div className="deposit_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-7 col-6 deposit_card_left">
                <div className="d-flex align-items-center">
                  <p onClick={() => setRepayMaxValue(SolRepayState.name)}>
                    <span className="badge d-flex align-items-center">MAX</span>
                  </p>
                  <input
                    type="number"
                    placeholder="00.00"
                    autoComplete="off"
                    className="ml-2"
                    value={RepayAmount}
                    onKeyDown={blockInvalidChar}
                    onChange={getRepayTokenValue}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-6 d-flex justify-content-end deposit_card_right">
                <button onClick={() => setRepayModel(true)}>
                  {SolRepayState.img && (
                    <img
                      src={SolRepayState.img}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{SolRepayState.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="btn_section">
                <button onClick={() => RepayProcess(SolRepayState.name)}>
                  {RepayMessage}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Repay;
