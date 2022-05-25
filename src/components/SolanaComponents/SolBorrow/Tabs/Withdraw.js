import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { blockInvalidChar, CalcFourDigit } from "../../../../helper";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  withdraw_sol,
  withdraw_token,
} from "../../../../interfaces/Solana/SolBorrowContracts";
import { CalWithdrawMaxValue } from "../../../../helper/Solana/BorrowHelper";
import TokenModel from "../../../../Models/Common/TokenModel";
import { WithdrawTokenApi } from "../../../../assets/api/Solana/SolBorrowApis/SolWithdrawApi";
import { WithdrawTokenSelect } from "../../../../redux/actions/Solana/SolBorrowActions";

const Withdraw = ({ SolBorrowState }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const WithdrawTokenApiNew = WithdrawTokenApi();
  const [WithdrawAmount, setWithdrawAmount] = useState("");
  const [WithdrawMessage, setWithdrawMessage] = useState("Withdraw");
  const [Required, setRequired] = useState(false);

  const { UserTotalDepositedCal, UserTotalBorrowedCal } =
    SolBorrowState.variables;

  const [withdrawModel, setWithdrawModel] = useState(false);
  const SolWithdrawState = useSelector((state) => state.SolWithdrawReducer);

  const getWithdrawTokenValue = (e) => {
    setWithdrawAmount(e.target.value);

    if (SolWithdrawState.img && publicKey) {
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
                setRequired,
                SolBorrowState.TokenPriceList
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
                setRequired,
                SolBorrowState.TokenPriceList
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
        SolWithdrawState.name,
        SolBorrowState
      );

      setWithdrawAmount(CalcFourDigit(getCalWithdrawMaxValue));
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
  }, [SolWithdrawState.name]);

  return (
    <>
      {withdrawModel && (
        <TokenModel
          tokenModel={withdrawModel}
          setTokenModel={setWithdrawModel}
          TokensApi={WithdrawTokenApiNew}
          TokenSelectFun={WithdrawTokenSelect}
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
                  {SolWithdrawState.img && (
                    <img
                      src={SolWithdrawState.img}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{SolWithdrawState.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="btn_section">
                <button onClick={() => WithdrawProcess(SolWithdrawState.name)}>
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
