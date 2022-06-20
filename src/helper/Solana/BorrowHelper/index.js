import { readUserAccount } from "../../../utils/Solana/SolBorrowFun/readUserAccount";
import { calc } from "../../index";

export const CalWithdrawMaxValue = (
  maxWithdraw,
  TokenName,
  lpContractState
) => {
  const {
    SOLTokenPrice,
    BTCTokenPrice,
    USDCTokenPrice,
    mSOLTokenPrice,
    ETHTokenPrice,
    SRMTokenPrice,
    USDTTokenPrice,
    stSOLTokenPrice,
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
    DepositedstSOLAmount,
    DepositedscnSOLAmount,

    LendingSolAmount,
    LendingBtcAmount,
    LendingUsdcAmount,
    LendingMSOLAmount,
    LendingETHAmount,
    LendingSRMAmount,
    LendingUSDTAmount,
    LendingstSOLAmount,
    LendingscnSOLAmount,

    DepositedLpSolAmount,
    DepositedLpUsdAmount,
    DepositedLpBTCAmount,
    DepositedLpETHAmount,
  } = lpContractState.UserAccountInfo;

  let maxWithdrawValueCal = "";

  if (TokenName === "SOL") {
    const maxWithdrawNumber = maxWithdraw / SOLTokenPrice;
    if (DepositedSolAmount + LendingSolAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedSolAmount + LendingSolAmount;
    } else if (DepositedSolAmount + LendingSolAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "BTC") {
    const maxWithdrawNumber = maxWithdraw / BTCTokenPrice;
    if (DepositedBtcAmount + LendingBtcAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedBtcAmount + LendingBtcAmount;
    } else if (DepositedBtcAmount + LendingBtcAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "USDC") {
    const maxWithdrawNumber = maxWithdraw / USDCTokenPrice;
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
  } else if (TokenName === "stSOL") {
    const maxWithdrawNumber = maxWithdraw / stSOLTokenPrice;
    if (DepositedstSOLAmount + LendingstSOLAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedstSOLAmount + LendingstSOLAmount;
    } else if (DepositedstSOLAmount + LendingstSOLAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "scnSOL") {
    const maxWithdrawNumber = maxWithdraw / scnSOLTokenPrice;
    if (DepositedscnSOLAmount + LendingscnSOLAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedscnSOLAmount + LendingscnSOLAmount;
    } else if (
      DepositedscnSOLAmount + LendingscnSOLAmount >
      maxWithdrawNumber
    ) {
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

export const CalLTVFunction = async (wallet, userAuthority, TokenPriceList) => {
  const UserAccountInfo = await readUserAccount(wallet, userAuthority);

  const {
    SOLTokenPrice,
    BTCTokenPrice,
    USDCTokenPrice,
    mSOLTokenPrice,
    ETHTokenPrice,
    SRMTokenPrice,
    USDTTokenPrice,
    stSOLTokenPrice,
    scnSOLTokenPrice,
    lpSOLTokenPrice,
    lpUSDTokenPrice,
    lpBTCTokenPrice,
    lpETHTokenPrice,
  } = TokenPriceList;
  const {
    //deposited
    DepositedSolAmount,
    DepositedBtcAmount,
    DepositedUsdcAmount,
    DepositedMSOLAmount,
    DepositedETHAmount,
    DepositedSRMAmount,
    DepositedUSDTAmount,
    DepositedstSOLAmount,
    DepositedscnSOLAmount,

    LendingSolAmount,
    LendingBtcAmount,
    LendingUsdcAmount,
    LendingMSOLAmount,
    LendingETHAmount,
    LendingSRMAmount,
    LendingUSDTAmount,
    LendingstSOLAmount,
    LendingscnSOLAmount,

    DepositedLpSolAmount,
    DepositedLpUsdAmount,
    DepositedLpBTCAmount,
    DepositedLpETHAmount,
    //borrowed
    BorrowedLpSOLAmount,
    BorrowedLpUsdAmount,
    BorrowedLpBTCAmount,
    BorrowedLpETHAmount,
  } = UserAccountInfo;

  //Borrow Page start
  const DepositedUserSOLAmountCal =
    (DepositedSolAmount + LendingSolAmount) * SOLTokenPrice;

  const DepositedUserBTCAmountCal =
    (DepositedBtcAmount + LendingBtcAmount) * BTCTokenPrice;
  const DepositedUserUSDCAmountCal =
    (DepositedUsdcAmount + LendingUsdcAmount) * USDCTokenPrice;
  const DepositedUserMSOLAmountCal =
    (DepositedMSOLAmount + LendingMSOLAmount) * mSOLTokenPrice;
  const DepositedUserETHAmountCal =
    (DepositedETHAmount + LendingETHAmount) * ETHTokenPrice;
  const DepositedUserSRMAmountCal =
    (DepositedSRMAmount + LendingSRMAmount) * SRMTokenPrice;
  const DepositedUserUSDTAmountCal =
    (DepositedUSDTAmount + LendingUSDTAmount) * USDTTokenPrice;

  const DepositedUserstSOLAmountCal =
    (DepositedstSOLAmount + LendingstSOLAmount) * stSOLTokenPrice;
  const DepositedUserscnSOLAmountCal =
    (DepositedscnSOLAmount + LendingscnSOLAmount) * scnSOLTokenPrice;

  const DepositedUserLpSOLAmountCal = DepositedLpSolAmount * lpSOLTokenPrice;
  const DepositedUserLpUSDAmountCal = DepositedLpUsdAmount * lpUSDTokenPrice;
  const DepositedUserLpBTCAmountCal = DepositedLpBTCAmount * lpBTCTokenPrice;
  const DepositedUserLpETHAmountCal = DepositedLpETHAmount * lpETHTokenPrice;

  const BorrowedUserLpSOLAmountCal = BorrowedLpSOLAmount * lpSOLTokenPrice;
  const BorrowedUserLpUSDAmountCal = BorrowedLpUsdAmount * lpUSDTokenPrice;
  const BorrowedUserLpBTCAmountCal = BorrowedLpBTCAmount * lpBTCTokenPrice;
  const BorrowedUserLpETHAmountCal = BorrowedLpETHAmount * lpETHTokenPrice;

  const UserTotalDepositedCal =
    DepositedUserSOLAmountCal +
    DepositedUserBTCAmountCal +
    DepositedUserUSDCAmountCal +
    DepositedUserMSOLAmountCal +
    DepositedUserETHAmountCal +
    DepositedUserSRMAmountCal +
    DepositedUserUSDTAmountCal +
    DepositedUserstSOLAmountCal +
    DepositedUserscnSOLAmountCal +
    DepositedUserLpSOLAmountCal +
    DepositedUserLpUSDAmountCal +
    DepositedUserLpBTCAmountCal +
    DepositedUserLpETHAmountCal;

  const UserTotalBorrowedCal =
    BorrowedUserLpUSDAmountCal +
    BorrowedUserLpSOLAmountCal +
    BorrowedUserLpBTCAmountCal +
    BorrowedUserLpETHAmountCal;

  const LTV = calc((UserTotalBorrowedCal / UserTotalDepositedCal) * 100);

  return LTV;
};
