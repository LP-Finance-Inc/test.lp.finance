import api from "../../../api";
import axios from "axios";
import {
  getAssetsPoolMarketFun,
  getPoolAssetsInfoFun,
  setTokenPriceListFun,
} from "../../../redux/actions/Solana/SolBorrowActions";

export const StoreWallet = (publicKey) => {
  return async (dispatch) => {
    try {
      if (publicKey) {
        const response = await axios.post(api.solana.wallet, {
          wallet: publicKey,
        });

        if (response.status === 200) {
          const { token, wallet } = response.data;

          localStorage.setItem(
            "SolanaWallet",
            JSON.stringify({
              token,
              wallet,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400 || error.response.status === 500) {
        localStorage.removeItem("SolanaWallet");
      }
    }
  };
};

export const getSolanaCryptoFun = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.solana.getSolanaCrypto);

      if (response.status === 200) {
        const { TokenPriceArr, TokenPriceObj, SolendList, ApricotList } =
          response.data;
        dispatch(setTokenPriceListFun(TokenPriceArr, TokenPriceObj));
        dispatch(getPoolAssetsInfoFun(SolendList));
        dispatch(getAssetsPoolMarketFun(ApricotList));
      }
    } catch (error) {}
  };
};

export const SendDirectPushNotify = (publicKey, title, message) => {
  return async (dispatch) => {
    try {
      await axios.post(api.pushNotify, {
        wallet: publicKey,
        messages: message,
        title: title,
      });
    } catch (error) {}
  };
};
