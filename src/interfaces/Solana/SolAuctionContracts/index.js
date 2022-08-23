import * as anchor from "@project-serum/anchor";
// import api from "../../../api";
// import axios from "axios";
import getProvider from "../../../lib/Solana/getProvider";
import { RefreshAuctionData } from "../../../helper/Solana/global";
import lpusd_auction_idl from "../../../lib/Solana/idls/lpusd_auction.json";
// import cbs_idl from "../../../lib/Solana/idls/cbs_protocol.json";
// import uniswap from "../../../lib/Solana/idls/uniswap.json";
import { setContracts } from "../../../redux/actions";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import { lpUSDMint, convert_to_wei } from "../../../lib/Solana/common";
// import * as COMMON from "../../../lib/Solana/common";
// import * as CBS_Constants from "../../../lib/Solana/Solana_constants/cbs_constants";
import * as SWAP_Constants from "../../../lib/Solana/Solana_constants/swap_constants";
import {
  auction_name,
  config,
  PoollpUSD,
} from "../../../lib/Solana/Solana_constants/auction_constants";
import { CeilMethod } from "../../../helper";
// import MomentTimezone from "moment-timezone";
// import {
//   getLastEpochProfitFun,
//   getAPYFun,
// } from "../../../utils/Solana/SolAuctionFun";

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
    const programId = new PublicKey(lpusd_auction_idl.metadata.address);
    // Generate the program client from IDL.
    const program = new anchor.Program(lpusd_auction_idl, programId);

    const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
      [Buffer.from(auction_name), Buffer.from(userAuthority.toBuffer())],
      program.programId
    );

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(auction_name)],
      program.programId
    );

    let accountData;
    try {
      accountData = await program.account.userAccount.fetch(userAccount);
    } catch (err) {
      accountData = null;
    }

    if (accountData == null || accountData === undefined) {
      try {
        await program.rpc.initUserAccount({
          accounts: {
            userAccount,
            userAuthority,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });
        accountData = await program.account.userAccount.fetch(userAccount);
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
      lpUSDMint,
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
            userAccount,
            auctionPda: PDA[0],
            config: config,
            lpusdMint: lpUSDMint,
            userLpusd,
            poolLpusd: PoollpUSD,
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
            `Successfully deposited ${CeilMethod(
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
    const programId = new PublicKey(lpusd_auction_idl.metadata.address);
    // Generate the program client from IDL.
    const program = new anchor.Program(lpusd_auction_idl, programId);

    const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
      [Buffer.from(auction_name), Buffer.from(userAuthority.toBuffer())],
      program.programId
    );

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(auction_name)],
      program.programId
    );

    const userLpusd = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      lpUSDMint,
      userAuthority
    );

    try {
      const withdraw_wei = convert_to_wei(WithdrawPrice);
      const withdraw_amount = new anchor.BN(withdraw_wei); // '100000000'

      await program.rpc.withdrawLpusd(withdraw_amount, {
        accounts: {
          userAuthority,
          userAccount,
          auctionPda: PDA[0],
          config: config,
          lpusdMint: lpUSDMint,
          userLpusd,
          poolLpusd: PoollpUSD,
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
          `Successfully withdraw ${CeilMethod(
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
      console.log(err);
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

export const liquidate = (
  wallet,
  userKey,
  Debt,
  Collateral,
  LTV,
  LiquidatorFunds,
  LastEpochProfit
) => {
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

      const userAuthority = wallet.publicKey;

      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(lpusd_auction_idl.metadata.address);

      const program = new anchor.Program(lpusd_auction_idl, programId);

      const stableswapProgramId = SWAP_Constants.StableSwap_programID;
      const testTokenProgramId = SWAP_Constants.TestToken_programID;

      const PDA = await PublicKey.findProgramAddress(
        [Buffer.from(auction_name)],
        program.programId
      );

      // const lpusdMint = COMMON.lpUSDMint;
      // const lpusdAta = auctionConfigData.poolLpusd;
      // const lpsolMint = COMMON.lpSOLMint;
      // const lpsolAta = auctionConfigData.poolLpsol;

      // const usdcMint = COMMON.USDCMint;
      // const usdcAta = auctionConfigData.poolUsdc;
      // const wsolMint = COMMON.wSOLMint;
      // const wsolAta = auctionConfigData.poolWsol;

      // const newDate = MomentTimezone().tz("America/New_York");
      // const Time = newDate.format();

      // const response = await axios.post(api.solana.deleteLiquidated, {
      //   Address: userKey,
      //   Debt: Debt,
      //   Collateral: Collateral,
      //   LTV: LTV,
      //   LiquidatorFunds: LiquidatorFunds,
      //   LastEpochProfit: LastEpochProfit,
      //   Time: Time,
      // });

      // if (response.status === 200) {
      //   dispatch(
      //     setContracts(
      //       true,
      //       false,
      //       "success",
      //       `Successfully liquidated. Click Ok to go back.`,
      //       "liquidate"
      //     )
      //   );

      //   dispatch({
      //     type: "DELETE_LIQUIDATE_ADDRESS",
      //     payload: {
      //       address: userKey,
      //     },
      //   });

      //   dispatch(RefreshAuctionData(wallet, userAuthority));
      //   dispatch(getLastEpochProfitFun());
      //   dispatch(getAPYFun());
      // }
    } catch (err) {
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
