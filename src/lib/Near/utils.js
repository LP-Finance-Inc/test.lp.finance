import BN from "bn.js";
import { getContract } from "./helpers";
import getConfig, { LOGIC_CONTRACT_NAME, defaultNetwork } from "./config";
import {
  ChangeMethodsLogic,
  ChangeMethodsOracle,
  ViewMethodsLogic,
  ViewMethodsOracle,
} from "./interfaces/contract-methods.js";
import {
  getWalletSelector,
  getAccount,
  functionCall,
} from "./wallet-selector-compat";

export const isTestnet = getConfig(defaultNetwork).networkId === "testnet";

let selector;
let burrow;
let resetBurrow = true;
let fetchDataCached;
let hideModalCached;
let signOutCached;
const nearTokenIds = {
  mainnet: "wrap.near",
  testnet: "wrap.testnet",
};

export const nearTokenId = nearTokenIds[defaultNetwork] || nearTokenIds.testnet;

export const getViewAs = () => {
  const url = new URL(window.location.href.replace("/#", ""));
  const searchParams = new URLSearchParams(url.search);
  return searchParams.get("viewAs");
};

export const getBurrow = async ({ fetchData, hideModal, signOut } = {}) => {
  if (burrow && !resetBurrow) return burrow;
  resetBurrow = false;
  const changeAccount = async () => {
    resetBurrow = true;
    await getBurrow();
    if (fetchData) fetchData();
  };
  if (!selector) {
    selector = await getWalletSelector({
      onAccountChange: changeAccount,
    });
  }
  const account = await getAccount(getViewAs());
  if (!fetchDataCached && !!fetchData) fetchDataCached = fetchData;
  if (!hideModalCached && !!hideModal) hideModalCached = hideModal;
  if (!signOutCached && !!signOut)
    signOutCached = async () => {
      await (selector === null || selector === void 0
        ? void 0
        : selector.signOut().catch((err) => {
            console.error("Failed to sign out");
            console.error(err);
          }));
      if (hideModal) hideModal();
      signOut();
    };
  const view = async (contract, methodName, args = {}, json = true) => {
    try {
      const viewAccount = await getAccount(getViewAs());
      return await viewAccount.viewFunction(
        contract.contractId,
        methodName,
        args,
        {
          // always parse to string, JSON parser will fail if its not a json
          parse: (data) => {
            const result = Buffer.from(data).toString();
            return json ? JSON.parse(result) : result;
          },
        }
      );
    } catch (err) {
      console.error(
        `view failed on ${
          contract.contractId
        } method: ${methodName}, ${JSON.stringify(args)}`
      );
      throw err;
    }
  };
  const call = async (contract, methodName, args = {}, deposit = "1") => {
    const { contractId } = contract;
    const gas = new BN(150000000000000);
    const attachedDeposit = new BN(deposit);
    return functionCall({
      contractId,
      methodName,
      args,
      gas,
      attachedDeposit,
    }).catch((e) => console.error(e));
  };
  const logicContract = await getContract(
    account,
    LOGIC_CONTRACT_NAME,
    ViewMethodsLogic,
    ChangeMethodsLogic
  );
  // get oracle address from
  const config = await view(
    logicContract,
    ViewMethodsLogic[ViewMethodsLogic.get_config]
  );
  const oracleContract = await getContract(
    account,
    config.oracle_account_id,
    ViewMethodsOracle,
    ChangeMethodsOracle
  );
  if (localStorage.getItem("near-wallet-selector:selectedWalletId") == null) {
    if (
      localStorage.getItem("near_app_wallet_auth_key") != null ||
      localStorage.getItem("null_wallet_auth_key") != null
    ) {
      if (signOutCached) signOutCached();
    }
  }
  burrow = {
    selector,
    changeAccount,
    fetchData: fetchDataCached,
    hideModal: hideModalCached,
    signOut: signOutCached,
    account,
    logicContract,
    oracleContract,
    view,
    call,
    config,
  };
  return burrow;
};

// Initialize contract & set global variables
export async function initContract() {
  return getBurrow();
}
