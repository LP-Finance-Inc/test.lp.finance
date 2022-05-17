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

export const NetworkTokenSelect = ({ img, name, fullName }) => {
  return {
    type: "NETWORK_TOKEN_SELECT",
    payload: {
      img,
      name,
      fullName,
    },
  };
};

export const setSnackbar = (open, type, mess, notFound) => {
  return {
    type: "SET_SNACKBAR",
    payload: {
      snackbarOpen: open,
      snackbarType: type,
      snackbarMessage: mess,
      notFound: notFound,
    },
  };
};
