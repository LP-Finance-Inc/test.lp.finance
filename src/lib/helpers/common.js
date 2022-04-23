import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const convert_to_wei = (val) => (parseFloat(val) * 1e9).toString();
export const convert_from_wei = (val) => parseFloat(val) / 1e9;
export const convert_from_percent = (val) => parseFloat(val) / 1e4;

// TOken mints
export const lpsolMint = new PublicKey(
  "9Mcq5PQsEXuSY19ei8CqzRawPdPSAH1VM63GqtZU3x18"
);
export const lpusdMint = new PublicKey(
  "8YawjpcTDs3SsR7bsCHDb4b1Yv3PAKULB5xZ5VNunroJ"
);
export const lpbtcMint = new PublicKey(
  "B8w6e1gSCHE4xNhPhaK5y3cYYBwKMmfJqfe3C9692mGW"
);
export const lpethMint = new PublicKey(
  "8ZwwTyZ3PSyAzpqPeTXnvxdTF88CxzDQ57hF48WQvK7c"
);
export const lpfiMint = new PublicKey(
  "ApThTspa1JouZqmGoY5qbgdkMeo9eqEbs1dziaVA9kKH"
);

export const usdcMint = new PublicKey(
  "8cCs2Th4ivThrJPrkgAWNTegQgMcuBmY7TASv7FPhitj"
);
export const btcMint = new PublicKey(
  "25ggxgxMqejf5v9WSQWboqxpsrik1u94PCP5EwPBYeEJ"
);
export const msolMint = new PublicKey(
  "3dDwpZWQqCc5SttGJ2yNnYUnLSBnh9cjWJQPeKNDmDTz"
);
export const ethMint = new PublicKey(
  "6Y9PaAZjDs2n4ZJonCu2uCjRp8tuqe6KJEDs1k6iLkbD"
);
export const srmMint = new PublicKey(
  "GB8u3PRkQoi73v5Tctqj5he4M441S2QfqMpcaAsnozE6"
);
export const scnsolMint = new PublicKey(
  "GXFmXhwBMfXq5utccyNcQRrfQuBVjjprHKSqLzi3P7vn"
);
export const stsolMint = new PublicKey(
  "CJGeMYvL7s2k8VHooJ1JvgZsCJqrSEExmPkpFBZskAfV"
);
export const usdtMint = new PublicKey(
  "DpsmMkLP5yAeBSh7yAMHNuBurLnc8LNxvoddAoKo27dk"
);
export const ustMint = new PublicKey(
  "CZqXAbuUzGngd97oLjR1bcWkkZrz7MsKAbTJX9oT5Epv"
);
// EN2CV9nCnH9nBF9GyGYG9B3haNriNBkrPo8jF4c6mzUi
// ======> PYTH
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
