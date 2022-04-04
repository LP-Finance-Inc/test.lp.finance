const initialState = {
  wallet: null,
  TotalCR: 0,
  TotalShare: 0,
};

const DAOReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTING_SUCCESS":
      const { wallet, Share, vote } = action.payload;

      const { TotalCR, TotalShare } = state;

      const CalCR = TotalCR + (vote * Share) / TotalShare;

      console.log(CalCR);

      return {
        ...state,
        wallet: wallet,
        TotalCR: TotalCR + CalCR,
        TotalShare: TotalShare + Share,
      };

    case "GET_ADO_CR_SUCCESS":
      return {
        ...state,
        TotalCR: action.payload.TotalCR,
        TotalShare: action.payload.TotalShare,
      };

    case "GET_ADO_USER_SUCCESS":
      return {
        ...state,
        wallet: action.payload.wallet,
      };

    case "ADO_ERROR":
      return {
        ...state,
        wallet: null,
        TotalCR: 0,
        TotalShare: 0,
      };

    default:
      return state;
  }
};

export default DAOReducer;
