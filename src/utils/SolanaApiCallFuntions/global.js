import api from "../../api";
import axios from "axios";
import {
  getAssetsPoolMarketFun,
  getPoolAssetsInfoFun,
  setTokenPriceListFun,
} from "../../redux/actions/LpContractActions";

export const FetchSolanaCryptoFun = (wallet, publicKey) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(api.fetchSolanaCrypto);

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

export const StoreTokenPricesFun = () => {
  return async (dispatch) => {
    try {
      await axios.get(api.storeTokenPrices);
    } catch (error) {}
  };
};

export const StoreSolendPoolAssetsFun = () => {
  return async (dispatch) => {
    try {
      await axios.get(api.storeSolendPoolAssets);
    } catch (error) {}
  };
};

export const StoreApricotPoolAssetsFun = () => {
  return async (dispatch) => {
    try {
      await axios.get(api.storeApricotPoolAssets);
    } catch (error) {}
  };
};
