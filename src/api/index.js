const SolanaEndpoint = "https://www.api.lp.finance/api/solana";
const NearEndpoint = "https://www.api.lp.finance/api/near";
const SolanaTestEndpoint = "https://server.lp.finance/api";

const api = {
  solana: {
    pushNotify: SolanaEndpoint + "/notify/pushNotify",
    vote: SolanaEndpoint + "/DAO/vote",
    getCR: SolanaEndpoint + "/DAO/getCR",
    getSolana: SolanaTestEndpoint + "/SolanaCrypto/getSolanaCrypto",
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
