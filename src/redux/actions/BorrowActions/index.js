export const DepositTokenSelect = ({ img, name }) => {
  return {
    type: "DEPOSIT_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const BorrowTokenSelect = ({ img, name }) => {
  return {
    type: "BORROW_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const WithdrawTokenSelect = ({ img, name }) => {
  return {
    type: "WITHDRAW_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const RepayTokenSelect = ({ img, name }) => {
  return {
    type: "REPAY_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};
