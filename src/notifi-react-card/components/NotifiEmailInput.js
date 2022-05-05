import React from "react";
import { useNotifiSubscriptionContext } from "../context";
import { MdEmail } from "react-icons/md";

export const NotifiEmailInput = ({ disabled }) => {
  const { email, setEmail } = useNotifiSubscriptionContext();

  return (
    <>
      <div className="form_group">
        <MdEmail className="form_icon" />
        <input
          type="email"
          name="notifi-email"
          value={email}
          disabled={disabled}
          autoComplete="off"
          required
          onChange={(e) => {
            var _a;
            setEmail((_a = e.target.value) !== null && _a !== void 0 ? _a : "");
          }}
          placeholder="Email Address"
        />
      </div>
    </>
  );
};
