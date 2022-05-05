import React from "react";
import MarketingToggle from "../MarketingToggle";
import { useNotifiSubscribe } from "../../../notifi-react-card/hooks";
import {
  NotifiEmailInput,
  NotifiSmsInput,
} from "../../../notifi-react-card/components";

const NotifiCardContents = () => {
  const { loading, subscribe } = useNotifiSubscribe();

  return (
    <>
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

          <MarketingToggle disabled={loading} />

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
        </div>
      </div>
    </>
  );
};

export default NotifiCardContents;
