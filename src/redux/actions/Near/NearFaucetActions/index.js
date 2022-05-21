export const NearFaucetTokenSelect = ({ img, name, value }) => {
  return {
    type: "NEAR_FAUCET_TOKEN_SELECT",
    payload: {
      img,
      name,
      value,
    },
  };
};
