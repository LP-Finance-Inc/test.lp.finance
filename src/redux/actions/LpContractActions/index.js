import { readUserAccount } from "../../../utils/lpContractFunctions/borrow/readUserAccount";
import { readStateAccount } from "../../../utils/lpContractFunctions/borrow/readStateAccount";
import { readAuctionUserAccount } from "../../../utils/lpContractFunctions/auction/readAuctionUserAccount";
import { readAuctionStateAccount } from "../../../utils/lpContractFunctions/auction/readAuctionStateAccount";
import { getBalance } from "../../../utils/lpContractFunctions/global/getBalance";
import { getAccountList } from "../../../utils/lpContractFunctions/auction/getAccountList";

// borrow page Token get balance function
export const getTokenBalanceFun = (key) => {
  return async (dispatch) => {
    const SOlBal = (await getBalance(key, "SOL")) / 1000000000;
    const lpUSDBal = await getBalance(key, "lpUSD");
    const lpSOLBal = await getBalance(key, "lpSOL");
    const tUSDCBal = await getBalance(key, "tUSDC");
    const tBTCBal = await getBalance(key, "tBTC");
    const tmSOLBal = await getBalance(key, "tmSOL");

    const BalArr = [
      {
        id: new Date(),
        BalName: "SOL",
        Bal: SOlBal === 0 ? "00.00" : SOlBal,
      },
      {
        id: new Date(),
        BalName: "lpUSD",
        Bal: lpUSDBal === 0 ? "00.00" : lpUSDBal,
      },
      {
        id: new Date(),
        BalName: "lpSOL",
        Bal: lpSOLBal === 0 ? "00.00" : lpSOLBal,
      },
      {
        id: new Date(),
        BalName: "tUSDC",
        Bal: tUSDCBal === 0 ? "00.00" : tUSDCBal,
      },
      {
        id: new Date(),
        BalName: "tBTC",
        Bal: tBTCBal === 0 ? "00.00" : tBTCBal,
      },
      {
        id: new Date(),
        BalName: "tmSOL",
        Bal: tmSOLBal === 0 ? "00.00" : tmSOLBal,
      },
    ];

    const BalList = {
      SOLBalance: SOlBal === 0 ? "00.00" : SOlBal,
      lpUSDBalance: lpUSDBal === 0 ? "00.00" : lpUSDBal,
      lpSOLBalance: lpSOLBal === 0 ? "00.00" : lpSOLBal,
      USDCBalance: tUSDCBal === 0 ? "00.00" : tUSDCBal,
      BTCBalance: tBTCBal === 0 ? "00.00" : tBTCBal,
      mSOLBalance: tmSOLBal === 0 ? "00.00" : tmSOLBal,
    };

    dispatch({
      type: "GET_WALLET_TOKEN_BALANCE",
      payload: {
        BalArr,
        BalList,
      },
    });
  };
};

//borrow page user account function
export const getReadUserAccountFun = (wallet, key) => {
  return async (dispatch) => {
    const userAccountInfo = await readUserAccount(wallet, key);

    dispatch({
      type: "GET_USER_ACCOUNT_INFO",
      payload: {
        key,
        userAccountInfo,
      },
    });
  };
};

//borrow  page cbs protocol  function
export const getReadStateAccountFun = (wallet) => {
  return async (dispatch) => {
    const ReadStateAccountInfo = await readStateAccount(wallet);

    dispatch({
      type: "GET_STATE_ACCOUNT_INFO",
      payload: ReadStateAccountInfo,
    });
  };
};

//Token price list function
export const getTokenPriceListFun = (TokenPriceList) => {
  return async (dispatch) => {
    const {
      lpSOLTokenPrice,
      SolTokenPrice,
      BtcTokenPrice,
      UsdcTokenPrice,
      lpUSDTokenPrice,
      mSOLTokenPrice,
    } = TokenPriceList;

    const TokenPriceArray = [
      {
        id: new Date(),
        name: "SOL",
        TokenPrice: SolTokenPrice,
      },
      {
        id: new Date(),
        name: "lpUSD",
        TokenPrice: lpUSDTokenPrice,
      },
      {
        id: new Date(),
        name: "lpSOL",
        TokenPrice: lpSOLTokenPrice,
      },
      {
        id: new Date(),
        name: "tUSDC",
        TokenPrice: UsdcTokenPrice,
      },
      {
        id: new Date(),
        name: "tBTC",
        TokenPrice: BtcTokenPrice,
      },
      {
        id: new Date(),
        name: "tmSOL",
        TokenPrice: mSOLTokenPrice,
      },
    ];

    dispatch({
      type: "GET_TOKEN_PRICE_LIST",
      payload: {
        TokenPriceArr: TokenPriceArray,
        TokenPriceList: TokenPriceList,
      },
    });

    dispatch({
      type: "SET_FOR_AUCTION_TOKEN_PRICE_LIST",
      payload: {
        TokenPriceList,
      },
    });
  };
};

//Auction User account info
export const getAuctionUserAccountFun = (wallet, publickey) => {
  return async (dispatch) => {
    const AuctionUserAccount = await readAuctionUserAccount(wallet, publickey);

    dispatch({
      type: "GET_AUCTION_USER_ACCOUNT_INFO",
      payload: AuctionUserAccount,
    });
  };
};

//Auction cbs state  info
export const getAuctionStateAccountFun = (wallet) => {
  return async (dispatch) => {
    const AuctionStakeInfo = await readAuctionStateAccount(wallet);

    dispatch({
      type: "GET_AUCTION_STATE_INFO",
      payload: AuctionStakeInfo,
    });
  };
};

//Liquidate function for get getAccountList
export const getLiquidateAccountListFun = (
  wallet,
  publicKey,
  TokenPriceList
) => {
  return async (dispatch) => {
    if (publicKey) {
      dispatch({
        type: "GET_LIQUIDATE_ACCOUNT_LIST_REQUEST",
      });

      const AccountList = await getAccountList(wallet, TokenPriceList);

      if (AccountList) {
        dispatch({
          type: "GET_LIQUIDATE_ACCOUNT_LIST",
          payload: AccountList,
        });
      } else {
        dispatch({
          type: "GET_LIQUIDATE_ACCOUNT_LIST_ERROR",
          payload: {
            message: "No data Available",
          },
        });
      }
    } else {
      dispatch({
        type: "GET_LIQUIDATE_ACCOUNT_LIST_ERROR",
        payload: {
          message: "No data Available",
        },
      });
    }
  };
};
