import { useDispatch } from "react-redux";
import { deposite_lpusd } from "../../../../interfaces/Solana/SolAuctionContracts";
import { useWallet } from "@solana/wallet-adapter-react";
import { CalcFourDigit } from "../../../../helper";
import { blockInvalidChar } from "../../../../helper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Deposit = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();

  const lpContractState = useSelector((state) => state.SolBorrowReducers);
  const { lpUSDBalance } = lpContractState.BalList;

  const [DepositMessage, setDepositMessage] = useState("Deposit");
  const [Price, setPrice] = useState("");
  const [Required, setRequired] = useState(false);

  const getTokenValue = (e) => {
    setPrice(e.target.value);

    if (publicKey) {
      if (e.target.value > 0) {
        if (e.target.value <= CalcFourDigit(lpUSDBalance)) {
          setDepositMessage("Deposit");
          setRequired(true);
        } else {
          setDepositMessage("Insufficient Balance");
          setRequired(false);
        }
      } else {
        setDepositMessage("Enter an amount");
        setRequired(false);
      }
    } else {
      setDepositMessage("Connect Wallet");
      setRequired(false);
    }
  };

  const DepositProcess = () => {
    if (publicKey) {
      if (Price) {
        if (Required) {
          dispatch(
            deposite_lpusd(
              wallet,
              Price,
              setRequired,
              setPrice,
              setDepositMessage
            )
          );
        }
      } else {
        setDepositMessage("Enter an amount");
      }
    } else {
      setDepositMessage("Connect Wallet");
    }
  };

  const setMaxDeposit = () => {
    if (publicKey) {
      setPrice(CalcFourDigit(lpUSDBalance));
      setDepositMessage("Deposit");
      setRequired(true);
    } else {
      setDepositMessage("Connect Wallet");
      setRequired(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      setDepositMessage("Deposit");
      setPrice("");
    } else {
      setRequired(false);
      setPrice("");
      setDepositMessage("Deposit");
    }
  }, [publicKey]);

  return (
    <>
      <div className="row deposit d-flex justify-content-center">
        <div className="col-lg-9 col-md-10 col-11">
          <div className="deposit_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-7 col-6 deposit_card_left">
                <div className="d-flex align-items-center">
                  <p onClick={setMaxDeposit}>
                    <span className="badge d-flex align-items-center">MAX</span>
                  </p>
                  <input
                    type="number"
                    placeholder="00.00"
                    autoComplete="off"
                    className="ml-2"
                    value={Price}
                    onChange={getTokenValue}
                    onKeyDown={blockInvalidChar}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-6 d-flex justify-content-end deposit_card_right">
                <button>
                  <img
                    src="/images/tokens/SolanaTokens/lpUSD.png"
                    alt="Loading..."
                    height="29"
                    width="29"
                  />

                  <span className="ml-3">lpUSD</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-3">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="row">
                <div className="col-12 d-flex justify-content-center mt-3">
                  <div className="btn_section">
                    <button onClick={() => DepositProcess()}>
                      {DepositMessage}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
