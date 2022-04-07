import { readUserAccount } from "../../../utils/lpContractFunctions/borrow/readUserAccount";
import { readStateAccount } from "../../../utils/lpContractFunctions/borrow/readStateAccount";
import { readAuctionUserAccount } from "../../../utils/lpContractFunctions/auction/readAuctionUserAccount";
import { readAuctionStateAccount } from "../../../utils/lpContractFunctions/auction/readAuctionStateAccount";
import { getBalance } from "../../../utils/lpContractFunctions/global/getBalance";
import { getAccountList } from "../../../utils/lpContractFunctions/auction/getAccountList";
import { getAssetsMarketInfo } from "../../../utils/lpContractFunctions/global/getAssetsMarketInfo";
import { getPoolAssetsInfo } from "../../../utils/lpContractFunctions/global/getPoolAssetsInfo";

// borrow page Token get balance function
export const getTokenBalanceFun = (key) => {
  return async (dispatch) => {
    const SOlBal = (await getBalance(key, "SOL")) / 1000000000;
    const lpUSDBal = await getBalance(key, "lpUSD");
    const lpSOLBal = await getBalance(key, "lpSOL");
    const lpETHBal = await getBalance(key, "lpUSD");
    const lpBTCBal = await getBalance(key, "lpSOL");
    const tUSDCBal = await getBalance(key, "tUSDC");
    const tBTCBal = await getBalance(key, "tBTC");
    const tmSOLBal = await getBalance(key, "tmSOL");
    const ETHBal = await getBalance(key, "ETH");
    const SRMBal = await getBalance(key, "SRM");
    const USDTBal = await getBalance(key, "USDT");
    const USTBal = await getBalance(key, "USDT");
    const stSOLBal = await getBalance(key, "stSOL");

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
      {
        id: new Date(),
        BalName: "ETH",
        Bal: ETHBal === 0 ? "00.00" : ETHBal,
      },
      {
        id: new Date(),
        BalName: "SRM",
        Bal: SRMBal === 0 ? "00.00" : SRMBal,
      },
      {
        id: new Date(),
        BalName: "USDT",
        Bal: USDTBal === 0 ? "00.00" : USDTBal,
      },
      {
        id: new Date(),
        BalName: "UST",
        Bal: USTBal === 0 ? "00.00" : USTBal,
      },
      {
        id: new Date(),
        BalName: "stSOL",
        Bal: stSOLBal === 0 ? "00.00" : stSOLBal,
      },
      {
        id: new Date(),
        BalName: "lpETH",
        Bal: lpETHBal === 0 ? "00.00" : lpETHBal,
      },
      {
        id: new Date(),
        BalName: "lpBTC",
        Bal: lpBTCBal === 0 ? "00.00" : lpBTCBal,
      },
    ];

    const BalList = {
      SOLBalance: SOlBal === 0 ? "00.00" : SOlBal,
      lpUSDBalance: lpUSDBal === 0 ? "00.00" : lpUSDBal,
      lpSOLBalance: lpSOLBal === 0 ? "00.00" : lpSOLBal,
      USDCBalance: tUSDCBal === 0 ? "00.00" : tUSDCBal,
      BTCBalance: tBTCBal === 0 ? "00.00" : tBTCBal,
      mSOLBalance: tmSOLBal === 0 ? "00.00" : tmSOLBal,
      ETHBalance: ETHBal === 0 ? "00.00" : ETHBal,
      SRMBalance: SRMBal === 0 ? "00.00" : SRMBal,
      USDTBalance: USDTBal === 0 ? "00.00" : USDTBal,
      USTBalance: USTBal === 0 ? "00.00" : USTBal,
      stSOLBalance: stSOLBal === 0 ? "00.00" : stSOLBal,
      lpETHBalance: lpETHBal === 0 ? "00.00" : lpETHBal,
      lpBTCBalance: lpBTCBal === 0 ? "00.00" : lpBTCBal,
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
      ETHTokenPrice,
      SRMTokenPrice,
      USDTTokenPrice,
      USTTokenPrice,
      STSOLTokenPrice,
      lpETHTokenPrice,
      lpBTCTokenPrice,
    } = TokenPriceList;

    const TokenPriceArray = [
      {
        id: 1,
        name: "tBTC",
        TokenPrice: BtcTokenPrice,
      },
      {
        id: 2,
        name: "SOL",
        TokenPrice: SolTokenPrice,
      },
      {
        id: 3,
        name: "tUSDC",
        TokenPrice: UsdcTokenPrice,
      },
      {
        id: 4,
        name: "lpUSD",
        TokenPrice: lpUSDTokenPrice,
      },
      {
        id: 5,
        name: "lpSOL",
        TokenPrice: lpSOLTokenPrice,
      },
      {
        id: 6,
        name: "tmSOL",
        TokenPrice: mSOLTokenPrice,
      },
      {
        id: 7,
        name: "ETH",
        TokenPrice: ETHTokenPrice,
      },
      {
        id: 8,
        name: "SRM",
        TokenPrice: SRMTokenPrice,
      },
      {
        id: 9,
        name: "USDT",
        TokenPrice: USDTTokenPrice,
      },
      {
        id: 10,
        name: "UST",
        TokenPrice: USTTokenPrice,
      },
      {
        id: 11,
        name: "stSOL",
        TokenPrice: STSOLTokenPrice,
      },
      {
        id: 12,
        name: "lpETH",
        TokenPrice: lpETHTokenPrice,
      },
      {
        id: 13,
        name: "lpBTC",
        TokenPrice: lpBTCTokenPrice,
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

//get Apricot market data
export const getAssetsPoolMarketFun = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_ASSETS_MARKET_LIST_PROGRESS",
    });

    const TokenObj = await getAssetsMarketInfo();

    dispatch({
      type: "SET_ASSETS_MARKET_LIST",
      payload: TokenObj,
    });
  };
};

export const getPoolAssetsInfoFun = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SEND_POOL_ASSETS_PROGRESS",
      });

      const PoolAssetsObj = await getPoolAssetsInfo();

      dispatch({
        type: "SEND_POOL_ASSETS_INFO",
        payload: PoolAssetsObj,
      });
    } catch (error) {
      dispatch({
        type: "SEND_POOL_ASSETS_ERROR",
      });
    }
  };
};
