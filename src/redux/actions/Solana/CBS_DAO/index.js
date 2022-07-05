import { setSnackbar } from "../..";
import axios from "axios";
import api from "../../../../api";

export const VoteFun = (YourShare, vote, setVote, setLoading, wallet) => {
  return async (dispatch) => {
    try {
      setLoading(true);

      if (vote > 0) {
        const response = await axios.post(api.vote, {
          wallet: wallet,
          Share: YourShare,
          vote: vote,
        });

        if (response.status === 200) {
          dispatch(setSnackbar(true, "success", response.data.message));
          dispatch({
            type: "VOTING_SUCCESS",
            payload: {
              wallet: wallet,
              Share: YourShare,
              vote: vote,
            },
          });
          setVote("");
          setLoading(false);
        }
      } else {
        setLoading(false);
        dispatch(setSnackbar(true, "warning", "Please Enter Value"));
      }
    } catch (error) {
      if (error.response.status === 403) {
        setLoading(false);
        dispatch(setSnackbar(true, "warning", error.response.data.message));
      } else if (error.response.status === 500) {
        dispatch({
          type: "ADO_ERROR",
        });
        dispatch(setSnackbar(true, "warning", "Voting Failed"));
        setLoading(false);
      }
    }
  };
};

export const getCR = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.getCR);

      if (response.status === 200) {
        const { newTotalCR, TotalShare } = response.data;

        dispatch({
          type: "GET_ADO_CR_SUCCESS",
          payload: {
            newTotalCR,
            TotalShare,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: "ADO_ERROR",
      });
    }
  };
};
