import { combineReducers } from "redux";
import SnackbarReducer from "./SnackbarReducer";
import FaucetTokenReducer from "./FaucetTokenReducer";
import BottomSwapReducer from "./swapReducers/BottomSwapReducer";
import TopSwapReducer from "./swapReducers/TopSwapReducer";
import BorrowReducer from "./borrowReducers/BorrowReducer";
import DepositReducer from "./borrowReducers/DepositReducer";
import RepayReducer from "./borrowReducers/RepayReducer";
import WithdrawReducer from "./borrowReducers/WithdrawReducer";
import ContractReducer from "./ContractReducer";
import lpContractReducers from "./lpContractReducers";
import lpAuctionReducer from "./lpContractReducers/lpAuctionReducer";
import DAOReducer from "./DAOReducer";
import getAssetsMarketReducer from "./lpContractReducers/getAssetsMarketReducer";
import PoolAssetsReducer from "./lpContractReducers/PoolAssetsReducer";
import NetworkReducer from "./NetworkReducer";
import BridgeSourceNetworkReducer from "./BridgeReducers/BridgeSourceNetworkReducer";
import BridgeTargetNetworkReducer from "./BridgeReducers/BridgeTargetNetworkReducer";
import LiquidateReducers from "./LiquidateReducers";

const rootReducer = combineReducers({
  SnackbarReducer,
  FaucetTokenReducer,
  BottomSwapReducer,
  TopSwapReducer,
  BorrowReducer,
  RepayReducer,
  WithdrawReducer,
  DepositReducer,
  ContractReducer,
  lpContractReducers,
  lpAuctionReducer,
  DAOReducer,
  getAssetsMarketReducer,
  PoolAssetsReducer,
  NetworkReducer,
  BridgeSourceNetworkReducer,
  BridgeTargetNetworkReducer,
  LiquidateReducers,
});

export default rootReducer;
