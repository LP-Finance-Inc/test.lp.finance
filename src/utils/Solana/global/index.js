import api from "../../../api";
import axios from "axios";
import {
  getAssetsPoolMarketFun,
  getPoolAssetsInfoFun,
  setTokenPriceListFun,
} from "../../../redux/actions/Solana/SolBorrowActions";

export const getSolanaCryptoFun = (wallet, publicKey) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(api.getSolanaCrypto);

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
