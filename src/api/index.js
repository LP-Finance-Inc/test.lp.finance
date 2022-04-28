const endpoint = "https://backend.lpblock.org/api";
// const endpoint = "http://localhost:5000/api";

const api = {
  vote: endpoint + "/DAO/vote",
  getCR: endpoint + "/DAO/getCR",
  fetchSolanaCrypto: endpoint + "/SolanaCrypto/fetchSolanaCrypto",
  storeTokenPrices: endpoint + "/SolanaCrypto/storeTokenPrices",
  storeSolendPoolAssets: endpoint + "/SolanaCrypto/storeSolendPoolAssets",
  storeApricotPoolAssets: endpoint + "/SolanaCrypto/storeApricotPoolAssets",
  storeLiquidateAccountList:
    endpoint + "/SolanaCrypto/storeLiquidateAccountList",
};

export default api;
