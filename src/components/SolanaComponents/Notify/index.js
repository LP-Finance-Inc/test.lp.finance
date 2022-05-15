import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { NotifiCard } from "../../../notifi-react-card/components";
import NotifyWrapper from "../../../styles/Solana/Notify.style";
import NotifiCardContents from "./NotifiCardContents";

const Notify = () => {
  var _a, _b;
  const { wallet } = useWallet();

  const adapter =
    wallet === null || wallet === void 0 ? void 0 : wallet.adapter;
  const publicKey =
    (_b =
      (_a =
        adapter === null || adapter === void 0 ? void 0 : adapter.publicKey) ===
        null || _a === void 0
        ? void 0
        : _a.toBase58()) !== null && _b !== void 0
      ? _b
      : null;

  return (
    <>
      <NotifyWrapper>
        <div className="container Notify">
          <div className="row d-flex mt-4 justify-content-center  align-items-center">
            <div className="col-11">
              <NotifiCard
                dappAddress="3f39cgs9wPLVv4vGySNecjKtefe5MJYkFEEj3v6bPequ"
                env="Development"
                signer={adapter}
                walletPublicKey={publicKey}
                classNames="Notify"
              >
                <NotifiCardContents publicKey={publicKey} />
              </NotifiCard>

              <div className="col-12 d-flex justify-content-center mt-3">
                <div className="Details d-flex justify-content-end align-items-center">
                  <span>Powered by</span>
                  <img
                    src="/images/NotifyLogo.png"
                    alt="Loading..."
                    className="pl-2 pr-1"
                  />
                  <span>notifi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NotifyWrapper>
    </>
  );
};

export default Notify;
