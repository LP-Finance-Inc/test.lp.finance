import {
  getReadUserAccountFun,
  getReadStateAccountFun,
  getAuctionUserAccountFun,
  getAuctionStateAccountFun,
} from "../redux/actions/LpContractActions";

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
