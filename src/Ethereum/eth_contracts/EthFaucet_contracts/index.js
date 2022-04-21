import Web3 from "web3";
import { PROXY_ABI } from "../../lib/ABI/EthFaucetABI";
import {
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

  return "";
};

export const EthFaucet_Tokens = (TokenName, Provider, Amount) => {
  return async (dispatch) => {
    try {
      const web3 = new Web3(Provider);

      const Token_Address = getTokenAddress(TokenName);

      const contract = new web3.eth.Contract(PROXY_ABI, FaucetProxy);

      const data = await contract.methods.request_token(Token_Address, Amount);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
