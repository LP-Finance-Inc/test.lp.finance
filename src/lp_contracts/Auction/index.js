import * as anchor from "@project-serum/anchor";
import getProvider from "../../lib/helpers/getProvider";
import { RefreshAuctionData } from "../../helper/RefreshData";
import idl from "../../lib/idls/lpusd_auction.json";
import cbs_idl from "../../lib/idls/cbs_protocol.json";
import swap_idl from "../../lib/idls/lpfinance_swap.json";
import { convert_to_wei } from "../../lib/helpers/common";
import { setContracts } from "../../redux/actions";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import {
  lpusdMint,
  lpsolMint,
  pythBtcAccount,
  pythMsolAccount,
  pythUsdcAccount,
  pythSolAccount,
} from "../../lib/helpers/common";
import * as CBS_Constants from "../../lib/helpers/lp_constants/cbs_constants";
import * as SWAP_Constants from "../../lib/helpers/lp_constants/swap_constants";
import {
  poolUsdc,
  poolMsol,
  poolBtc,
  poolLpsol,
  poolLpusd,
  auction_name,
  stateAccount,
} from "../../lib/helpers/lp_constants/auction_constants";
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

    if (accountData == null || accountData == undefined) {
      try {
        await program.rpc.initUserAccount(userAccountBump, {
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

    if (accountData == null || accountData == undefined) {
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
      accountData.owner.toBase58() == userAuthority.toBase58()
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
            `Successfully deposited ${Amount} lpUSD. Click Ok to go back.`,
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

    console.log("WithdrawPrice", WithdrawPrice);

    try {
      const deposit_wei = convert_to_wei(WithdrawPrice);
      const deposit_amount = new anchor.BN(deposit_wei); // '100000000'

      await program.rpc.withdrawLpusd(deposit_amount, {
        accounts: {
          userAuthority,
          userLpusd,
          lpusdMint,
          stateAccount,
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
          `Successfully withdraw ${WithdrawPrice} lpUSD. Click Ok to go back.`,
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
      const auctionBtc = poolBtc;
      const auctionUsdc = poolUsdc;
      const auctionMsol = poolMsol;

      const cbsLpusd = CBS_Constants.poolLpusd;
      const cbsLpsol = CBS_Constants.poolLpsol;
      const cbsUsdc = CBS_Constants.poolUsdc;
      const cbsBtc = CBS_Constants.poolBtc;
      const cbsMsol = CBS_Constants.poolMsol;

      const swapAccount = SWAP_Constants.stateAccount;
      const swapLpusd = SWAP_Constants.poolLpusd;
      const swapLpsol = SWAP_Constants.poolLpsol;
      const swapBtc = SWAP_Constants.poolBtc;
      const swapUsdc = SWAP_Constants.poolUsdc;
      const swapMsol = SWAP_Constants.poolMsol;

      const cbsAccount = CBS_Constants.stateAccount;
      const cbsProgram = new PublicKey(cbs_idl.metadata.address);
      const swapProgram = new PublicKey(swap_idl.metadata.address);
      const auctionAccount = stateAccount;

      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);
      // address of deployed program
      const programId = new PublicKey(cbs_idl.metadata.address);
      // Generate the program client from cbs_idl.
      const program = new anchor.Program(cbs_idl, programId);

      const liquidatorKey = new PublicKey(userKey);
      const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
        [
          Buffer.from(CBS_Constants.cbs_name),
          Buffer.from(liquidatorKey.toBuffer()),
        ],
        program.programId
      );
      const liquidator = userAccount;

      const auctionProgramId = new PublicKey(idl.metadata.address);
      const auctionProgram = new anchor.Program(idl, auctionProgramId);

      await auctionProgram.rpc.liquidate({
        accounts: {
          userAuthority,
          auctionAccount,
          liquidator,
          cbsAccount,
          swapAccount,
          cbsProgram,
          swapProgram,
          swapLpusd,
          swapLpsol,
          swapBtc,
          swapUsdc,
          swapMsol,
          // btcMint,
          // usdcMint,
          lpsolMint,
          lpusdMint,
          auctionLpusd,
          auctionLpsol,
          auctionBtc,
          auctionUsdc,
          auctionMsol,
          cbsLpusd,
          cbsLpsol,
          cbsMsol,
          cbsUsdc,
          cbsBtc,
          pythBtcAccount,
          pythUsdcAccount,
          pythSolAccount,
          pythMsolAccount,
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
