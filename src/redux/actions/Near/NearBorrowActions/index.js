export const NearDepositTokenSelect = ({ img, name }) => {
  return {
    type: "NEAR_DEPOSIT_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const NearBorrowTokenSelect = ({ img, name }) => {
  return {
    type: "NEAR_BORROW_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const NearWithdrawTokenSelect = ({ img, name }) => {
  return {
    type: "NEAR_WITHDRAW_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const NearRepayTokenSelect = ({ img, name }) => {
  return {
    type: "NEAR_REPAY_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};
