import * as nearAPI from "near-api-js";
import { Near } from "near-api-js/lib/near";
import { Account } from "near-api-js/lib/account";
import getConfig, { LOGIC_CONTRACT_NAME, defaultNetwork } from "./config";
import NearWalletSelector from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { nearWalletIcon, senderWalletIcon } from "./icons";
const { keyStores } = nearAPI;

let near;
let accountId;
let init = false;
let selector = null;

export const getNear = () => {
  const config = getConfig(defaultNetwork);
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  if (!near) {
    near = new Near(
      Object.assign(Object.assign({}, config), { deps: { keyStore } })
    );
  }
  return near;
};

export const getAccount = async (viewAsAccountId) => {
  near = getNear();
  return new Account(near.connection, viewAsAccountId || accountId);
};
export const functionCall = async ({
  contractId,
  methodName,
  args,
  gas,
  attachedDeposit,
}) => {
  if (!selector) {
    throw new Error("selector not initialized");
  }
  if (!contractId) {
    throw new Error("functionCall error: contractId undefined");
  }
  if (!methodName) {
    throw new Error("functionCall error: methodName undefined");
  }
  return selector.signAndSendTransaction({
    receiverId: contractId,
    actions: [
      {
        type: "FunctionCall",
        params: {
          methodName,
          args,
          gas:
            (gas === null || gas === void 0 ? void 0 : gas.toString()) ||
            "30000000000000",
          deposit:
            (attachedDeposit === null || attachedDeposit === void 0
              ? void 0
              : attachedDeposit.toString()) || "0",
        },
      },
    ],
  });
};

export const getWalletSelector = async ({ onAccountChange }) => {
  var _a, _b;
  if (init) return selector;
  init = true;
  selector = await NearWalletSelector.init({
    wallets: [
      setupNearWallet({
        iconUrl: nearWalletIcon,
      }),
      setupSender({
        iconUrl: senderWalletIcon,
      }),
    ],
    network: defaultNetwork,
    contractId: LOGIC_CONTRACT_NAME,
  });
  selector.on("accountsChanged", (e) => {
    var _a;
    accountId =
      (_a = e.accounts[0]) === null || _a === void 0 ? void 0 : _a.accountId;
    if (accountId) {
      onAccountChange(accountId);
    }
  });
  const defaultAccountId =
    (_b =
      (_a = await selector.getAccounts()) === null || _a === void 0
        ? void 0
        : _a[0]) === null || _b === void 0
      ? void 0
      : _b.accountId;
  if (defaultAccountId) accountId = defaultAccountId;
  await onAccountChange(accountId);
  return selector;
};
