import api from "../../../api";
import axios from "axios";
import { getSolanaWallet } from "../../../helper/Solana/global";

//Liquidate function for get getAccountList
export const getLiquidateAccountListFun = (
  publicKey,
  pageNumber,
  listPerPage
) => {
  return async (dispatch) => {
    if (publicKey) {
      const { token } = getSolanaWallet();

      dispatch({
        type: "GET_LIQUIDATE_ACCOUNT_LIST_REQUEST",
      });

      const response = await axios.post(
        api.solana.getLiquidateAccountList,
        {
          Page: pageNumber + 1,
          PageLimit: listPerPage,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

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
