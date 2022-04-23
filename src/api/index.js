const endpoint = "https://backend.lpblock.org/api";

const api = {
  vote: endpoint + "/DAO/vote",
  getCR: endpoint + "/DAO/getCR",
  getTokenPrice: endpoint + "/crypto/getTokenPrice",
};

export default api;
