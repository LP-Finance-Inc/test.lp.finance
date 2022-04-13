export const CalWithdrawMaxValue = (
  maxWithdraw,
  TokenName,
  lpContractState
) => {
  const {
    SolTokenPrice,
    BtcTokenPrice,
    UsdcTokenPrice,
    mSOLTokenPrice,
    ETHTokenPrice,
    SRMTokenPrice,
    USDTTokenPrice,
    USTTokenPrice,
    STSOLTokenPrice,
    scnSOLTokenPrice,
    lpSOLTokenPrice,
    lpUSDTokenPrice,
    lpBTCTokenPrice,
    lpETHTokenPrice,
  } = lpContractState.TokenPriceList;

  const {
    DepositedSolAmount,
    DepositedBtcAmount,
    DepositedUsdcAmount,
    DepositedMSOLAmount,
    DepositedETHAmount,
    DepositedSRMAmount,
    DepositedUSDTAmount,
    DepositedUSTAmount,
    DepositedstSOLAmount,
    DepositedscnSOLAmount,
    DepositedLpSolAmount,
    DepositedLpUsdAmount,
    DepositedLpBTCAmount,
    DepositedLpETHAmount,
  } = lpContractState.UserAccountInfo;

  let maxWithdrawValueCal = "";

  if (TokenName === "SOL") {
    const maxWithdrawNumber = maxWithdraw / SolTokenPrice;
    if (DepositedSolAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedSolAmount;
    } else if (DepositedSolAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "BTC") {
    const maxWithdrawNumber = maxWithdraw / BtcTokenPrice;
    if (DepositedBtcAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedBtcAmount;
    } else if (DepositedBtcAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "USDC") {
    const maxWithdrawNumber = maxWithdraw / UsdcTokenPrice;
    if (DepositedUsdcAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedUsdcAmount;
    } else if (DepositedUsdcAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "mSOL") {
    const maxWithdrawNumber = maxWithdraw / mSOLTokenPrice;
    if (DepositedMSOLAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedMSOLAmount;
    } else if (DepositedMSOLAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "ETH") {
    const maxWithdrawNumber = maxWithdraw / ETHTokenPrice;
    if (DepositedETHAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedETHAmount;
    } else if (DepositedETHAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "SRM") {
    const maxWithdrawNumber = maxWithdraw / SRMTokenPrice;
    if (DepositedSRMAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedSRMAmount;
    } else if (DepositedSRMAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "USDT") {
    const maxWithdrawNumber = maxWithdraw / USDTTokenPrice;
    if (DepositedUSDTAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedUSDTAmount;
    } else if (DepositedUSDTAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "UST") {
    const maxWithdrawNumber = maxWithdraw / USTTokenPrice;
    if (DepositedUSTAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedUSTAmount;
    } else if (DepositedUSTAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "stSOL") {
    const maxWithdrawNumber = maxWithdraw / STSOLTokenPrice;
    if (DepositedstSOLAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedstSOLAmount;
    } else if (DepositedstSOLAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "scnSOL") {
    const maxWithdrawNumber = maxWithdraw / scnSOLTokenPrice;
    if (DepositedscnSOLAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedscnSOLAmount;
    } else if (DepositedscnSOLAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "lpSOL") {
    const maxWithdrawNumber = maxWithdraw / lpSOLTokenPrice;
    if (DepositedLpSolAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedLpSolAmount;
    } else if (DepositedLpSolAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "lpUSD") {
    const maxWithdrawNumber = maxWithdraw / lpUSDTokenPrice;
    if (DepositedLpUsdAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedLpUsdAmount;
    } else if (DepositedLpUsdAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "lpBTC") {
    const maxWithdrawNumber = maxWithdraw / lpBTCTokenPrice;
    if (DepositedLpBTCAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedLpBTCAmount;
    } else if (DepositedLpBTCAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "lpETH") {
    const maxWithdrawNumber = maxWithdraw / lpETHTokenPrice;
    if (DepositedLpETHAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedLpETHAmount;
    } else if (DepositedLpETHAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  }

  return maxWithdrawValueCal;
};

export const CalRepayMaxValue = (TokenName, lpContractState) => {
  const {
    SOLBalance,
    BTCBalance,
    USDCBalance,
    ETHBalance,
    lpSOLBalance,
    lpUSDBalance,
    lpBTCBalance,
    lpETHBalance,
  } = lpContractState.BalList;

  const {
    BorrowedLpSOLAmount,
    BorrowedLpUsdAmount,
    BorrowedLpBTCAmount,
    BorrowedLpETHAmount,
  } = lpContractState.UserAccountInfo;

  let calMaxRepayValue = "";

  if (TokenName === "SOL") {
    if (SOLBalance >= BorrowedLpSOLAmount) {
      calMaxRepayValue = BorrowedLpSOLAmount;
    } else if (SOLBalance < BorrowedLpSOLAmount) {
      calMaxRepayValue = SOLBalance;
    }
  } else if (TokenName === "USDC") {
    if (USDCBalance >= BorrowedLpUsdAmount) {
      calMaxRepayValue = BorrowedLpUsdAmount;
    } else if (USDCBalance < BorrowedLpUsdAmount) {
      calMaxRepayValue = USDCBalance;
    }
  } else if (TokenName === "BTC") {
    if (BTCBalance >= BorrowedLpBTCAmount) {
      calMaxRepayValue = BorrowedLpBTCAmount;
    } else if (BTCBalance < BorrowedLpBTCAmount) {
      calMaxRepayValue = BTCBalance;
    }
  } else if (TokenName === "ETH") {
    if (ETHBalance >= BorrowedLpETHAmount) {
      calMaxRepayValue = BorrowedLpETHAmount;
    } else if (ETHBalance < BorrowedLpETHAmount) {
      calMaxRepayValue = ETHBalance;
    }
  } else if (TokenName === "lpSOL") {
    if (lpSOLBalance >= BorrowedLpSOLAmount) {
      calMaxRepayValue = BorrowedLpSOLAmount;
    } else if (lpSOLBalance < BorrowedLpSOLAmount) {
      calMaxRepayValue = lpSOLBalance;
    }
  } else if (TokenName === "lpUSD") {
    if (lpUSDBalance >= BorrowedLpUsdAmount) {
      calMaxRepayValue = BorrowedLpUsdAmount;
    } else if (lpUSDBalance < BorrowedLpUsdAmount) {
      calMaxRepayValue = lpUSDBalance;
    }
  } else if (TokenName === "lpBTC") {
    if (lpBTCBalance >= BorrowedLpBTCAmount) {
      calMaxRepayValue = BorrowedLpBTCAmount;
    } else if (lpBTCBalance < BorrowedLpBTCAmount) {
      calMaxRepayValue = lpBTCBalance;
    }
  } else if (TokenName === "lpETH") {
    if (lpETHBalance >= BorrowedLpETHAmount) {
      calMaxRepayValue = BorrowedLpETHAmount;
    } else if (lpETHBalance < BorrowedLpETHAmount) {
      calMaxRepayValue = lpETHBalance;
    }
  }

  return calMaxRepayValue;
};
