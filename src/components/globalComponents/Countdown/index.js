import React, { useEffect, useState } from "react";
import CountdownWrapper from "./Countdown.style";
import { useDispatch, useSelector } from "react-redux";
import { getTokenBalanceFun } from "../../../redux/actions/Solana/SolBorrowActions";
import { useWallet } from "@solana/wallet-adapter-react";
import { getSolanaCryptoFun } from "../../../utils/Solana/global";

const FULL_DASH_ARRAY = 283;

const TIME_LIMIT = 30;
let timePassed = 0;
let timerInterval = null;
let timeLeft = TIME_LIMIT;

const Countdown = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const [count, setCount] = useState();

  const ContractState = useSelector((state) => state.ContractReducer);

  const RefreshTokenPriceList = async () => {
    try {
      timePassed = 0;
      timeLeft = TIME_LIMIT;
      dispatch(getSolanaCryptoFun(wallet, publicKey));
    } catch (error) {}
  };

  const formatTime = (time) => {
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${seconds}`;
  };

  function calculateTimeFraction() {
    return timeLeft / TIME_LIMIT;
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  const startTimer = () => {
    timerInterval = setInterval(async () => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      setCount(timePassed);
      if (timeLeft === 0) {
        timePassed = 0;
        timeLeft = TIME_LIMIT;

        document
          .getElementById("base-timer-path-remaining")
          .classList.add("stop_animation");
        // RefreshTokenPriceList();
      } else {
        const BaseTimer = document.getElementById("base-timer-path-remaining");
        BaseTimer.classList.add("color");
        BaseTimer.classList.remove("stop_animation");
      }

      document.getElementById("base-timer-label").innerHTML =
        formatTime(timeLeft);
      setCircleDasharray();
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  };

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    dispatch(getTokenBalanceFun(publicKey));
    RefreshTokenPriceList();
  }, [ContractState.contractType === "success"]);

  return (
    <CountdownWrapper>
      <div className="base-timer" onClick={RefreshTokenPriceList}>
        <svg
          className="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="base-timer__circle">
            <circle
              className="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              id="base-timer-path-remaining"
              stroke-dasharray="283"
              className="base-timer__path-remaining"
              d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" className="base-timer__label">
          {formatTime(timeLeft)}
        </span>
        <div className="countdown_tooltip">
          <p>
            Data on this page will auto-refresh in{" "}
            {formatTime(TIME_LIMIT - count)} seconds. Click this to trigger a
            manual refresh.
          </p>
        </div>
      </div>
    </CountdownWrapper>
  );
};

export default Countdown;
