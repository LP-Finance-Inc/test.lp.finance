export const FaucetTokenSelect = ({ img, name, value }) => {
  return {
    type: "FAUCET_TOKEN_SELECT",
    payload: {
      img,
      name,
      value,
    },
  };
};
