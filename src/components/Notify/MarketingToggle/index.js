import React, { useState, useEffect } from "react";
import { directMessageConfiguration } from "../../../notifi-react-card/utils";
import { useNotifiSubscriptionContext } from "../../../notifi-react-card/context";

const ALERT_NAME = "LP_FINANCE_NOTIFY";
const ALERT_CONFIGURATION = directMessageConfiguration({
  type: "LIQUIDATION_ALERT",
});

const MarketingToggle = ({ disabled }) => {
  const [enabled, setEnabled] = useState(false);
  const { setAlertConfiguration } = useNotifiSubscriptionContext();

  useEffect(() => {
    if (enabled) {
      setAlertConfiguration(ALERT_NAME, ALERT_CONFIGURATION);
    } else {
      setAlertConfiguration(ALERT_NAME, null);
    }
  }, [enabled]);

  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <span>Sign up for Marketing alerts</span>
          <input
            disabled={disabled}
            type="checkbox"
            checked={enabled}
            className="ml-2"
            onChange={(e) => {
              setEnabled(e.target.checked);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MarketingToggle;
