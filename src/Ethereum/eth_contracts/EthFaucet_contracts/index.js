import Web3 from "web3";
import {
  COLLATERAL_TOKENS_ABI,
  LP_TOKEN_ABI,
} from "../../lib/ABI/EthFaucetABI";
import {
  lpUSD,
  lpBTC,
  lpETH,
  lpSOL,
  SOL,
  APE,
  aETH,
  aWBTC,
  aMANA,
  aLINK,
  aUSDC,
  aUSDT,
  PAXG,
  SAND,
  AAVE,
  UNI,
  USDC,
  WBTC,
  USDT,
  MANA,
  FaucetProxy,
} from "../../lib/constants/EthFaucet_constants";

const getTokenAddress = (token_name) => {
  if (token_name === "SOL") return SOL;
  if (token_name === "APE") return APE;
  if (token_name === "aETH") return aETH;
  if (token_name === "aWBTC") return aWBTC;
  if (token_name === "aMANA") return aMANA;
  if (token_name === "aLINK") return aLINK;
  if (token_name === "aUSDC") return aUSDC;
  if (token_name === "aUSDT") return aUSDT;
  if (token_name === "PAXG") return PAXG;
  if (token_name === "SAND") return SAND;
  if (token_name === "AAVE") return AAVE;
  if (token_name === "UNI") return UNI;
  if (token_name === "USDC") return USDC;
  if (token_name === "WBTC") return WBTC;
  if (token_name === "USDT") return USDT;
  if (token_name === "MANA") return MANA;
  if (token_name === "lpUSD") return lpUSD;
  if (token_name === "lpBTC") return lpBTC;
  if (token_name === "lpETH") return lpETH;
  if (token_name === "lpSOL") return lpSOL;

  return "";
};

export const EthFaucet_Tokens = (TokenName, Provider, Amount, isLpToken) => {
  return async (dispatch) => {
    try {
      const web3 = new Web3(Provider);

      const Token_Address = getTokenAddress(TokenName);

      const ABI = isLpToken ? LP_TOKEN_ABI : COLLATERAL_TOKENS_ABI;

      const contract = new web3.eth.Contract(FaucetProxy, ABI);

      await contract.methods.request_token(Token_Address, Amount);
    } catch (error) {
      console.log(error);
    }
  };
};
