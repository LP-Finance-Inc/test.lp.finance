const endpoint = "https://backend.lpblock.org/api";

const api = {
  vote: endpoint + "/app/vote",
  getCR: endpoint + "/app/getCR",
  getAdoUser: endpoint + "/app/getAdoUser",
  getTokenPrice: endpoint + "/crypto/getTokenPrice",
};

export default api;
