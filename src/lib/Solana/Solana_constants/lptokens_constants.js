import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const PREFIX = "lptokens";
export const lptokenProgramID = new PublicKey(
  "3QDe67WmbnSubjdrzsrdYs7ywVYVvjyuoTRECNVgojRr"
);

export const lptokenStateAccount = new PublicKey(
  "64iaARaRU9sXwLmAVy1a5NkYVM82GJ9Lvk2VfJ8PMChk"
);
export const lptokenConfig = new PublicKey(
  "3Lpjwy6tGj4XQVJBMcr8ESRpLDgdat3ozedQD5AjSf5a"
);
