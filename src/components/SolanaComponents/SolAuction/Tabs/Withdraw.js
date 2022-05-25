import { useDispatch } from "react-redux";
import { withdraw_lpusd } from "../../../../interfaces/Solana/SolAuctionContracts";
import { useWallet } from "@solana/wallet-adapter-react";
import { CalcFourDigit } from "../../../../helper";
import { blockInvalidChar } from "../../../../helper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Withdraw = ({ Deposit }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const [WithdrawMessage, setWithdrawMessage] = useState("Withdraw");
  const [WithdrawPrice, setWithdrawPrice] = useState("");
  const [Required, setRequired] = useState(false);

  const SolAuctionState = useSelector((state) => state.SolAuctionReducer);

  const { UserAuctionDepositedLpUSD } = SolAuctionState?.AuctionUserAccount;

  const getWithdrawTokenValue = (e) => {
    setWithdrawPrice(e.target.value);

    if (publicKey) {
      if (e.target.value > 0) {
        if (e.target.value <= CalcFourDigit(UserAuctionDepositedLpUSD)) {
          setWithdrawMessage("Withdraw");
          setRequired(true);
        } else {
          setWithdrawMessage("Withdraw Amount Exceeded");
          setRequired(false);
        }
      } else {
        setWithdrawMessage("Enter an amount");
        setRequired(false);
      }
    } else {
      setWithdrawMessage("Connect Wallet");
      setRequired(false);
    }
  };

  const setMaxWithdraw = () => {
    if (publicKey) {
      setWithdrawPrice(CalcFourDigit(Deposit));
      setWithdrawMessage("Withdraw");
      setRequired(true);
    } else {
      setWithdrawMessage("Connect Wallet");
      setRequired(false);
    }
  };

  const WithdrawProcess = () => {
    if (publicKey) {
      if (WithdrawPrice > 0) {
        if (Required) {
          dispatch(
            withdraw_lpusd(
              wallet,
              WithdrawPrice,
              setRequired,
              setWithdrawPrice,
              setWithdrawMessage
            )
          );
        }
      } else {
        setWithdrawMessage("Enter an amount");
      }
    } else {
      setWithdrawMessage("Connect Wallet");
    }
  };

  useEffect(() => {
    if (publicKey) {
      setWithdrawMessage("Withdraw");
      setWithdrawPrice("");
    } else {
      setRequired(false);
      setWithdrawPrice("");
      setWithdrawMessage("Withdraw");
    }
  }, [publicKey]);

  return (
    <>
      <div className="row withdraw d-flex justify-content-center">
        <div className="col-lg-9 col-md-10 col-11">
          <div className="withdraw_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-7 col-6 withdraw_card_left">
                <div className="d-flex align-items-center">
                  <p onClick={setMaxWithdraw}>
                    <span className="badge d-flex align-items-center">MAX</span>
                  </p>
                  <input
                    type="number"
                    placeholder="00.00"
                    autoComplete="off"
                    className="ml-2"
                    onChange={getWithdrawTokenValue}
                    value={WithdrawPrice}
                    onKeyDown={blockInvalidChar}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-6 d-flex justify-content-end withdraw_card_right">
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
                    <button onClick={() => WithdrawProcess()}>
                      {WithdrawMessage}
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

export default Withdraw;
