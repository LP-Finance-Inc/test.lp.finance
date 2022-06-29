import api from "../../../api";
import axios from "axios";

export const getAPYFun = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(api.solana.getAPY);

      if (response.status === 200) {
        dispatch({
          type: "GET_AUCTION_APY",
          payload: response.data.APY,
        });
      }
    } catch (error) {
      if (error.response.status === 500) {
        dispatch({
          type: "GET_AUCTION_APY",
          payload: 0,
        });
      }
    }
  };
};

export const getLastEpochProfitFun = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(api.solana.getLastEpochProfit);

      if (response.status === 200) {
        dispatch({
          type: "GET_AUCTION_LAST_EPOCH_PROFIT",
          payload: response.data.LastEpochProfit,
        });
      }
    } catch (error) {
      if (error.response.status === 500) {
        dispatch({
          type: "GET_AUCTION_LAST_EPOCH_PROFIT",
          payload: 0,
        });
      }
    }
  };
};
