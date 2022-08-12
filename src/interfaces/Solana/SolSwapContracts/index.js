import * as anchor from "@project-serum/anchor";
// import { setContracts } from "../../../redux/actions";
import getProvider from "../../../lib/Solana/getProvider";
import swap_router_idl from "../../../lib/Solana/idls/swap_router.json";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import {
  swap__name,
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
  pythwSolAccount,
  pythMsolAccount,
  pythStsolAccount,
  pythScnsolAccount,
  pythUsdcAccount,
  pythRayAccount,
  pythSrmAccount,
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

// const getPoolMint = (token_name) => {
//   if (token_name === "USDC") return poolUsdc;
//   if (token_name === "BTC") return poolBtc;
//   if (token_name === "mSOL") return poolMsol;
//   if (token_name === "ETH") return poolEth;
//   if (token_name === "UST") return poolUst;
//   if (token_name === "SRM") return poolSrm;
//   if (token_name === "scnSOL") return poolScnsol;
//   if (token_name === "stSOL") return poolStsol;
//   if (token_name === "USDT") return poolUsdt;
//   if (token_name === "lpSOL") return poolLpsol;
//   if (token_name === "lpUSD") return poolLpusd;
//   if (token_name === "lpBTC") return poolLpbtc;
//   if (token_name === "lpETH") return poolLpeth;
//   return "";
// };

// const getPythMint = (token_name) => {
//   if (token_name === "USDC") return pythUsdcAccount;
//   if (token_name === "BTC") return pythBtcAccount;
//   if (token_name === "mSOL") return pythMsolAccount;
//   if (token_name === "ETH") return pythEthAccount;
//   if (token_name === "UST") return pythUstAccount;
//   if (token_name === "SRM") return pythSrmAccount;
//   if (token_name === "scnSOL") return pythScnsolAccount;
//   if (token_name === "stSOL") return pythStsolAccount;
//   if (token_name === "USDT") return pythUsdtAccount;
//   if (token_name === "lpSOL") return pythSolAccount;
//   if (token_name === "lpUSD") return pythUsdcAccount;
//   if (token_name === "lpBTC") return pythBtcAccount;
//   if (token_name === "lpETH") return pythEthAccount;
//   return "";
// };

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
export const stable_swap = (wallet, tokenA, tokenB, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const swap_escrow_pool_pda = await PublicKey.findProgramAddress(
        [Buffer.from(swap__name), Buffer.from(userAuthority.toBuffer())],
        program.programId
      );

      const token_src = getTokenMint(tokenA);
      const token_dest = getTokenMint(tokenB);

      const stableSwap_pool = getPool(tokenA, tokenB);

      const user_ata_src = await findAssociatedTokenAddress(
        userAuthority,
        token_src
      );

      const user_ata_dest = await findAssociatedTokenAddress(
        userAuthority,
        token_dest
      );

      const pool_ata_src = await findAssociatedTokenAddress(
        stableSwap_pool,
        token_src
      );

      const pool_ata_dest = await findAssociatedTokenAddress(
        stableSwap_pool,
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

      await program.rpc.swapStableswap(amount_src, {
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
    } catch (error) {}
  };
};

// uniswap  for usdc, srm ,wSol etc
export const uniswap = (wallet, tokenA, tokenB, amountA) => {
  return async (dispatch) => {
    try {
      const userAuthority = wallet.publicKey;
      const provider = await getProvider(wallet);
      anchor.setProvider(provider);

      const programId = new PublicKey(swap_router_idl.metadata.address);

      const program = new anchor.Program(swap_router_idl, programId);

      const swap_escrow_pool_pda = await PublicKey.findProgramAddress(
        [Buffer.from(swap__name), Buffer.from(userAuthority.toBuffer())],
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
