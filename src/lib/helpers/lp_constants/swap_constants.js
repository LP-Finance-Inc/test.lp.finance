import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const swap_name = "swap_pool1";

export const bumps = {
  stateAccount: 251,
  poolUsdc: 253,
  poolBtc: 255,
  poolLpsol: 254,
  poolLpusd: 255,
  poolMsol: 254,
};
export const stateAccount = new PublicKey(
  "73v4gK2y12KJLZhAnGZ8ApQXGsgJ3LAydiGy25UickrR"
);
export const poolUsdc = new PublicKey(
  "7R7ybuCqx5ibNmQJdS3ej6jF1ceoqzFPNurWEYTB64y8"
);
export const poolBtc = new PublicKey(
  "3g8X4CBf9XfqC5bqhy5ojfHV4YPni4i2ezr8GYfcPE8y"
);
export const poolLpsol = new PublicKey(
  "5aC57PB7zD2myUWCmbisAik3AyNQf1vwdi4vsv5S6kRc"
);
export const poolLpusd = new PublicKey(
  "5sePY3AuQ1LtSH9UDimn4yDCUUsGoV8gQqKjyQSGvTFA"
);
export const poolMsol = new PublicKey(
  "F9RN5CfyP9TfXVMW1ekM2SPguDWWDJLqG632SNa8y4Br"
);
