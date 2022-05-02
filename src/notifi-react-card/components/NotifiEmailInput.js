import { useNotifiSubscriptionContext } from "../context";
import React from "react";
export const NotifiEmailInput = ({ classNames, copy, disabled }) => {
  var _a;
  const { email, setEmail } = useNotifiSubscriptionContext();
  return React.createElement(
    "div",
    {
      className:
        classNames === null || classNames === void 0
          ? void 0
          : classNames.container,
    },
    React.createElement("input", {
      className:
        classNames === null || classNames === void 0
          ? void 0
          : classNames.input,
      disabled: disabled,
      name: "notifi-email",
      type: "email",
      value: email,
      onChange: (e) => {
        var _a;
        setEmail((_a = e.target.value) !== null && _a !== void 0 ? _a : "");
      },
      placeholder:
        (_a = copy === null || copy === void 0 ? void 0 : copy.placeholder) !==
          null && _a !== void 0
          ? _a
          : "Email Address",
    })
  );
};
