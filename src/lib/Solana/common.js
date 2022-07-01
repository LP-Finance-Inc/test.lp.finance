import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const convert_to_wei = (val) => (parseFloat(val) * 1e9).toString();
export const convert_from_wei = (val) => parseFloat(val) / 1e9;
export const convert_from_percent = (val) => parseFloat(val) / 1e4;

// TOken mints
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

// EN2CV9nCnH9nBF9GyGYG9B3haNriNBkrPo8jF4c6mzUi
// ======> PYTH
export const pythRayAccount = new PublicKey(
  "EhgAdTrgxi4ZoVZLQx1n93vULucPpiFi2BQtz9RJr1y6"
); // 
export const pythBtcAccount = new PublicKey(
  "HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J"
); // 3m1y5h2uv7EQL3KaJZehvAJa4yDNvgc5yAdL9KPMKwvk
export const pythUsdcAccount = new PublicKey(
  "5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7"
); // 6NpdXrQEpmDZ3jZKmM2rhdmkd3H6QAk23j2x8bkXcHKA
export const pythSolAccount = new PublicKey(
  "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix"
); // 3Mnn2fX6rQyUsyELYms1sBJyChWofzSNRoqYzvgMVz5E
export const pythMsolAccount = new PublicKey(
  "9a6RNx3tCu1TSs6TBSfV2XRXEPEZXQ6WB7jRojZRvyeZ"
); // 3Mnn2fX6rQyUsyELYms1sBJyChWofzSNRoqYzvgMVz5E
export const pythEthAccount = new PublicKey(
  "EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw"
); // 3Mnn2fX6rQyUsyELYms1sBJyChWofzSNRoqYzvgMVz5E

export const pythUstAccount = new PublicKey(
  "AUKjh1oVPZyudi3nzYSsdZxSjq42afUCvsdbKFc5CbD"
); // 3m1y5h2uv7EQL3KaJZehvAJa4yDNvgc5yAdL9KPMKwvk
export const pythSrmAccount = new PublicKey(
  "992moaMQKs32GKZ9dxi8keyM2bUmbrwBZpK4p2K6X5Vs"
); // 6NpdXrQEpmDZ3jZKmM2rhdmkd3H6QAk23j2x8bkXcHKA
export const pythScnsolAccount = new PublicKey(
  "HoDAYYYhFvCNQNFPui51H8qvpcdz6KuVtq77ZGtHND2T"
); // 3Mnn2fX6rQyUsyELYms1sBJyChWofzSNRoqYzvgMVz5E
export const pythStsolAccount = new PublicKey(
  "2LwhbcswZekofMNRtDRMukZJNSRUiKYMFbqtBwqjDfke"
); // 3Mnn2fX6rQyUsyELYms1sBJyChWofzSNRoqYzvgMVz5E
export const pythUsdtAccount = new PublicKey(
  "38xoQ4oeJCBrcVvca2cGk7iV1dAfrmTR1kmhSCJQ8Jto"
); // 3Mnn2fX6rQyUsyELYms1sBJyChWofzSNRoqYzvgMVz5E
// ======> PYTH

// ====================================================================
// ==================================================
//will remove old token mint address
export const lpbtcMint = new PublicKey(
  "B8w6e1gSCHE4xNhPhaK5y3cYYBwKMmfJqfe3C9692mGW"
);

export const lpethMint = new PublicKey(
  "8ZwwTyZ3PSyAzpqPeTXnvxdTF88CxzDQ57hF48WQvK7c"
);

export const btcMint = new PublicKey(
  "25ggxgxMqejf5v9WSQWboqxpsrik1u94PCP5EwPBYeEJ"
);

export const ethMint = new PublicKey(
  "6Y9PaAZjDs2n4ZJonCu2uCjRp8tuqe6KJEDs1k6iLkbD"
);

export const ustMint = new PublicKey(
  "CZqXAbuUzGngd97oLjR1bcWkkZrz7MsKAbTJX9oT5Epv"
);

export const lpsolMint = new PublicKey(
  "5jmsfTrYxWSKgrZp4Y8cziTWvt7rqmTCiJ75FbLqFTVZ"
);
export const lpusdMint = new PublicKey(
  "3GB97goPSqywzcXybmVurYW7jSxRdGuS28nj74W8fAtL"
);

export const lpfiMint = new PublicKey(
  "3x96fk94Pp4Jn2PWUexAXYN4eLK8TVYXHUippdYCHK1p"
);

export const wsolMint = new PublicKey(
  "6hPAQy93EbDzwHyU843zcWKATy8NrJ1ZsKCRi2JkuXcT"
);

export const msolMint = new PublicKey(
  "AzRQUJPKxv8L9xfHPeGgKcsXXrjbYekW5mVvbMdw11Mp"
);

export const stsolMint = new PublicKey(
  "3gb5MH7VF6o6mWbuBX7V8d1KtWX1pCSYMAwFa296rPuP"
);

export const scnsolMint = new PublicKey(
  "8eijEjgBCSk8vJcjwV1geZQp8tzvXTXgc7Xgg8qthKyJ"
);

export const usdcMint = new PublicKey(
  "6ybV587PY2z6DX4Pf1tTh8oEhnuR6wwXLE8LHinKQKYV"
);

export const wbtcMint = new PublicKey(
  "4NAbav42C1BZdKASxuiKbzTFQKSqcZXG7ZZLDwfiZCGe"
);

export const wethMint = new PublicKey(
  "49ZEVDFHe18DDcyAe4fuRrhuf3DQpTDAAUodkaDsCcco"
);

export const rayMint = new PublicKey(
  "CAtFbjnodtzt1mpxyJwPKfWP6MkTisckMk9KHUgSxX7v"
);

export const srmMint = new PublicKey(
  "2F988bKHUgPaw6mHwuPfdQhiRg1XtCJuDh4hrvVpT3wD"
);

export const avaxMint = new PublicKey(
  "FzUkBfKMr8YULR2cNiVHoUF9zH3rA5Zv99BzFohgqQxo"
);

export const fidaMint = new PublicKey(
  "BdY3ZJSd66ADaoLVnCiZWLEX4XANxj8a9vXFBGedqtP6"
);

export const fttMint = new PublicKey(
  "EZvZWjRHqHSf3ge1T13Y1GmTgW2oNWdsaeErxu8fDpBo"
);

export const ftmMint = new PublicKey(
  "FtdjvSFvRHAVcebM2zxfyFJXfDGdGQL1pXtMnAd9AQRG"
);

export const gmtMint = new PublicKey(
  "Hn2UGJ1jM9Tw9oidCJwLdhWpcczS4MrMdb48XvCDMmnP"
);

export const lunaMint = new PublicKey(
  "8sLT5gE4YgcdDgnL6gxy2a9NZ79t46jQgrX87q7iqFPN"
);

export const maticMint = new PublicKey(
  "6sxP334TsRHEznCMaUNKSzv8xmpTQZXY11fqszF5vYMJ"
);

export const usdtMint = new PublicKey(
  "4ohBE15Y2L3rPF6T6TXcHwLv7Dtkd9hwHRMBS7UDaw3V"
);
