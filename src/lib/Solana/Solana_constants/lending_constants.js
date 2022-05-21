import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const PREFIX = "lendtokens";
export const lendingProgramID = new PublicKey(
  "DhpuuLX7RaPeKeYuXtt1Vw4VdW3wNkrpiyjdDYozrRbw"
);
export const lendingStateAccount = new PublicKey(
  "DjhuhArv5yhnE6atZDqpQTwsgMYM7xcqKzSUXei24Fks"
);
export const lendingConfig = new PublicKey(
  "GgRw24thLTL4EGdRitKViPQPfBuPUfE3oyiw1Y8umVE3"
);
