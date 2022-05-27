export var ViewMethodsLogic;

(function (ViewMethodsLogic) {
  // accounts
  ViewMethodsLogic[(ViewMethodsLogic["get_account"] = 0)] = "get_account";
  ViewMethodsLogic[(ViewMethodsLogic["get_accounts_paged"] = 1)] =
    "get_accounts_paged";
  // assets
  ViewMethodsLogic[(ViewMethodsLogic["get_asset"] = 2)] = "get_asset";
  ViewMethodsLogic[(ViewMethodsLogic["get_assets"] = 3)] = "get_assets";
  ViewMethodsLogic[(ViewMethodsLogic["get_assets_paged"] = 4)] =
    "get_assets_paged";
  // config
  ViewMethodsLogic[(ViewMethodsLogic["get_config"] = 5)] = "get_config";
  // farms
  ViewMethodsLogic[(ViewMethodsLogic["get_asset_farm"] = 6)] = "get_asset_farm";
  ViewMethodsLogic[(ViewMethodsLogic["get_asset_farms"] = 7)] =
    "get_asset_farms";
  ViewMethodsLogic[(ViewMethodsLogic["get_asset_farms_paged"] = 8)] =
    "get_asset_farms_paged";
  ViewMethodsLogic[(ViewMethodsLogic["storage_balance_of"] = 9)] =
    "storage_balance_of";
})(ViewMethodsLogic || (ViewMethodsLogic = {}));

// Change methods can modify the state. But you don't receive the returned value when called.
export var ChangeMethodsLogic;
(function (ChangeMethodsLogic) {
  // init
  ChangeMethodsLogic[(ChangeMethodsLogic["new"] = 0)] = "new";
  ChangeMethodsLogic[(ChangeMethodsLogic["execute"] = 1)] = "execute";
  // register
  ChangeMethodsLogic[(ChangeMethodsLogic["storage_deposit"] = 2)] =
    "storage_deposit";
  // config
  ChangeMethodsLogic[(ChangeMethodsLogic["update_config"] = 3)] =
    "update_config";
  // assets
  ChangeMethodsLogic[(ChangeMethodsLogic["add_asset"] = 4)] = "add_asset";
  ChangeMethodsLogic[(ChangeMethodsLogic["update_asset"] = 5)] = "update_asset";
  ChangeMethodsLogic[(ChangeMethodsLogic["ft_on_transfer"] = 6)] =
    "ft_on_transfer";
  ChangeMethodsLogic[(ChangeMethodsLogic["oracle_on_call"] = 7)] =
    "oracle_on_call";
  // farms
  ChangeMethodsLogic[(ChangeMethodsLogic["account_farm_claim_all"] = 8)] =
    "account_farm_claim_all";
  ChangeMethodsLogic[(ChangeMethodsLogic["add_asset_farm_reward"] = 9)] =
    "add_asset_farm_reward";
  // stake
  ChangeMethodsLogic[(ChangeMethodsLogic["account_stake_booster"] = 10)] =
    "account_stake_booster";
  ChangeMethodsLogic[(ChangeMethodsLogic["account_unstake_booster"] = 11)] =
    "account_unstake_booster";
})(ChangeMethodsLogic || (ChangeMethodsLogic = {}));
export var ViewMethodsOracle;
(function (ViewMethodsOracle) {
  ViewMethodsOracle[(ViewMethodsOracle["get_price_data"] = 0)] =
    "get_price_data";
})(ViewMethodsOracle || (ViewMethodsOracle = {}));
// Change methods can modify the state. But you don't receive the returned value when called.
export var ChangeMethodsOracle;
(function (ChangeMethodsOracle) {
  ChangeMethodsOracle[(ChangeMethodsOracle["oracle_call"] = 0)] = "oracle_call";
})(ChangeMethodsOracle || (ChangeMethodsOracle = {}));
export var ChangeMethodsNearToken;
(function (ChangeMethodsNearToken) {
  ChangeMethodsNearToken[(ChangeMethodsNearToken["near_deposit"] = 0)] =
    "near_deposit";
  ChangeMethodsNearToken[(ChangeMethodsNearToken["near_withdraw"] = 1)] =
    "near_withdraw";
})(ChangeMethodsNearToken || (ChangeMethodsNearToken = {}));
export var ViewMethodsToken;
(function (ViewMethodsToken) {
  ViewMethodsToken[(ViewMethodsToken["ft_metadata"] = 0)] = "ft_metadata";
  ViewMethodsToken[(ViewMethodsToken["ft_balance_of"] = 1)] = "ft_balance_of";
  ViewMethodsToken[(ViewMethodsToken["storage_balance_of"] = 2)] =
    "storage_balance_of";
})(ViewMethodsToken || (ViewMethodsToken = {}));
export var ChangeMethodsToken;
(function (ChangeMethodsToken) {
  ChangeMethodsToken[(ChangeMethodsToken["ft_transfer_call"] = 0)] =
    "ft_transfer_call";
  ChangeMethodsToken[(ChangeMethodsToken["storage_deposit"] = 1)] =
    "storage_deposit";
})(ChangeMethodsToken || (ChangeMethodsToken = {}));
