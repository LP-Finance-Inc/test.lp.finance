import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

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

const NotifiSubscriptionContext = createContext({});

export const NotifiSubscriptionContextProvider = (_a) => {
  var _b;
  var { children } = _a,
    params = __rest(_a, ["children"]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alerts, setAlerts] = useState({});
  const alertConfigurations = useRef(
    (_b = params.alertConfigurations) !== null && _b !== void 0 ? _b : {}
  );
  const getAlertConfigurations = useCallback(() => {
    return alertConfigurations.current;
  }, []);
  const getAlertConfiguration = useCallback((name) => {
    var _a;
    return (_a = alertConfigurations.current[name]) !== null && _a !== void 0
      ? _a
      : null;
  }, []);
  const setAlertConfiguration = useCallback((name, config) => {
    if (config === null) {
      delete alertConfigurations.current[name];
    } else {
      alertConfigurations.current[name] = config;
    }
  }, []);
  const value = {
    alerts,
    email,
    params,
    phoneNumber,
    getAlertConfiguration,
    getAlertConfigurations,
    setAlerts,
    setAlertConfiguration,
    setEmail,
    setPhoneNumber,
  };
  return React.createElement(
    NotifiSubscriptionContext.Provider,
    { value: value },
    children
  );
};

export const useNotifiSubscriptionContext = () => {
  const data = useContext(NotifiSubscriptionContext);
  return data;
};
