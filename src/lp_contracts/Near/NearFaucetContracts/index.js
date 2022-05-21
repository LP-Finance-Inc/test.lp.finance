import * as anchor from "@project-serum/anchor";
import { setContracts } from "../../../redux/actions";
const { Connection } = anchor.web3;

export const Near_Request_Faucet = (keyword, wallet, amount) => {
  return async (dispatch) => {
    dispatch(
      setContracts(true, true, "progress", "Requesting Faucet...", "Faucet")
    );

    const userAuthority = wallet?._authData?.allKeys[0];

    if (keyword === "SOL") {
      try {
        const NATIVE_NETWORK = "https://api.devnet.solana.com";
        const connection = new Connection(NATIVE_NETWORK, "processed");

        let airdropSignature = await connection.requestAirdrop(
          userAuthority,
          anchor.web3.LAMPORTS_PER_SOL
        );

        console.log(airdropSignature);

        await connection.confirmTransaction(airdropSignature);

        dispatch(
          setContracts(
            true,
            false,
            "success",
            `Successfully transferred ${amount} ${keyword} to your account. Click Ok to go back.`,
            "Faucet"
          )
        );
      } catch (err) {
        console.log(err);
        dispatch(
          setContracts(
            true,
            false,
            "error",
            "Request Faucet failed. Claim manually on solfaucet.com.",
            "Faucet"
          )
        );
      }
      return;
    }
  };
};
