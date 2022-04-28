import api from "../../api";
import axios from "axios";
import {
  getAssetsPoolMarketFun,
  getPoolAssetsInfoFun,
  setTokenPriceListFun,
} from "../../redux/actions/LpContractActions";

export const getSolanaCryptoFun = (wallet, publicKey) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(api.getSolanaCrypto);

      if (response.status === 200) {
        const { TokenPrice, SolendList, ApricotList } = response.data;
        dispatch(
          setTokenPriceListFun(TokenPrice, SolendList, wallet, publicKey)
        );
        dispatch(getPoolAssetsInfoFun(SolendList));
        dispatch(getAssetsPoolMarketFun(ApricotList));
      }
    } catch (error) {}
  };
};