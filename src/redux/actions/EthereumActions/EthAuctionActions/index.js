export const EthFaucetTokenSelect = ({ img, name, value }) => {
  return {
    type: "ETH_FAUCET_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
      value: value,
    },
  };
};
