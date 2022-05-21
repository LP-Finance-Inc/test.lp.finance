import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const faucet_name = "faucet_001";

export const bumps = {
  stateAccount: 255,
  poolTusdc: 255,
  poolTbtc: 255,
  poolTmsol: 255,
};
export const stateAccount = new PublicKey(
  "G9vKpJfDcfu5SqmLVsqQSTDEsLw5QfyYAAVKkZAYHmyE"
);
export const poolUsdc = new PublicKey(
  "8EDkavvKkrnSH5fsrL69nb9St3dehNaVmwskucFzKWcJ"
);
export const poolBtc = new PublicKey(
  "A8oA9Eh4NzWRPLRULRBPpDdxpV8H8o7Nhi4rQ6FansKq"
);
export const poolTmsol = new PublicKey(
  "2cEhXc4ShLZpdo2fhG7Rhk3MeHGd9gYx9vhhV2HC1JU5"
);
