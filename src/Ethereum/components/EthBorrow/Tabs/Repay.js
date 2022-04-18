import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RepayModel from "../../../../Models/borrowModels/RepayModel";
import { blockInvalidChar } from "../../../../helper";
import { useWallet } from "@solana/wallet-adapter-react";
import { repay_sol, repay_token } from "../../../../lp_contracts/Borrow";
import { calc } from "../../../../helper";
import { CalRepayMaxValue } from "../../../../helper/borrow";

const Repay = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();

  const [RepayAmount, setRepayAmount] = useState("");
  const [RepayMessage, setRepayMessage] = useState("Repay");
  const [Required, setRequired] = useState(false);
  const RepayState = useSelector((state) => state.RepayReducer);

  const lpContractState = useSelector((state) => state.lpContractReducers);

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
  } = lpContractState.BalList;

  const {
    BorrowedLpSOLAmount,
    BorrowedLpUsdAmount,
    BorrowedLpBTCAmount,
    BorrowedLpETHAmount,
  } = lpContractState.UserAccountInfo;

  const getRepayTokenValue = (e) => {
    setRepayAmount(e.target.value);

    if (RepayState.img && publicKey) {
      if (e.target.value > 0) {
        if (
          (RepayState.name === "SOL" && e.target.value <= SOLBalance) ||
          (RepayState.name === "BTC" && e.target.value <= BTCBalance) ||
          (RepayState.name === "USDC" && e.target.value <= USDCBalance) ||
          (RepayState.name === "ETH" && e.target.value <= ETHBalance) ||
          (RepayState.name === "lpSOL" && e.target.value <= lpSOLBalance) ||
          (RepayState.name === "lpUSD" && e.target.value <= lpUSDBalance) ||
          (RepayState.name === "lpBTC" && e.target.value <= lpBTCBalance) ||
          (RepayState.name === "lpETH" && e.target.value <= lpETHBalance)
        ) {
          if (RepayState.name === "SOL" || RepayState.name === "lpSOL") {
            if (e.target.value <= calc(BorrowedLpSOLAmount)) {
              setRequired(true);
              setRepayMessage("Repay");
            } else {
              setRequired(false);
              setRepayMessage("Repay amount exceeded");
            }
          } else if (
            RepayState.name === "lpUSD" ||
            RepayState.name === "USDC"
          ) {
            if (e.target.value <= calc(BorrowedLpUsdAmount)) {
              setRequired(true);
              setRepayMessage("Repay");
            } else {
              setRepayMessage("Repay amount exceeded");
              setRequired(false);
            }
          } else if (RepayState.name === "lpBTC" || RepayState.name === "BTC") {
            if (e.target.value <= calc(BorrowedLpBTCAmount)) {
              setRequired(true);
              setRepayMessage("Repay");
            } else {
              setRepayMessage("Repay amount exceeded");
              setRequired(false);
            }
          } else if (RepayState.name === "lpETH" || RepayState.name === "ETH") {
            if (e.target.value <= calc(BorrowedLpETHAmount)) {
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
                setRequired
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
                setRequired
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
      const getCalRepayMaxValue = CalRepayMaxValue(TokenName, lpContractState);

      setRepayAmount(calc(getCalRepayMaxValue));
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
  }, [RepayState.name]);

  return (
    <>
      {repayModel && (
        <RepayModel repayModel={repayModel} setRepayModel={setRepayModel} />
      )}

      <div className="row deposit d-flex justify-content-center">
        <div className="col-lg-10 col-md-10 col-12 my-3">
          <div className="deposit_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-7 col-6 deposit_card_left">
                <div className="d-flex align-items-center">
                  <p onClick={() => setRepayMaxValue(RepayState.name)}>
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
                  {RepayState.img && (
                    <img
                      src={RepayState.img}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{RepayState.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="btn_section">
                <button onClick={() => RepayProcess(RepayState.name)}>
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
