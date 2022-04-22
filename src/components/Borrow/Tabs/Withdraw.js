import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WithdrawModel from "../../../Models/borrowModels/WithdrawModel";
import { blockInvalidChar } from "../../../helper";
import { useWallet } from "@solana/wallet-adapter-react";
import { calc } from "../../../helper";
import { withdraw_sol, withdraw_token } from "../../../lp_contracts/Borrow";
import { CalWithdrawMaxValue } from "../../../helper/borrow";

const Withdraw = ({ lpContractState }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();

  const [WithdrawAmount, setWithdrawAmount] = useState("");
  const [WithdrawMessage, setWithdrawMessage] = useState("Withdraw");
  const [Required, setRequired] = useState(false);

  const { UserTotalDepositedCal, UserTotalBorrowedCal } =
    lpContractState.variables;

  const [withdrawModel, setWithdrawModel] = useState(false);
  const WithdrawState = useSelector((state) => state.WithdrawReducer);

  const getWithdrawTokenValue = (e) => {
    setWithdrawAmount(e.target.value);

    if (WithdrawState.img && publicKey) {
      if (e.target.value > 0) {
        setWithdrawMessage("Withdraw");
        setRequired(true);
      } else {
        setWithdrawMessage("Enter an amount");
        setRequired(false);
      }
    } else {
      setWithdrawMessage("Connect wallet");
      setRequired(false);
    }
  };

  const WithdrawProcess = (TokenName) => {
    if (publicKey) {
      if (WithdrawAmount > 0) {
        if (Required) {
          if (TokenName === "SOL") {
            dispatch(
              withdraw_sol(
                wallet,
                WithdrawAmount,
                TokenName,
                setWithdrawAmount,
                setWithdrawMessage,
                setRequired
              )
            );
          } else {
            dispatch(
              withdraw_token(
                wallet,
                WithdrawAmount,
                TokenName,
                setWithdrawAmount,
                setWithdrawMessage,
                setRequired
              )
            );
          }
        }
      } else {
        setWithdrawMessage("Enter an amount");
      }
    } else {
      setWithdrawMessage("Connect wallet");
    }
  };

  const setWithdrawMaxValue = () => {
    if (publicKey) {
      const maxWithdraw =
        UserTotalDepositedCal - UserTotalBorrowedCal * (100 / 85);

      const getCalWithdrawMaxValue = CalWithdrawMaxValue(
        maxWithdraw,
        WithdrawState.name,
        lpContractState
      );

      setWithdrawAmount(calc(getCalWithdrawMaxValue));
      setRequired(true);
      setWithdrawMessage("Withdraw");
    } else {
      setWithdrawMessage("Connect wallet");
      setRequired(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      setWithdrawMessage("Withdraw");
      setWithdrawAmount("");
    } else {
      setRequired(false);
      setWithdrawAmount("");
      setWithdrawMessage("Withdraw");
    }
  }, [publicKey]);

  useEffect(() => {
    setWithdrawAmount("");
    setWithdrawMessage("Withdraw");
  }, [WithdrawState.name]);

  return (
    <>
      {withdrawModel && (
        <WithdrawModel
          withdrawModel={withdrawModel}
          setWithdrawModel={setWithdrawModel}
        />
      )}

      <div className="row deposit d-flex justify-content-center">
        <div className="col-lg-10 col-md-10 col-12 my-3">
          <div className="deposit_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-7 col-6 deposit_card_left">
                <div className="d-flex align-items-center">
                  <p onClick={setWithdrawMaxValue}>
                    <span className="badge d-flex align-items-center">MAX</span>
                  </p>
                  <input
                    type="number"
                    placeholder="00.00"
                    autoComplete="off"
                    value={WithdrawAmount}
                    className="ml-2"
                    onKeyDown={blockInvalidChar}
                    onChange={getWithdrawTokenValue}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-6 d-flex justify-content-end deposit_card_right">
                <button onClick={() => setWithdrawModel(true)}>
                  {WithdrawState.img && (
                    <img
                      src={WithdrawState.img}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{WithdrawState.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="btn_section">
                <button onClick={() => WithdrawProcess(WithdrawState.name)}>
                  {WithdrawMessage}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdraw;
