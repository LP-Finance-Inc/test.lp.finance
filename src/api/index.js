const Endpoint = "https://www.server.lp.finance/api/solana";

const api = {
  solana: {
    pushNotify: Endpoint + "/notify/pushNotify",
    vote: Endpoint + "/DAO/vote",
    getCR: Endpoint + "/DAO/getCR",
    getSolana: Endpoint + "/global/getSolana",
    getLiquidateAccountList: Endpoint + "/liquidate/getAccountList",
    deleteLiquidated: Endpoint + "/liquidate/deleteLiquidated",
    getAPY: Endpoint + "/global/getAPY",
    getLastEpochProfit: Endpoint + "/global/getLastEpochProfit",
    getFees: Endpoint + "/liquidityPool/getFees",
    storeFees: Endpoint + "/liquidityPool/storeFees",
  },
  near: {
    getNearCrypto: Endpoint + "/NearCrypto",
  },
};

export default api;
