import { setSnackbar } from "../../../helper/setSnackbar";
import axios from "axios";
import api from "../../../api";

export const VoteFun = (YourShare, vote, setVote, setLoading, wallet) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      if (vote > 0) {
        const ratioCal = (vote * YourShare) / 100;
        const changePer = ratioCal;

        const response = await axios.post(api.vote, {
          wallet: wallet,
          CR: changePer,
        });

        if (response.status === 201) {
          dispatch(setSnackbar(true, "success", response.data.message));
          dispatch({
            type: "VOTING_SUCCESS",
            payload: {
              wallet: wallet,
              CR: changePer,
              vote: 1,
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

      if (response.status === 201) {
        dispatch({
          type: "GET_ADO_CR_SUCCESS",
          payload: response.data.CR,
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
            vote: response.data.vote,
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
