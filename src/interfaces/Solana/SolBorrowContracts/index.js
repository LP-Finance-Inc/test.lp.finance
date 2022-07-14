import * as anchor from "@project-serum/anchor";
import { setContracts } from "../../../redux/actions";
import getProvider from "../../../lib/Solana/getProvider";
import { RefreshBorrowData } from "../../../helper/Solana/global";
import idl from "../../../lib/Solana/idls/cbs_protocol.json";
import accounts_idl from "../../../lib/Solana/idls/lpfinance_accounts.json";
import lptokens_idl from "../../../lib/Solana/idls/lpfinance_tokens.json";
import solend_idl from "../../../lib/Solana/idls/solend.json";
import apricot_idl from "../../../lib/Solana/idls/apricot.json";
import {
  lptokenStateAccount,
  lptokenConfig,
} from "../../../lib/Solana/Solana_constants/lptokens_constants";
import {
  configAccountKey,
  whiteListKey,
} from "../../../lib/Solana/Solana_constants/add_wallet_constants";
import { CeilMethod } from "../../../helper";
import { CalLTVFunction } from "../../../helper/Solana/BorrowHelper";
import {
  stateAccount,
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
  cbs_apricot_account,
  cbs_solend_account,
  cbsPDA,
} from "../../../lib/Solana/Solana_constants/cbs_constants";
import {
  convert_to_wei,
  lpSOLMint,
  lpUSDMint,
  LPFiMint,
  wSOLMint,
  mSOLMint,
  stSOLMint,
  scnSOLMint,
  RAYMint,
  SRMMint,
  pythRayAccount,
  pythSolAccount,
  pythMsolAccount,
  pythSrmAccount,
  pythScnsolAccount,
  pythStsolAccount,
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
import { LiquidityPool } from "../../../lib/Solana/Solana_constants/swap_constants";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

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

    const programId = new PublicKey(idl.metadata.address);

    const program = new anchor.Program(idl, programId);

    const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
      [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
      program.programId
    );

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(cbs_name)],
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
            tokenProgram: TOKEN_PROGRAM_ID,
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
      userAuthority
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

        console.log(collateralPool.toBase58());

        console.log(collateralMint.toBase58(), userCollateral.toBase58());

        await program.rpc.depositCollateral(deposit_amount, {
          accounts: {
            userAuthority,
            userCollateral,
            collateralMint,
            config: config,
            cbsPda: PDA[0],
            collateralPool,
            userAccount,
            solendConfig: solendConfig,
            solendAccount,
            solendPool,
            apricotConfig,
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

    const programId = new PublicKey(idl.metadata.address);

    const program = new anchor.Program(idl, programId);

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
      userAuthority
    );

    let accountData;
    try {
      accountData = await program.account.userAccount.fetch(userAccount);
    } catch (err) {
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
        const borrow_wei = convert_to_wei(amount);
        const borrow_amount = new anchor.BN(borrow_wei);
        const lptokenProgramId = new PublicKey(lptokens_idl.metadata.address);

        const configData = await program.account.config.fetch(config);

        await program.rpc.borrowLptoken(borrow_amount, {
          accounts: {
            userAuthority,
            userAccount,
            cbsPda: PDA[0],
            config: config,
            tokensState: lptokenStateAccount,
            lptokenConfig: lptokenConfig,
            userLptoken: userLptoken,
            collateralMint,
            pythRayAccount,
            pythSolAccount,
            pythMsolAccount,
            pythSrmAccount,
            pythScnsolAccount,
            pythStsolAccount,
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
      // address of deployed program
      const programId = new PublicKey(idl.metadata.address);
      // Generate the program client from IDL.
      const program = new anchor.Program(idl, programId);

      const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
        // [Buffer.from(cbs_name), Buffer.from(seed0), Buffer.from(seed1)],
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
        userAuthority
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
            pythRayAccount,
            pythSolAccount,
            pythMsolAccount,
            pythSrmAccount,
            pythScnsolAccount,
            pythStsolAccount,
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
      dispatch(setContracts(true, true, "progress", "Start Repay...", "Repay"));

      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);
      // address of deployed program
      const programId = new PublicKey(idl.metadata.address);
      // Generate the program client from IDL.
      const program = new anchor.Program(idl, programId);

      // Find PDA from `seed` for state account
      const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
        [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      let destMint = null;
      let destPool = null;

      if (TokenName === "lpUSD") {
        destMint = lpUSDMint;
        destPool = PoollpUSD;
      } else if (TokenName === "lpSOL") {
        destMint = lpSOLMint;
        destPool = PoollpSOL;
      } else if (TokenName === "wSOL") {
        destMint = wSOLMint;
        destPool = PoolwSOL;
      } else {
        dispatch(
          setContracts(
            true,
            false,
            "error",
            "Please select valid token. Click Ok to go back.",
            "Repay"
          )
        );
      }

      const userDest = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        destMint,
        userAuthority
      );

      // SOL decimal is 9
      const repay_wei = convert_to_wei(RepayAmount);
      const repay_amount = new anchor.BN(repay_wei); // '100000000'

      await program.rpc.repayToken(repay_amount, {
        accounts: {
          userAuthority,
          stateAccount,
          config: config,
          destMint,
          userDest,
          destPool,
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
          `Successfully Repay ${CeilMethod(
            RepayAmount
          )} ${TokenName}. Click Ok to go back`,
          "Repay"
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
      dispatch(
        setContracts(
          true,
          false,
          "error",
          "Repay failed. Click Ok to go back and try again.",
          "Repay"
        )
      );
    }
  };
};
