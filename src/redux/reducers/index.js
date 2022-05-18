import { combineReducers } from "redux";

//Solana Reducers List Start-======================================================
import SolFaucetReducer from "./Solana/SolFaucetReducer";
import SolBorrowReducer from "./Solana/SolBorrowReducers/SolBorrowReducer";
import SolDepositReducer from "./Solana/SolBorrowReducers/SolDepositReducer";
import SolRepayReducer from "./Solana/SolBorrowReducers/SolRepayReducer";
import SolWithdrawReducer from "./Solana/SolBorrowReducers/SolWithdrawReducer";
import SolTopSwapReducer from "./Solana/SolSwapReducers/SolTopSwapReducer";
import SolBottomSwapReducer from "./Solana/SolSwapReducers/SolBottomSwapReducer";
import SolBridgeSourceNetworkReducer from "./Solana/SolBridgeReducers/SolBridgeSourceNetworkReducer";
import SolBridgeTargetNetworkReducer from "./Solana/SolBridgeReducers/SolBridgeTargetNetworkReducer";
import SolLiquidateReducer from "./Solana/SolLiquidateReducer";
import SolAuctionReducer from "./Solana/SolAuctionReducer";
import DAOReducer from "./Solana/DAOReducer";
import ApricotReducer from "./Solana/ApricotReducer";
import SolendReducer from "./Solana/SolendReducer";
import SolBorrowReducers from "./Solana/SolBorrowReducers";
//Solana Reducers List End-======================================================

//NEAR Reducers List Start-======================================================
import NearFaucetReducer from "./Near/NearFaucetReducer";
import NearBorrowReducer from "./Near/NearBorrowReducers/NearBorrowReducer";
import NearDepositReducer from "./Near/NearBorrowReducers/NearDepositReducer";
import NearRepayReducer from "./Near/NearBorrowReducers/NearRepayReducer";
import NearWithdrawReducer from "./Near/NearBorrowReducers/NearWithdrawReducer";
import NearTopSwapReducer from "./Near/NearSwapReducers/NearTopSwapReducer";
import NearBottomSwapReducer from "./Near/NearSwapReducers/NearBottomSwapReducer";
import NearBridgeSourceNetworkReducer from "./Near/NearBridgeReducers/NearBridgeSourceNetworkReducer";
import NearBridgeTargetNetworkReducer from "./Near/NearBridgeReducers/NearBridgeTargetNetworkReducer";
//NEAR Reducers List End-======================================================

//global reducers List Start-=========================================================
import NetworkReducer from "./global/NetworkReducer";
import SnackbarReducer from "./global/SnackbarReducer";
import ContractReducer from "./global/ContractReducer";
//global reducers List End -=========================================================

const rootReducer = combineReducers({
  // Solana Reducers list -
  SolFaucetReducer,
  SolBottomSwapReducer,
  SolTopSwapReducer,
  SolBorrowReducer,
  SolRepayReducer,
  SolWithdrawReducer,
  SolDepositReducer,
  SolBridgeSourceNetworkReducer,
  SolBridgeTargetNetworkReducer,
  SolLiquidateReducer,
  SolBorrowReducers,
  SolAuctionReducer,
  DAOReducer,
  ApricotReducer,
  SolendReducer,

  //NEAR Reducers list -
  NearFaucetReducer,
  NearBorrowReducer,
  NearDepositReducer,
  NearRepayReducer,
  NearWithdrawReducer,
  NearTopSwapReducer,
  NearBottomSwapReducer,
  NearBridgeSourceNetworkReducer,
  NearBridgeTargetNetworkReducer,
  // global Reducers list -
  NetworkReducer,
  SnackbarReducer,
  ContractReducer,
});

export default rootReducer;
