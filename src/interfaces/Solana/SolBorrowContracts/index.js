import * as anchor from "@project-serum/anchor";
import { setContracts } from "../../../redux/actions";
import getProvider from "../../../lib/Solana/getProvider";
import { RefreshBorrowData } from "../../../helper/Solana/global";
import cbs_idl from "../../../lib/Solana/idls/cbs_protocol.json";
import stable_swap_idl from "../../../lib/Solana/idls/stable_swap.json";
import swap_router_idl from "../../../lib/Solana/idls/swap_router.json";
import lp_tokens_idl from "../../../lib/Solana/idls/lpfinance_tokens.json";
import solend_idl from "../../../lib/Solana/idls/solend.json";
import apricot_idl from "../../../lib/Solana/idls/apricot.json";
import {
  lptokenStateAccount,
  lptokenConfig,
} from "../../../lib/Solana/Solana_constants/lptokens_constants";
import { CeilMethod } from "../../../helper";
import { CalLTVFunction } from "../../../helper/Solana/BorrowHelper";
import {
  cbs_name,
  config,
  PoolwSOL,
  PoolmSOL,
  PoolscnSOL,
  PoolstSOL,
  PoolRAY,
  PoolSRM,
  PoolLPFi,
  PoollpSOL,
  PoollpUSD,
  StablelpUSDPool,
  StablelpSOLPool,
  LiquidityPool,
  cbs_apricot_account,
  cbs_solend_account,
} from "../../../lib/Solana/Solana_constants/cbs_constants";
import {
  convert_to_wei,
  convert_to_dy_wei,
  lpSOLMint,
  lpUSDMint,
  LPFiMint,
  wSOLMint,
  mSOLMint,
  stSOLMint,
  scnSOLMint,
  RAYMint,
  SRMMint,
  PYth_USDC_Account,
  PYth_RAY_Account,
  PYth_wSOL_Account,
  PYth_mSOL_Account,
  PYth_SRM_Account,
  PYth_scnSOL_Account,
  PYth_stSOL_Account,
} from "../../../lib/Solana/common";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import {
  solendConfig,
  solendAccount,
} from "../../../lib/Solana/Solana_constants/solend_constants";
import {
  apricotConfig,
  apricotAccount,
} from "../../../lib/Solana/Solana_constants/apricot_constants";
import * as APRICOT_Constants from "../../../lib/Solana/Solana_constants/apricot_constants";
import * as SOLEND_Constants from "../../../lib/Solana/Solana_constants/solend_constants";
import { SendDirectPushNotify } from "../../../utils/Solana/global";
import { Swap_router_name } from "../../../lib/Solana/Solana_constants/swap_constants";

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

export const depositCBS = (
  TokenName,
  wallet,
  amount,
  setAmount,
  setMessage,
  setRequired,
  TokenPriceList
) => {
  return async (dispatch) => {
    const userAuthority = wallet.publicKey;

    dispatch(
      setContracts(true, true, "progress", "Start Deposit...", "Deposit")
    );

    const provider = await getProvider(wallet);
    anchor.setProvider(provider);

    const programId = new PublicKey(cbs_idl.metadata.address);

    const program = new anchor.Program(cbs_idl, programId);

    const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
      [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
      program.programId
    );

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(cbs_name)],
      program.programId
    );

    const userLpusd = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      lpUSDMint,
      userAuthority,
      true
    );

    const userLpsol = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      lpSOLMint,
      userAuthority,
      true
    );

    let accountData;
    try {
      accountData = await program.account.userAccount.fetch(userAccount);
    } catch (err) {
      await program.rpc.initUserAccount({
        accounts: {
          userAccount,
          userAuthority: userAuthority,
          lpusdMint: lpUSDMint,
          lpsolMint: lpSOLMint,
          userLpusd,
          userLpsol,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
      accountData = await program.account.userAccount.fetch(userAccount);
    }

    let collateralMint = null;
    let collateralPool = null;
    let solendPool = SOLEND_Constants.PoolwSOL;
    let apricotPool = APRICOT_Constants.PoolwSOL;

    if (TokenName === "lpUSD") {
      collateralMint = lpUSDMint;
      collateralPool = PoollpUSD;
    } else if (TokenName === "lpSOL") {
      collateralMint = lpSOLMint;
      collateralPool = PoollpSOL;
    } else if (TokenName === "LPFi") {
      collateralMint = LPFiMint;
      collateralPool = PoolLPFi;
    } else if (TokenName === "wSOL") {
      collateralMint = wSOLMint;
      collateralPool = PoolwSOL;
      solendPool = SOLEND_Constants.PoolwSOL;
      apricotPool = APRICOT_Constants.PoolwSOL;
    } else if (TokenName === "mSOL") {
      collateralPool = PoolmSOL;
      collateralMint = mSOLMint;
      solendPool = SOLEND_Constants.PoolmSOL;
      apricotPool = APRICOT_Constants.PoolmSOL;
    } else if (TokenName === "SRM") {
      collateralPool = PoolSRM;
      collateralMint = SRMMint;
      solendPool = SOLEND_Constants.PoolSRM;
      apricotPool = APRICOT_Constants.PoolSRM;
    } else if (TokenName === "RAY") {
      collateralPool = PoolRAY;
      collateralMint = RAYMint;
      solendPool = SOLEND_Constants.PoolRAY;
      apricotPool = APRICOT_Constants.PoolRAY;
    } else if (TokenName === "scnSOL") {
      collateralPool = PoolscnSOL;
      collateralMint = scnSOLMint;
      solendPool = SOLEND_Constants.PoolscnSOL;
      apricotPool = APRICOT_Constants.PoolscnSOL;
    } else if (TokenName === "stSOL") {
      collateralPool = PoolstSOL;
      collateralMint = stSOLMint;
      solendPool = SOLEND_Constants.PoolstSOL;
      apricotPool = APRICOT_Constants.PoolstSOL;
    } else {
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Please select valid token. Click Ok to go back.",
          "Deposit"
        )
      );
    }

    const userCollateral = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      collateralMint,
      userAuthority,
      true
    );

    if (
      accountData &&
      accountData.owner.toBase58() === userAuthority.toBase58()
    ) {
      try {
        const deposit_wei = convert_to_wei(amount);
        const deposit_amount = new anchor.BN(deposit_wei);

        const solendProgram = new PublicKey(solend_idl.metadata.address);
        const apricotProgram = new PublicKey(apricot_idl.metadata.address);

        await program.rpc.depositCollateral(deposit_amount, {
          accounts: {
            userAuthority: userAuthority,
            userCollateral,
            collateralMint,
            config: config,
            cbsPda: PDA[0],
            collateralPool,
            userAccount,
            solendConfig: solendConfig,
            solendAccount,
            solendPool,
            apricotConfig: apricotConfig,
            apricotAccount,
            apricotPool,
            solendProgram,
            apricotProgram,
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
              amount
            )} ${TokenName} and Click Ok to go Back.`,
            "Deposit"
          )
        );

        setMessage("Enter an amount");
        setAmount("");
        setRequired(false);
        dispatch(RefreshBorrowData(wallet, userAuthority));

        const LTV = await CalLTVFunction(wallet, userAuthority, TokenPriceList);

        const ltv = LTV >= 0 ? LTV : 0;
        dispatch(
          SendDirectPushNotify(
            userAuthority,
            "LP Finance deposit confirmed",
            `${CeilMethod(
              amount
            )} ${TokenName} deposit confirmed! Your current LTV is ${ltv}%`
          )
        );
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

// borrow Lptoken
export const borrowCBS = (
  wallet,
  amount,
  setBorrowAmount,
  TokenName,
  setBorrowRequired,
  setBorrowMessage,
  TokenPriceList
) => {
  return async (dispatch) => {
    dispatch(setContracts(true, true, "progress", "Start Borrow...", "Borrow"));

    const userAuthority = wallet.publicKey;

    const provider = await getProvider(wallet);
    anchor.setProvider(provider);

    const programId = new PublicKey(cbs_idl.metadata.address);

    const program = new anchor.Program(cbs_idl, programId);

    const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
      [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
      program.programId
    );

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(cbs_name)],
      program.programId
    );

    let collateralMint = null;

    if (TokenName === "lpUSD") {
      collateralMint = lpUSDMint;
    } else if (TokenName === "lpSOL") {
      collateralMint = lpSOLMint;
    } else {
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Please select valid token. Click Ok to go back.",
          "Borrow"
        )
      );
    }

    const userLptoken = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      collateralMint,
      userAuthority,
      true
    );

    let accountData;
    try {
      accountData = await program.account.userAccount.fetch(userAccount);
    } catch (err) {
      console.log(err);
      accountData = null;
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Borrow failed. Click Ok to go back and try again.",
          "Borrow"
        )
      );

      return;
    }

    if (
      accountData &&
      accountData.owner.toBase58() === userAuthority.toBase58()
    ) {
      try {
        const borrow_wei = convert_to_dy_wei(amount, 1e5);
        const borrow_amount = new anchor.BN(borrow_wei);
        const lptokenProgramId = new PublicKey(lp_tokens_idl.metadata.address);

        await program.rpc.borrowLptoken(borrow_amount, {
          accounts: {
            userAuthority: userAuthority,
            userAccount,
            cbsPda: PDA[0],
            config: config,
            tokensState: lptokenStateAccount,
            lptokenConfig: lptokenConfig,
            userLptoken: userLptoken,
            stableLpusdPool: StablelpUSDPool,
            stableLpsolPool: StablelpSOLPool,
            lptokenMint: collateralMint,
            pythUsdcAccount: PYth_USDC_Account,
            pythRayAccount: PYth_RAY_Account,
            pythSolAccount: PYth_wSOL_Account,
            pythMsolAccount: PYth_mSOL_Account,
            pythSrmAccount: PYth_SRM_Account,
            pythScnsolAccount: PYth_scnSOL_Account,
            pythStsolAccount: PYth_stSOL_Account,
            solendConfig: solendConfig,
            apricotConfig: apricotConfig,
            liquidityPool: LiquidityPool,
            lptokensProgram: lptokenProgramId,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });

        dispatch(
          setContracts(
            true,
            false,
            "success",
            `Successfully borrowed ${CeilMethod(
              amount
            )} ${TokenName}. Click Ok to go back`,
            "Borrow"
          )
        );
        setBorrowRequired(false);
        setBorrowAmount("");
        setBorrowMessage("Borrow");
        dispatch(RefreshBorrowData(wallet, userAuthority));

        const LTV = await CalLTVFunction(wallet, userAuthority, TokenPriceList);

        const ltv = LTV >= 0 ? LTV : 0;
        dispatch(
          SendDirectPushNotify(
            userAuthority,
            "LP Finance borrow confirmed",
            `${CeilMethod(
              amount
            )} ${TokenName} borrow confirmed! Your current LTV is ${ltv}%`
          )
        );
      } catch (err) {
        console.log(err);
        dispatch(
          setContracts(
            true,
            false,
            "error",
            "Borrow failed. Click Ok to go back and try again.",
            "Borrow"
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
          "Borrow"
        )
      );
    }
  };
};

export const withdraw_token = (
  wallet,
  WithdrawAmount,
  TokenName,
  setWithdrawAmount,
  setWithdrawMessage,
  setRequired,
  TokenPriceList
) => {
  return async (dispatch) => {
    try {
      dispatch(
        setContracts(true, true, "progress", "Start Withdraw...", "Withdraw")
      );

      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(cbs_idl.metadata.address);

      const program = new anchor.Program(cbs_idl, programId);

      const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
        [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const PDA = await PublicKey.findProgramAddress(
        [Buffer.from(cbs_name)],
        program.programId
      );

      let destMint = null;
      let destPool = null;
      let solendPool = SOLEND_Constants.PoolwSOL;
      let apricotPool = APRICOT_Constants.PoolwSOL;

      if (TokenName === "lpUSD") {
        destMint = lpUSDMint;
        destPool = PoollpUSD;
      } else if (TokenName === "lpSOL") {
        destMint = lpSOLMint;
        destPool = PoollpSOL;
      } else if (TokenName === "LPFi") {
        destMint = LPFiMint;
        destPool = PoolLPFi;
      } else if (TokenName === "wSOL") {
        destMint = wSOLMint;
        destPool = PoolwSOL;
        solendPool = SOLEND_Constants.PoolwSOL;
        apricotPool = APRICOT_Constants.PoolwSOL;
      } else if (TokenName === "mSOL") {
        destPool = PoolmSOL;
        destMint = mSOLMint;
        solendPool = SOLEND_Constants.PoolmSOL;
        apricotPool = APRICOT_Constants.PoolmSOL;
      } else if (TokenName === "SRM") {
        destPool = PoolSRM;
        destMint = SRMMint;
        solendPool = SOLEND_Constants.PoolSRM;
        apricotPool = APRICOT_Constants.PoolSRM;
      } else if (TokenName === "RAY") {
        destPool = PoolRAY;
        destMint = RAYMint;
        solendPool = SOLEND_Constants.PoolRAY;
        apricotPool = APRICOT_Constants.PoolRAY;
      } else if (TokenName === "scnSOL") {
        destPool = PoolscnSOL;
        destMint = scnSOLMint;
        solendPool = SOLEND_Constants.PoolscnSOL;
        apricotPool = APRICOT_Constants.PoolscnSOL;
      } else if (TokenName === "stSOL") {
        destPool = PoolstSOL;
        destMint = stSOLMint;
        solendPool = SOLEND_Constants.PoolstSOL;
        apricotPool = APRICOT_Constants.PoolstSOL;
      } else {
        dispatch(
          setContracts(
            true,
            false,
            "error",
            "Please select valid token. Click Ok to go back.",
            "Withdraw"
          )
        );
      }

      const userDest = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        destMint,
        userAuthority,
        true
      );

      try {
        const withdraw_wei = convert_to_wei(WithdrawAmount);
        const withdraw_amount = new anchor.BN(withdraw_wei);
        const solendProgram = new PublicKey(solend_idl.metadata.address);
        const apricotProgram = new PublicKey(apricot_idl.metadata.address);

        await program.rpc.withdrawToken(withdraw_amount, {
          accounts: {
            userAuthority,
            userAccount,
            cbsPda: PDA[0],
            config: config,
            userDest,
            destPool,
            destMint,
            stableLpsolPool: StablelpSOLPool,
            stableLpusdPool: StablelpUSDPool,
            pythUsdcAccount: PYth_USDC_Account,
            pythRayAccount: PYth_RAY_Account,
            pythSolAccount: PYth_wSOL_Account,
            pythMsolAccount: PYth_mSOL_Account,
            pythSrmAccount: PYth_SRM_Account,
            pythScnsolAccount: PYth_scnSOL_Account,
            pythStsolAccount: PYth_stSOL_Account,
            liquidityPool: LiquidityPool,
            solendConfig,
            solendAccount,
            solendStateAccount: SOLEND_Constants.stateAccount,
            solendPool,
            apricotConfig,
            apricotAccount,
            apricotPool,
            apricotStateAccount: APRICOT_Constants.stateAccount,
            solendProgram,
            apricotProgram,
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
            `Successfully Withdrew ${CeilMethod(
              WithdrawAmount
            )} ${TokenName}. Click Ok to go back`,
            "Withdraw"
          )
        );

        setWithdrawAmount("");
        setWithdrawMessage("Enter an amount");
        setRequired(false);
        dispatch(RefreshBorrowData(wallet, userAuthority));

        const LTV = await CalLTVFunction(wallet, userAuthority, TokenPriceList);

        const ltv = LTV >= 0 ? LTV : 0;
        dispatch(
          SendDirectPushNotify(
            userAuthority,
            "LP Finance withdraw confirmed",
            `${CeilMethod(
              WithdrawAmount
            )} ${TokenName} withdraw confirmed! Your current LTV is ${ltv}%`
          )
        );
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

export const repay_token = (
  wallet,
  RepayAmount,
  TokenName,
  setRepayAmount,
  setRepayMessage,
  setRequired,
  TokenPriceList
) => {
  return async (dispatch) => {
    try {
      dispatch(
        setContracts(true, true, "progress", "Start Repayment...", "Repayment")
      );

      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(cbs_idl.metadata.address);

      const program = new anchor.Program(cbs_idl, programId);

      let destMint = null;

      if (TokenName === "lpUSD") {
        destMint = lpUSDMint;
      } else if (TokenName === "lpSOL") {
        destMint = lpSOLMint;
      } else if (TokenName === "wSOL") {
        destMint = wSOLMint;
      } else {
        dispatch(
          setContracts(
            true,
            false,
            "error",
            "Please select valid token. Click Ok to go back.",
            "Repayment"
          )
        );
      }

      const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
        [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const userDest = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        destMint,
        userAuthority,
        true
      );

      let accountData;
      try {
        accountData = await program.account.userAccount.fetch(userAccount);
      } catch (err) {
        console.log(err);
        accountData = null;
        dispatch(
          setContracts(
            true,
            false,
            "error",
            "Repayment failed. Click Ok to go back and try again.",
            "Repayment"
          )
        );

        return;
      }

      if (
        accountData &&
        accountData.owner.toBase58() === userAuthority.toBase58()
      ) {
        // SOL decimal is 9
        const repay_wei = convert_to_wei(RepayAmount);
        const repay_amount = new anchor.BN(repay_wei); // '100000000'

        await program.rpc.repayToken(repay_amount, {
          accounts: {
            userAuthority: userAuthority,
            userAccount,
            config: config,
            tokenSrc: destMint,
            userAtaSrc: userDest,
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
            `Successfully Repayment ${CeilMethod(
              RepayAmount
            )} ${TokenName}. Click Ok to go back`,
            "Repayment"
          )
        );
        setRepayAmount("");
        setRepayMessage("Enter an amount");
        setRequired(false);
        dispatch(RefreshBorrowData(wallet, userAuthority));

        const LTV = await CalLTVFunction(wallet, userAuthority, TokenPriceList);

        const ltv = LTV >= 0 ? LTV : 0;

        dispatch(
          SendDirectPushNotify(
            userAuthority,
            "LP Finance repayment confirmed",
            `${CeilMethod(
              RepayAmount
            )} ${TokenName} repayment confirmed! Your current LTV is ${ltv}%`
          )
        );
      } else {
        dispatch(
          setContracts(
            true,
            false,
            "error",
            "Repayment failed. Click Ok to go back and try again.",
            "Repayment"
          )
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Repayment failed. Click Ok to go back and try again.",
          "Repayment"
        )
      );
    }
  };
};

export const repay_wSOL = (
  wallet,
  RepayAmount,
  TokenName,
  setRepayAmount,
  setRepayMessage,
  setRequired,
  TokenPriceList
) => {
  return async (dispatch) => {
    try {
      dispatch(
        setContracts(true, true, "progress", "Start Repayment...", "Repayment")
      );

      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(cbs_idl.metadata.address);

      const program = new anchor.Program(cbs_idl, programId);

      const cbsConfigData = await program.account.config.fetch(config);

      const tokenSrc = cbsConfigData.wsolMint;
      const tokenDest = cbsConfigData.lpsolMint;
      const cbsAtaDest = cbsConfigData.poolLpsol;

      const swapAtaSrc = await getATAPublicKey(tokenSrc, StablelpSOLPool);
      const swapAtaDest = await getATAPublicKey(tokenDest, StablelpSOLPool);

      const userAtaSrc = await getATAPublicKey(tokenSrc, userAuthority);

      const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
        [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const PDA = await PublicKey.findProgramAddress(
        [Buffer.from(cbs_name)],
        program.programId
      );

      const cbsAtaSrc = await getATAPublicKey(tokenSrc, PDA[0]);

      const swapRouterProgramId = new PublicKey(
        swap_router_idl.metadata.address
      );

      const stableSwapProgramId = new PublicKey(
        stable_swap_idl.metadata.address
      );

      const swap_escrow_pool_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_router_name), PDA[0].toBuffer()],
        swapRouterProgramId
      );

      // SOL decimal is 9
      const repay_wei = convert_to_wei(RepayAmount);
      const repay_amount = new anchor.BN(repay_wei); // '100000000'

      await program.rpc.repayWsol(repay_amount, {
        accounts: {
          userAuthority: userAuthority,
          userAccount,
          config: config,
          swapEscrow: swap_escrow_pool_pda[0],
          stableSwapPool: StablelpSOLPool,
          tokenSrc,
          tokenDest,
          userAtaSrc,
          cbsAtaSrc,
          cbsAtaDest,
          swapAtaSrc,
          swapAtaDest,
          cbsPda: PDA[0],
          swapProgram: swapRouterProgramId,
          stableswapProgram: stableSwapProgramId,
          systemProgram: SystemProgram.programId,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
      dispatch(
        setContracts(
          true,
          false,
          "success",
          `Successfully Repayment ${CeilMethod(
            RepayAmount
          )} ${TokenName}. Click Ok to go back`,
          "Repayment"
        )
      );
      setRepayAmount("");
      setRepayMessage("Enter an amount");
      setRequired(false);
      dispatch(RefreshBorrowData(wallet, userAuthority));

      const LTV = await CalLTVFunction(wallet, userAuthority, TokenPriceList);

      const ltv = LTV >= 0 ? LTV : 0;

      dispatch(
        SendDirectPushNotify(
          userAuthority,
          "LP Finance repayment confirmed",
          `${CeilMethod(
            RepayAmount
          )} ${TokenName} repayment confirmed! Your current LTV is ${ltv}%`
        )
      );
    } catch (err) {
      console.log(err);
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Repayment failed. Click Ok to go back and try again.",
          "Repayment"
        )
      );
    }
  };
};
