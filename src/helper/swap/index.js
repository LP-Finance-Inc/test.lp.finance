export const CreateFromSwapTokenPrice = (TokenName, lpContractState) => {
  const {
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

  let newTokenPrice = "";

  if (TokenName === "BTC") {
    newTokenPrice = BtcTokenPrice;
  } else if (TokenName === "USDC") {
    newTokenPrice = UsdcTokenPrice;
  } else if (TokenName === "mSOL") {
    newTokenPrice = mSOLTokenPrice;
  } else if (TokenName === "ETH") {
    newTokenPrice = ETHTokenPrice;
  } else if (TokenName === "SRM") {
    newTokenPrice = SRMTokenPrice;
  } else if (TokenName === "USDT") {
    newTokenPrice = USDTTokenPrice;
  } else if (TokenName === "UST") {
    newTokenPrice = USTTokenPrice;
  } else if (TokenName === "stSOL") {
    newTokenPrice = STSOLTokenPrice;
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
