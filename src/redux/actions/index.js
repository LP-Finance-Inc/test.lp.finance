// lp contracts function
export const setContracts = (
  contractOpen,
  contractProcess,
  contractType,
  ContractMessage,
  processType
) => {
  return {
    type: "SET_CONTRACTS",
    payload: {
      contractOpen,
      contractProcess,
      contractType,
      ContractMessage,
      processType,
    },
  };
};
