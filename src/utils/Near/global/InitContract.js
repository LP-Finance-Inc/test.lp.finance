import * as nearAPI from "near-api-js";
import getConfig from "./getConfig";

const NETWORK = process.env.REACT_APP_NEAR_NETWORK || "testnet";

const initContract = async () => {
  const nearConfig = getConfig(NETWORK);
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
  const near = await nearAPI.connect({ keyStore, ...nearConfig });
  const walletConnection = new nearAPI.WalletConnection(near, "lpFinance");

  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    };
  }

  const contract = await new nearAPI.Contract(
    walletConnection.account(),
    nearConfig.contractName,
    {
      viewMethods: ["getMessages"],
      changeMethods: ["addMessage"],
      sender: walletConnection.getAccountId(),
    }
  );
  return { contract, currentUser, nearConfig, walletConnection };
};

export default initContract;
