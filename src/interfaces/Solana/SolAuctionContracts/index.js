import * as anchor from "@project-serum/anchor";
import api from "../../../api";
import axios from "axios";
import getProvider from "../../../lib/Solana/getProvider";
import { RefreshAuctionData } from "../../../helper/Solana/global";
import lpusd_auction_idl from "../../../lib/Solana/idls/lpusd_auction.json";
import cbs_idl from "../../../lib/Solana/idls/cbs_protocol.json";
import auction_idl from "../../../lib/Solana/idls/lpusd_auction.json";
import { setContracts } from "../../../redux/actions";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import { lpUSDMint, convert_to_wei } from "../../../lib/Solana/common";
import * as COMMON from "../../../lib/Solana/common";
import * as CBS_Constants from "../../../lib/Solana/Solana_constants/cbs_constants";
import * as SWAP_Constants from "../../../lib/Solana/Solana_constants/swap_constants";
import * as AUCTION_Constants from "../../../lib/Solana/Solana_constants/auction_constants";
import * as SOLEND_Constants from "../../../lib/Solana/Solana_constants/solend_constants";
import * as APRICOT_Constants from "../../../lib/Solana/Solana_constants/apricot_constants";
import * as LENDING_Constants from "../../../lib/Solana/Solana_constants/lending_constants";
import * as TESTTOKENS_Constants from "../../../lib/Solana/Solana_constants/test_tokens.constants";
import {
  auction_name,
  config,
} from "../../../lib/Solana/Solana_constants/auction_constants";
import { CeilMethod } from "../../../helper";
import MomentTimezone from "moment-timezone";
import {
  getLastEpochProfitFun,
  getAPYFun,
} from "../../../utils/Solana/SolAuctionFun";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

export const getATAPublicKey = async (tokenMint, owner) => {
  return await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    tokenMint,
    owner,
    true
  );
};

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
            poolLpusd: AUCTION_Constants.PoollpUSD,
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
          poolLpusd: AUCTION_Constants.PoollpUSD,
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
      const UniswapProgramId = SWAP_Constants.Uniswap_programID;

      const PDA = await PublicKey.findProgramAddress(
        [Buffer.from(auction_name)],
        program.programId
      );

      const lpusdMint = COMMON.lpUSDMint;
      const lpusdAta = AUCTION_Constants.PoollpUSD;
      const lpsolMint = COMMON.lpSOLMint;
      const lpsolAta = AUCTION_Constants.PoollpSOL;

      const usdcMint = COMMON.USDCMint;
      const usdcAta = AUCTION_Constants.PoolUSDC;
      const wsolMint = COMMON.wSOLMint;
      const wsolAta = AUCTION_Constants.PoolwSol;

      const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
        [Buffer.from(auction_name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const cbsProgramId = new PublicKey(cbs_idl.metadata.address);
      const cbsProgram = new anchor.Program(cbs_idl, programId);

      const [cbsAccount, cbsBump] = await PublicKey.findProgramAddress(
        [
          Buffer.from(CBS_Constants.cbs_name),
          Buffer.from(userAuthority.toBuffer()),
        ],
        cbsProgramId
      );

      const cbsAccountData = await cbsProgram.account.userAccount.fetch(
        cbsAccount
      );

      const cbsConfigData = await program.account.config.fetch(
        CBS_Constants.config
      );

      if (cbsAccountData.stepNum === 0) {
        if (
          cbsAccountData.lendingRayAmount.toString() !== "0" ||
          cbsAccountData.lendingWsolAmount.toString() !== "0" ||
          cbsAccountData.lendingMsolAmount.toString() !== "0" ||
          cbsAccountData.lendingSrmAmount.toString() !== "0" ||
          cbsAccountData.lendingScnsolAmount.toString() !== "0" ||
          cbsAccountData.lendingStsolAmount.toString() !== "0"
        ) {
          dispatch(
            setContracts(
              true,
              true,
              "progress",
              "You should withdraw Lending amount to avoid overflow collaterals",
              "liquidate"
            )
          );
          return;
        }

        const userData = await cbsProgram.views.getLtv({
          accounts: {
            userAccount,
            stableLpsolPool: CBS_Constants.StablelpSOLPool,
            stableLpusdPool: CBS_Constants.StablelpUSDPool,
            pythUsdcAccount: COMMON.PYth_USDC_Account,
            pythRayAccount: COMMON.PYth_RAY_Account,
            pythSolAccount: COMMON.PYth_wSOL_Account,
            pythMsolAccount: COMMON.PYth_mSOL_Account,
            pythSrmAccount: COMMON.PYth_SRM_Account,
            pythScnsolAccount: COMMON.PYth_scnSOL_Account,
            pythStsolAccount: COMMON.PYth_stSOL_Account,
            liquidityPool: CBS_Constants.LiquidityPool,
            solendConfig: SOLEND_Constants.solendConfig,
            apricotConfig: APRICOT_Constants.apricotConfig,
          },
        });
        const LTV = userData[0];
        if (Number(LTV) < 94) {
          dispatch(
            setContracts(
              true,
              true,
              "progress",
              "You cannot Liquidate",
              "liquidate"
            )
          );
          return;
        }

        // STEP: 1
        await program.rpc.burnLpusdLiquidate({
          accounts: {
            userAuthority: userAuthority,
            owner: userAuthority,
            userAccount,
            auctionPda: PDA[0],
            config: config,
            cbsAccount,
            lpusdMint,
            lpusdAta,
            lpsolMint,
            lpsolAta,
            stableLpsolPool: CBS_Constants.StablelpSOLPool,
            stableLpusdPool: CBS_Constants.StablelpUSDPool,
            pythUsdcAccount: COMMON.PYth_USDC_Account,
            pythRayAccount: COMMON.PYth_RAY_Account,
            pythSolAccount: COMMON.PYth_wSOL_Account,
            pythMsolAccount: COMMON.PYth_mSOL_Account,
            pythSrmAccount: COMMON.PYth_SRM_Account,
            pythScnsolAccount: COMMON.PYth_scnSOL_Account,
            pythStsolAccount: COMMON.PYth_stSOL_Account,
            liquidityPool: CBS_Constants.LiquidityPool,
            cbsProgram: cbsProgramId,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });
      }

      const stableswapPoolAtaLpsol = await getATAPublicKey(
        lpsolMint,
        CBS_Constants.StablelpSOLPool
      );
      const stableswapPoolAtaLpusd = await getATAPublicKey(
        lpusdMint,
        CBS_Constants.StablelpUSDPool
      );
      const stableswapPoolAtaUsdc = await getATAPublicKey(
        usdcMint,
        CBS_Constants.StablelpUSDPool
      );
      const stableswapPoolAtaWsol = await getATAPublicKey(
        wsolMint,
        CBS_Constants.StablelpSOLPool
      );

      const tokenStateAccount = LENDING_Constants.lendingStateAccount;

      if (cbsAccountData.stepNum === 1) {
        const tx2 = await program.rpc.burnLpsolLiquidate1({
          accounts: {
            owner: userAuthority,
            userAccount,
            cbsAccount,
            auctionPda: PDA[0],
            stableLpsolPool: CBS_Constants.StablelpSOLPool,
            stableLpusdPool: CBS_Constants.StablelpUSDPool,
            tokenStateAccount,
            tokenLpusd: lpusdMint,
            tokenUsdc: usdcMint,
            tokenWsol: wsolMint,
            pythUsdc: COMMON.PYth_USDC_Account,
            pythWsol: COMMON.PYth_wSOL_Account,
            auctionAtaLpusd: lpusdAta,
            auctionAtaUsdc: usdcAta,
            auctionAtaWsol: wsolAta,
            stableswapPoolAtaLpusd: stableswapPoolAtaLpusd,
            stableswapPoolAtaUsdc: stableswapPoolAtaUsdc,
            testtokensProgram: testTokenProgramId,
            stableswapProgram: stableswapProgramId,
            cbsProgram: cbsProgramId,
            systemProgram: SystemProgram.programId,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });

        console.log("Burn usdc to wSOL", tx2);
        dispatch(
          setContracts(true, true, "progress", "Burn usdc to wSOL", "liquidate")
        );
      }

      // STEP: 3
      if (cbsAccountData.stepNum == 2) {
        const tx3 = await program.rpc.burnLpsolLiquidate2({
          accounts: {
            owner: userAuthority,
            userAccount,
            cbsAccount,
            auctionPda: PDA[0],
            stableLpsolPool: CBS_Constants.StablelpSOLPool,
            tokenLpsol: lpsolMint,
            tokenWsol: wsolMint,
            auctionAtaLpsol: lpsolAta,
            auctionAtaWsol: wsolAta,
            stableswapPoolAtaLpsol: stableswapPoolAtaLpsol,
            stableswapPoolAtaWsol: stableswapPoolAtaWsol,
            stableswapProgram: stableswapProgramId,
            cbsProgram: cbsProgramId,
            systemProgram: anchor.web3.SystemProgram.programId,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });

        console.log("Burn LpSOL successfully", tx3);
        dispatch(
          setContracts(
            true,
            true,
            "progress",
            "Burn LpSOL successfully",
            "liquidate"
          )
        );
      }

      const auctionProgramId = new PublicKey(auction_idl.metadata.address);

      const auctionProgram = new anchor.Program(auction_idl, auctionProgramId);

      const auctionConfigData = await auctionProgram.account.config.fetch(
        config
      );
      const auctionLpusd = auctionConfigData.poolLpusd;

      const cbs_PDA = await PublicKey.findProgramAddress(
        [Buffer.from(CBS_Constants.cbs_name)],
        program.programId
      );

      let tokenDatas = [
        {
          destMint: COMMON.RAYMint,
          cbsPool: CBS_Constants.PoolRAY,
          pythSrc: COMMON.PYth_RAY_Account,
        },
        {
          destMint: COMMON.wSOLMint,
          cbsPool: CBS_Constants.PoolwSOL,
          pythSrc: COMMON.PYth_wSOL_Account,
        },
        {
          destMint: COMMON.mSOLMint,
          cbsPool: CBS_Constants.PoolmSOL,
          pythSrc: COMMON.PYth_mSOL_Account,
        },
        {
          destMint: COMMON.SRMMint,
          cbsPool: CBS_Constants.PoolSRM,
          pythSrc: COMMON.PYth_SRM_Account,
        },
        {
          destMint: COMMON.scnSOLMint,
          cbsPool: CBS_Constants.PoolscnSOL,
          pythSrc: COMMON.PYth_scnSOL_Account,
        },
        {
          destMint: COMMON.stSOLMint,
          cbsPool: CBS_Constants.PoolstSOL,
          pythSrc: COMMON.PYth_stSOL_Account,
        },
      ];

      if (cbsAccountData.stepNum === 3 || cbsAccountData.stepNum === 4) {
        for (let i = 0; i < tokenDatas.length; i++) {
          let tokenData = tokenDatas[i];
          if (
            tokenData.destMint === cbsConfigData.rayMint &&
            cbsAccountData.rayAmount.toString() === "0"
          ) {
            console.log("ray Liquidated already");
            continue;
          }
          if (
            tokenData.destMint === cbsConfigData.wsolMint &&
            cbsAccountData.wsolAmount.toString() === "0"
          ) {
            console.log("wsol Liquidated already");
            continue;
          }
          if (
            tokenData.destMint === cbsConfigData.msolMint &&
            cbsAccountData.msolAmount.toString() === "0"
          ) {
            console.log("msol Liquidated already");
            continue;
          }
          if (
            tokenData.destMint === cbsConfigData.srmMint &&
            cbsAccountData.srmAmount.toString() === "0"
          ) {
            console.log("srm Liquidated already");
            continue;
          }
          if (
            tokenData.destMint === cbsConfigData.scnsolMint &&
            cbsAccountData.scnsolAmount.toString() === "0"
          ) {
            console.log("scnsol Liquidated already");
            continue;
          }
          if (
            tokenData.destMint === cbsConfigData.stsolMint &&
            cbsAccountData.stsolAmount.toString() === "0"
          ) {
            console.log("stsol Liquidated already");
            continue;
          }

          try {
            const tx = await program.rpc.liquidateSwapNormaltoken({
              accounts: {
                userAccount: cbsAccount,
                cbsPda: cbs_PDA[0],
                config: CBS_Constants.config,
                stableSwapPool: CBS_Constants.StablelpUSDPool,
                tokenStateAccount: TESTTOKENS_Constants.test_StateAccount,
                pythSrc: tokenData.pythSrc,
                pythUsdc: COMMON.PYth_USDC_Account,
                tokenSrc: tokenData.destMint,
                tokenUsdc: COMMON.USDCMint,
                tokenLpusd: cbsConfigData.lpusdMint,
                cbsAtaSrc: tokenData.cbsPool,
                cbsAtaUsdc: CBS_Constants.EscrowUSDC,
                cbsAtaLpusd: cbsConfigData.poolLpusd,
                auctionAtaLpusd: auctionLpusd,
                stableswapPoolAtaLpusd,
                stableswapPoolAtaUsdc,
                stableswapProgram: stableswapProgramId,
                testtokensProgram: testTokenProgramId,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                rent: SYSVAR_RENT_PUBKEY,
              },
            });

            console.log("Deposit successfully", tx);
          } catch (e) {
            console.log(
              "Failed",
              tokenData.destMint.toBase58(),
              tokenData.cbsPool.toBase58(),
              e
            );
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
        }
      } else {
        console.log("You already passed this liquidation step");
      }

      if (cbsAccountData.stepNum === 4) {
        if (
          cbsAccountData.rayAmount.toString() !== "0" ||
          cbsAccountData.wsolAmount.toString() !== "0" ||
          cbsAccountData.msolAmount.toString() !== "0" ||
          cbsAccountData.scnsolAmount.toString() !== "0" ||
          cbsAccountData.srmAmount.toString() !== "0" ||
          cbsAccountData.stsolAmount.toString() !== "0"
        ) {
          dispatch(
            setContracts(
              true,
              true,
              "progress",
              "You need to liquidate the normal tokens first",
              "liquidate"
            )
          );
          return;
        }

        const tx = await program.rpc.liquidateSwapLpsoltoken1({
          accounts: {
            userAccount: cbsAccount,
            cbsPda: cbs_PDA[0],
            config: CBS_Constants.config,
            stableSwapPool: CBS_Constants.StablelpSOLPool,
            tokenStateAccount: TESTTOKENS_Constants.test_StateAccount,
            pythWsol: COMMON.PYth_wSOL_Account,
            pythUsdc: COMMON.PYth_USDC_Account,
            tokenWsol: cbsConfigData.wsolMint,
            tokenLpsol: cbsConfigData.lpsolMint,
            tokenUsdc: COMMON.USDCMint,
            cbsAtaWsol: cbsConfigData.poolWsol,
            cbsAtaUsdc: CBS_Constants.EscrowUSDC,
            cbsAtaLpsol: cbsConfigData.poolLpsol,
            stableswapPoolAtaLpsol,
            stableswapPoolAtaWsol,
            stableswapProgram: stableswapProgramId,
            testtokensProgram: testTokenProgramId,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });

        dispatch(
          setContracts(
            true,
            true,
            "progress",
            "Liquidate lpsol->wsol->usdc successfully",
            "liquidate"
          )
        );
      }

      if (cbsAccountData.stepNum === 5) {
        const tx2 = await program.rpc.liquidateSwapLpsoltoken2({
          accounts: {
            userAccount: cbsAccount,
            cbsPda: cbs_PDA[0],
            stableSwapPool: CBS_Constants.StablelpUSDPool,
            tokenUsdc: COMMON.USDCMint,
            tokenLpusd: cbsConfigData.lpusdMint,
            cbsAtaUsdc: CBS_Constants.EscrowUSDC,
            cbsAtaLpusd: cbsConfigData.poolLpusd,
            auctionLpusd: auctionLpusd,
            stableswapPoolAtaLpusd,
            stableswapPoolAtaUsdc,
            stableswapProgram: stableswapProgramId,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });

        dispatch(
          setContracts(
            true,
            true,
            "progress",
            "Liquidate lpsol->lpusd successfully",
            "liquidate"
          )
        );
      }

      const UniswapPool = SWAP_Constants.LPFi_USDC_Pool;
      const uniswapPoolAtaLpfi = await getATAPublicKey(
        cbsConfigData.lpfiMint,
        UniswapPool
      );

      const uniswapPoolAtaUsdc = await getATAPublicKey(
        COMMON.USDCMint,
        UniswapPool
      );

      if (cbsAccountData.stepNum === 6) {
        const tx = await program.rpc.liquidateSwapLpfitoken({
          accounts: {
            userAccount: cbsAccount,
            cbsPda: cbs_PDA[0],
            stableSwapPool: CBS_Constants.StablelpUSDPool,
            uniswapPool: CBS_Constants.LiquidityPool,
            tokenLpfi: cbsConfigData.lpfiMint,
            tokenUsdc: COMMON.USDCMint,
            tokenLpusd: cbsConfigData.lpusdMint,
            escrowAtaUsdc: CBS_Constants.EscrowUSDC,
            cbsAtaLpusd: cbsConfigData.poolLpusd,
            cbsAtaLpfi: cbsConfigData.poolLpfi,
            auctionLpusd: auctionLpusd,
            uniswapPoolAtaLpfi,
            uniswapPoolAtaUsdc,
            stableswapPoolAtaLpusd,
            stableswapPoolAtaUsdc,
            stableswapProgram: stableswapProgramId,
            uniswapProgram: UniswapProgramId,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });

        dispatch(
          setContracts(
            true,
            true,
            "progress",
            "Liquidate lpfi->lpusd successfully",
            "liquidate"
          )
        );
      } else {
        console.log("You already passed LpFI liquidation step");
      }

      // STEP: 7
      const tx7 = await program.rpc.distributeRewardFromLiquidate({
        accounts: {
          owner: userAuthority,
          config,
          cbsAccount,
          auctionPda: PDA[0],
          cbsProgram: cbsProgramId,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      console.log("Distribute reward successfully", tx7);

      if (tx7) {
        const newDate = MomentTimezone().tz("America/New_York");
        const Time = newDate.format();

        const response = await axios.post(api.solana.deleteLiquidated, {
          Address: userKey,
          Debt: Debt,
          Collateral: Collateral,
          LTV: LTV,
          LiquidatorFunds: LiquidatorFunds,
          LastEpochProfit: LastEpochProfit,
          Time: Time,
        });

        if (response.status === 200) {
          dispatch(
            setContracts(
              true,
              false,
              "success",
              `Distribute reward successfully. Click Ok to go back.`,
              "liquidate"
            )
          );

          dispatch({
            type: "DELETE_LIQUIDATE_ADDRESS",
            payload: {
              address: userKey,
            },
          });

          dispatch(RefreshAuctionData(wallet, userAuthority));
          dispatch(getLastEpochProfitFun());
          dispatch(getAPYFun());
        }
      }
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
