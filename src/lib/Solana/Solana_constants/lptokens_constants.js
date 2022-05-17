import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const PREFIX = "lptokens";
export const lptokenProgramID = new PublicKey(
  "3QDe67WmbnSubjdrzsrdYs7ywVYVvjyuoTRECNVgojRr"
);

export const lptokenStateAccount = new PublicKey(
  "9nzCGf6BhFgQogav4Kar1DwFVBZdb3FCRuyJVJK3ZKwL"
);
export const lptokenConfig = new PublicKey(
  "2KoT2ifTjzWd773nUa9aZD6fTVzD9kJgzddLbCFbVU71"
);
