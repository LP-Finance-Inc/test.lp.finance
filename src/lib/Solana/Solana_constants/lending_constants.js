import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const PREFIX = "lendtokens";
export const lendingProgramID = new PublicKey(
  "3QTW9aZp4U2xoj9UfvTF6PEL3UZzfEHi8UtNruhw7GHL"
);
export const lendingStateAccount = new PublicKey(
  "FEL9EygF1C3d5cwD2ZXkpmaQMBtdxKd1mvYRrD81KNVY"
);
export const lendingConfig = new PublicKey(
  "3Pguudq3L6AHwnSKaPVngwuu9JfFNM2x7sv5WeMSrsw8"
);
