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
      <div className="row Notify_card d-flex justify-content-center">
        <div className="col-12 d-flex justify-content-center">
          <NotifiEmailInput disabled={loading} />
        </div>

        <div className="col-12 d-flex justify-content-center mt-3">
          <NotifiSmsInput disabled={loading} className="mt-4" />
        </div>

        <MarketingToggle disabled={loading} />

        <div className="col-12 d-flex justify-content-center mt-3">
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
    </>
  );
};

export default NotifiCardContents;
