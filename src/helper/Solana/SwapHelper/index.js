export const CreateFromSwapTokenPrice = (TokenName, lpContractState) => {
  const {
    wSOLTokenPrice,
    LPFiTokenPrice,
    mSOLTokenPrice,
    stSOLTokenPrice,
    scnSOLTokenPrice,
    USDCTokenPrice,
    wBTCTokenPrice,
    wETHTokenPrice,
    RAYTokenPrice,
    SRMTokenPrice,
    AVAXTokenPrice,
    FIDATokenPrice,
    FTTTokenPrice,
    FTMTokenPrice,
    GMTTokenPrice,
    LUNATokenPrice,
    MATICTokenPrice,
    USDTTokenPrice,
    lpSOLTokenPrice,
    lpUSDTokenPrice,
  } = lpContractState.TokenPriceList;

  let newTokenPrice = "";

  if (TokenName === "wSOL") {
    newTokenPrice = wSOLTokenPrice;
  } else if (TokenName === "wBTC") {
    newTokenPrice = wBTCTokenPrice;
  } else if (TokenName === "USDC") {
    newTokenPrice = USDCTokenPrice;
  } else if (TokenName === "mSOL") {
    newTokenPrice = mSOLTokenPrice;
  } else if (TokenName === "wETH") {
    newTokenPrice = wETHTokenPrice;
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
  } else if (TokenName === "LPFi") {
    newTokenPrice = LPFiTokenPrice;
  } else if (TokenName === "RAY") {
    newTokenPrice = RAYTokenPrice;
  } else if (TokenName === "AVAX") {
    newTokenPrice = AVAXTokenPrice;
  } else if (TokenName === "FIDA") {
    newTokenPrice = FIDATokenPrice;
  } else if (TokenName === "FTT") {
    newTokenPrice = FTTTokenPrice;
  } else if (TokenName === "FTM") {
    newTokenPrice = FTMTokenPrice;
  } else if (TokenName === "GMT") {
    newTokenPrice = GMTTokenPrice;
  } else if (TokenName === "LUNA") {
    newTokenPrice = LUNATokenPrice;
  } else if (TokenName === "MATIC") {
    newTokenPrice = MATICTokenPrice;
  }

  return newTokenPrice;
};

export const getTopSwapMaxBal = (TokenName, BalanceList) => {
  const {
    wSOLBalance,
    LPFiBalance,
    mSOLBalance,
    stSOLBalance,
    scnSOLBalance,
    USDCBalance,
    wBTCBalance,
    wETHBalance,
    RAYBalance,
    SRMBalance,
    AVAXBalance,
    FIDABalance,
    FTTBalance,
    FTMBalance,
    GMTBalance,
    LUNABalance,
    MATICBalance,
    USDTBalance,
    lpSOLBalance,
    lpUSDBalance,
  } = BalanceList;

  let getMaxBal = "";

  if (TokenName === "wSOL") {
    getMaxBal = wSOLBalance;
  } else if (TokenName === "wBTC") {
    getMaxBal = wBTCBalance;
  } else if (TokenName === "USDC") {
    getMaxBal = USDCBalance;
  } else if (TokenName === "mSOL") {
    getMaxBal = mSOLBalance;
  } else if (TokenName === "wETH") {
    getMaxBal = wETHBalance;
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
  } else if (TokenName === "LPFi") {
    getMaxBal = LPFiBalance;
  } else if (TokenName === "RAY") {
    getMaxBal = RAYBalance;
  } else if (TokenName === "AVAX") {
    getMaxBal = AVAXBalance;
  } else if (TokenName === "FIDA") {
    getMaxBal = FIDABalance;
  } else if (TokenName === "FTT") {
    getMaxBal = FTTBalance;
  } else if (TokenName === "FTM") {
    getMaxBal = FTMBalance;
  } else if (TokenName === "GMT") {
    getMaxBal = GMTBalance;
  } else if (TokenName === "LUNA") {
    getMaxBal = LUNABalance;
  } else if (TokenName === "MATIC") {
    getMaxBal = MATICBalance;
  }

  return getMaxBal;
};
