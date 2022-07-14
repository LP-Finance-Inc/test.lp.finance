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
  const { wSOLBalance, lpSOLBalance, lpUSDBalance } = lpContractState.BalList;

  const { BorrowedlpSOLAmount, BorrowedlpUsdAmount } =
    lpContractState.UserAccountInfo;

  let calMaxRepayValue = "";

  if (TokenName === "wSOL") {
    if (wSOLBalance >= BorrowedlpSOLAmount) {
      calMaxRepayValue = BorrowedlpSOLAmount;
    } else if (wSOLBalance < BorrowedlpSOLAmount) {
      calMaxRepayValue = wSOLBalance;
    }
  } else if (TokenName === "lpSOL") {
    if (lpSOLBalance >= BorrowedlpSOLAmount) {
      calMaxRepayValue = BorrowedlpSOLAmount;
    } else if (lpSOLBalance < BorrowedlpSOLAmount) {
      calMaxRepayValue = lpSOLBalance;
    }
  } else if (TokenName === "lpUSD") {
    if (lpUSDBalance >= BorrowedlpUsdAmount) {
      calMaxRepayValue = BorrowedlpUsdAmount;
    } else if (lpUSDBalance < BorrowedlpUsdAmount) {
      calMaxRepayValue = lpUSDBalance;
    }
  }

  return calMaxRepayValue;
};

export const CalLTVFunction = async (wallet, userAuthority, TokenPriceList) => {
  const UserAccountInfo = await readUserAccount(wallet, userAuthority);

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
  } = TokenPriceList;

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
    BorrowedlpSOLAmount,
    BorrowedlpUsdAmount,
  } = UserAccountInfo;

  //Borrow Page start
  const DepositedUserwSOLAmountCal =
    (DepositedwSolAmount + LendingwSOLAmount) * wSOLTokenPrice;
  const DepositedUsermSOLAmountCal =
    (DepositedmSOLAmount + LendingmSOLAmount) * mSOLTokenPrice;
  const DepositedUserscnSOLAmountCal =
    (DepositedscnSOLAmount + LendingscnSOLAmount) * scnSOLTokenPrice;
  const DepositedUserstSOLAmountCal =
    (DepositedstSOLAmount + LendingstSOLAmount) * stSOLTokenPrice;
  const DepositedUserRAYAmountCal =
    (DepositedRAYAmount + LendingRAYAmount) * RAYTokenPrice;
  const DepositedUserSRMAmountCal =
    (DepositedSRMAmount + LendingSRMAmount) * SRMTokenPrice;
  const DepositedUserlpSOLAmountCal = DepositedlpSolAmount * lpSOLTokenPrice;
  const DepositedUserlpUSDAmountCal = DepositedlpUsdAmount * lpUSDTokenPrice;
  const DepositedUserLPFiAmountCal = DepositedLPFiAmount * LPFiTokenPrice;

  const BorrowedUserlpSOLAmountCal = BorrowedlpSOLAmount * lpSOLTokenPrice;
  const BorrowedUserlpUSDAmountCal = BorrowedlpUsdAmount * lpUSDTokenPrice;

  const UserTotalDepositedCal =
    DepositedUserwSOLAmountCal +
    DepositedUsermSOLAmountCal +
    DepositedUserscnSOLAmountCal +
    DepositedUserstSOLAmountCal +
    DepositedUserRAYAmountCal +
    DepositedUserSRMAmountCal +
    DepositedUserlpSOLAmountCal +
    DepositedUserlpUSDAmountCal +
    DepositedUserLPFiAmountCal;

  const UserTotalBorrowedCal =
    BorrowedUserlpUSDAmountCal + BorrowedUserlpSOLAmountCal;

  const LTV = calc((UserTotalBorrowedCal / UserTotalDepositedCal) * 100);

  return LTV;
};
