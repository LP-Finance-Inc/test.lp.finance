import React, { useCallback } from "react";
import { Button } from "./Button";
import { useWalletModal } from "./useWalletModal";

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

export const WalletModalButton = (_a) => {
  var { children = "Connect Wallet", onClick } = _a,
    props = __rest(_a, ["children", "onClick"]);
  const { visible, setVisible } = useWalletModal();
  const handleClick = useCallback(
    (event) => {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) setVisible(!visible);
    },
    [onClick, visible]
  );
  return React.createElement(
    Button,
    Object.assign(
      { className: "wallet-adapter-button-trigger", onClick: handleClick },
      props
    ),
    children
  );
};
