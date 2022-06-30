const SolanaEndpoint = "https://www.api.lp.finance/api/solana";
const NearEndpoint = "https://www.api.lp.finance/api/near";
const SolanaTestEndpoint = "https://www.server.lp.finance/api/solana";

const api = {
  solana: {
    pushNotify: SolanaEndpoint + "/notify/pushNotify",
    vote: SolanaEndpoint + "/DAO/vote",
    getCR: SolanaEndpoint + "/DAO/getCR",
    getSolana: SolanaTestEndpoint + "/global/getSolana",
    getLiquidateAccountList: SolanaEndpoint + "/liquidate/getAccountList",
    deleteLiquidated: SolanaEndpoint + "/liquidate/deleteLiquidated",
    getAPY: SolanaEndpoint + "/global/getAPY",
    getLastEpochProfit: SolanaEndpoint + "/global/getLastEpochProfit",
  },
  near: {
    getNearCrypto: NearEndpoint + "/NearCrypto",
  },
};

export default api;
