const initialState = {
  wallet: "",
  CR: 0,
  vote: 0,
};

const DAOReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTING_SUCCESS":
      const { wallet, CR, vote } = action.payload;

      return {
        ...state,
        wallet: wallet,
        CR: CR,
        vote: vote,
      };

    case "GET_ADO_CR_SUCCESS":
      return {
        ...state,
        CR: action.payload,
      };

    case "GET_ADO_USER_SUCCESS":
      return {
        ...state,
        wallet: action.payload.wallet,
        vote: action.payload.vote,
      };

    case "ADO_ERROR":
      return {
        ...state,
        wallet: "",
        CR: 0,
        vote: 0,
      };

    default:
      return state;
  }
};

export default DAOReducer;
