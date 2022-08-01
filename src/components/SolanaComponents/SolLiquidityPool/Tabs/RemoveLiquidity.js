import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TokenModel from "../../../../Models/Common/TokenModel";
import { SolRemoveAddLiquidityTokenSelect } from "../../../../redux/actions/Solana/SolLiquidityPoolActions";
import { useSelector } from "react-redux";
import {
  remove_liquidity_NormalSwap,
  remove_liquidity_StableSwap,
} from "../../../../interfaces/Solana/SolLiquidityPoolContracts";
import { useWallet } from "@solana/wallet-adapter-react";
import { blockInvalidChar } from "../../../../helper";

const RemoveLiquidity = ({ NewRemoveLiquidityApi }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [Required, setRequired] = useState(false);
  const [message, setMessage] = useState("");

  const [SolRemoveLiquidityModel, setSolRemoveLiquidityModel] = useState(false);

  const SolRemoveLiquidityState = useSelector(
    (state) => state.SolRemoveLiquidityReducer
  );

  const { TokenBalList } = useSelector(
    (state) => state.SolLiquidityPoolReducers
  );

  const getRemoveLiquidityAmount = async (e) => {
    if (wallet && publicKey) {
      if (SolRemoveLiquidityState.img1 && SolRemoveLiquidityState.img2) {
        setAmount(e.target.value);
        if (e.target.value > 0) {
          if (
            (SolRemoveLiquidityState.name1 === "lpUSD" &&
              SolRemoveLiquidityState.name2 === "USDC" &&
              e.target.value <= TokenBalList[0].Balance) ||
            (SolRemoveLiquidityState.name1 === "lpSOL" &&
              SolRemoveLiquidityState.name2 === "wSOL" &&
              e.target.value <= TokenBalList[1].Balance) ||
            (SolRemoveLiquidityState.name1 === "LPFi" &&
              SolRemoveLiquidityState.name2 === "USDC" &&
              e.target.value <= TokenBalList[2].Balance)
          ) {
            setAmount(e.target.value);
            setRequired(true);
            setMessage("Remove Liquidity");
          } else {
            setMessage("Insufficient Balance");
            setRequired(false);
          }
        } else {
          setAmount("");
          setMessage("Enter an amount");
          setRequired(false);
        }
      }
    } else {
      setRequired(false);
      setMessage("Connect wallet");
    }
  };

  const setMaxValue = (tokenA, tokenB) => {
    if (publicKey) {
      let getMaxAmount = 0;

      if (tokenA === "lpUSD" && tokenB === "USDC") {
        getMaxAmount = TokenBalList[0].Balance;
      } else if (tokenA === "lpSOL" && tokenB === "wSOL") {
        getMaxAmount = TokenBalList[1].Balance;
      } else if (tokenA === "LPFi" && tokenB === "USDC") {
        getMaxAmount = TokenBalList[2].Balance;
      }

      if (getMaxAmount > 0) {
        setAmount(getMaxAmount);
        setRequired(true);
        setMessage("Remove Liquidity");
      } else {
        setAmount("");
        setMessage("Insufficient Balance");
        setRequired(false);
      }
    } else {
      setRequired(false);
      setMessage("Connect wallet");
    }
  };

  const RemoveLiquidityProcess = () => {
    if (wallet && publicKey) {
      if (Required) {
        if (
          (SolRemoveLiquidityState.name1 === "lpUSD" &&
            SolRemoveLiquidityState.name2 === "USDC") ||
          (SolRemoveLiquidityState.name1 === "lpSOL" &&
            SolRemoveLiquidityState.name2 === "wSOL")
        ) {
          dispatch(
            remove_liquidity_StableSwap(
              wallet,
              amount,
              SolRemoveLiquidityState.name1,
              SolRemoveLiquidityState.name2,
              setAmount,
              setRequired
            )
          );
        } else {
          dispatch(
            remove_liquidity_NormalSwap(wallet, amount, setAmount, setRequired)
          );
        }
      }
    } else {
      setRequired(false);
      setMessage("Connect wallet");
    }
  };

  useEffect(() => {
    setAmount("");
    setRequired(false);
  }, [SolRemoveLiquidityState]);

  useEffect(() => {
    if (publicKey) {
      setMessage("Remove Liquidity");
      setRequired(false);
      setAmount("");
    } else {
      setMessage("Remove Liquidity");
      setRequired(false);
      setAmount("");
    }
  }, [publicKey]);

  return (
    <>
      {SolRemoveLiquidityModel && (
        <TokenModel
          tokenModel={SolRemoveLiquidityModel}
          setTokenModel={setSolRemoveLiquidityModel}
          TokensApi={NewRemoveLiquidityApi}
          TokenSelectFun={SolRemoveAddLiquidityTokenSelect}
          height="250px"
        />
      )}

      <div className="row RemoveLiquidity d-flex justify-content-center">
        <div className="col-lg-11 col-md-10 col-12 mt-3 mb-1">
          <div className="RemoveLiquidity_card py-lg-1 py-md-1 py-sm-1 py-3">
            <div className="row d-flex align-items-center">
              <div className="col-lg-5 col-md-4 col-sm-6 col-6 RemoveLiquidity_card_left d-flex justify-content-start">
                <div className="d-flex align-items-center">
                  <span
                    className="badge d-flex align-items-center"
                    onClick={() =>
                      setMaxValue(
                        SolRemoveLiquidityState.name1,
                        SolRemoveLiquidityState.name2
                      )
                    }
                  >
                    MAX
                  </span>
                  <input
                    type="number"
                    placeholder="00.00"
                    autoComplete="off"
                    className="ml-2"
                    value={amount}
                    onChange={getRemoveLiquidityAmount}
                    onKeyDown={blockInvalidChar}
                  />
                </div>
              </div>
              <div className="col-lg-7 col-md-8 col-sm-6 col-6 mt-lg-0 mt-md-0 mt-sm-0 mt-3 col-md-8 col-sm-6 col-12 d-flex justify-content-end RemoveLiquidity_card_right">
                <button onClick={() => setSolRemoveLiquidityModel(true)}>
                  {SolRemoveLiquidityState.img1 && (
                    <img
                      src={SolRemoveLiquidityState.img1}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}

                  <div className="ml-2 d-flex align-items-center">
                    {SolRemoveLiquidityState.img2 && (
                      <img
                        src={SolRemoveLiquidityState.img2}
                        alt="Loading..."
                        height="29"
                        width="29"
                      />
                    )}
                  </div>

                  <span className="ml-3">{`${SolRemoveLiquidityState.name1}-${SolRemoveLiquidityState.name2}`}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="row">
                <div className="col-12 d-flex justify-content-center mt-3">
                  <div className="btn_section">
                    <button onClick={() => RemoveLiquidityProcess()}>
                      {message}
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

export default RemoveLiquidity;
