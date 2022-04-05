const initialState = {
  TotalCR: 0,
  TotalShare: 0,
};

const DAOReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ADO_CR_SUCCESS":
      return {
        ...state,
        TotalCR: action.payload.TotalCR,
        TotalShare: action.payload.TotalShare,
      };

    case "VOTING_SUCCESS":
      const { wallet, Share, vote } = action.payload;

      const { TotalCR, TotalShare } = state;

      let newTotalCR = "";

      if (TotalCR === null) {
        newTotalCR = 0;
      } else {
        newTotalCR = TotalCR;
      }

      const CalCR = newTotalCR + (vote * Share) / TotalShare;

      return {
        ...state,
        wallet: wallet,
        TotalCR: CalCR,
        TotalShare: TotalShare + Share,
      };

    case "ADO_ERROR":
      return {
        ...state,
        TotalCR: 0,
        TotalShare: 0,
      };

    default:
      return state;
  }
};

export default DAOReducer;
