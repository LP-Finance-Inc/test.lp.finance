import * as anchor from "@project-serum/anchor";
// import { setContracts } from "../../../redux/actions";
import getProvider from "../../../lib/Solana/getProvider";
import swap_router_idl from "../../../lib/Solana/idls/swap_router.json";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  Swap__Name,
  Swap_PYth_Name,
  LPFi_USDC_Pool,
  lpSOL_wSOL_Pool,
  lpUSD_USDC_Pool,
  StableSwap_programID,
  Uniswap_programID,
  TestToken_programID,
  StableSwap_lpUSD_USDC,
  StableSwap_lpSOL_wSOL,
  Uniswap_LPFi_USDC,
  Pool_lpUSD,
  Pool_lpSOL,
  Pool_LPFi,
  Pool_mSOL,
  Pool_wSOL,
  Pool_stSOL,
  Pool_USDC,
  Pool_RAY,
  Pool_scnSOL,
  Pool_SRM,
} from "../../../lib/Solana/Solana_constants/swap_constants";
import {
  PYth_wSOL_Account,
  PYth_mSOL_Account,
  PYth_stSOL_Account,
  PYth_scnSOL_Account,
  PYth_USDC_Account,
  PYth_wBTC_Account,
  PYth_wETH_Account,
  PYth_RAY_Account,
  PYth_SRM_Account,
  PYth_AVAX_Account,
  PYth_FIDA_Account,
  PYth_FTT_Account,
  PYth_FTM_Account,
  PYth_GMT_Account,
  PYth_MATIC_Account,
  PYth_USDT_Account,
  lpSOLMint,
  lpUSDMint,
  LPFiMint,
  wSOLMint,
  mSOLMint,
  stSOLMint,
  scnSOLMint,
  USDCMint,
  wBTCMint,
  wETHMint,
  RAYMint,
  SRMMint,
  AVAXMint,
  FIDAMint,
  FTTMint,
  FTMMint,
  GMTMint,
  LUNAMint,
  MATICMint,
  USDTMint,
} from "../../../lib/Solana/common";
import { convert_to_wei } from "../../../lib/Solana/common";
const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

const getPYthMint = (token_name) => {
  if (token_name === "wSOL") return PYth_wSOL_Account;
  if (token_name === "mSOL") return PYth_mSOL_Account;
  if (token_name === "stSOL") return PYth_stSOL_Account;
  if (token_name === "scnSOL") return PYth_scnSOL_Account;
  if (token_name === "USDC") return PYth_USDC_Account;
  if (token_name === "wBTC") return PYth_wBTC_Account;
  if (token_name === "wETH") return PYth_wETH_Account;
  if (token_name === "RAY") return PYth_RAY_Account;
  if (token_name === "SRM") return PYth_SRM_Account;
  if (token_name === "AVAX") return PYth_AVAX_Account;
  if (token_name === "FIDA") return PYth_FIDA_Account;
  if (token_name === "FTT") return PYth_FTT_Account;
  if (token_name === "FTM") return PYth_FTM_Account;
  if (token_name === "GMT") return PYth_GMT_Account;
  if (token_name === "MATIC") return PYth_MATIC_Account;
  if (token_name === "USDT") return PYth_USDT_Account;

  return "";
};

const getTokenMint = (token_name) => {
  if (token_name === "USDC") return USDCMint;
  if (token_name === "wBTC") return wBTCMint;
  if (token_name === "wETH") return wETHMint;
  if (token_name === "scnSOL") return scnSOLMint;
  if (token_name === "stSOL") return stSOLMint;
  if (token_name === "lpSOL") return lpSOLMint;
  if (token_name === "lpUSD") return lpUSDMint;
  if (token_name === "LPFi") return LPFiMint;
  if (token_name === "wSOL") return wSOLMint;
  if (token_name === "mSOL") return mSOLMint;
  if (token_name === "RAY") return RAYMint;
  if (token_name === "SRM") return SRMMint;
  if (token_name === "AVAX") return AVAXMint;
  if (token_name === "FIDA") return FIDAMint;
  if (token_name === "FTT") return FTTMint;
  if (token_name === "FTM") return FTMMint;
  if (token_name === "GMT") return GMTMint;
  if (token_name === "LUNA") return LUNAMint;
  if (token_name === "MATIC") return MATICMint;
  if (token_name === "USDT") return USDTMint;

  return "";
};

const getPool = (tokenA, tokenB) => {
  if (tokenA === "lpUSD" && tokenB === "USDC") return lpUSD_USDC_Pool;
  if (tokenA === "USDC" && tokenB === "lpUSD") return lpUSD_USDC_Pool;
  if (tokenA === "lpSOL" && tokenB === "wSOL") return lpSOL_wSOL_Pool;
  if (tokenA === "wSOL" && tokenB === "lpSOL") return lpSOL_wSOL_Pool;
  if (tokenA === "LPFi" && tokenB === "USDC") return LPFi_USDC_Pool;
  if (tokenA === "USDC" && tokenB === "LPFi") return LPFi_USDC_Pool;

  return "";
};

const getSwapPool = (token) => {
  if (token === "lpUSD") return Pool_lpUSD;
  if (token === "lpSOL") return Pool_lpSOL;
  if (token === "LPFi") return Pool_LPFi;
  if (token === "mSOL") return Pool_mSOL;
  if (token === "wSOL") return Pool_wSOL;
  if (token === "stSOL") return Pool_stSOL;
  if (token === "USDC") return Pool_USDC;
  if (token === "RAY") return Pool_RAY;
  if (token === "scnSOL") return Pool_scnSOL;
  if (token === "SRM") return Pool_SRM;

  return "";
};

async function findAssociatedTokenAddress(walletAddress, tokenMintAddress) {
  return (
    await PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  )[0];
}

// stable swap for lpSOL-wSOL , lpUSD-USDC
export const stable_swap = (
  wallet,
  tokenA,
  tokenB,
  amountA,
  setTopSwapBalance,
  setBottomSwapBalance,
  setRequired,
  setSwapMessage
) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      // AxfYaVXibrtcLB58SmFWvTjLKE6ejkJmuEoPpWap87VB
      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const swap_escrow_pool_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_src = getSwapPool(tokenA);
      const token_dest = getSwapPool(tokenB);

      const stableSwap_pool = getPool(tokenA, tokenB);

      console.log(stableSwap_pool);

      const user_ata_src = await findAssociatedTokenAddress(
        userAuthority,
        token_src
      );

      console.log(user_ata_src);

      const user_ata_dest = await findAssociatedTokenAddress(
        userAuthority,
        token_dest
      );

      console.log(user_ata_dest);
      const pool_ata_src = await findAssociatedTokenAddress(
        stableSwap_pool,
        token_src
      );
      console.log(pool_ata_src);

      const pool_ata_dest = await findAssociatedTokenAddress(
        stableSwap_pool,
        token_dest
      );

      console.log(pool_ata_dest);

      const escrow_ata_src = await findAssociatedTokenAddress(
        swap_escrow_pool_pda[0],
        token_src
      );

      console.log(escrow_ata_src);

      const escrow_ata_dest = await findAssociatedTokenAddress(
        swap_escrow_pool_pda[0],
        token_dest
      );
      console.log(escrow_ata_dest);

      const amountA_wei = convert_to_wei(amountA);

      const amount_src = new anchor.BN(amountA_wei);

      console.log(amount_src);

      const result = await program.rpc.swapStableswap(amount_src, {
        accounts: {
          user: userAuthority,
          swapEscrow: swap_escrow_pool_pda[0],
          stableSwapPool: stableSwap_pool,
          tokenSrc: token_src,
          tokenDest: token_dest,
          userAtaSrc: user_ata_src,
          userAtaDest: user_ata_dest,
          poolAtaSrc: pool_ata_src,
          poolAtaDest: pool_ata_dest,
          escrowAtaSrc: escrow_ata_src,
          escrowAtaDest: escrow_ata_dest,
          stableswapProgram: StableSwap_programID,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      console.log(result);

      setTopSwapBalance("");
      setBottomSwapBalance("");
      setRequired(false);
      setSwapMessage("Enter an amount");
    } catch (error) {
      console.log(error);
    }
  };
};

// uniswap  for LPFi to USDC
export const uniswap = (wallet, tokenA, tokenB, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const swap_escrow_pool_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_src = getTokenMint(tokenA);
      const token_dest = getTokenMint(tokenB);

      const uniswap_pool = getPool(tokenA, tokenB);

      const user_ata_src = await findAssociatedTokenAddress(
        userAuthority,
        token_src
      );

      const user_ata_dest = await findAssociatedTokenAddress(
        userAuthority,
        token_dest
      );

      const pool_ata_src = await findAssociatedTokenAddress(
        uniswap_pool,
        token_src
      );

      const pool_ata_dest = await findAssociatedTokenAddress(
        uniswap_pool,
        token_dest
      );

      const escrow_ata_src = await findAssociatedTokenAddress(
        swap_escrow_pool_pda[0],
        token_src
      );

      const escrow_ata_dest = await findAssociatedTokenAddress(
        swap_escrow_pool_pda[0],
        token_dest
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_src = new anchor.BN(amountA_wei);

      await program.rpc.swapUniswap(amount_src, {
        accounts: {
          user: userAuthority,
          swapEscrow: swap_escrow_pool_pda[0],
          uniswapPool: uniswap_pool,
          tokenSrc: token_src,
          tokenDest: token_dest,
          userAtaSrc: user_ata_src,
          userAtaDest: user_ata_dest,
          poolAtaSrc: pool_ata_src,
          poolAtaDest: pool_ata_dest,
          escrowAtaSrc: escrow_ata_src,
          escrowAtaDest: escrow_ata_dest,
          uniswapProgram: Uniswap_programID,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

// swap_pyth - other-tokens to other tokens
export const swap_pyth = (wallet, tokenA, tokenB, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const token_state_account_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_PYth_Name)],
        TestToken_programID
      );

      const token_src = getTokenMint(tokenA);
      const token_dest = getTokenMint(tokenB);
      const pythSrc = getPYthMint(tokenA);
      const pythDest = getPYthMint(tokenB);

      const user_ata_src = await findAssociatedTokenAddress(
        userAuthority,
        token_src
      );

      const user_ata_dest = await findAssociatedTokenAddress(
        userAuthority,
        token_dest
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_src = new anchor.BN(amountA_wei);

      await program.rpc.swapPyth(amount_src, {
        accounts: {
          user: userAuthority,
          tokenStateAccount: token_state_account_pda[0],
          tokenSrc: token_src,
          tokenDest: token_dest,
          pythSrc: pythSrc,
          pythDest: pythDest,
          userAtaSrc: user_ata_src,
          userAtaDest: user_ata_dest,
          testtokensProgram: TestToken_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

// lpusd_to normal token
export const lpUSD_normal = (wallet, tokenB, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const PoolB = getSwapPool(tokenB);
      const pythDest = getPYthMint(tokenB);

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_state_account_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_PYth_Name)],
        TestToken_programID
      );

      const user_ata_lpusd = await findAssociatedTokenAddress(
        userAuthority,
        Pool_lpUSD
      );

      const user_ata_dest = await findAssociatedTokenAddress(
        userAuthority,
        PoolB
      );

      const stableswap_pool_ata_lpusd = await findAssociatedTokenAddress(
        StableSwap_lpUSD_USDC,
        Pool_lpUSD
      );

      const stableswap_pool_ata_usdc = await findAssociatedTokenAddress(
        StableSwap_lpUSD_USDC,
        Pool_USDC
      );

      const escrow_ata_lpusd = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpUSD
      );

      const escrow_ata_usdc = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_USDC
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_lpUSDC = new anchor.BN(amountA_wei);

      await program.rpc.swapLpusdToNormal(amount_lpUSDC, {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: StableSwap_lpUSD_USDC,
          tokenStateAccount: token_state_account_pda[0],
          tokenLpusd: Pool_lpUSD,
          tokenUsdc: Pool_USDC,
          tokenDest: PoolB,
          pythUsdc: PYth_USDC_Account,
          pythDest: pythDest,
          userAtaLpusd: user_ata_lpusd,
          userAtaDest: user_ata_dest,
          stableswapPoolAtaLpusd: stableswap_pool_ata_lpusd,
          stableswapPoolAtaUsdc: stableswap_pool_ata_usdc,
          escrowAtaLpusd: escrow_ata_lpusd,
          escrowAtaUsdc: escrow_ata_usdc,
          stableswapProgram: StableSwap_programID,
          testtokensProgram: TestToken_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

// norma to lpUSD  token
export const normal_lpUSD = (wallet, tokenA, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const PoolA = getSwapPool(tokenA);
      const pythSrc = getPYthMint(tokenA);

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_state_account_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_PYth_Name)],
        TestToken_programID
      );

      const user_ata_lpusd = await findAssociatedTokenAddress(
        userAuthority,
        PoolA
      );

      const user_ata_src = await findAssociatedTokenAddress(
        userAuthority,
        PoolA
      );

      const stableswap_pool_ata_lpusd = await findAssociatedTokenAddress(
        StableSwap_lpUSD_USDC,
        Pool_lpUSD
      );

      const stableswap_pool_ata_usdc = await findAssociatedTokenAddress(
        StableSwap_lpUSD_USDC,
        Pool_USDC
      );

      const escrow_ata_lpusd = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpUSD
      );

      const escrow_ata_usdc = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_USDC
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_src = new anchor.BN(amountA_wei);

      await program.rpc.swapNormalToLpusd(amount_src, {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: StableSwap_lpUSD_USDC,
          tokenStateAccount: token_state_account_pda[0],
          tokenSrc: PoolA,
          tokenLpusd: Pool_lpUSD,
          tokenUsdc: Pool_USDC,
          pythSrc: pythSrc,
          pythUsdc: PYth_USDC_Account,
          userAtaSrc: user_ata_src,
          userAtaLpusd: user_ata_lpusd,
          stableswapPoolAtaLpusd: stableswap_pool_ata_lpusd,
          stableswapPoolAtaUsdc: stableswap_pool_ata_usdc,
          escrowAtaLpusd: escrow_ata_lpusd,
          escrowAtaUsdc: escrow_ata_usdc,
          stableswapProgram: StableSwap_programID,
          testtokensProgram: TestToken_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

// lpSOL to normal  token
export const lpSOL_normal = (wallet, tokenB, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const PoolB = getSwapPool(tokenB);
      const pythDest = getPYthMint(tokenB);

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_state_account_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_PYth_Name)],
        TestToken_programID
      );

      const user_ata_lpsol = await findAssociatedTokenAddress(
        userAuthority,
        Pool_lpSOL
      );

      const user_ata_dest = await findAssociatedTokenAddress(
        userAuthority,
        PoolB
      );

      const stableswap_pool_ata_lpsol = await findAssociatedTokenAddress(
        StableSwap_lpSOL_wSOL,
        Pool_lpSOL
      );

      const stableswap_pool_ata_wsol = await findAssociatedTokenAddress(
        StableSwap_lpSOL_wSOL,
        Pool_wSOL
      );

      const escrow_ata_lpsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpSOL
      );

      const escrow_ata_wsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_wSOL
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_lpsol = new anchor.BN(amountA_wei);

      await program.rpc.swapLpsolToNormal(amount_lpsol, {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: StableSwap_lpSOL_wSOL,
          tokenStateAccount: token_state_account_pda[0],
          tokenLpsol: Pool_lpSOL,
          tokenWsol: Pool_wSOL,
          tokenDest: PoolB,
          pythWsol: PYth_wSOL_Account,
          pythDest: pythDest,
          userAtaLpsol: user_ata_lpsol,
          userAtaDest: user_ata_dest,
          stableswapPoolAtaLpsol: stableswap_pool_ata_lpsol,
          stableswapPoolAtaWsol: stableswap_pool_ata_wsol,
          escrowAtaLpsol: escrow_ata_lpsol,
          escrowAtaWsol: escrow_ata_wsol,
          stableswapProgram: StableSwap_programID,
          testtokensProgram: TestToken_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

//normal to lpSOL token
export const normal_lpSOL = (wallet, tokenA, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const PoolA = getSwapPool(tokenA);
      const pythSrc = getPYthMint(tokenA);

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_state_account_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_PYth_Name)],
        TestToken_programID
      );

      const user_ata_lpsol = await findAssociatedTokenAddress(
        userAuthority,
        Pool_lpSOL
      );

      const user_ata_src = await findAssociatedTokenAddress(
        userAuthority,
        PoolA
      );

      const stableswap_pool_ata_lpsol = await findAssociatedTokenAddress(
        StableSwap_lpSOL_wSOL,
        Pool_lpSOL
      );

      const stableswap_pool_ata_wsol = await findAssociatedTokenAddress(
        StableSwap_lpSOL_wSOL,
        Pool_wSOL
      );

      const escrow_ata_lpsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpSOL
      );

      const escrow_ata_wsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_wSOL
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_src = new anchor.BN(amountA_wei);

      await program.rpc.swapNormalToLpsol(amount_src, {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: StableSwap_lpSOL_wSOL,
          tokenStateAccount: token_state_account_pda[0],
          tokenSrc: PoolA,
          tokenLpsol: Pool_lpSOL,
          tokenWsol: Pool_wSOL,
          pythSrc: pythSrc,
          pythWsol: PYth_wSOL_Account,
          userAtaSrc: user_ata_src,
          userAtaLpsol: user_ata_lpsol,
          stableswapPoolAtaLpsol: stableswap_pool_ata_lpsol,
          stableswapPoolAtaWsol: stableswap_pool_ata_wsol,
          escrowAtaLpsol: escrow_ata_lpsol,
          escrowAtaWsol: escrow_ata_wsol,
          stableswapProgram: StableSwap_programID,
          testtokensProgram: TestToken_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

//LPFi to normal token
export const LPFi_normal = (wallet, tokenB, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const PoolB = getSwapPool(tokenB);
      const pythDest = getPYthMint(tokenB);

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_state_account_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_PYth_Name)],
        TestToken_programID
      );

      const user_ata_lpfi = await findAssociatedTokenAddress(
        userAuthority,
        Pool_LPFi
      );

      const user_ata_dest = await findAssociatedTokenAddress(
        userAuthority,
        PoolB
      );

      const uniswap_pool_ata_lpfi = await findAssociatedTokenAddress(
        Uniswap_LPFi_USDC,
        Pool_LPFi
      );

      const uniswap_pool_ata_usdc = await findAssociatedTokenAddress(
        Uniswap_LPFi_USDC,
        Pool_USDC
      );

      const escrow_ata_lpfi = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_LPFi
      );

      const escrow_ata_usdc = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_USDC
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_LPFi = new anchor.BN(amountA_wei);

      await program.rpc.swapLpfiToNormal(new anchor.BN(amount_LPFi), {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          uniswapPool: Uniswap_LPFi_USDC,
          tokenStateAccount: token_state_account_pda[0],
          tokenLpfi: Pool_LPFi,
          tokenUsdc: Pool_USDC,
          tokenDest: PoolB,
          pythUsdc: PYth_USDC_Account,
          pythDest: pythDest,
          userAtaLpfi: user_ata_lpfi,
          userAtaDest: user_ata_dest,
          uniswapPoolAtaLpfi: uniswap_pool_ata_lpfi,
          uniswapPoolAtaUsdc: uniswap_pool_ata_usdc,
          escrowAtaLpfi: escrow_ata_lpfi,
          escrowAtaUsdc: escrow_ata_usdc,
          uniswapProgram: Uniswap_programID,
          testtokensProgram: TestToken_programID,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

//  normal to LPFi token
export const normal_LPFi = (wallet, tokenA, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const PoolA = getSwapPool(tokenA);
      const pythSrc = getPYthMint(tokenA);

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_state_account_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_PYth_Name)],
        TestToken_programID
      );

      const user_ata_lpfi = await findAssociatedTokenAddress(
        userAuthority,
        Pool_LPFi
      );

      const user_ata_src = await findAssociatedTokenAddress(
        userAuthority,
        PoolA
      );

      const uniswap_pool_ata_lpfi = await findAssociatedTokenAddress(
        Uniswap_LPFi_USDC,
        Pool_LPFi
      );

      const uniswap_pool_ata_usdc = await findAssociatedTokenAddress(
        Uniswap_LPFi_USDC,
        Pool_USDC
      );

      const escrow_ata_lpfi = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_LPFi
      );

      const escrow_ata_usdc = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_USDC
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_Src = new anchor.BN(amountA_wei);

      await program.rpc.swapNormalToLpfi(amount_Src, {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          uniswapPool: Uniswap_LPFi_USDC,
          tokenStateAccount: token_state_account_pda[0],
          tokenSrc: PoolA,
          tokenLpfi: Pool_LPFi,
          tokenUsdc: Pool_USDC,
          pythSrc: pythSrc,
          pythUsdc: PYth_USDC_Account,
          userAtaSrc: user_ata_src,
          userAtaLpfi: user_ata_lpfi,
          uniswapPoolAtaLpfi: uniswap_pool_ata_lpfi,
          uniswapPoolAtaUsdc: uniswap_pool_ata_usdc,
          escrowAtaLpfi: escrow_ata_lpfi,
          escrowAtaUsdc: escrow_ata_usdc,
          uniswapProgram: Uniswap_programID,
          testtokensProgram: TestToken_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

//  lpusd to lpfi  token
export const lpusd_lpfi = (wallet, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const stableswap_pool = StableSwap_lpUSD_USDC;
      const uniswap_pool = Uniswap_LPFi_USDC;

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const user_ata_lpusd = await findAssociatedTokenAddress(
        userAuthority,
        Pool_lpUSD
      );

      const user_ata_lpfi = await findAssociatedTokenAddress(
        userAuthority,
        Pool_LPFi
      );

      const stableswap_pool_ata_lpusd = await findAssociatedTokenAddress(
        stableswap_pool,
        Pool_lpUSD
      );

      const stableswap_pool_ata_usdc = await findAssociatedTokenAddress(
        stableswap_pool,
        Pool_USDC
      );

      const uniswap_pool_ata_lpfi = await findAssociatedTokenAddress(
        uniswap_pool,
        Pool_LPFi
      );

      const uniswap_pool_ata_usdc = await findAssociatedTokenAddress(
        uniswap_pool,
        Pool_USDC
      );

      const escrow_ata_lpusd = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpUSD
      );

      const escrow_ata_lpfi = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_LPFi
      );

      const escrow_ata_usdc = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_USDC
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_lpusd = new anchor.BN(amountA_wei);

      await program.rpc.swapLpusdToLpfi(amount_lpusd, {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: stableswap_pool,
          uniswapPool: uniswap_pool,
          tokenLpusd: Pool_lpUSD,
          tokenLpfi: Pool_LPFi,
          tokenUsdc: Pool_USDC,
          userAtaLpusd: user_ata_lpusd,
          userAtaLpfi: user_ata_lpfi,
          stableswapPoolAtaLpusd: stableswap_pool_ata_lpusd,
          stableswapPoolAtaUsdc: stableswap_pool_ata_usdc,
          uniswapPoolAtaLpfi: uniswap_pool_ata_lpfi,
          uniswapPoolAtaUsdc: uniswap_pool_ata_usdc,
          escrowAtaLpusd: escrow_ata_lpusd,
          escrowAtaLpfi: escrow_ata_lpfi,
          escrowAtaUsdc: escrow_ata_usdc,
          stableswapProgram: StableSwap_programID,
          uniswapProgram: Uniswap_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

//  lpfi  to  lpusd token
export const lpfi_lpusd = (wallet, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const stableswap_pool = StableSwap_lpUSD_USDC;
      const uniswap_pool = Uniswap_LPFi_USDC;

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const user_ata_lpusd = await findAssociatedTokenAddress(
        userAuthority,
        Pool_lpUSD
      );

      const user_ata_lpfi = await findAssociatedTokenAddress(
        userAuthority,
        Pool_LPFi
      );

      const stableswap_pool_ata_lpusd = await findAssociatedTokenAddress(
        stableswap_pool,
        Pool_lpUSD
      );

      const stableswap_pool_ata_usdc = await findAssociatedTokenAddress(
        stableswap_pool,
        Pool_USDC
      );

      const uniswap_pool_ata_lpfi = await findAssociatedTokenAddress(
        uniswap_pool,
        Pool_LPFi
      );

      const uniswap_pool_ata_usdc = await findAssociatedTokenAddress(
        uniswap_pool,
        Pool_USDC
      );

      const escrow_ata_lpusd = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpUSD
      );

      const escrow_ata_lpfi = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_LPFi
      );

      const escrow_ata_usdc = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_USDC
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_lpfi = new anchor.BN(amountA_wei);

      await program.rpc.swapLpfiToLpusd(amount_lpfi, {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: stableswap_pool,
          uniswapPool: uniswap_pool,
          tokenLpusd: Pool_lpUSD,
          tokenLpfi: Pool_LPFi,
          tokenUsdc: Pool_USDC,
          userAtaLpusd: user_ata_lpusd,
          userAtaLpfi: user_ata_lpfi,
          stableswapPoolAtaLpusd: stableswap_pool_ata_lpusd,
          stableswapPoolAtaUsdc: stableswap_pool_ata_usdc,
          uniswapPoolAtaLpfi: uniswap_pool_ata_lpfi,
          uniswapPoolAtaUsdc: uniswap_pool_ata_usdc,
          escrowAtaLpusd: escrow_ata_lpusd,
          escrowAtaLpfi: escrow_ata_lpfi,
          escrowAtaUsdc: escrow_ata_usdc,
          stableswapProgram: StableSwap_programID,
          uniswapProgram: Uniswap_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

//  lpusd  to  lpsol token
export const lpusd_lpsol = (wallet, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_state_account_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_PYth_Name)],
        TestToken_programID
      );

      const user_ata_lpusd = await findAssociatedTokenAddress(
        userAuthority,
        Pool_lpUSD
      );

      const user_ata_lpsol = await findAssociatedTokenAddress(
        userAuthority,
        Pool_lpSOL
      );

      const stableswap_pool_lpusd_usdc_ata_lpusd =
        await findAssociatedTokenAddress(StableSwap_lpUSD_USDC, Pool_lpUSD);

      const stableswap_pool_lpusd_usdc_ata_usdc =
        await findAssociatedTokenAddress(StableSwap_lpUSD_USDC, Pool_USDC);

      const stableswap_pool_lpsol_wsol_ata_lpsol =
        await findAssociatedTokenAddress(StableSwap_lpSOL_wSOL, Pool_lpSOL);

      const stableswap_pool_lpsol_wsol_ata_wsol =
        await findAssociatedTokenAddress(StableSwap_lpSOL_wSOL, Pool_wSOL);

      const escrow_ata_lpusd = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpUSD
      );

      const escrow_ata_usdc = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_USDC
      );

      const escrow_ata_lpsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpSOL
      );

      const escrow_ata_wsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_wSOL
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_lpusd = new anchor.BN(amountA_wei);

      await program.rpc.swapLpusdToLpsolStep1(amount_lpusd, {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: StableSwap_lpUSD_USDC,
          tokenStateAccount: token_state_account_pda[0],
          tokenLpusd: Pool_lpUSD,
          tokenUsdc: Pool_USDC,
          tokenWsol: Pool_wSOL,
          pythUsdc: PYth_USDC_Account,
          pythWsol: PYth_wSOL_Account,
          userAtaLpusd: user_ata_lpusd,
          stableswapPoolAtaLpusd: stableswap_pool_lpusd_usdc_ata_lpusd,
          stableswapPoolAtaUsdc: stableswap_pool_lpusd_usdc_ata_usdc,
          escrowAtaLpusd: escrow_ata_lpusd,
          escrowAtaUsdc: escrow_ata_usdc,
          escrowAtaWsol: escrow_ata_wsol,
          stableswapProgram: StableSwap_programID,
          testtokensProgram: TestToken_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      await program.rpc.swapLpusdToLpsolStep2({
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: StableSwap_lpSOL_wSOL,
          tokenLpsol: Pool_lpSOL,
          tokenWsol: Pool_wSOL,
          userAtaLpsol: user_ata_lpsol,
          stableswapPoolAtaLpsol: stableswap_pool_lpsol_wsol_ata_lpsol,
          stableswapPoolAtaWsol: stableswap_pool_lpsol_wsol_ata_wsol,
          escrowAtaLpsol: escrow_ata_lpsol,
          escrowAtaWsol: escrow_ata_wsol,
          stableswapProgram: StableSwap_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

// lpsol   to  lpusd token
export const lpsol_lpusd = (wallet, amountB) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_state_account_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_PYth_Name)],
        TestToken_programID
      );

      const user_ata_lpusd = await findAssociatedTokenAddress(
        userAuthority,
        Pool_lpUSD
      );

      const user_ata_lpsol = await findAssociatedTokenAddress(
        userAuthority,
        Pool_lpSOL
      );

      const stableswap_pool_lpusd_usdc_ata_lpusd =
        await findAssociatedTokenAddress(StableSwap_lpUSD_USDC, Pool_lpUSD);

      const stableswap_pool_lpusd_usdc_ata_usdc =
        await findAssociatedTokenAddress(StableSwap_lpUSD_USDC, Pool_USDC);

      const stableswap_pool_lpsol_wsol_ata_lpsol =
        await findAssociatedTokenAddress(StableSwap_lpSOL_wSOL, Pool_lpSOL);

      const stableswap_pool_lpsol_wsol_ata_wsol =
        await findAssociatedTokenAddress(StableSwap_lpSOL_wSOL, Pool_wSOL);

      const escrow_ata_lpusd = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpUSD
      );

      const escrow_ata_usdc = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_USDC
      );

      const escrow_ata_lpsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpSOL
      );

      const escrow_ata_wsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_wSOL
      );

      const amountB_wei = convert_to_wei(amountB);

      const amount_lpusd = new anchor.BN(amountB_wei);

      await program.rpc.swapLpsolToLpusdStep1(amount_lpusd, {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: StableSwap_lpUSD_USDC,
          tokenStateAccount: token_state_account_pda[0],
          tokenLpsol: Pool_lpSOL,
          tokenWsol: Pool_wSOL,
          tokenUsdc: Pool_USDC,
          pythUsdc: PYth_USDC_Account,
          pythWsol: PYth_wSOL_Account,
          userAtaLpsol: user_ata_lpsol,
          stableswapPoolAtaLpsol: stableswap_pool_lpsol_wsol_ata_lpsol,
          stableswapPoolAtaWsol: stableswap_pool_lpsol_wsol_ata_wsol,
          escrowAtaLpsol: escrow_ata_lpsol,
          escrowAtaWsol: escrow_ata_wsol,
          escrowAtaUsdc: escrow_ata_usdc,
          stableswapProgram: StableSwap_programID,
          testtokensProgram: TestToken_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      await program.rpc.swapLpsolToLpusdStep2({
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: StableSwap_lpUSD_USDC,
          tokenLpusd: Pool_lpUSD,
          tokenUsdc: Pool_USDC,
          userAtaLpusd: user_ata_lpusd,
          stableswapPoolAtaLpusd: stableswap_pool_lpusd_usdc_ata_lpusd,
          stableswapPoolAtaUsdc: stableswap_pool_lpusd_usdc_ata_usdc,
          escrowAtaLpusd: escrow_ata_lpusd,
          escrowAtaUsdc: escrow_ata_usdc,
          stableswapProgram: StableSwap_lpUSD_USDC,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

// lpsol   to  lpfi token
export const lpsol_lpfi = (wallet, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_state_account_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_PYth_Name)],
        TestToken_programID
      );

      const user_ata_lpfi = await findAssociatedTokenAddress(
        userAuthority,
        Pool_LPFi
      );

      const user_ata_lpsol = await findAssociatedTokenAddress(
        userAuthority,
        Pool_lpSOL
      );

      const uniswap_ata_lpfi = await findAssociatedTokenAddress(
        Uniswap_LPFi_USDC,
        Pool_LPFi
      );

      const uniswap_ata_usdc = await findAssociatedTokenAddress(
        Uniswap_LPFi_USDC,
        Pool_USDC
      );

      const stableswap_pool_lpsol_wsol_ata_lpsol =
        await findAssociatedTokenAddress(StableSwap_lpSOL_wSOL, Pool_lpSOL);

      const stableswap_pool_lpsol_wsol_ata_wsol =
        await findAssociatedTokenAddress(StableSwap_lpSOL_wSOL, Pool_wSOL);

      const escrow_ata_lpfi = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_LPFi
      );

      const escrow_ata_usdc = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_USDC
      );

      const escrow_ata_lpsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpSOL
      );

      const escrow_ata_wsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_wSOL
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_lpsol = new anchor.BN(amountA_wei);

      await program.rpc.swapLpsolToLpfiStep1(amount_lpsol, {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: StableSwap_lpSOL_wSOL,
          tokenStateAccount: token_state_account_pda[0],
          tokenLpsol: Pool_lpSOL,
          tokenWsol: Pool_wSOL,
          tokenUsdc: Pool_USDC,
          pythUsdc: PYth_USDC_Account,
          pythWsol: PYth_wSOL_Account,
          userAtaLpsol: user_ata_lpsol,
          stableswapPoolAtaLpsol: stableswap_pool_lpsol_wsol_ata_lpsol,
          stableswapPoolAtaWsol: stableswap_pool_lpsol_wsol_ata_wsol,
          escrowAtaLpsol: escrow_ata_lpsol,
          escrowAtaWsol: escrow_ata_wsol,
          escrowAtaUsdc: escrow_ata_usdc,
          stableswapProgram: StableSwap_programID,
          testtokensProgram: TestToken_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      await program.rpc.swapLpsolToLpfiStep2({
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          uniswapPool: Uniswap_LPFi_USDC,
          tokenLpfi: Pool_LPFi,
          tokenUsdc: Pool_USDC,
          userAtaLpfi: user_ata_lpfi,
          uniswapPoolAtaLpfi: uniswap_ata_lpfi,
          uniswapPoolAtaUsdc: uniswap_ata_usdc,
          escrowAtaLpfi: escrow_ata_lpfi,
          escrowAtaUsdc: escrow_ata_usdc,
          uniswapProgram: Uniswap_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};

//  lpfi  to lpsol  token
export const lpfi_lpsol = (wallet, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const escrow_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap__Name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_state_account_pda = await PublicKey.findProgramAddress(
        [Buffer.from(Swap_PYth_Name)],
        TestToken_programID
      );

      const user_ata_lpfi = await findAssociatedTokenAddress(
        userAuthority,
        Pool_LPFi
      );

      const user_ata_lpsol = await findAssociatedTokenAddress(
        userAuthority,
        Pool_lpSOL
      );

      const uniswap_ata_lpfi = await findAssociatedTokenAddress(
        Uniswap_LPFi_USDC,
        Pool_LPFi
      );

      const uniswap_ata_usdc = await findAssociatedTokenAddress(
        Uniswap_LPFi_USDC,
        Pool_USDC
      );

      const stableswap_pool_lpsol_wsol_ata_lpsol =
        await findAssociatedTokenAddress(StableSwap_lpSOL_wSOL, Pool_lpSOL);

      const stableswap_pool_lpsol_wsol_ata_wsol =
        await findAssociatedTokenAddress(StableSwap_lpSOL_wSOL, Pool_wSOL);

      const escrow_ata_lpfi = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_LPFi
      );

      const escrow_ata_usdc = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_USDC
      );

      const escrow_ata_lpsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_lpSOL
      );

      const escrow_ata_wsol = await findAssociatedTokenAddress(
        escrow_pda[0],
        Pool_wSOL
      );

      const amountA_wei = convert_to_wei(amountA);

      const amount_lpfi = new anchor.BN(amountA_wei);

      await program.rpc.swapLpfiToLpsolStep1(amount_lpfi, {
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          uniswapPool: Uniswap_LPFi_USDC,
          tokenStateAccount: token_state_account_pda[0],
          tokenLpfi: Pool_LPFi,
          tokenUsdc: Pool_USDC,
          tokenWsol: Pool_wSOL,
          pythUsdc: PYth_USDC_Account,
          pythWsol: PYth_wSOL_Account,
          userAtaLpfi: user_ata_lpfi,
          uniswapPoolAtaLpfi: uniswap_ata_lpfi,
          uniswapPoolAtaUsdc: uniswap_ata_usdc,
          escrowAtaLpfi: escrow_ata_lpfi,
          escrowAtaUsdc: escrow_ata_usdc,
          escrowAtaWsol: escrow_ata_wsol,
          uniswapProgram: Uniswap_programID,
          testtokensProgram: TestToken_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      await program.rpc.swapLpfiToLpsolStep2({
        accounts: {
          user: userAuthority,
          swapEscrow: escrow_pda[0],
          stableSwapPool: StableSwap_lpSOL_wSOL,
          tokenLpsol: Pool_lpSOL,
          tokenWsol: Pool_wSOL,
          userAtaLpsol: user_ata_lpsol,
          stableswapPoolAtaLpsol: stableswap_pool_lpsol_wsol_ata_lpsol,
          stableswapPoolAtaWsol: stableswap_pool_lpsol_wsol_ata_wsol,
          escrowAtaLpsol: escrow_ata_lpsol,
          escrowAtaWsol: escrow_ata_wsol,
          stableswapProgram: StableSwap_programID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    } catch (error) {}
  };
};
