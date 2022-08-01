import { readUserAccount } from "../../../../utils/Solana/SolBorrowFun/readUserAccount";
import { readStateAccount } from "../../../../utils/Solana/SolBorrowFun/readStateAccount";
import { readAuctionUserAccount } from "../../../../utils/Solana/SolAuctionFun/readAuctionUserAccount";
import { readAuctionStateAccount } from "../../../../utils/Solana/SolAuctionFun/readAuctionStateAccount";
import { getBalance } from "../../../../utils/Solana/global/getBalance";

// borrow page Token get balance function
export const getTokenBalanceFun = (key, wallet) => {
  return async (dispatch) => {
    const SOlBal = (await getBalance(key, "SOL")) / 1000000000;
    const wSOlBal = await getBalance(key, "wSOL");
    const LPFiBal = await getBalance(key, "LPFi");
    const mSOLBal = await getBalance(key, "mSOL");
    const stSOLBal = await getBalance(key, "stSOL");
    const scnSOLBal = await getBalance(key, "scnSOL");
    const USDCBal = await getBalance(key, "USDC");
    const wBTCBal = await getBalance(key, "wBTC");
    const wETHBal = await getBalance(key, "wETH");
    const RAYBal = await getBalance(key, "RAY");
    const SRMBal = await getBalance(key, "SRM");
    const AVAXBal = await getBalance(key, "AVAX");
    const FIDABal = await getBalance(key, "FIDA");
    const FTTBal = await getBalance(key, "FTT");
    const FTMBal = await getBalance(key, "FTM");
    const GMTBal = await getBalance(key, "GMT");
    const LUNABal = await getBalance(key, "LUNA");
    const MATICBal = await getBalance(key, "MATIC");
    const USDTBal = await getBalance(key, "USDT");
    const lpSOLBal = await getBalance(key, "lpSOL");
    const lpUSDBal = await getBalance(key, "lpUSD");

    const BalArr = [
      {
        id: 1,
        BalName: "SOL",
        Bal: SOlBal === 0 ? "00.00" : SOlBal,
      },
      {
        id: 2,
        BalName: "wSOL",
        Bal: wSOlBal === 0 ? "00.00" : wSOlBal,
      },
      {
        id: 3,
        BalName: "LPFi",
        Bal: LPFiBal === 0 ? "00.00" : LPFiBal,
      },
      {
        id: 4,
        BalName: "mSOL",
        Bal: mSOLBal === 0 ? "00.00" : mSOLBal,
      },
      {
        id: 5,
        BalName: "stSOL",
        Bal: stSOLBal === 0 ? "00.00" : stSOLBal,
      },
      {
        id: 6,
        BalName: "scnSOL",
        Bal: scnSOLBal === 0 ? "00.00" : scnSOLBal,
      },
      {
        id: 7,
        BalName: "USDC",
        Bal: USDCBal === 0 ? "00.00" : USDCBal,
      },
      {
        id: 8,
        BalName: "wBTC",
        Bal: wBTCBal === 0 ? "00.00" : wBTCBal,
      },
      {
        id: 9,
        BalName: "wETH",
        Bal: wETHBal === 0 ? "00.00" : wETHBal,
      },
      {
        id: 10,
        BalName: "RAY",
        Bal: RAYBal === 0 ? "00.00" : RAYBal,
      },
      {
        id: 11,
        BalName: "SRM",
        Bal: SRMBal === 0 ? "00.00" : SRMBal,
      },
      {
        id: 12,
        BalName: "AVAX",
        Bal: AVAXBal === 0 ? "00.00" : AVAXBal,
      },
      {
        id: 13,
        BalName: "FIDA",
        Bal: FIDABal === 0 ? "00.00" : FIDABal,
      },
      {
        id: 14,
        BalName: "FTT",
        Bal: FTTBal === 0 ? "00.00" : FTTBal,
      },
      {
        id: 15,
        BalName: "FTM",
        Bal: FTMBal === 0 ? "00.00" : FTMBal,
      },
      {
        id: 16,
        BalName: "GMT",
        Bal: GMTBal === 0 ? "00.00" : GMTBal,
      },
      {
        id: 17,
        BalName: "LUNA",
        Bal: LUNABal === 0 ? "00.00" : LUNABal,
      },
      {
        id: 18,
        BalName: "MATIC",
        Bal: MATICBal === 0 ? "00.00" : MATICBal,
      },
      {
        id: 19,
        BalName: "USDT",
        Bal: USDTBal === 0 ? "00.00" : USDTBal,
      },
      {
        id: 20,
        BalName: "lpSOL",
        Bal: lpSOLBal === 0 ? "00.00" : lpSOLBal,
      },
      {
        id: 21,
        BalName: "lpUSD",
        Bal: lpUSDBal === 0 ? "00.00" : lpUSDBal,
      },
    ];

    const BalList = {
      SOLBalance: SOlBal === 0 ? "00.00" : SOlBal,
      wSOLBalance: wSOlBal === 0 ? "00.00" : wSOlBal,
      LPFiBalance: LPFiBal === 0 ? "00.00" : LPFiBal,
      mSOLBalance: mSOLBal === 0 ? "00.00" : mSOLBal,
      stSOLBalance: stSOLBal === 0 ? "00.00" : stSOLBal,
      scnSOLBalance: scnSOLBal === 0 ? "00.00" : scnSOLBal,
      USDCBalance: USDCBal === 0 ? "00.00" : USDCBal,
      wBTCBalance: wBTCBal === 0 ? "00.00" : wBTCBal,
      wETHBalance: wETHBal === 0 ? "00.00" : wETHBal,
      RAYBalance: RAYBal === 0 ? "00.00" : RAYBal,
      SRMBalance: SRMBal === 0 ? "00.00" : SRMBal,
      AVAXBalance: AVAXBal === 0 ? "00.00" : AVAXBal,
      FIDABalance: FIDABal === 0 ? "00.00" : FIDABal,
      FTTBalance: FTTBal === 0 ? "00.00" : FTTBal,
      FTMBalance: FTMBal === 0 ? "00.00" : FTMBal,
      GMTBalance: GMTBal === 0 ? "00.00" : GMTBal,
      LUNABalance: LUNABal === 0 ? "00.00" : LUNABal,
      MATICBalance: MATICBal === 0 ? "00.00" : MATICBal,
      USDTBalance: USDTBal === 0 ? "00.00" : USDTBal,
      lpSOLBalance: lpSOLBal === 0 ? "00.00" : lpSOLBal,
      lpUSDBalance: lpUSDBal === 0 ? "00.00" : lpUSDBal,
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

// Token price list function
export const setTokenPriceListFun = (TokenPriceArr, TokenPriceObj) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_TOKEN_PRICE_LIST",
        payload: {
          TokenPriceArr: TokenPriceArr,
          TokenPriceList: TokenPriceObj,
        },
      });

      dispatch({
        type: "SET_FOR_AUCTION_TOKEN_PRICE_LIST",
        payload: {
          TokenPriceObj,
        },
      });
    } catch (error) {}
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

//get Apricot market data func
export const getApricotInfoFun = (ApricotList) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_APRICOT_INFO_PROGRESS",
    });

    dispatch({
      type: "SET_APRICOT_INFO_LIST",
      payload: ApricotList,
    });
  };
};

//solend maket data func
export const getSolendInfoFun = (SolendList) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_SOLEND_INFO_PROGRESS",
    });

    dispatch({
      type: "SET_SOLEND_INFO_LIST",
      payload: SolendList,
    });
  };
};

export const DepositTokenSelect = ({ img, name }) => {
  return {
    type: "DEPOSIT_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const BorrowTokenSelect = ({ img, name }) => {
  return {
    type: "BORROW_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const WithdrawTokenSelect = ({ img, name }) => {
  return {
    type: "WITHDRAW_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};

export const RepayTokenSelect = ({ img, name }) => {
  return {
    type: "REPAY_TOKEN_SELECT",
    payload: {
      img: img,
      name: name,
    },
  };
};
