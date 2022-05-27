import axios from "axios";
import api from "../../../../api";

export const setNearTokenPricesFun = () => {
  return async (dispatch) => {
    const response = await axios.get(api.getNearCrypto);

    console.log(response);

    if (response.status === 200) {
      const { NearTokenPriceArr, NearTokenPriceObj } = response.data;
      dispatch({
        type: "SET_NEAR_TOKEN_PRICES",
        payload: {
          NearTokenPriceObj,
          NearTokenPriceArr,
        },
      });
    }
  };
};
