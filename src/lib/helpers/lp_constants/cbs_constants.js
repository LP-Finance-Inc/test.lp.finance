import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const cbs_name = "cbs_pool05";

export const bumps = {
  stateAccount: 252,
  lpusdMint: 255,
  lpsolMint: 252,
  poolUsdc: 255,
  poolBtc: 255,
  poolMsol: 253,
  poolLpsol: 254,
  poolLpusd: 254,
};
export const stateAccount = new PublicKey(
  "2bpEcaTSRtenzbtVuQmygXWn69ccj2voJ59PjbPuthtJ"
);
export const poolUsdc = new PublicKey(
  "6KJ8uDFnEjPo3VvLoNHhpNq17E3JB9iVzUPFNwUMRzGq"
);
export const poolBtc = new PublicKey(
  "t8ehVs5jAqYVwfLs2F4goQ7jqprAkcZpJDax8LQAcS6"
);
export const poolLpsol = new PublicKey(
  "GoT7kwnXsmxYCMAz8Cp9zCqx9XkEaYwksxKTDv1WoGHZ"
);
export const poolLpusd = new PublicKey(
  "DjzPeokasEPme9V19861Y5oNgjaxFHHFDz9k6RjvAHBG"
);
export const poolMsol = new PublicKey(
  "7cgwUfB5cHFGPDH2ojkYWP4eZcoBzsvzG2tmRtXz1dU3"
);
