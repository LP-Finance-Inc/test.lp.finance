import {
  getReadUserAccountFun,
  getReadStateAccountFun,
  getAuctionUserAccountFun,
  getAuctionStateAccountFun,
} from "../../../redux/actions/Solana/SolBorrowActions";
import { SolGetLiquidityPoolBalance } from "../../../redux/actions/Solana/SolLiquidityPoolActions";

//borrow pages
export const RefreshBorrowData = (wallet, publicKey) => {
  return async (dispatch) => {
    dispatch(getReadUserAccountFun(wallet, publicKey));
    dispatch(getReadStateAccountFun(wallet));
  };
};

// Auction pool page
export const RefreshAuctionData = (wallet, publicKey) => {
  return async (dispatch) => {
    dispatch(getAuctionUserAccountFun(wallet, publicKey));
    dispatch(getAuctionStateAccountFun(wallet));
  };
};

// Liquidity pool page
export const RefreshLiquidityPoolData = (wallet, publicKey) => {
  return async (dispatch) => {
    dispatch(SolGetLiquidityPoolBalance(wallet));
  };
};
