import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { blockInvalidChar, CalcFourDigit } from "../../../../helper";
import { depositCBS } from "../../../../interfaces/Solana/SolBorrowContracts";
import { useWallet } from "@solana/wallet-adapter-react";
import TokenModel from "../../../../Models/Common/TokenModel";
import { DepositTokenApi } from "../../../../assets/api/Solana/SolBorrowApis/SolDepositApi";
import { DepositTokenSelect } from "../../../../redux/actions/Solana/SolBorrowActions";

const Deposit = ({ SolBorrowState }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const DepositTokenApiNew = DepositTokenApi();
  const [depositModel, setDepositModel] = useState(false);
  const SolDepositState = useSelector((state) => state.SolDepositReducer);
  const [Amount, setAmount] = useState("");
  const [message, setMessage] = useState("Deposit");
  const [Required, setRequired] = useState(false);

  const {
    wSOLBalance,
    LPFiBalance,
    mSOLBalance,
    stSOLBalance,
    scnSOLBalance,
    RAYBalance,
    SRMBalance,
    lpSOLBalance,
    lpUSDBalance,
  } = SolBorrowState?.BalList;

  const getTokenValue = (e) => {
    setAmount(e.target.value);

    if (SolDepositState.img && publicKey) {
      if (e.target.value > 0) {
        if (
          (SolDepositState.name === "wSOL" && e.target.value <= wSOLBalance) ||
          (SolDepositState.name === "mSOL" && e.target.value <= mSOLBalance) ||
          (SolDepositState.name === "scnSOL" &&
            e.target.value <= scnSOLBalance) ||
          (SolDepositState.name === "stSOL" &&
            e.target.value <= stSOLBalance) ||
          (SolDepositState.name === "RAY" && e.target.value <= RAYBalance) ||
          (SolDepositState.name === "SRM" && e.target.value <= SRMBalance) ||
          (SolDepositState.name === "lpSOL" &&
            e.target.value <= lpSOLBalance) ||
          (SolDepositState.name === "lpUSD" &&
            e.target.value <= lpUSDBalance) ||
          (SolDepositState.name === "RAY" && e.target.value <= LPFiBalance)
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
          dispatch(
            depositCBS(
              name,
              wallet,
              Amount,
              setAmount,
              setMessage,
              setRequired,
              SolBorrowState?.TokenPriceList
            )
          );
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

      if (SolDepositState.name === "wSOL") {
        balance = wSOLBalance;
      } else if (SolDepositState.name === "mSOL") {
        balance = mSOLBalance;
      } else if (SolDepositState.name === "scnSOL") {
        balance = scnSOLBalance;
      } else if (SolDepositState.name === "stSOL") {
        balance = stSOLBalance;
      } else if (SolDepositState.name === "RAY") {
        balance = RAYBalance;
      } else if (SolDepositState.name === "SRM") {
        balance = SRMBalance;
      } else if (SolDepositState.name === "lpSOL") {
        balance = lpSOLBalance;
      } else if (SolDepositState.name === "lpUSD") {
        balance = lpUSDBalance;
      } else if (SolDepositState.name === "LPFi") {
        balance = LPFiBalance;
      }

      setAmount(CalcFourDigit(balance));
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
  }, [SolDepositState.img]);

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
        <TokenModel
          tokenModel={depositModel}
          setTokenModel={setDepositModel}
          TokensApi={DepositTokenApiNew}
          TokenSelectFun={DepositTokenSelect}
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
                  {SolDepositState.img && (
                    <img
                      src={SolDepositState.img}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{SolDepositState.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="btn_section">
                <button onClick={() => DipProcess(SolDepositState.name)}>
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
