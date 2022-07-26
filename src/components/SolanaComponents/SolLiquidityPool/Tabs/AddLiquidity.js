import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPlusCircleFill } from "react-icons/bs";
import TokenModel from "../../../../Models/Common/TokenModel";
import {
  TopAddLiquidityApi,
  BottomAddLiquidityApi,
} from "../../../../assets/api/Solana/SolLiquidityPoolApis";
import {
  SolTopAddLiquidityTokenSelect,
  SolBottomAddLiquidityTokenSelect,
} from "../../../../redux/actions/Solana/SolLiquidityPoolActions";
import {
  add_liquidity_StableSwap,
  getAmountB,
} from "../../../../interfaces/Solana/SolLiquidityPoolContracts";
import { useWallet } from "@solana/wallet-adapter-react";
import { blockInvalidChar, CalcFourDigit } from "../../../../helper";

const AddLiquidity = ({ SolBorrowState }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const NewTopAddLiquidityApi = TopAddLiquidityApi();
  const NewBottomAddLiquidityApi = BottomAddLiquidityApi();
  const [TopAmount, setTopAmount] = useState("");
  const [BottomAmount, setBottomAmount] = useState("");
  const [Required, setRequired] = useState(false);
  const [message, setMessage] = useState("");

  const SolTopAddLiquidityState = useSelector(
    (state) => state.SolTopAddLiquidityReducer
  );

  const [SolTopAddLiquidityModel, setSolTopAddLiquidityModel] = useState(false);

  const [SolBottomAddLiquidityModel, setSolBottomAddLiquidityModel] =
    useState(false);

  const { wSOLBalance, LPFiBalance, USDCBalance, lpSOLBalance, lpUSDBalance } =
    SolBorrowState?.BalList;

  const getTopLiquidityValue = async (e) => {
    if (wallet && publicKey) {
      if (SolTopAddLiquidityState.img1 && SolTopAddLiquidityState.img2) {
        setTopAmount(e.target.value);
        if (e.target.value > 0) {
          if (
            (SolTopAddLiquidityState.name1 === "lpUSD" &&
              e.target.value <= lpUSDBalance) ||
            (SolTopAddLiquidityState.name1 === "lpSOL" &&
              e.target.value <= lpSOLBalance) ||
            (SolTopAddLiquidityState.name1 === "USDC" &&
              e.target.value <= USDCBalance) ||
            (SolTopAddLiquidityState.name1 === "LPFi" &&
              e.target.value <= LPFiBalance) ||
            (SolTopAddLiquidityState.name1 === "wSOL" &&
              e.target.value <= wSOLBalance)
          ) {
            const amount = await getAmountB(
              wallet,
              SolTopAddLiquidityState.name1,
              SolTopAddLiquidityState.name2,
              e.target.value
            );

            setBottomAmount(amount);
            setRequired(true);
            setMessage("Add Liquidity");
          } else {
            setMessage("Insufficient Balance");
            setRequired(false);
          }
        } else {
          setBottomAmount("");
          setMessage("Enter an amount");
          setRequired(false);
        }
      }
    } else {
      setRequired(false);
      setMessage("Connect wallet");
    }
  };

  const add_liquidity_process = () => {
    if (wallet && publicKey) {
      if (Required) {
        if (
          (SolTopAddLiquidityState.name1 === "lpUSD" &&
            SolTopAddLiquidityState.name2 === "USDC") ||
          (SolTopAddLiquidityState.name1 === "USDC" &&
            SolTopAddLiquidityState.name2 === "lpUSD") ||
          (SolTopAddLiquidityState.name1 === "lpSOL" &&
            SolTopAddLiquidityState.name2 === "wSOL") ||
          (SolTopAddLiquidityState.name1 === "wSOL" &&
            SolTopAddLiquidityState.name2 === "lpSOL")
        ) {
          dispatch(
            add_liquidity_StableSwap(
              wallet,
              SolTopAddLiquidityState.name1,
              SolTopAddLiquidityState.name2,
              TopAmount,
              BottomAmount,
              setTopAmount,
              setBottomAmount,
              setRequired
            )
          );
        }
      }
    } else {
      setRequired(false);
      setMessage("Connect wallet");
    }
  };

  useEffect(() => {
    setTopAmount("");
    setBottomAmount("");
    setRequired(false);
  }, [SolTopAddLiquidityState.img1]);

  useEffect(() => {
    if (publicKey) {
      setMessage("Add Liquidity");
      setRequired(false);
      setTopAmount("");
      setBottomAmount("");
    } else {
      setRequired(false);
      setTopAmount("");
      setBottomAmount("");
      setMessage("Add Liquidity");
    }
  }, [publicKey]);

  return (
    <>
      {SolTopAddLiquidityModel && (
        <TokenModel
          tokenModel={SolTopAddLiquidityModel}
          setTokenModel={setSolTopAddLiquidityModel}
          TokensApi={NewTopAddLiquidityApi}
          TokenSelectFun={SolTopAddLiquidityTokenSelect}
        />
      )}

      {SolBottomAddLiquidityModel && (
        <TokenModel
          tokenModel={SolBottomAddLiquidityModel}
          setTokenModel={setSolBottomAddLiquidityModel}
          TokensApi={NewBottomAddLiquidityApi}
          TokenSelectFun={SolBottomAddLiquidityTokenSelect}
          height="auto"
        />
      )}

      <div className="row AddLiquidity d-flex justify-content-center">
        <div className="col-lg-8 col-md-10 col-12 mt-3 mb-1">
          <div className="AddLiquidity_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-5 col-md-5 col-5 AddLiquidity_card_left">
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    placeholder="00.00"
                    value={TopAmount}
                    autoComplete="off"
                    id="inputBox"
                    onChange={getTopLiquidityValue}
                    onKeyDown={blockInvalidChar}
                  />
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-7  d-flex justify-content-end AddLiquidity_card_right">
                <button onClick={() => setSolTopAddLiquidityModel(true)}>
                  {SolTopAddLiquidityState.img1 && (
                    <img
                      src={SolTopAddLiquidityState.img1}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{SolTopAddLiquidityState.name1}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-md-10 col-12 mb-1 d-flex justify-content-center">
          <div className="plus_icon_section">
            <BsPlusCircleFill className="icon" />
          </div>
        </div>

        <div className="col-lg-8 col-md-10 col-12 mb-2">
          <div className="AddLiquidity_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-5 col-md-5 col-5 AddLiquidity_card_left">
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    placeholder="00.00"
                    autoComplete="off"
                    value={BottomAmount}
                    onKeyDown={blockInvalidChar}
                    // disabled
                  />
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-7 d-flex justify-content-end AddLiquidity_card_right">
                <button onClick={() => setSolBottomAddLiquidityModel(true)}>
                  {SolTopAddLiquidityState.img2 && (
                    <img
                      src={SolTopAddLiquidityState.img2}
                      alt="Loading..."
                      height="29"
                      width="29"
                    />
                  )}
                  <span className="ml-3">{SolTopAddLiquidityState.name2}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="row">
                <div className="col-12 d-flex justify-content-center mt-3">
                  <div className="btn_section">
                    <button onClick={() => add_liquidity_process()}>
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

export default AddLiquidity;
