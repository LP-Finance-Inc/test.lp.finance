import api from "../../api";
import axios from "axios";

//Liquidate function for get getAccountList
export const getLiquidateAccountListFun = (pageNumber, listPerPage) => {
  return async (dispatch) => {
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
  };
};