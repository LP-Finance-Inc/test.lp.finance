import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

// TOken mints
export const lpsolMint = new PublicKey(
  "BseXpATR4hqy7UHvyNztLK711mYPHNCsS5AcBzWzSq7X"
);
export const lpusdMint = new PublicKey(
  "GPNCGAjyhA1qcSgSotQvJsM1xcGnDMgtTr9TJ1HVVQgG"
);
export const usdcMint = new PublicKey(
  "2Q1WAAgnpEox5Y4b6Y8YyXVwFNhDdGot467XfvdBJaPf"
);
export const btcMint = new PublicKey(
  "Hv96pk4HkhGcbNxkBvb7evTU88KzedvgVy2oddBB1ySB"
);
export const msolMint = new PublicKey(
  "EJ94TwhddyUAra7i3qttQ64Q1wExJYb8GmACbHbAnvKF"
);

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
// ======> PYTH
export const convert_to_wei = (val) => (parseFloat(val) * 1e9).toString();
export const convert_from_wei = (val) => parseFloat(val) / 1e9;
