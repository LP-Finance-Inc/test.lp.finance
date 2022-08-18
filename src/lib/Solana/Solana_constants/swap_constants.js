import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const Swap__Name = "swap-escrow";

export const Swap_PYth_Name = "test-tokens";

export const LiquidityPool = new PublicKey(
  "DcB2ZfvRU5ac9FgYF9doWYjHWtRXbStH7wDhciQcmF6v"
);

// new configuration
// ===================================================================================
export const LPFi_USDC_Pool = new PublicKey(
  "C4rkcFbPi2E9jUcuLxfFakJQZKaRRuKgjnCdLSYWBSeq"
);

export const lpSOL_wSOL_Pool = new PublicKey(
  "CVsmW8n6Wm8YfF6ssMgpvaURdFCY2je55WBnHTUjX7hz"
);

export const lpUSD_USDC_Pool = new PublicKey(
  "B51GTPYfj8FvVLq71wStjAkkc4mSDgXbfDQgLygDpczc"
);

export const StableSwap_programID = new PublicKey(
  "EDvp5kbQi9ogJtRgnxWaX58V66xEeZqWXxy4QUrhNC2V"
);
export const Uniswap_programID = new PublicKey(
  "3s5mYbRJbWvgberG3EpexdQm7aVJKLQjnz7THT1m6LTc"
);
export const TestToken_programID = new PublicKey(
  "3QTW9aZp4U2xoj9UfvTF6PEL3UZzfEHi8UtNruhw7GHL"
);

export const StableSwap_lpUSD_USDC = new PublicKey(
  "B51GTPYfj8FvVLq71wStjAkkc4mSDgXbfDQgLygDpczc"
);
export const StableSwap_lpSOL_wSOL = new PublicKey(
  "CVsmW8n6Wm8YfF6ssMgpvaURdFCY2je55WBnHTUjX7hz"
);
export const Uniswap_LPFi_USDC = new PublicKey(
  "C4rkcFbPi2E9jUcuLxfFakJQZKaRRuKgjnCdLSYWBSeq"
);
