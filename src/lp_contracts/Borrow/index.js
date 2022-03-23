import * as anchor from "@project-serum/anchor";
import { setSnackbar } from "../../helper/setSnackbar";
import { setContracts } from "../../redux/actions";
import idl from "../../lib/idls/cbs_protocol.json";
import getProvider from "../../lib/helpers/getProvider";
import { RefreshBorrowData } from "../../helper/RefreshData";
import accounts_idl from "../../lib/idls/lpfinance_accounts.json";
import {
  bumps,
  stateAccount,
  poolUsdc,
  poolBtc,
  poolMsol,
  poolLpsol,
  poolLpusd,
  cbs_name,
} from "../../lib/helpers/lp_constants/cbs_constants";
import {
  lpsolMint,
  lpusdMint,
  usdcMint,
  btcMint,
  msolMint,
  pythBtcAccount,
  pythUsdcAccount,
  pythSolAccount,
  pythMsolAccount,
  convert_to_wei,
} from "../../lib/helpers/common";
import {
  configAccountKey,
  whiteListKey,
} from "../../lib/helpers/lp_constants/add_wallet_constants";
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

          const userLpusd = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            lpusdMint,
            userAuthority
          );

          const userLpsol = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            lpsolMint,
            userAuthority
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
                  userLpusd,
                  lpusdMint,
                  userLpsol,
                  lpsolMint,
                  stateAccount,
                  userAuthority,
                  systemProgram: SystemProgram.programId,
                  tokenProgram: TOKEN_PROGRAM_ID,
                  associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
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

          if (accountData == null || accountData == undefined) {
            return;
          }

          if (
            accountData &&
            accountData.owner.toBase58() == userAuthority.toBase58()
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
                  config: configAccountKey,
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

    if (userAuthority) {
      if (
        depositTokenName === "lpUSD" ||
        depositTokenName === "lpSOL" ||
        depositTokenName === "tUSDC" ||
        depositTokenName === "tBTC" ||
        depositTokenName === "tmSOL"
      ) {
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

          const userLpusd = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            lpusdMint,
            userAuthority
          );

          const userLpsol = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            lpsolMint,
            userAuthority
          );

          if (accountData == null || accountData == undefined) {
            try {
              await program.rpc.initUserAccount(userAccountBump, {
                accounts: {
                  userAccount,
                  userLpusd,
                  lpusdMint,
                  userLpsol,
                  lpsolMint,
                  stateAccount,
                  userAuthority,
                  systemProgram: SystemProgram.programId,
                  tokenProgram: TOKEN_PROGRAM_ID,
                  associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
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

          if (accountData == null || accountData == undefined) {
            return;
          }

          let collateralMint = null;
          let collateralPool = null;
          let poolSeed = null;
          let poolBump = 0;
          if (depositTokenName == "lpUSD") {
            collateralMint = lpusdMint;
            collateralPool = poolLpusd;
            poolSeed = "pool_lpusd";
            poolBump = bumps.poolLpusd;
          } else if (depositTokenName == "lpSOL") {
            collateralMint = lpsolMint;
            collateralPool = poolLpsol;
            poolSeed = "pool_lpsol";
            poolBump = bumps.poolLpsol;
          } else if (depositTokenName == "tUSDC") {
            collateralMint = usdcMint;
            collateralPool = poolUsdc;
            poolSeed = "pool_usdc";
            poolBump = bumps.poolUsdc;
          } else if (depositTokenName == "tBTC") {
            collateralPool = poolBtc;
            collateralMint = btcMint;
            poolSeed = "pool_btc";
            poolBump = bumps.poolBtc;
          } else if (depositTokenName == "tmSOL") {
            collateralPool = poolMsol;
            collateralMint = msolMint;
            poolSeed = "pool_msol";
            poolBump = bumps.poolMsol;
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
            accountData.owner.toBase58() == userAuthority.toBase58()
          ) {
            try {
              const deposit_wei = convert_to_wei(amount);
              const deposit_amount = new anchor.BN(deposit_wei);

              const accountsProgram = new PublicKey(
                accounts_idl.metadata.address
              );

              await program.rpc.depositCollateral(
                deposit_amount,
                poolBump,
                poolSeed,
                {
                  accounts: {
                    userAuthority,
                    userCollateral,
                    collateralMint,
                    stateAccount,
                    collateralPool,
                    userAccount,
                    whitelist: whiteListKey,
                    config: configAccountKey,
                    accountsProgram,
                    systemProgram: SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    rent: SYSVAR_RENT_PUBKEY,
                  },
                }
              );

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
        } else {
          dispatch(setSnackbar(true, "info", "Please enter amount"));
        }
      } else {
        dispatch(setSnackbar(true, "info", "Please select a Token"));
      }
    } else {
      dispatch(setSnackbar(true, "info", "Please connect a wallet"));
    }
  };
};

// borrow Lptoken
export const borrowLpToken = (
  isLpUSD,
  wallet,
  amount,
  setBorrowAmount,
  TokenName,
  setBorrowRequired,
  setBorrowMessage
) => {
  return async (dispatch) => {
    const userAuthority = wallet.publicKey;
    if (userAuthority) {
      if (TokenName === "lpUSD" || TokenName === "lpSOL") {
        if (amount > 0) {
          dispatch(
            setContracts(true, true, "progress", "Start borrow...", "Borrow")
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

          const userLptoken = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            isLpUSD ? lpusdMint : lpsolMint,
            userAuthority
          );

          const collateralMint = isLpUSD ? lpusdMint : lpsolMint;

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
            accountData.owner.toBase58() == userAuthority.toBase58()
          ) {
            try {
              const borrow_wei = convert_to_wei(amount);
              const borrow_amount = new anchor.BN(borrow_wei);

              await program.rpc.borrowLptoken(isLpUSD, borrow_amount, {
                accounts: {
                  userAuthority,
                  userAccount,
                  stateAccount,
                  userCollateral: userLptoken,
                  collateralMint,
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
                  `Successfully borrowed ${amount} ${
                    isLpUSD ? "lpUSD" : "lpSOL"
                  }. Click Ok to go back`,
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
        } else {
          dispatch(setSnackbar(true, "info", "Please enter amount"));
        }
      } else {
        dispatch(setSnackbar(true, "info", "Select a Token"));
      }
    } else {
      dispatch(setSnackbar(true, "info", "Please connect a wallet"));
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
      if (TokenName == "lpUSD") {
        destMint = lpusdMint;
        destPool = poolLpusd;
      } else if (TokenName == "lpSOL") {
        destMint = lpsolMint;
        destPool = poolLpsol;
      } else if (TokenName == "tUSDC") {
        destMint = usdcMint;
        destPool = poolUsdc;
      } else if (TokenName == "tBTC") {
        destMint = btcMint;
        destPool = poolBtc;
      } else if (TokenName == "tmSOL") {
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
            userDest,
            destPool,
            destMint,
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
      if (TokenName == "lpUSD") {
        destMint = lpusdMint;
        destPool = poolLpusd;
      } else if (TokenName == "lpSOL") {
        destMint = lpsolMint;
        destPool = poolLpsol;
      } else if (TokenName == "tUSDC") {
        destMint = usdcMint;
        destPool = poolUsdc;
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
