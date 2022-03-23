import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DepositModel from "../../../Models/borrowModels/DepositModel";
import { blockInvalidChar } from "../../../helper";
import { deposit_tokens, depositing } from "../../../lp_contracts/Borrow";
import { useWallet } from "@solana/wallet-adapter-react";
import { calc } from "../../../helper";

const Deposit = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const [depositModel, setDepositModel] = useState(false);
  const DepositState = useSelector((state) => state.DepositReducer);
  const [Amount, setAmount] = useState("");
  const [message, setMessage] = useState("Deposit");
  const [Required, setRequired] = useState(false);

  const lpContractState = useSelector((state) => state.lpContractReducers);

  const {
    SOLBalance,
    lpUSDBalance,
    lpSOLBalance,
    USDCBalance,
    BTCBalance,
    mSOLBalance,
  } = lpContractState.BalList;

  const getTokenValue = (e) => {
    setAmount(e.target.value);

    if (DepositState.img && publicKey) {
      if (e.target.value > 0) {
        if (
          (DepositState.name === "SOL" && e.target.value <= SOLBalance) ||
          (DepositState.name === "lpUSD" && e.target.value <= lpUSDBalance) ||
          (DepositState.name === "lpSOL" && e.target.value <= lpSOLBalance) ||
          (DepositState.name === "tUSDC" && e.target.value <= USDCBalance) ||
          (DepositState.name === "tBTC" && e.target.value <= BTCBalance) ||
          (DepositState.name === "tmSOL" && e.target.value <= mSOLBalance)
        ) {
          setMessage("Deposit");
          setRequired(true);
        } else {
          setMessage("Insufficient Balance");
          setRequired(false);
        }
      } else {
        setMessage("Enter an amount");
      }
    } else {
      setMessage("Connect wallet");
      setRequired(false);
    }
  };

  const DipProcess = (name) => {
    if (publicKey) {
      if (Amount > 0) {
        if (Required) {
          if (name === "SOL") {
            dispatch(
              depositing(
                name,
                wallet,
                Amount,
                setAmount,
                setMessage,
                setRequired
              )
            );
          } else {
            dispatch(
              deposit_tokens(
                name,
                wallet,
                Amount,
                setAmount,
                setMessage,
                setRequired
              )
            );
          }
        }
      } else {
        setMessage("Enter an amount");
      }
    } else {
      setMessage("Connect wallet");
    }
  };

  const setMaxValue = () => {
    if (publicKey) {
      let balance = "";

      if (DepositState.name === "SOL") {
        balance = SOLBalance;
      } else if (DepositState.name === "tUSDC") {
        balance = USDCBalance;
      } else if (DepositState.name === "lpSOL") {
        balance = lpSOLBalance;
      } else if (DepositState.name === "lpUSD") {
        balance = lpUSDBalance;
      } else if (DepositState.name === "tBTC") {
        balance = BTCBalance;
      } else if (DepositState.name === "tmSOL") {
        balance = mSOLBalance;
      }
      setAmount(calc(balance));
      setRequired(true);
      setMessage("Deposit");
    } else {
      setRequired(false);
      setMessage("Connect wallet");
    }
  };

  useEffect(() => {
    setMessage("Deposit");
    setAmount("");
  }, [DepositState.img]);

  useEffect(() => {
    if (publicKey) {
      setMessage("Deposit");
      setAmount("");
    } else {
      setRequired(false);
      setAmount("");
      setMessage("Deposit");
    }
  }, [publicKey]);

  return (
    <>
      {depositModel && (
        <DepositModel
          depositModel={depositModel}
          setDepositModel={setDepositModel}
        />
      )}

      <div className="row deposit d-flex justify-content-center">
        <div className="col-lg-10 col-md-10 col-12 my-3">
          <div className="deposit_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-7 col-6  deposit_card_left">
                <div className="d-flex align-items-center">
                  <p onClick={setMaxValue}>
                    <span className="badge d-flex align-items-center">MAX</span>
                  </p>
                  <input
                    type="number"
                    placeholder="00.00"
                    autoComplete="off"
                    value={Amount}
                    className="ml-2"
                    id="inputBox"
                    onChange={getTokenValue}
                    onKeyDown={blockInvalidChar}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-6 d-flex justify-content-end deposit_card_right">
                <button onClick={() => setDepositModel(true)}>
                  {DepositState.img && (
                    <img
                      src={DepositState.img}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{DepositState.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="btn_section">
                <button onClick={() => DipProcess(DepositState.name)}>
                  {message}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
