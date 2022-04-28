const endpoint = "https://backend.lpblock.org/api";
// const endpoint = "http://localhost:5000/api";

const api = {
  vote: endpoint + "/DAO/vote",
  getCR: endpoint + "/DAO/getCR",
  getSolanaCrypto: endpoint + "/SolanaCrypto/getSolanaCrypto",
  getLiquidateAccountList: endpoint + "/SolanaCrypto/getLiquidateAccountList",
};

export default api;
