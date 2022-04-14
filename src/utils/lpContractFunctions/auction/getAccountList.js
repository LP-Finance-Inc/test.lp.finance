import * as anchor from "@project-serum/anchor";
import getProvider from "../../../lib/helpers/getProvider";
import accounts_idl from "../../../lib/idls/lpfinance_accounts.json";
import {
  whiteListKey,
  configAccountKey,
} from "../../../lib/helpers/lp_constants/add_wallet_constants";
import { readUserAccount } from "../borrow/readUserAccount";

const calculate_ltv = async (wallet, userKey, TokenPriceList) => {
  try {
    const accountData = await readUserAccount(wallet, userKey);

    const {
      SolTokenPrice,
      BtcTokenPrice,
      UsdcTokenPrice,
      mSOLTokenPrice,
      ETHTokenPrice,
      SRMTokenPrice,
      USDTTokenPrice,
      USTTokenPrice,
      STSOLTokenPrice,
      scnSOLTokenPrice,
      lpSOLTokenPrice,
      lpUSDTokenPrice,
      lpBTCTokenPrice,
      lpETHTokenPrice,
    } = TokenPriceList;

    const {
      BorrowedLpSOLAmount,
      BorrowedLpUsdAmount,
      BorrowedLpBTCAmount,
      BorrowedLpETHAmount,

      DepositedBtcAmount,
      DepositedETHAmount,
      DepositedLpBTCAmount,
      DepositedLpETHAmount,
      DepositedLpSolAmount,
      DepositedLpUsdAmount,
      DepositedMSOLAmount,
      DepositedSRMAmount,
      DepositedSolAmount,
      DepositedUSDTAmount,
      DepositedUSTAmount,
      DepositedUsdcAmount,
      DepositedscnSOLAmount,
      DepositedstSOLAmount,
    } = accountData;

    const DepositedUserSOLAmountCal = DepositedSolAmount * SolTokenPrice;
    const DepositedUserBTCAmountCal = DepositedBtcAmount * BtcTokenPrice;
    const DepositedUserUSDCAmountCal = DepositedUsdcAmount * UsdcTokenPrice;
    const DepositedUserMSOLAmountCal = DepositedMSOLAmount * mSOLTokenPrice;
    const DepositedUserETHAmountCal = DepositedETHAmount * ETHTokenPrice;
    const DepositedUserSRMAmountCal = DepositedSRMAmount * SRMTokenPrice;
    const DepositedUserUSDTAmountCal = DepositedUSDTAmount * USDTTokenPrice;
    const DepositedUserUSTAmountCal = DepositedUSTAmount * USTTokenPrice;
    const DepositedUserstSOLAmountCal = DepositedstSOLAmount * STSOLTokenPrice;
    const DepositedUserscnSOLAmountCal =
      DepositedscnSOLAmount * scnSOLTokenPrice;
    const DepositedUserLpSOLAmountCal = DepositedLpSolAmount * lpSOLTokenPrice;
    const DepositedUserLpUSDAmountCal = DepositedLpUsdAmount * lpUSDTokenPrice;
    const DepositedUserLpBTCAmountCal = DepositedLpBTCAmount * lpBTCTokenPrice;
    const DepositedUserLpETHAmountCal = DepositedLpETHAmount * lpETHTokenPrice;

    const BorrowedUserLpSOLAmountCal = BorrowedLpSOLAmount * lpSOLTokenPrice;
    const BorrowedUserLpUSDAmountCal = BorrowedLpUsdAmount * lpUSDTokenPrice;
    const BorrowedUserLpBTCAmountCal = BorrowedLpBTCAmount * lpBTCTokenPrice;
    const BorrowedUserLpETHAmountCal = BorrowedLpETHAmount * lpETHTokenPrice;

    const UserTotalBorrowedCal =
      BorrowedUserLpUSDAmountCal +
      BorrowedUserLpSOLAmountCal +
      BorrowedUserLpBTCAmountCal +
      BorrowedUserLpETHAmountCal;

    const UserTotalDepositedCal =
      DepositedUserSOLAmountCal +
      DepositedUserBTCAmountCal +
      DepositedUserUSDCAmountCal +
      DepositedUserMSOLAmountCal +
      DepositedUserETHAmountCal +
      DepositedUserSRMAmountCal +
      DepositedUserUSDTAmountCal +
      DepositedUserUSTAmountCal +
      DepositedUserstSOLAmountCal +
      DepositedUserscnSOLAmountCal +
      DepositedUserLpSOLAmountCal +
      DepositedUserLpUSDAmountCal +
      DepositedUserLpBTCAmountCal +
      DepositedUserLpETHAmountCal;

    const LTV = (UserTotalBorrowedCal / UserTotalDepositedCal) * 100;

    return {
      LTV,
      UserTotalBorrowedCal,
      UserTotalDepositedCal,
    };
  } catch (err) {
    return 0;
  }
};

export const getAccountList = async (wallet, TokenPriceList) => {
  let AccountList = [];

  try {
    const { PublicKey } = anchor.web3;

    const provider = await getProvider(wallet);
    anchor.setProvider(provider);
    // address of deployed program
    const programId = new PublicKey(accounts_idl.metadata.address);
    // Generate the program client from IDL.
    const program = new anchor.Program(accounts_idl, programId);
    const whiteListData = await program.account.whiteList.fetch(whiteListKey);
    const configData = await program.account.config.fetch(configAccountKey);

    const counter = configData.counter;

    for (let i = 0; i < counter; i++) {
      const ltv = await calculate_ltv(
        wallet,
        whiteListData.addresses[i],
        TokenPriceList
      );

      if (ltv) {
        var LTV = isNaN(ltv.LTV);
        if (ltv.LTV >= 50) {
          AccountList.push({
            address: whiteListData?.addresses[i].toBase58(),
            LTV: LTV ? 0 : ltv.LTV,
            Debt: ltv.UserTotalBorrowedCal,
            Collateral: ltv.UserTotalDepositedCal,
          });
        }
      }
    }

    return AccountList;
  } catch (err) {
    return (AccountList = []);
  }
};
