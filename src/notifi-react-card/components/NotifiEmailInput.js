import React from "react";
import { useNotifiSubscriptionContext } from "../context";
import { MdEmail } from "react-icons/md";

export const NotifiEmailInput = () => {
  const { email, setEmail } = useNotifiSubscriptionContext();

  return (
    <>
      <div className="form_group">
        <MdEmail className="form_icon" />
        <input
          type="email"
          name="notifi-email"
          value={email}
          autoComplete="off"
          required={true}
          onChange={(e) => {
            var _a;
            setEmail((_a = e.target.value) !== null && _a !== void 0 ? _a : "");
          }}
          placeholder="Enter email"
        />
      </div>
    </>
  );
};
