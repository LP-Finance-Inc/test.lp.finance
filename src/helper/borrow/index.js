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

    LendingSolAmount,
    LendingBtcAmount,
    LendingUsdcAmount,
    LendingMSOLAmount,
    LendingETHAmount,
    LendingSRMAmount,
    LendingUSDTAmount,
    LendingUSTAmount,
    LendingstSOLAmount,
    LendingscnSOLAmount,

    DepositedLpSolAmount,
    DepositedLpUsdAmount,
    DepositedLpBTCAmount,
    DepositedLpETHAmount,
  } = lpContractState.UserAccountInfo;

  let maxWithdrawValueCal = "";

  if (TokenName === "SOL") {
    const maxWithdrawNumber = maxWithdraw / SolTokenPrice;
    if (DepositedSolAmount + LendingSolAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedSolAmount + LendingSolAmount;
    } else if (DepositedSolAmount + LendingSolAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "BTC") {
    const maxWithdrawNumber = maxWithdraw / BtcTokenPrice;
    if (DepositedBtcAmount + LendingBtcAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedBtcAmount + LendingBtcAmount;
    } else if (DepositedBtcAmount + LendingBtcAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "USDC") {
    const maxWithdrawNumber = maxWithdraw / UsdcTokenPrice;
    if (DepositedUsdcAmount + LendingUsdcAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedUsdcAmount + LendingUsdcAmount;
    } else if (DepositedUsdcAmount + LendingUsdcAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "mSOL") {
    const maxWithdrawNumber = maxWithdraw / mSOLTokenPrice;
    if (DepositedMSOLAmount + LendingMSOLAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedMSOLAmount + LendingMSOLAmount;
    } else if (DepositedMSOLAmount + LendingMSOLAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "ETH") {
    const maxWithdrawNumber = maxWithdraw / ETHTokenPrice;
    if (DepositedETHAmount + LendingETHAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedETHAmount + LendingETHAmount;
    } else if (DepositedETHAmount + LendingETHAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "SRM") {
    const maxWithdrawNumber = maxWithdraw / SRMTokenPrice;
    if (DepositedSRMAmount + LendingSRMAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedSRMAmount + LendingSRMAmount;
    } else if (DepositedSRMAmount + LendingSRMAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "USDT") {
    const maxWithdrawNumber = maxWithdraw / USDTTokenPrice;
    if (DepositedUSDTAmount + LendingUSDTAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedUSDTAmount + LendingUSDTAmount;
    } else if (DepositedUSDTAmount + LendingUSDTAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "UST") {
    const maxWithdrawNumber = maxWithdraw / USTTokenPrice;
    if (DepositedUSTAmount + LendingUSTAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedUSTAmount + LendingUSTAmount;
    } else if (DepositedUSTAmount + LendingUSTAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "stSOL") {
    const maxWithdrawNumber = maxWithdraw / STSOLTokenPrice;
    if (DepositedstSOLAmount + LendingstSOLAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedstSOLAmount + LendingstSOLAmount;
    } else if (DepositedstSOLAmount + LendingstSOLAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "scnSOL") {
    const maxWithdrawNumber = maxWithdraw / scnSOLTokenPrice;
    if (DepositedscnSOLAmount + LendingscnSOLAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedscnSOLAmount + LendingscnSOLAmount;
    } else if (DepositedscnSOLAmount + LendingscnSOLAmount > maxWithdrawNumber) {
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
