import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const auction_name = "auction_03";

export const bumps = {
  stateAccount: 253,
  poolUsdc: 255,
  poolBtc: 255,
  poolLpsol: 255,
  poolLpusd: 254,
  poolMsol: 254,
};
export const stateAccount = new PublicKey(
  "kr6SYFJZvfVmFWg4gJPW7Qm4Q2jBANT5NLTieFq6EHK"
);
export const poolUsdc = new PublicKey(
  "4MroHBr3m4zEsRKNGCCockwPSkqJacKoVLMknELWgSyi"
);
export const poolBtc = new PublicKey(
  "5eQBRPJtYAc29wQJtpWAhFCUsFwDZs2QdbahdZRC4CJT"
);
export const poolLpsol = new PublicKey(
  "8XKjY2QVfnZrZAdBrycVSTgDQP9KujoQDowvdRpKFvzc"
);
export const poolLpusd = new PublicKey(
  "Ddk2z7KBieLv5vyadEGBwm7M2bqeSGRGpVCuSZmxCWtT"
);
export const poolMsol = new PublicKey(
  "AEQagn3g3xqoatAuSxfMtnDU7qehsv1etyUTo6HFxFkx"
);
