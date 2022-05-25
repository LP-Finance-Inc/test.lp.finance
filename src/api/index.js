const endpoint = "https://backend.lpblock.org/api";
// const endpoint = "http://localhost:5000/api";

const api = {
  //global api
  pushNotify: endpoint + "/notify/pushNotify",

  //solana api
  vote: endpoint + "/DAO/vote",
  getCR: endpoint + "/DAO/getCR",
  getSolanaCrypto: endpoint + "/SolanaCrypto/getSolanaCrypto",
  getLiquidateAccountList: endpoint + "/SolanaCrypto/getLiquidateAccountList",
  deleteLiquidated: endpoint + "/SolanaCrypto/deleteLiquidated",

  //near api
  getNearCrypto: endpoint + "/near/NearCrypto",
};

export default api;
