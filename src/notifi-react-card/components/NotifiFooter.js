import { NotifiLogo } from "./NotifiLogo";
import React from "react";
export const NotifiFooter = ({ classNames, copy }) => {
  var _a, _b;
  return React.createElement(
    "div",
    {
      className:
        classNames === null || classNames === void 0
          ? void 0
          : classNames.container,
    },
    React.createElement(
      "span",
      {
        className:
          classNames === null || classNames === void 0
            ? void 0
            : classNames.poweredBy,
      },
      (_a = copy === null || copy === void 0 ? void 0 : copy.poweredBy) !==
        null && _a !== void 0
        ? _a
        : "Powered by"
    ),
    React.createElement(NotifiLogo, {
      className:
        classNames === null || classNames === void 0
          ? void 0
          : classNames.logoSvg,
    }),
    React.createElement("span", {
      className:
        classNames === null || classNames === void 0
          ? void 0
          : classNames.spacer,
    }),
    React.createElement(
      "span",
      {
        className:
          classNames === null || classNames === void 0
            ? void 0
            : classNames.link,
      },
      React.createElement(
        "a",
        {
          href: "https://docs.notifi.network/NotifiIntegrationsFAQ.html",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        (_b = copy === null || copy === void 0 ? void 0 : copy.learnMore) !==
          null && _b !== void 0
          ? _b
          : "Learn more"
      )
    )
  );
};
