import api from "../../api";
import axios from "axios";
var CircularJSON = require("circular-json");

export const StoreLiquidateAccountFun = (provider, TokenList) => {
  return async (dispatch) => {
    try {
      const wallet = CircularJSON.stringify(provider);

      await axios.post(api.storeLiquidateAccountList, {
        wallet: wallet,
        TokenList,
      });
    } catch (error) {}
  };
};
