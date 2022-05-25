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
  poolUsdc,
  poolBtc,
  poolMsol,
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
  cbs_name,
  config,
} from "../../../lib/Solana/Solana_constants/cbs_constants";
import {
  convert_to_wei,
  lpsolMint,
  lpusdMint,
  lpbtcMint,
  lpethMint,
  usdcMint,
  btcMint,
  msolMint,
  ethMint,
  ustMint,
  srmMint,
  scnsolMint,
  stsolMint,
  usdtMint,
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
const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

// Enter depositing
export const depositing = (
  TokenName,
  wallet,
  amount,
  setAmount,
  setMessage,
  setRequired,
  TokenPriceList
) => {
  return async (dispatch) => {
    console.log(TokenPriceList);
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

    let accountData;
    try {
      accountData = await program.account.userAccount.fetch(userAccount);
    } catch (err) {
      accountData = null;
    }

    if (accountData == null || accountData === undefined) {
      try {
        await program.rpc.initUserAccount(userAccountBump, {
          accounts: {
            userAccount,
            stateAccount,
            userAuthority,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });
        accountData = await program.account.userAccount.fetch(userAccount);
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

    if (accountData == null || accountData === undefined) {
      return;
    }

    if (
      accountData &&
      accountData.owner.toBase58() === userAuthority.toBase58()
    ) {
      const accountsProgram = new PublicKey(accounts_idl.metadata.address);
      try {
        const deposit_wei = convert_to_wei(amount);
        const deposit_amount = new anchor.BN(deposit_wei);

        await program.rpc.depositSol(deposit_amount, {
          accounts: {
            userAuthority,
            stateAccount,
            userAccount,
            whitelist: whiteListKey,
            config: config,
            whitelistConfig: configAccountKey,
            accountsProgram,
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
            )} SOL. Click Ok to go back.`,
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

export const deposit_tokens = (
  depositTokenName,
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

    let accountData;
    try {
      accountData = await program.account.userAccount.fetch(userAccount);
    } catch (err) {
      accountData = null;
    }

    if (accountData == null || accountData === undefined) {
      try {
        await program.rpc.initUserAccount(userAccountBump, {
          accounts: {
            userAccount,
            stateAccount,
            userAuthority,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });
        accountData = await program.account.userAccount.fetch(userAccount);
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

    if (accountData == null || accountData === undefined) {
      return;
    }

    let collateralMint = null;
    let collateralPool = null;
    let solendPool = SOLEND_Constants.poolUsdc;
    let apricotPool = APRICOT_Constants.poolUsdc;

    if (depositTokenName === "lpUSD") {
      collateralMint = lpusdMint;
      collateralPool = poolLpusd;
    } else if (depositTokenName === "lpSOL") {
      collateralMint = lpsolMint;
      collateralPool = poolLpsol;
    } else if (depositTokenName === "lpBTC") {
      collateralMint = lpbtcMint;
      collateralPool = poolLpbtc;
    } else if (depositTokenName === "lpETH") {
      collateralMint = lpethMint;
      collateralPool = poolLpeth;
    } else if (depositTokenName === "USDC") {
      collateralMint = usdcMint;
      collateralPool = poolUsdc;
      solendPool = SOLEND_Constants.poolUsdc;
      apricotPool = APRICOT_Constants.poolUsdc;
    } else if (depositTokenName === "BTC") {
      collateralPool = poolBtc;
      collateralMint = btcMint;
      solendPool = SOLEND_Constants.poolBtc;
      apricotPool = APRICOT_Constants.poolBtc;
    } else if (depositTokenName === "mSOL") {
      collateralPool = poolMsol;
      collateralMint = msolMint;
      solendPool = SOLEND_Constants.poolMsol;
      apricotPool = APRICOT_Constants.poolMsol;
    } else if (depositTokenName === "ETH") {
      collateralPool = poolEth;
      collateralMint = ethMint;
      solendPool = SOLEND_Constants.poolEth;
      apricotPool = APRICOT_Constants.poolEth;
    } else if (depositTokenName === "UST") {
      collateralMint = ustMint;
      collateralPool = poolUst;
      solendPool = SOLEND_Constants.poolUst;
      apricotPool = APRICOT_Constants.poolUsdt;
    } else if (depositTokenName === "SRM") {
      collateralPool = poolSrm;
      collateralMint = srmMint;
      solendPool = SOLEND_Constants.poolSrm;
      apricotPool = APRICOT_Constants.poolSrm;
    } else if (depositTokenName === "scnSOL") {
      collateralPool = poolScnsol;
      collateralMint = scnsolMint;
      solendPool = SOLEND_Constants.poolScnsol;
      apricotPool = APRICOT_Constants.poolScnsol;
    } else if (depositTokenName === "stSOL") {
      collateralPool = poolStsol;
      collateralMint = stsolMint;
      solendPool = SOLEND_Constants.poolStsol;
      apricotPool = APRICOT_Constants.poolStsol;
    } else if (depositTokenName === "USDT") {
      collateralPool = poolUsdt;
      collateralMint = usdtMint;
      solendPool = SOLEND_Constants.poolUsdt;
      apricotPool = APRICOT_Constants.poolUsdt;
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

        const accountsProgram = new PublicKey(accounts_idl.metadata.address);
        const solendProgram = new PublicKey(solend_idl.metadata.address);
        const apricotProgram = new PublicKey(apricot_idl.metadata.address);

        await program.rpc.depositCollateral(deposit_amount, {
          accounts: {
            userAuthority,
            userCollateral,
            collateralMint,
            stateAccount,
            config: config,
            collateralPool,
            userAccount,
            solendConfig,
            solendAccount,
            solendPool,
            apricotConfig,
            apricotAccount,
            apricotPool,
            solendProgram,
            apricotProgram,
            whitelist: whiteListKey,
            accountsConfig: configAccountKey,
            accountsProgram,
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
            )} ${depositTokenName} and Click Ok to go Back.`,
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
            )} ${depositTokenName} deposit confirmed! Your current LTV is ${ltv}%`
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
export const borrowLpToken = (
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

    let collateralMint = null;
    if (TokenName === "lpUSD") {
      collateralMint = lpusdMint;
    } else if (TokenName === "lpBTC") {
      collateralMint = lpbtcMint;
    } else if (TokenName === "lpETH") {
      collateralMint = lpethMint;
    } else if (TokenName === "lpSOL") {
      collateralMint = lpsolMint;
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
        const lptokensProgram = new PublicKey(lptokens_idl.metadata.address);

        const configData = await program.account.config.fetch(config);

        await program.rpc.borrowLptoken(borrow_amount, {
          accounts: {
            userAuthority,
            userAccount,
            stateAccount,
            tokensState: lptokenStateAccount,
            config: config,
            lptokenConfig: lptokenConfig,
            userCollateral: userLptoken,
            collateralMint,
            pythBtcAccount,
            pythUsdcAccount,
            pythEthAccount,
            pythSolAccount,
            pythMsolAccount,
            pythUstAccount,
            pythSrmAccount,
            pythScnsolAccount,
            pythStsolAccount,
            pythUsdtAccount,
            lptokensProgram,
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

export const withdraw_sol = (
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

      const programId = new PublicKey(idl.metadata.address);

      const program = new anchor.Program(idl, programId);

      const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
        [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      try {
        const withdraw_wei = convert_to_wei(WithdrawAmount);
        const withdraw_amount = new anchor.BN(withdraw_wei);

        await program.rpc.withdrawSol(withdraw_amount, {
          accounts: {
            userAuthority,
            userAccount,
            stateAccount,
            config: config,
            pythBtcAccount,
            pythUsdcAccount,
            pythSolAccount,
            pythEthAccount,
            pythMsolAccount,

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

      let destMint = null;
      let destPool = null;
      let solendPool = SOLEND_Constants.poolUsdc;
      let apricotPool = APRICOT_Constants.poolUsdc;

      if (TokenName === "lpUSD") {
        destMint = lpusdMint;
        destPool = poolLpusd;
      } else if (TokenName === "lpSOL") {
        destMint = lpsolMint;
        destPool = poolLpsol;
      } else if (TokenName === "lpBTC") {
        destMint = lpbtcMint;
        destPool = poolLpbtc;
      } else if (TokenName === "lpETH") {
        destMint = ethMint;
        destPool = poolEth;
      } else if (TokenName === "USDC") {
        destMint = usdcMint;
        destPool = poolUsdc;
        solendPool = SOLEND_Constants.poolUsdc;
        apricotPool = APRICOT_Constants.poolUsdc;
      } else if (TokenName === "BTC") {
        destMint = btcMint;
        destPool = poolBtc;
        solendPool = SOLEND_Constants.poolBtc;
        apricotPool = APRICOT_Constants.poolBtc;
      } else if (TokenName === "mSOL") {
        destMint = msolMint;
        destPool = poolMsol;
        solendPool = SOLEND_Constants.poolMsol;
        apricotPool = APRICOT_Constants.poolMsol;
      } else if (TokenName === "ETH") {
        destMint = ethMint;
        destPool = poolEth;
        solendPool = SOLEND_Constants.poolEth;
        apricotPool = APRICOT_Constants.poolEth;
      } else if (TokenName === "UST") {
        destMint = ustMint;
        destPool = poolUst;
        solendPool = SOLEND_Constants.poolUst;
        apricotPool = APRICOT_Constants.poolUsdt;
      } else if (TokenName === "SRM") {
        destMint = srmMint;
        destPool = poolSrm;
        solendPool = SOLEND_Constants.poolSrm;
        apricotPool = APRICOT_Constants.poolSrm;
      } else if (TokenName === "scnSOL") {
        destMint = scnsolMint;
        destPool = poolScnsol;
        solendPool = SOLEND_Constants.poolScnsol;
        apricotPool = APRICOT_Constants.poolScnsol;
      } else if (TokenName === "stSOL") {
        destMint = stsolMint;
        destPool = poolStsol;
        solendPool = SOLEND_Constants.poolStsol;
        apricotPool = APRICOT_Constants.poolStsol;
      } else if (TokenName === "USDT") {
        destMint = usdtMint;
        destPool = poolUsdt;
        solendPool = SOLEND_Constants.poolUsdt;
        apricotPool = APRICOT_Constants.poolUsdt;
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
            stateAccount,
            config: config,
            userDest,
            destPool,
            destMint,
            pythBtcAccount,
            pythUsdcAccount,
            pythSolAccount,
            pythEthAccount,
            pythMsolAccount,

            pythUstAccount,
            pythSrmAccount,
            pythScnsolAccount,
            pythStsolAccount,
            pythUsdtAccount,
            solendConfig,
            solendPool,
            solendAccount,
            solendStateAccount: SOLEND_Constants.stateAccount,
            apricotConfig,
            apricotAccount,
            apricotPool,
            solendProgram,
            apricotProgram,
            apricotStateAccount: APRICOT_Constants.stateAccount,
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

export const repay_sol = (
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

      const programId = new PublicKey(idl.metadata.address);

      const program = new anchor.Program(idl, programId);

      const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
        [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const repay_wei = convert_to_wei(RepayAmount);
      const repay_amount = new anchor.BN(repay_wei);

      await program.rpc.repaySol(repay_amount, {
        accounts: {
          userAuthority,
          stateAccount,
          config: config,
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
        destMint = lpusdMint;
        destPool = poolLpusd;
      } else if (TokenName === "lpSOL") {
        destMint = lpsolMint;
        destPool = poolLpsol;
      } else if (TokenName === "lpBTC") {
        destMint = lpbtcMint;
        destPool = poolLpbtc;
      } else if (TokenName === "lpETH") {
        destMint = lpethMint;
        destPool = poolLpeth;
      } else if (TokenName === "USDC") {
        destMint = usdcMint;
        destPool = poolUsdc;
      } else if (TokenName === "ETH") {
        destMint = ethMint;
        destPool = poolEth;
      } else if (TokenName === "BTC") {
        destMint = btcMint;
        destPool = poolBtc;
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
