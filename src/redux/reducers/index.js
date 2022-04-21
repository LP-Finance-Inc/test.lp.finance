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
import NetworkTokenReducer from "./NetworkTokenReducer";
import BridgeSourceNetworkReducer from "./BridgeReducers/BridgeSourceNetworkReducer";
import BridgeTargetNetworkReducer from "./BridgeReducers/BridgeTargetNetworkReducer";
import EthDepositReducer from "./EthReducers/EthBorrowReducers/EthDepositReducer";
import EthBorrowReducer from "./EthReducers/EthBorrowReducers/EthBorrowReducer";
import EthWithdrawReducer from "./EthReducers/EthBorrowReducers/EthWithdrawReducer";
import EthRepayReducer from "./EthReducers/EthBorrowReducers/EthRepayReducer";
import EthFaucetTokenReducer from "./EthReducers/EthFaucetTokenReducer";
import TopEthSwapReducer from "./EthReducers/EthSwapReducers/TopEthSwapReducer";
import BottomEthSwapReducer from "./EthReducers/EthSwapReducers/BottomEthSwapReducer";
import EthBridgeSourceNetworkReducer from "./EthReducers/EthBridgeReducers/EthBridgeSourceNetworkReducer";
import EthBridgeTargetNetworkReducer from "./EthReducers/EthBridgeReducers/EthBridgeTargetNetworkReducer";

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
  NetworkTokenReducer,
  BridgeSourceNetworkReducer,
  BridgeTargetNetworkReducer,
  EthDepositReducer,
  EthBorrowReducer,
  EthWithdrawReducer,
  EthRepayReducer,
  EthFaucetTokenReducer,
  TopEthSwapReducer,
  BottomEthSwapReducer,
  EthBridgeSourceNetworkReducer,
  EthBridgeTargetNetworkReducer,
});

export default rootReducer;
