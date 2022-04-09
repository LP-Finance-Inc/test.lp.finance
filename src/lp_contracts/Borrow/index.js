import * as anchor from "@project-serum/anchor";
import { setSnackbar } from "../../helper/setSnackbar";
import { setContracts } from "../../redux/actions";
import idl from "../../lib/idls/cbs_protocol.json";
import getProvider from "../../lib/helpers/getProvider";
import { RefreshBorrowData } from "../../helper/RefreshData";
import accounts_idl from "../../lib/idls/lpfinance_accounts.json";
import lptokens_idl from "../../lib/idls/lpfinance_tokens.json";
import {
  lptokenStateAccount,
  lptokenConfig,
} from "../../lib/helpers/lp_constants/lptokens_constants";
import {
  configAccountKey,
  whiteListKey,
} from "../../lib/helpers/lp_constants/add_wallet_constants";

import {
  stateAccount,
  poolUsdc,
  poolBtc,
  poolMsol,
  poolEth,
  poolLpsol,
  poolLpusd,
  poolLpbtc,
  config,
  poolLpeth,
  cbs_name,
} from "../../lib/helpers/lp_constants/cbs_constants";
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
  pythBtcAccount,
  pythUsdcAccount,
  pythSolAccount,
  pythMsolAccount,
  pythEthAccount,
} from "../../lib/helpers/common";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

// Enter depositing
export const depositing = (
  TokenName,
  wallet,
  amount,
  setAmount,
  setMessage,
  setRequired
) => {
  return async (dispatch) => {
    const userAuthority = wallet.publicKey;
    if (userAuthority) {
      if (TokenName === "SOL") {
        if (amount > 0) {
          dispatch(
            setContracts(true, true, "progress", "Start Deposit...", "Deposit")
          );

          const provider = await getProvider(wallet);
          anchor.setProvider(provider);

          const programId = new PublicKey(idl.metadata.address);

          const program = new anchor.Program(idl, programId);

          const [userAccount, userAccountBump] =
            await PublicKey.findProgramAddress(
              [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
              program.programId
            );

          let accountData;
          try {
            accountData = await program.account.userAccount.fetch(userAccount);
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
                  rent: SYSVAR_RENT_PUBKEY,
                },
              });
              accountData = await program.account.userAccount.fetch(
                userAccount
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
          }

          if (accountData == null || accountData === undefined) {
            return;
          }

          if (
            accountData &&
            accountData.owner.toBase58() === userAuthority.toBase58()
          ) {
            const accountsProgram = new PublicKey(
              accounts_idl.metadata.address
            );
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
                  `Successfully deposited ${amount} SOL. Click Ok to go back.`,
                  "Deposit"
                )
              );

              setMessage("Enter an amount");
              setAmount("");
              setRequired(false);
              dispatch(RefreshBorrowData(wallet, userAuthority));
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
        } else {
          dispatch(setSnackbar(true, "info", "Please enter amount"));
        }
      } else {
        dispatch(setSnackbar(true, "info", "Please Select a Token"));
      }
    } else {
      dispatch(setSnackbar(true, "info", "Please connect a wallet"));
    }
  };
};

export const deposit_tokens = (
  depositTokenName,
  wallet,
  amount,
  setAmount,
  setMessage,
  setRequired
) => {
  return async (dispatch) => {
    const userAuthority = wallet.publicKey;

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

    if (accountData == null || accountData == undefined) {
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
    } else if (depositTokenName === "BTC") {
      collateralPool = poolBtc;
      collateralMint = btcMint;
    } else if (depositTokenName === "mSOL") {
      collateralPool = poolMsol;
      collateralMint = msolMint;
    } else if (depositTokenName === "ETH") {
      collateralPool = poolEth;
      collateralMint = ethMint;
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

        await program.rpc.depositCollateral(deposit_amount, {
          accounts: {
            userAuthority,
            userCollateral,
            collateralMint,
            stateAccount,
            config: config,
            collateralPool,
            userAccount,
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
            `Successfully deposited ${amount} ${depositTokenName} and Click Ok to go Back.`,
            "Deposit"
          )
        );

        setMessage("Enter an amount");
        setAmount("");
        setRequired(false);

        dispatch(RefreshBorrowData(wallet, userAuthority));
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
  setBorrowMessage
) => {
  return async (dispatch) => {
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
          "Deposit"
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
            `Successfully borrowed ${amount} ${TokenName}. Click Ok to go back`,
            "Borrow"
          )
        );
        setBorrowRequired(false);
        setBorrowAmount("");
        setBorrowMessage("Borrow");
        dispatch(RefreshBorrowData(wallet, userAuthority));
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
  setRequired
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
            `Successfully Withdrew ${WithdrawAmount} ${TokenName}. Click Ok to go back`,
            "Withdraw"
          )
        );

        setWithdrawAmount("");
        setWithdrawMessage("Enter an amount");
        setRequired(false);
        dispatch(RefreshBorrowData(wallet, userAuthority));
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
  setRequired
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
      } else if (TokenName === "BTC") {
        destMint = btcMint;
        destPool = poolBtc;
      } else if (TokenName === "mSOL") {
        destMint = msolMint;
        destPool = poolMsol;
      } else if (TokenName === "ETH") {
        destMint = msolMint;
        destPool = poolMsol;
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
            `Successfully Withdrew ${WithdrawAmount} ${TokenName}. Click Ok to go back`,
            "Withdraw"
          )
        );

        setWithdrawAmount("");
        setWithdrawMessage("Enter an amount");
        setRequired(false);
        dispatch(RefreshBorrowData(wallet, userAuthority));
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
  setRequired
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
          `Successfully Repay ${RepayAmount} ${TokenName}. Click Ok to go back`,
          "Repay"
        )
      );
      setRepayAmount("");
      setRepayMessage("Enter an amount");
      setRequired(false);
      dispatch(RefreshBorrowData(wallet, userAuthority));
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
  setRequired
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
          `Successfully Repay ${RepayAmount} ${TokenName}. Click Ok to go back`,
          "Repay"
        )
      );
      setRepayAmount("");
      setRepayMessage("Enter an amount");
      setRequired(false);
      dispatch(RefreshBorrowData(wallet, userAuthority));
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
