export const CreateFromSwapTokenPrice = (TokenName, lpContractState) => {
  const {
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

  let newTokenPrice = "";

  if (TokenName === "BTC") {
    newTokenPrice = BTCTokenPrice;
  } else if (TokenName === "USDC") {
    newTokenPrice = USDCTokenPrice;
  } else if (TokenName === "mSOL") {
    newTokenPrice = mSOLTokenPrice;
  } else if (TokenName === "ETH") {
    newTokenPrice = ETHTokenPrice;
  } else if (TokenName === "SRM") {
    newTokenPrice = SRMTokenPrice;
  } else if (TokenName === "USDT") {
    newTokenPrice = USDTTokenPrice;
  } else if (TokenName === "stSOL") {
    newTokenPrice = stSOLTokenPrice;
  } else if (TokenName === "scnSOL") {
    newTokenPrice = scnSOLTokenPrice;
  } else if (TokenName === "lpSOL") {
    newTokenPrice = lpSOLTokenPrice;
  } else if (TokenName === "lpUSD") {
    newTokenPrice = lpUSDTokenPrice;
  } else if (TokenName === "lpBTC") {
    newTokenPrice = lpBTCTokenPrice;
  } else if (TokenName === "lpETH") {
    newTokenPrice = lpETHTokenPrice;
  }

  return newTokenPrice;
};

export const getTopSwapMaxBal = (TokenName, BalanceList) => {
  const {
    BTCBalance,
    USDCBalance,
    mSOLBalance,
    ETHBalance,
    SRMBalance,
    USDTBalance,
    scnSOLBalance,
    stSOLBalance,
    lpSOLBalance,
    lpUSDBalance,
    lpBTCBalance,
    lpETHBalance,
  } = BalanceList;

  let getMaxBal = "";

  if (TokenName === "BTC") {
    getMaxBal = BTCBalance;
  } else if (TokenName === "USDC") {
    getMaxBal = USDCBalance;
  } else if (TokenName === "mSOL") {
    getMaxBal = mSOLBalance;
  } else if (TokenName === "ETH") {
    getMaxBal = ETHBalance;
  } else if (TokenName === "SRM") {
    getMaxBal = SRMBalance;
  } else if (TokenName === "USDT") {
    getMaxBal = USDTBalance;
  } else if (TokenName === "stSOL") {
    getMaxBal = stSOLBalance;
  } else if (TokenName === "scnSOL") {
    getMaxBal = scnSOLBalance;
  } else if (TokenName === "lpSOL") {
    getMaxBal = lpSOLBalance;
  } else if (TokenName === "lpUSD") {
    getMaxBal = lpUSDBalance;
  } else if (TokenName === "lpBTC") {
    getMaxBal = lpBTCBalance;
  } else if (TokenName === "lpETH") {
    getMaxBal = lpETHBalance;
  }

  return getMaxBal;
};
