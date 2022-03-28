import { useWallet } from "@solana/wallet-adapter-react";
import React, { useCallback, useMemo } from "react";
import { Button } from "./Button";
import { WalletIcon } from "./WalletIcon";

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

export const WalletDisconnectButton = (_a) => {
  var { children, disabled, onClick } = _a,
    props = __rest(_a, ["children", "disabled", "onClick"]);
  const { wallet, disconnect, disconnecting } = useWallet();
  const handleClick = useCallback(
    (event) => {
      if (onClick) onClick(event);

      if (!event.defaultPrevented) disconnect().catch(() => {});
    },
    [onClick, disconnect]
  );
  const content = useMemo(() => {
    if (children) return children;
    if (disconnecting) return "Disconnecting ...";
    if (wallet) return "Disconnect";
    return "Disconnect Wallet";
  }, [children, disconnecting, wallet]);
  return React.createElement(
    Button,
    Object.assign(
      {
        className: "wallet-adapter-button-trigger",
        disabled: disabled || !wallet,
        startIcon: wallet
          ? React.createElement(WalletIcon, { wallet: wallet })
          : undefined,
        onClick: handleClick,
      },
      props
    ),
    content
  );
};
