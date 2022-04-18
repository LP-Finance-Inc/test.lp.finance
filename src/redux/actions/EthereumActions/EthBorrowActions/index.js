export const EthDepositTokenSelect = ({ img, name }) => {
  return {
    type: "ETH_DEPOSIT_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const EthBorrowTokenSelect = ({ img, name }) => {
  return {
    type: "ETH_BORROW_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const EthWithdrawTokenSelect = ({ img, name }) => {
  return {
    type: "ETH_WITHDRAW_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const EthRepayTokenSelect = ({ img, name }) => {
  return {
    type: "ETH_REPAY_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};
