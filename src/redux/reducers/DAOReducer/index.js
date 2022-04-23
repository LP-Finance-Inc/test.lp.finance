const initialState = {
  TotalCR: 0,
  TotalShare: 0,
};

const DAOReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ADO_CR_SUCCESS":
      return {
        ...state,
        TotalCR: action.payload.newTotalCR,
        TotalShare: action.payload.TotalShare,
      };

    case "VOTING_SUCCESS":
      const { wallet, Share, vote } = action.payload;

      const { TotalCR, TotalShare } = state;

      const CalShare = TotalShare + Share;

      const CalCR = TotalCR + (vote * Share) / CalShare;

      return {
        ...state,
        wallet: wallet,
        TotalCR: CalCR,
        TotalShare: CalShare,
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
