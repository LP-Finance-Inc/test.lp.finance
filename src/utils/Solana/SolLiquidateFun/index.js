import api from "../../../api";
import axios from "axios";

//Liquidate function for get getAccountList
export const getLiquidateAccountListFun = (
  publicKey,
  pageNumber,
  listPerPage
) => {
  return async (dispatch) => {
    if (publicKey) {
      dispatch({
        type: "GET_LIQUIDATE_ACCOUNT_LIST_REQUEST",
      });

      const response = await axios.post(api.getLiquidateAccountList, {
        Page: pageNumber + 1,
        PageLimit: listPerPage,
      });

      if (response.status === 200) {
        dispatch({
          type: "GET_LIQUIDATE_ACCOUNT_LIST",
          payload: response.data,
        });
      }
    } else {
      dispatch({
        type: "REMOVE_LIQUIDATE_ACCOUNT_LIST",
      });
    }
  };
};
