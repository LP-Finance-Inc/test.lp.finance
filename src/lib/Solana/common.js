import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const convert_to_wei = (val) =>
  parseInt(parseFloat(val) * 1e9).toString();
export const convert_from_wei = (val) => parseFloat(val) / 1e9;
export const convert_from_percent = (val) => parseFloat(val) / 1e4;
export const convert_to_dy_wei = (val, con) =>
  parseInt(parseFloat(val) * con).toString();

// new TOken mints
// ==================================================
export const lpSOLMint = new PublicKey(
  "G3dmoWruPPE8Utz4ZpU6rajmbfUoawxdanFemw13ihH5"
);
export const lpUSDMint = new PublicKey(
  "BJao7J4inYLbd143jnkuF11dSiMGQunqUrmdGkfaxngu"
);
export const LPFiMint = new PublicKey(
  "7ocGjpxGz3D77tSWA4TGpLN1brCnfp7REXNdEgZf6SCN"
);
export const wSOLMint = new PublicKey(
  "3TufxjnyAiHH9cdMkdstCTMTjtH54p3Mnv9prDJ4eLTb"
);
export const mSOLMint = new PublicKey(
  "9ct5yURTeKhET3wGqfThjYpftW1Z4QWR5C2U7Rh5fYGH"
);
export const stSOLMint = new PublicKey(
  "DRXKnTLC9ypQ7NbaubgapdM2VTpfo3qNKddnKeRtw6Np"
);
export const scnSOLMint = new PublicKey(
  "DhgcE8JaU2nvysme1s51oBg55JRdpAGKyRgGqyX1bSzL"
);
export const USDCMint = new PublicKey(
  "F79eXaUWMH6BXWKbtE6woxtvHpbT7EVPSxsFEwFh62py"
);
export const wBTCMint = new PublicKey(
  "8ZjLiFQ3j9a4H9FmAwPcFJsej6bNxCZCfcQkWxcf8DSg"
);
export const wETHMint = new PublicKey(
  "DSq2PjVbBGvHFDGKxhUZJHEyudG3bNLhvMtJiX7ZnEh2"
);
export const RAYMint = new PublicKey(
  "3oZHawbMxXLPKkphvsfprt5tbaTqcLxd9DB46Ptusi8C"
);
export const SRMMint = new PublicKey(
  "BqKSUy8Q6V7GmWXWV4fNcdoaEgbt7bsmwzqTLAJiuBQa"
);
export const AVAXMint = new PublicKey(
  "DK3Rk1m1kxwzCWgg2DkMz7QEvhXDo7JaoRjzuQPjTQhH"
);
export const FIDAMint = new PublicKey(
  "FsvS6djyMBjGZCE5JToHKuwpXcipccXVPjatYEryHV4R"
);
export const FTTMint = new PublicKey(
  "EHSoZqF5EsRRBrBo26etRKwRwuowp2a7nVXt3pun3yLs"
);
export const FTMMint = new PublicKey(
  "BqQnbAqosF4AYJJPPZDQhFmRvQcS9rmsX3mkWVhTFJZ6"
);
export const GMTMint = new PublicKey(
  "mhHXAsp2p67ucpxFLvNi1TqrauVR2wioWKG3RqEgt6p"
);
export const LUNAMint = new PublicKey(
  "6YCDbh9im1jaJFRdqNnw2PfBpy6xHuL9dTczhT4C5R5G"
);
export const MATICMint = new PublicKey(
  "EdAGouCwpTJwwGHbXGVvfidBjWsSA7qGbAug3xtBZxsu"
);
export const USDTMint = new PublicKey(
  "DubveCXcPuJNPdjwL4cRbAueQtwnDQHUXQNHw3YfQWJ5"
);
// TOken mints

// ===================================================================
// ======> PYTH

export const PYth_wSOL_Account = new PublicKey(
  "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix"
);

export const PYth_mSOL_Account = new PublicKey(
  "9a6RNx3tCu1TSs6TBSfV2XRXEPEZXQ6WB7jRojZRvyeZ"
);

export const PYth_stSOL_Account = new PublicKey(
  "2LwhbcswZekofMNRtDRMukZJNSRUiKYMFbqtBwqjDfke"
);

export const PYth_scnSOL_Account = new PublicKey(
  "HoDAYYYhFvCNQNFPui51H8qvpcdz6KuVtq77ZGtHND2T"
);

export const PYth_USDC_Account = new PublicKey(
  "5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7"
);

export const PYth_wBTC_Account = new PublicKey(
  "HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J"
);

export const PYth_wETH_Account = new PublicKey(
  "EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw"
);

export const PYth_RAY_Account = new PublicKey(
  "EhgAdTrgxi4ZoVZLQx1n93vULucPpiFi2BQtz9RJr1y6"
);

export const PYth_SRM_Account = new PublicKey(
  "992moaMQKs32GKZ9dxi8keyM2bUmbrwBZpK4p2K6X5Vs"
);

export const PYth_AVAX_Account = new PublicKey(
  "FVb5h1VmHPfVb1RfqZckchq18GxRv4iKt8T4eVTQAqdz"
);

export const PYth_FIDA_Account = new PublicKey(
  "7teETxN9Y8VK6uJxsctHEwST75mKLLwPH1jaFdvTQCpD"
);

export const PYth_FTT_Account = new PublicKey(
  "6vivTRs5ZPeeXbjo7dfburfaYDWoXjBtdtuYgQRuGfu"
);

export const PYth_FTM_Account = new PublicKey(
  "BTwrLU4so1oJMViWA3BTzh8YmFwiLZ6CL4U3JryG7Q5S"
);

export const PYth_GMT_Account = new PublicKey(
  "EZy99wkoqohyyNxT1QCwW3epQtMQ1Dfqx4sXKqkHiSox"
);

export const PYth_MATIC_Account = new PublicKey(
  "FBirwuDFuRAu4iSGc7RGxN5koHB7EJM1wbCmyPuQoGur"
);

export const PYth_USDT_Account = new PublicKey(
  "38xoQ4oeJCBrcVvca2cGk7iV1dAfrmTR1kmhSCJQ8Jto"
);
