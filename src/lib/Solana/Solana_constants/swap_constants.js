import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const Swap_router_name = "swap-escrow";

export const Swap_PYth_Name = "test-tokens";

export const Stable_swap_name = "stable-swap";

export const Uniswap_name = "uniswap";

export const Swap_router_PDA = new PublicKey(
  "4Y2vLmpLtfo5gxvGhAK68RtKruQdm8vEvAWJVLicQhmf"
);

// new configuration
// ===================================================================================
export const LPFi_USDC_Pool = new PublicKey(
  "2rp27TLQGkohZS2RcpVuX4s1kmktmoM7QLdUKgVMTom8"
);

export const lpSOL_wSOL_Pool = new PublicKey(
  "6VBUBPA2Bev3dZTEJwfSVBJpCWv6sw9eoyywTS3cXmu3"
);

export const lpUSD_USDC_Pool = new PublicKey(
  "BFteZ5EXKa4myspKtvKcD7DNkQaLFrwEVpvMDaGwbeTZ"
);

export const StableSwap_programID = new PublicKey(
  "39rpAgmdTmc5fLXUA9vZw59fz4byzZNok9bH7MFV9RzS"
);

export const Uniswap_programID = new PublicKey(
  "AwtkxxDuTqg2x1wNU6crTf5rM4vgPrupquqbqLSeegUm"
);

export const TestToken_programID = new PublicKey(
  "GdKm4s951GZDBSkfkJhFTbrjZGqNLFB55uhNgK82hK8U"
);

export const StableSwap_lpUSD_USDC = new PublicKey(
  "BFteZ5EXKa4myspKtvKcD7DNkQaLFrwEVpvMDaGwbeTZ"
);

export const StableSwap_lpSOL_wSOL = new PublicKey(
  "6VBUBPA2Bev3dZTEJwfSVBJpCWv6sw9eoyywTS3cXmu3"
);

export const Uniswap_LPFi_USDC = new PublicKey(
  "C4rkcFbPi2E9jUcuLxfFakJQZKaRRuKgjnCdLSYWBSeq"
);
