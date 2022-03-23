import { combineReducers } from "redux";
import SnackbarReducer from "./SnackbarReducer";
import TopAddLiquidityReducer from "./addLiquidityReducers/TopAddLiquidityReducer";
import RemoveLiquidityReducer from "./RemoveLiquidityReducer";
import FaucetTokenReducer from "./FaucetTokenReducer";
import BottomSwapReducer from "./swapReducers/BottomSwapReducer";
import TopSwapReducer from "./swapReducers/TopSwapReducer";
import ShortSellTokenReducer from "./shortSellReducers/ShortSellTokenReducer";
import BorrowReducer from "./borrowReducers/BorrowReducer";
import DepositReducer from "./borrowReducers/DepositReducer";
import RepayReducer from "./borrowReducers/RepayReducer";
import WithdrawReducer from "./borrowReducers/WithdrawReducer";
import ContractReducer from "./ContractReducer";
import lpContractReducers from "./lpContractReducers";
import lpAuctionReducer from "./lpContractReducers/lpAuctionReducer";

const rootReducer = combineReducers({
  SnackbarReducer,
  TopAddLiquidityReducer,
  RemoveLiquidityReducer,
  FaucetTokenReducer,
  BottomSwapReducer,
  TopSwapReducer,
  ShortSellTokenReducer,
  BorrowReducer,
  RepayReducer,
  WithdrawReducer,
  DepositReducer,
  ContractReducer,
  lpContractReducers,
  lpAuctionReducer,
});

export default rootReducer;
