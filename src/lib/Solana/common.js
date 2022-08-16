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
  "5jmsfTrYxWSKgrZp4Y8cziTWvt7rqmTCiJ75FbLqFTVZ"
);
export const lpUSDMint = new PublicKey(
  "3GB97goPSqywzcXybmVurYW7jSxRdGuS28nj74W8fAtL"
);
export const LPFiMint = new PublicKey(
  "3x96fk94Pp4Jn2PWUexAXYN4eLK8TVYXHUippdYCHK1p"
);
export const wSOLMint = new PublicKey(
  "6hPAQy93EbDzwHyU843zcWKATy8NrJ1ZsKCRi2JkuXcT"
);
export const mSOLMint = new PublicKey(
  "AzRQUJPKxv8L9xfHPeGgKcsXXrjbYekW5mVvbMdw11Mp"
);
export const stSOLMint = new PublicKey(
  "3gb5MH7VF6o6mWbuBX7V8d1KtWX1pCSYMAwFa296rPuP"
);
export const scnSOLMint = new PublicKey(
  "8eijEjgBCSk8vJcjwV1geZQp8tzvXTXgc7Xgg8qthKyJ"
);
export const USDCMint = new PublicKey(
  "6ybV587PY2z6DX4Pf1tTh8oEhnuR6wwXLE8LHinKQKYV"
);
export const wBTCMint = new PublicKey(
  "4NAbav42C1BZdKASxuiKbzTFQKSqcZXG7ZZLDwfiZCGe"
);
export const wETHMint = new PublicKey(
  "49ZEVDFHe18DDcyAe4fuRrhuf3DQpTDAAUodkaDsCcco"
);
export const RAYMint = new PublicKey(
  "CAtFbjnodtzt1mpxyJwPKfWP6MkTisckMk9KHUgSxX7v"
);
export const SRMMint = new PublicKey(
  "2F988bKHUgPaw6mHwuPfdQhiRg1XtCJuDh4hrvVpT3wD"
);
export const AVAXMint = new PublicKey(
  "FzUkBfKMr8YULR2cNiVHoUF9zH3rA5Zv99BzFohgqQxo"
);
export const FIDAMint = new PublicKey(
  "BdY3ZJSd66ADaoLVnCiZWLEX4XANxj8a9vXFBGedqtP6"
);
export const FTTMint = new PublicKey(
  "EZvZWjRHqHSf3ge1T13Y1GmTgW2oNWdsaeErxu8fDpBo"
);
export const FTMMint = new PublicKey(
  "FtdjvSFvRHAVcebM2zxfyFJXfDGdGQL1pXtMnAd9AQRG"
);
export const GMTMint = new PublicKey(
  "Hn2UGJ1jM9Tw9oidCJwLdhWpcczS4MrMdb48XvCDMmnP"
);
export const LUNAMint = new PublicKey(
  "8sLT5gE4YgcdDgnL6gxy2a9NZ79t46jQgrX87q7iqFPN"
);
export const MATICMint = new PublicKey(
  "6sxP334TsRHEznCMaUNKSzv8xmpTQZXY11fqszF5vYMJ"
);
export const USDTMint = new PublicKey(
  "4ohBE15Y2L3rPF6T6TXcHwLv7Dtkd9hwHRMBS7UDaw3V"
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
