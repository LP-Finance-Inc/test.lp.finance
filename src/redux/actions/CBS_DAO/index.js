import { setSnackbar } from "../../../helper/setSnackbar";
import axios from "axios";
import api from "../../../api";

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

        if (response.status === 201) {
          dispatch(setSnackbar(true, "success", response.data.message));
          dispatch({
            type: "VOTING_SUCCESS",
            payload: {
              wallet: wallet,
              Share: YourShare,
              vote: vote,
              count: 1,
            },
          });
          setVote("");
          setLoading(false);
        } else if (response.status === 203) {
          setLoading(false);
          dispatch(setSnackbar(true, "warning", response.data.message));
        }
      } else {
        setLoading(false);
        dispatch(setSnackbar(true, "warning", "Please Enter Value"));
      }
    } catch (error) {
      dispatch({
        type: "ADO_ERROR",
      });
      dispatch(setSnackbar(true, "warning", "Voting Failed"));
      setLoading(false);
    }
  };
};

export const getCR = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(api.getCR);

      console.log(response);

      if (response.status === 201) {
        const { TotalCR, TotalShare } = response.data;

        dispatch({
          type: "GET_ADO_CR_SUCCESS",
          payload: {
            TotalCR,
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

export const getAdoUser = (wallet) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.getAdoUser, {
        wallet,
      });

      if (response.status === 201) {
        dispatch({
          type: "GET_ADO_USER_SUCCESS",
          payload: {
            wallet: response.data.wallet,
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
