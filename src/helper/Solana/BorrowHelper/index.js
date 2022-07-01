import { readUserAccount } from "../../../utils/Solana/SolBorrowFun/readUserAccount";
import { calc } from "../../index";

export const CalWithdrawMaxValue = (
  maxWithdraw,
  TokenName,
  lpContractState
) => {
  const {
    wSOLTokenPrice,
    LPFiTokenPrice,
    mSOLTokenPrice,
    stSOLTokenPrice,
    scnSOLTokenPrice,
    RAYTokenPrice,
    SRMTokenPrice,
    lpSOLTokenPrice,
    lpUSDTokenPrice,
  } = lpContractState.TokenPriceList;

  const {
    DepositedwSolAmount,
    DepositedmSOLAmount,
    DepositedscnSOLAmount,
    DepositedstSOLAmount,
    DepositedRAYAmount,
    DepositedSRMAmount,
    DepositedlpSolAmount,
    DepositedlpUsdAmount,
    DepositedLPFiAmount,
    LendingwSOLAmount,
    LendingmSOLAmount,
    LendingscnSOLAmount,
    LendingstSOLAmount,
    LendingSRMAmount,
    LendingRAYAmount,
  } = lpContractState.UserAccountInfo;

  let maxWithdrawValueCal = "";

  if (TokenName === "wSOL") {
    const maxWithdrawNumber = maxWithdraw / wSOLTokenPrice;
    if (DepositedwSolAmount + LendingwSOLAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedwSolAmount + LendingwSOLAmount;
    } else if (DepositedwSolAmount + LendingwSOLAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "mSOL") {
    const maxWithdrawNumber = maxWithdraw / mSOLTokenPrice;
    if (DepositedmSOLAmount + LendingmSOLAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedmSOLAmount + LendingmSOLAmount;
    } else if (DepositedmSOLAmount + LendingmSOLAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "SRM") {
    const maxWithdrawNumber = maxWithdraw / SRMTokenPrice;
    if (DepositedSRMAmount + LendingSRMAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedSRMAmount + LendingSRMAmount;
    } else if (DepositedSRMAmount + LendingSRMAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "RAY") {
    const maxWithdrawNumber = maxWithdraw / RAYTokenPrice;
    if (DepositedRAYAmount + LendingRAYAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedRAYAmount + LendingRAYAmount;
    } else if (DepositedRAYAmount + LendingRAYAmount > maxWithdrawNumber) {
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
    if (DepositedlpSolAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedlpSolAmount;
    } else if (DepositedlpSolAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "lpUSD") {
    const maxWithdrawNumber = maxWithdraw / lpUSDTokenPrice;
    if (DepositedlpUsdAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedlpUsdAmount;
    } else if (DepositedlpUsdAmount > maxWithdrawNumber) {
      maxWithdrawValueCal = maxWithdrawNumber;
    }
  } else if (TokenName === "LPFi") {
    const maxWithdrawNumber = maxWithdraw / LPFiTokenPrice;
    if (DepositedLPFiAmount <= maxWithdrawNumber) {
      maxWithdrawValueCal = DepositedLPFiAmount;
    } else if (DepositedLPFiAmount > maxWithdrawNumber) {
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
    SolTokenPrice,
    BtcTokenPrice,
    UsdcTokenPrice,
    mSOLTokenPrice,
    ETHTokenPrice,
    SRMTokenPrice,
    USDTTokenPrice,
    STSOLTokenPrice,
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
    (DepositedSolAmount + LendingSolAmount) * SolTokenPrice;

  const DepositedUserBTCAmountCal =
    (DepositedBtcAmount + LendingBtcAmount) * BtcTokenPrice;
  const DepositedUserUSDCAmountCal =
    (DepositedUsdcAmount + LendingUsdcAmount) * UsdcTokenPrice;
  const DepositedUserMSOLAmountCal =
    (DepositedMSOLAmount + LendingMSOLAmount) * mSOLTokenPrice;
  const DepositedUserETHAmountCal =
    (DepositedETHAmount + LendingETHAmount) * ETHTokenPrice;
  const DepositedUserSRMAmountCal =
    (DepositedSRMAmount + LendingSRMAmount) * SRMTokenPrice;
  const DepositedUserUSDTAmountCal =
    (DepositedUSDTAmount + LendingUSDTAmount) * USDTTokenPrice;

  const DepositedUserstSOLAmountCal =
    (DepositedstSOLAmount + LendingstSOLAmount) * STSOLTokenPrice;
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
