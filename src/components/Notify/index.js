import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  NotifiCard,
  NotifiEmailInput,
  NotifiSmsInput,
} from "../../notifi-react-card/components";
import { useNotifiSubscribe } from "../../notifi-react-card/hooks";
import { directMessageConfiguration } from "../../notifi-react-card/utils";
import { useNotifiSubscriptionContext } from "../../notifi-react-card/context";
import NotifyWrapper from "./Notify.style";
import { MessageSigner } from "@notifi-network/notifi-core";
import TokenModel from "../../Models/Common/TokenModel";

const ALERT_NAME = "MyMarketingAlert";
const ALERT_CONFIGURATION = directMessageConfiguration({
  type: "LIQUIDATION_ALERT",
});

const Notify = () => {
  const [tokenModel, setTokenModel] = useState(false);

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

  const [enabled, setEnabled] = useState(false);
  const { setAlertConfiguration } = useNotifiSubscriptionContext();

  const { loading, subscribe } = useNotifiSubscribe();

  useEffect(() => {
    if (enabled) {
      setAlertConfiguration(ALERT_NAME, ALERT_CONFIGURATION);
    } else {
      setAlertConfiguration(ALERT_NAME, null);
    }
  }, [enabled]);

  return (
    <>
      {tokenModel && (
        <TokenModel tokenModel={tokenModel} setTokenModel={setTokenModel} />
      )}

      <NotifyWrapper>
        <div className="container Notify">
          <div className="row mt-5">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <NotifiCard
                dappAddress="3f39cgs9wPLVv4vGySNecjKtefe5MJYkFEEj3v6bPequ"
                env="Development"
                signer={adapter}
                walletPublicKey={publicKey}
              >
                <div className="row">
                  <div className="col-12 d-flex justify-content-center flex-column">
                    <div className="row">
                      <div className="col-12">
                        <NotifiEmailInput disabled={loading} />
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-12">
                        <NotifiSmsInput disabled={loading} className="mt-4" />
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-12">
                        <span>Sign up for Marketing alerts</span>
                        <input
                          disabled={loading}
                          type="checkbox"
                          checked={enabled}
                          className="ml-2"
                          onChange={(e) => {
                            setEnabled(e.target.checked);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-12 d-flex justify-content-center">
                        <button
                          disabled={loading}
                          type="submit"
                          onClick={async () => {
                            await subscribe();
                          }}
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-12 d-flex justify-content-center">
                        <button onClick={() => setTokenModel(true)}>open</button>
                      </div>
                    </div>
                  </div>
                </div>
              </NotifiCard>
            </div>
          </div>
        </div>
      </NotifyWrapper>
    </>
  );
};

export default Notify;
