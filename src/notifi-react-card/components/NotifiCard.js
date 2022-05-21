import { NotifiSubscriptionContextProvider } from "../context";
import React from "react";
export const NotifiCard = ({
  children,
  classNames,
  strings,
  alertConfigurations,
  dappAddress,
  env,
  signer,
  walletPublicKey,
}) => {
  var _d, _e, _f, _g;
  // if (walletPublicKey === null) {
  //   return React.createElement(
  //     "div",
  //     {
  //       className:
  //         (_a =
  //           classNames === null || classNames === void 0
  //             ? void 0
  //             : classNames.disconnected) === null || _a === void 0
  //           ? void 0
  //           : _a.container,
  //     },
  //     React.createElement(
  //       "span",
  //       {
  //         className:
  //           (_b =
  //             classNames === null || classNames === void 0
  //               ? void 0
  //               : classNames.disconnected) === null || _b === void 0
  //             ? void 0
  //             : _b.label,
  //       },
  //       (_c =
  //         strings === null || strings === void 0
  //           ? void 0
  //           : strings.disconnected) !== null && _c !== void 0
  //         ? _c
  //         : "Connect your wallet"
  //     )
  //   );
  if (signer === null) {
    return React.createElement(
      "div",
      {
        className:
          (_d =
            classNames === null || classNames === void 0
              ? void 0
              : classNames.unsupported) === null || _d === void 0
            ? void 0
            : _d.container,
      },
      React.createElement(
        "span",
        {
          className:
            (_e =
              classNames === null || classNames === void 0
                ? void 0
                : classNames.unsupported) === null || _e === void 0
              ? void 0
              : _e.label,
        },
        (_f =
          strings === null || strings === void 0
            ? void 0
            : strings.unsupported) !== null && _f !== void 0
          ? _f
          : "Wallet does not support signing"
      )
    );
  } else {
    return React.createElement(
      "div",
      {
        className:
          (_g =
            classNames === null || classNames === void 0
              ? void 0
              : classNames.connected) === null || _g === void 0
            ? void 0
            : _g.container,
      },
      React.createElement(
        NotifiSubscriptionContextProvider,
        Object.assign(
          {},
          {
            alertConfigurations,
            dappAddress,
            env,
            signer,
            walletPublicKey,
          }
        ),
        children
      )
    );
  }
};
