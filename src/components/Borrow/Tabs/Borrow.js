import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { blockInvalidChar } from "../../../helper";
import { borrowLpToken } from "../../../lp_contracts/Borrow";
import { useWallet } from "@solana/wallet-adapter-react";
import { CalcFourDigit, calc } from "../../../helper";
import TokenModel from "../../../Models/Common/TokenModel";
import { BorrowTokenApi } from "../../../assets/api/BorrowApi";
import { BorrowTokenSelect } from "../../../redux/actions/BorrowActions";

const Borrow = ({ lpContractState }) => {
  const dispatch = useDispatch();
  const wallet = useWallet();
  const { publicKey } = wallet;
  const BorrowTokenApiNew = BorrowTokenApi();

  const [borrowModel, setBorrowModel] = useState(false);
  const [BorrowAmount, setBorrowAmount] = useState("");
  const BorrowState = useSelector((state) => state.BorrowReducer);
  const [BorrowMessage, setBorrowMessage] = useState("Borrow");
  const [BorrowRequired, setBorrowRequired] = useState(false);

  const { lpSOLTokenPrice, lpUSDTokenPrice, lpBTCTokenPrice, lpETHTokenPrice } =
    lpContractState.TokenPriceList;

  const getTokenValue = (e) => {
    setBorrowAmount(e.target.value);

    if (BorrowState.img && publicKey) {
      if (e.target.value > 0) {
        if (BorrowState.name === "lpUSD") {
          const condition =
            (lpContractState.Borrow.Account.BorrowLimit -
              lpContractState.variables.UserTotalBorrowedCal) /
            lpUSDTokenPrice;

          if (e.target.value <= condition) {
            setBorrowMessage("Borrow");
            setBorrowRequired(true);
          } else {
            setBorrowMessage("Borrow Amount Exceeded");
            setBorrowRequired(false);
          }
        } else if (BorrowState.name === "lpSOL") {
          const condition =
            (lpContractState.Borrow.Account.BorrowLimit -
              lpContractState.variables.UserTotalBorrowedCal) /
            lpSOLTokenPrice;
          if (e.target.value <= condition) {
            setBorrowMessage("Borrow");
            setBorrowRequired(true);
          } else {
            setBorrowMessage("Borrow Amount Exceeded");
            setBorrowRequired(false);
          }
        } else if (BorrowState.name === "lpBTC") {
          const condition =
            (lpContractState.Borrow.Account.BorrowLimit -
              lpContractState.variables.UserTotalBorrowedCal) /
            lpBTCTokenPrice;
          if (e.target.value <= condition) {
            setBorrowMessage("Borrow");
            setBorrowRequired(true);
          } else {
            setBorrowMessage("Borrow Amount Exceeded");
            setBorrowRequired(false);
          }
        } else if (BorrowState.name === "lpETH") {
          const condition =
            (lpContractState.Borrow.Account.BorrowLimit -
              lpContractState.variables.UserTotalBorrowedCal) /
            lpETHTokenPrice;
          if (e.target.value <= condition) {
            setBorrowMessage("Borrow");
            setBorrowRequired(true);
          } else {
            setBorrowMessage("Borrow Amount Exceeded");
            setBorrowRequired(false);
          }
        }
      } else {
        setBorrowMessage("Enter an amount");
        setBorrowRequired(false);
      }
    } else {
      setBorrowMessage("Connect wallet");
      setBorrowRequired(false);
    }
  };

  const BorrowProcess = (name) => {
    if (publicKey) {
      if (BorrowAmount > 0) {
        if (BorrowRequired) {
          dispatch(
            borrowLpToken(
              wallet,
              BorrowAmount,
              setBorrowAmount,
              name,
              setBorrowRequired,
              setBorrowMessage,
              calc(lpContractState.Borrow.Account.LTV)
            )
          );
        }
      } else {
        setBorrowMessage("Enter an amount");
      }
    } else {
      setBorrowMessage("Connect wallet");
    }
  };

  const setMaxBorrow = (token) => {
    if (publicKey) {
      let CalMaxBorrowed = "";

      if (token === "lpSOL") {
        CalMaxBorrowed =
          (lpContractState.Borrow.Account.BorrowLimit -
            lpContractState.variables.UserTotalBorrowedCal) /
          lpSOLTokenPrice;
      } else if (token === "lpUSD") {
        CalMaxBorrowed =
          (lpContractState.Borrow.Account.BorrowLimit -
            lpContractState.variables.UserTotalBorrowedCal) /
          lpUSDTokenPrice;
      } else if (token === "lpBTC") {
        CalMaxBorrowed =
          (lpContractState.Borrow.Account.BorrowLimit -
            lpContractState.variables.UserTotalBorrowedCal) /
          lpBTCTokenPrice;
      } else if (token === "lpETH") {
        CalMaxBorrowed =
          (lpContractState.Borrow.Account.BorrowLimit -
            lpContractState.variables.UserTotalBorrowedCal) /
          lpETHTokenPrice;
      }

      setBorrowAmount(CalcFourDigit(CalMaxBorrowed * 0.995));
      setBorrowMessage("Borrow");
      setBorrowRequired(true);
    } else {
      setBorrowRequired(false);
      setBorrowMessage("Connect wallet");
    }
  };

  useEffect(() => {
    setBorrowMessage("Borrow");
    setBorrowAmount("");
  }, [BorrowState.img]);

  useEffect(() => {
    if (publicKey) {
      setBorrowMessage("Borrow");
      setBorrowAmount("");
    } else {
      setBorrowAmount("");
      setBorrowMessage("Borrow");
      setBorrowRequired(false);
    }
  }, [publicKey]);

  return (
    <>
      {borrowModel && (
        <TokenModel
          tokenModel={borrowModel}
          setTokenModel={setBorrowModel}
          TokensApi={BorrowTokenApiNew}
          TokenSelectFun={BorrowTokenSelect}
        />
      )}

      <div className="row deposit d-flex justify-content-center">
        <div className="col-lg-10 col-md-10 col-12 my-3">
          <div className="deposit_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-7 col-6  deposit_card_left">
                <div className="d-flex align-items-center">
                  <p onClick={() => setMaxBorrow(BorrowState.name)}>
                    <span className="badge d-flex align-items-center">MAX</span>
                  </p>
                  <input
                    type="number"
                    placeholder="00.00"
                    autoComplete="off"
                    value={BorrowAmount}
                    className="ml-2"
                    onChange={getTokenValue}
                    onKeyDown={blockInvalidChar}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-6 d-flex justify-content-end deposit_card_right">
                <button onClick={() => setBorrowModel(true)}>
                  {BorrowState.img && (
                    <img
                      src={BorrowState.img}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{BorrowState.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="btn_section">
                <button onClick={() => BorrowProcess(BorrowState.name)}>
                  {BorrowMessage}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Borrow;
