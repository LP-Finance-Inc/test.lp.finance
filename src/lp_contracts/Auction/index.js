import * as anchor from "@project-serum/anchor";
import getProvider from "../../lib/helpers/getProvider";
import { RefreshAuctionData } from "../../helper/RefreshData";
import idl from "../../lib/idls/lpusd_auction.json";
import cbs_idl from "../../lib/idls/cbs_protocol.json";
import swap_idl from "../../lib/idls/lpfinance_swap.json";
import { setContracts } from "../../redux/actions";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import {
  convert_to_wei,
  lpusdMint,
  lpsolMint,
  lpethMint,
  lpbtcMint,
  pythBtcAccount,
  pythMsolAccount,
  pythUsdcAccount,
  pythSolAccount,
  pythEthAccount,
  pythUstAccount,
  pythSrmAccount,
  pythScnsolAccount,
  pythStsolAccount,
  pythUsdtAccount,
} from "../../lib/helpers/common";
import * as CBS_Constants from "../../lib/helpers/lp_constants/cbs_constants";
import * as SWAP_Constants from "../../lib/helpers/lp_constants/swap_constants";
import {
  poolUsdc,
  poolMsol,
  poolBtc,
  poolEth,
  poolUst,
  poolSrm,
  poolScnsol,
  poolStsol,
  poolUsdt,
  poolLpsol,
  poolLpusd,
  poolLpbtc,
  poolLpeth,
  auction_name,
  stateAccount,
  config,
} from "../../lib/helpers/lp_constants/auction_constants";
import { isNumber } from "../../helper";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

export const deposite_lpusd = (
  wallet,
  Amount,
  setRequired,
  setPrice,
  setDepositMessage
) => {
  return async (dispatch) => {
    dispatch(
      setContracts(true, true, "progress", "Start deposit...", "Deposit")
    );

    const userAuthority = wallet.publicKey;
    const provider = await getProvider(wallet);
    anchor.setProvider(provider);
    // address of deployed program
    const programId = new PublicKey(idl.metadata.address);
    // Generate the program client from IDL.
    const program = new anchor.Program(idl, programId);

    const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
      [Buffer.from(auction_name), Buffer.from(userAuthority.toBuffer())],
      program.programId
    );

    let accountData;
    try {
      accountData = await program.account.userStateAccount.fetch(userAccount);
    } catch (err) {
      accountData = null;
    }

    if (accountData == null || accountData === undefined) {
      try {
        await program.rpc.initUserAccount({
          accounts: {
            userAccount,
            stateAccount,
            userAuthority,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });
        accountData = await program.account.userStateAccount.fetch(userAccount);
      } catch (err) {
        console.log(err);
        dispatch(
          setContracts(
            true,
            false,
            "error",
            "Deposit failed. Click Ok to go back and try again.",
            "Deposit"
          )
        );
      }
    }

    if (accountData == null || accountData === undefined) {
      return;
    }

    const userLpusd = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      lpusdMint,
      userAuthority
    );

    if (
      accountData &&
      accountData.owner.toBase58() === userAuthority.toBase58()
    ) {
      try {
        const deposit_wei = convert_to_wei(Amount);
        const deposit_amount = new anchor.BN(deposit_wei); // '100000000'

        await program.rpc.depositLpusd(deposit_amount, {
          accounts: {
            userAuthority,
            userLpusd,
            lpusdMint,
            stateAccount,
            config,
            poolLpusd,
            userAccount,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });

        dispatch(
          setContracts(
            true,
            false,
            "success",
            `Successfully deposited ${isNumber(
              Amount
            )} lpUSD. Click Ok to go back.`,
            "Deposit"
          )
        );

        setRequired(false);
        setPrice("");
        setDepositMessage("Enter an amount");
        dispatch(RefreshAuctionData(wallet, userAuthority));
      } catch (err) {
        dispatch(
          setContracts(
            true,
            false,
            "error",
            "Deposit failed. Click Ok to go back and try again.",
            "Deposit"
          )
        );
      }
    } else {
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Owner account does not match",
          "Deposit"
        )
      );
    }
  };
};

export const withdraw_lpusd = (
  wallet,
  WithdrawPrice,
  setRequired,
  setWithdrawPrice,
  setWithdrawMessage
) => {
  return async (dispatch) => {
    dispatch(
      setContracts(true, true, "progress", "Start withdraw...", "Withdraw")
    );

    const userAuthority = wallet.publicKey;
    const provider = await getProvider(wallet);
    anchor.setProvider(provider);
    // address of deployed program
    const programId = new PublicKey(idl.metadata.address);
    // Generate the program client from IDL.
    const program = new anchor.Program(idl, programId);

    const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
      [Buffer.from(auction_name), Buffer.from(userAuthority.toBuffer())],
      program.programId
    );

    const userLpusd = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      lpusdMint,
      userAuthority
    );

    try {
      const deposit_wei = convert_to_wei(WithdrawPrice);
      const deposit_amount = new anchor.BN(deposit_wei); // '100000000'

      await program.rpc.withdrawLpusd(deposit_amount, {
        accounts: {
          userAuthority,
          userLpusd,
          lpusdMint,
          stateAccount,
          config,
          poolLpusd,
          userAccount,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      dispatch(
        setContracts(
          true,
          false,
          "success",
          `Successfully withdraw ${isNumber(
            WithdrawPrice
          )} lpUSD. Click Ok to go back.`,
          "Withdraw"
        )
      );

      setWithdrawPrice("");
      setRequired(false);
      setWithdrawMessage("Enter an amount");
      dispatch(RefreshAuctionData(wallet, userAuthority));
    } catch (err) {
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Withdraw failed. Click Ok to go back and try again.",
          "Withdraw"
        )
      );
    }
  };
};

const getLiquidatorData = async (liquidator, cbsprogram) => {
  return await cbsprogram.account.userAccount.fetch(liquidator);
};

export const liquidate = (wallet, userKey) => {
  return async (dispatch) => {
    try {
      dispatch(
        setContracts(
          true,
          true,
          "progress",
          "Start liquidation...",
          "liquidate"
        )
      );

      const auctionLpusd = poolLpusd;
      const auctionLpsol = poolLpsol;
      const auctionLpbtc = poolLpbtc;
      const auctionLpeth = poolLpeth;

      const auctionBtc = poolBtc;
      const auctionUsdc = poolUsdc;
      const auctionMsol = poolMsol;
      const auctionEth = poolEth;
      const auctionUst = poolUst;
      const auctionSrm = poolSrm;
      const auctionScnsol = poolScnsol;
      const auctionStsol = poolStsol;
      const auctionUsdt = poolUsdt;

      const cbsLpusd = CBS_Constants.poolLpusd;
      const cbsLpsol = CBS_Constants.poolLpsol;
      const cbsLpbtc = CBS_Constants.poolLpbtc;
      const cbsLpeth = CBS_Constants.poolLpeth;

      const cbsUsdc = CBS_Constants.poolUsdc;
      const cbsBtc = CBS_Constants.poolBtc;
      const cbsMsol = CBS_Constants.poolMsol;
      const cbsEth = CBS_Constants.poolEth;
      const cbsUst = CBS_Constants.poolUst;
      const cbsSrm = CBS_Constants.poolSrm;
      const cbsScnsol = CBS_Constants.poolScnsol;
      const cbsStsol = CBS_Constants.poolStsol;
      const cbsUsdt = CBS_Constants.poolUsdt;

      const swapAccount = SWAP_Constants.stateAccount;
      const swapLpusd = SWAP_Constants.poolLpusd;
      const swapLpsol = SWAP_Constants.poolLpsol;
      const swapLpbtc = SWAP_Constants.poolLpbtc;
      const swapLpeth = SWAP_Constants.poolLpeth;

      const swapBtc = SWAP_Constants.poolBtc;
      const swapUsdc = SWAP_Constants.poolUsdc;
      const swapMsol = SWAP_Constants.poolMsol;
      const swapEth = SWAP_Constants.poolEth;
      const swapUst = SWAP_Constants.poolUst;
      const swapSrm = SWAP_Constants.poolSrm;
      const swapScnsol = SWAP_Constants.poolScnsol;
      const swapStsol = SWAP_Constants.poolStsol;
      const swapUsdt = SWAP_Constants.poolUsdt;

      const cbsAccount = CBS_Constants.stateAccount;
      const cbsProgram = new PublicKey(cbs_idl.metadata.address);
      const swapProgram = new PublicKey(swap_idl.metadata.address);
      const auctionAccount = stateAccount;

      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(cbs_idl.metadata.address);

      const program = new anchor.Program(cbs_idl, programId);

      const auctionProgramId = new PublicKey(idl.metadata.address);
      const auctionProgram = new anchor.Program(idl, auctionProgramId);

      const liquidatorKey = new PublicKey(userKey);

      const [liquidatorAccount, liquidatorAccountBump] =
        await PublicKey.findProgramAddress(
          [
            Buffer.from(CBS_Constants.cbs_name),
            Buffer.from(liquidatorKey.toBuffer()),
          ],
          program.programId
        );

      const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
        [Buffer.from(auction_name), Buffer.from(liquidatorKey.toBuffer())],
        auctionProgram.programId
      );

      const liquidator = liquidatorAccount;

      const liquidatorData = await getLiquidatorData(liquidator, program);

      if (liquidatorData.bump === 0 || liquidatorData.bump > 10) {
        await auctionProgram.rpc.liquidateFromCbs({
          accounts: {
            userAuthority,
            stateAccount,
            config,
            liquidator,
            cbsAccount,
            cbsProgram,
            auctionBtc,
            auctionMsol,
            auctionUsdc,
            auctionEth,
            cbsBtc,
            cbsMsol,
            cbsUsdc,
            cbsEth,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });
      }

      if (liquidatorData.bump <= 1 || liquidatorData.bump > 10) {
        await auctionProgram.rpc.liquidateSecondFromCbs({
          accounts: {
            userAuthority,
            config,
            liquidator,
            cbsAccount,
            cbsProgram,
            auctionUst,
            auctionSrm,
            auctionScnsol,
            auctionStsol,
            auctionUsdt,
            cbsUst,
            cbsSrm,
            cbsScnsol,
            cbsStsol,
            cbsUsdt,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });
      }

      if (liquidatorData.bump <= 2 || liquidatorData.bump > 10) {
        await auctionProgram.rpc.liquidateLptokenFromCbs({
          accounts: {
            userAuthority,
            stateAccount,
            config,
            liquidator,
            cbsAccount,
            cbsProgram,
            auctionLpusd,
            auctionLpsol,
            auctionLpbtc,
            auctionLpeth,
            cbsLpusd,
            cbsLpsol,
            cbsLpbtc,
            cbsLpeth,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });
      }

      if (liquidatorData.bump <= 3 || liquidatorData.bump > 10) {
        await auctionProgram.rpc.liquidate({
          accounts: {
            userAuthority,
            stateAccount,
            config,
            liquidator,
            cbsProgram,
            swapProgram,
            swapLpsol,
            swapLpbtc,
            swapLpeth,
            lpbtcMint,
            lpethMint,
            lpsolMint,
            lpusdMint,
            auctionLpusd,
            cbsLpusd,
            cbsLpsol,
            cbsLpbtc,
            cbsLpeth,
            userAccount,
            pythBtcAccount,
            pythUsdcAccount,
            pythSolAccount,
            pythMsolAccount,
            pythEthAccount,
            pythUstAccount,
            pythSrmAccount,
            pythScnsolAccount,
            pythStsolAccount,
            pythUsdtAccount,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });
      }

      if (liquidatorData.bump <= 4 || liquidatorData.bump > 10) {
        await auctionProgram.rpc.liquidateSwap({
          accounts: {
            userAuthority,
            stateAccount,
            config,
            liquidator,
            swapAccount,
            cbsProgram,
            swapProgram,
            lpusdMint,
            swapBtc,
            swapUsdc,
            swapMsol,
            swapEth,
            swapUst,
            swapScnsol,
            swapStsol,
            swapUsdt,
            swapSrm,
            auctionBtc,
            auctionUsdc,
            auctionMsol,
            auctionEth,
            auctionUst,
            auctionSrm,
            auctionScnsol,
            auctionStsol,
            auctionUsdt,
            userAccount,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });
      }

      if (liquidatorData.bump <= 5 || liquidatorData.bump > 10) {
        await auctionProgram.rpc.liquidateSecondSwap({
          accounts: {
            userAuthority,
            stateAccount,
            config,
            liquidator,
            swapAccount,
            cbsProgram,
            swapProgram,
            lpusdMint,
            swapLpusd,
            swapLpsol,
            swapLpbtc,
            swapLpeth,
            auctionLpusd,
            auctionLpsol,
            auctionLpbtc,
            auctionLpeth,
            userAccount,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });
      }
      dispatch(
        setContracts(
          true,
          false,
          "success",
          `Successfully liquidated. Click Ok to go back.`,
          "liquidate"
        )
      );
    } catch (err) {
      console.log(err);
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "liquidate failed. Click Ok to go back and try again.",
          "liquidate"
        )
      );
    }
  };
};
