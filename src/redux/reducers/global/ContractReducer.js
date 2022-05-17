const initialState = {
  contractOpen: false,
  contractProcess: false,
  contractType: "",
  ContractMessage: "",
  processType: "",
};

const ContractReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONTRACTS":
      const {
        contractOpen,
        contractProcess,
        contractType,
        ContractMessage,
        processType,
      } = action.payload;
      return {
        ...state,
        contractOpen,
        contractProcess,
        contractType,
        ContractMessage,
        processType,
      };
    default:
      return state;
  }
};

export default ContractReducer;
