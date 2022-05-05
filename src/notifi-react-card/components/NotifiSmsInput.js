import { useNotifiSubscriptionContext } from "../context";
import React from "react";
import { IoMdPhonePortrait } from "react-icons/io";

export const NotifiSmsInput = ({ disabled }) => {
  const { phoneNumber, setPhoneNumber } = useNotifiSubscriptionContext();

  return (
    <>
      <div className="form_group">
        <IoMdPhonePortrait className="form_icon" />
        <input
          type="tel"
          name="notifi-sms"
          value={phoneNumber}
          disabled={disabled}
          autoComplete="off"
          required
          onChange={(e) => {
            var _a;
            setPhoneNumber(
              (_a = e.target.value) !== null && _a !== void 0 ? _a : ""
            );
          }}
          placeholder="PhoneNumber"
        />
      </div>
    </>
  );
};
