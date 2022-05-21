import { combineReducers } from "redux";

//Solana Reducers List Start-======================================================
import SolFaucetReducer from "./Solana/SolFaucetReducer";
import SolBorrowReducer from "./Solana/SolBorrowReducers/SolBorrowReducer";
import SolDepositReducer from "./Solana/SolBorrowReducers/SolDepositReducer";
import SolRepayReducer from "./Solana/SolBorrowReducers/SolRepayReducer";
import SolWithdrawReducer from "./Solana/SolBorrowReducers/SolWithdrawReducer";
import SolTopSwapReducer from "./Solana/SolSwapReducers/SolTopSwapReducer";
import SolBottomSwapReducer from "./Solana/SolSwapReducers/SolBottomSwapReducer";
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
import NearTokenPriceReducer from "./Near/NearTokenPriceReducer";
//NEAR Reducers List End-======================================================

//global reducers List Start-=========================================================
import NetworkReducer from "./global/NetworkReducer";
import SnackbarReducer from "./global/SnackbarReducer";
import ContractReducer from "./global/ContractReducer";
import BridgeSourceNetworkReducer from "./global/BridgeReducers/BridgeSourceNetworkReducer";
import BridgeTargetNetworkReducer from "./global/BridgeReducers/BridgeTargetNetworkReducer";
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
  NearTokenPriceReducer,
  // global Reducers list -
  NetworkReducer,
  SnackbarReducer,
  ContractReducer,
  // Solana Global
  BridgeSourceNetworkReducer,
  BridgeTargetNetworkReducer,
});

export default rootReducer;
