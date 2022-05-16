import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { blockInvalidChar } from "../../../../helper";
import { deposit_tokens, depositing } from "../../../../lp_contracts/Borrow";
import { useWallet } from "@solana/wallet-adapter-react";
import { CalcFourDigit } from "../../../../helper";
import TokenModel from "../../../../Models/Common/TokenModel";
import { DepositTokenApi } from "../../../../assets/api/Solana/BorrowApis/DepositApi";
import { DepositTokenSelect } from "../../../../redux/actions/BorrowActions";

const Deposit = ({ lpContractState }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const DepositTokenApiNew = DepositTokenApi();
  const [depositModel, setDepositModel] = useState(false);
  const DepositState = useSelector((state) => state.DepositReducer);
  const [Amount, setAmount] = useState("");
  const [message, setMessage] = useState("Deposit");
  const [Required, setRequired] = useState(false);

  const {
    SOLBalance,
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
    lpETHBalance,
    lpBTCBalance,
  } = lpContractState.BalList;

  const getTokenValue = (e) => {
    setAmount(e.target.value);

    if (DepositState.img && publicKey) {
      if (e.target.value > 0) {
        if (
          (DepositState.name === "SOL" && e.target.value <= SOLBalance) ||
          (DepositState.name === "BTC" && e.target.value <= BTCBalance) ||
          (DepositState.name === "USDC" && e.target.value <= USDCBalance) ||
          (DepositState.name === "mSOL" && e.target.value <= mSOLBalance) ||
          (DepositState.name === "ETH" && e.target.value <= ETHBalance) ||
          (DepositState.name === "SRM" && e.target.value <= SRMBalance) ||
          (DepositState.name === "USDT" && e.target.value <= USDTBalance) ||
          (DepositState.name === "scnSOL" && e.target.value <= scnSOLBalance) ||
          (DepositState.name === "stSOL" && e.target.value <= stSOLBalance) ||
          (DepositState.name === "lpSOL" && e.target.value <= lpSOLBalance) ||
          (DepositState.name === "lpUSD" && e.target.value <= lpUSDBalance) ||
          (DepositState.name === "lpETH" && e.target.value <= lpETHBalance) ||
          (DepositState.name === "lpBTC" && e.target.value <= lpBTCBalance)
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
                setRequired,
                lpContractState?.TokenPriceList
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
                setRequired,
                lpContractState?.TokenPriceList
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
      } else if (DepositState.name === "BTC") {
        balance = BTCBalance;
      } else if (DepositState.name === "USDC") {
        balance = USDCBalance;
      } else if (DepositState.name === "mSOL") {
        balance = mSOLBalance;
      } else if (DepositState.name === "ETH") {
        balance = ETHBalance;
      } else if (DepositState.name === "SRM") {
        balance = SRMBalance;
      } else if (DepositState.name === "USDT") {
        balance = USDTBalance;
      } else if (DepositState.name === "stSOL") {
        balance = stSOLBalance;
      } else if (DepositState.name === "scnSOL") {
        balance = scnSOLBalance;
      } else if (DepositState.name === "lpSOL") {
        balance = lpSOLBalance;
      } else if (DepositState.name === "lpUSD") {
        balance = lpUSDBalance;
      } else if (DepositState.name === "lpBTC") {
        balance = lpBTCBalance;
      } else if (DepositState.name === "lpETH") {
        balance = lpETHBalance;
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
