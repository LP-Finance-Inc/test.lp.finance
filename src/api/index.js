const SolanaEndpoint = "https://www.api.lp.finance/api/solana";
const NearEndpoint = "https://www.api.lp.finance/api/near";

const api = {
  solana: {
    wallet: SolanaEndpoint + "/global/wallet",
    getSolanaCrypto: SolanaEndpoint + "/global/getSolana",
    getAPY: SolanaEndpoint + "/global/getAPY",
    getLastEpochProfit: SolanaEndpoint + "/global/getLastEpochProfit",
    pushNotify: SolanaEndpoint + "/notify/pushNotify",
    vote: SolanaEndpoint + "/DAO/vote",
    getCR: SolanaEndpoint + "/DAO/getCR",
    getLiquidateAccountList: SolanaEndpoint + "/liquidate/getAccountList",
    deleteLiquidated: SolanaEndpoint + "/liquidate/deleteLiquidated",
  },
  near: {
    getNearCrypto: NearEndpoint + "/NearCrypto",
  },
};

export default api;
