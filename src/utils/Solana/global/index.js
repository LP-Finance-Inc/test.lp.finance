import api from "../../../api";
import axios from "axios";
import {
  getSolendInfoFun,
  setTokenPriceListFun,
  getApricotInfoFun,
} from "../../../redux/actions/Solana/SolBorrowActions";

export const getSolanaCryptoFun = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.solana.getSolana);

      if (response.status === 200) {
        const { TokenPriceArr, TokenPriceObj, SolendList, ApricotList } =
          response.data;
        dispatch(setTokenPriceListFun(TokenPriceArr, TokenPriceObj));
        dispatch(getSolendInfoFun(SolendList));
        dispatch(getApricotInfoFun(ApricotList));
      }
    } catch (error) {}
  };
};

export const SendDirectPushNotify = (publicKey, title, message) => {
  return async (dispatch) => {
    try {
      await axios.post(api.solana.pushNotify, {
        wallet: publicKey,
        messages: message,
        title: title,
      });
    } catch (error) {}
  };
};
