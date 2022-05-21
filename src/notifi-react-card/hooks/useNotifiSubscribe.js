import { useCallback, useEffect } from "react";
import { useNotifiSubscriptionContext } from "../context";
import { useNotifiClient } from "@notifi-network/notifi-react-hooks";
import parsePhoneNumber from "libphonenumber-js";
import { setSnackbar } from "../../redux/actions";

const isEmpty = (input) => {
  Object.keys(input).forEach((key) => {
    const value = input[key];
    if (value !== undefined) {
      return false;
    }
  });
  return true;
};

const areFilterOptionsEqual = (input, serialized) => {
  if (serialized === null) {
    return input === null || isEmpty(input);
  }
  if (input === null) {
    return serialized === "{}";
  }
  return JSON.stringify(input) === serialized;
};

export const useNotifiSubscribe = () => {
  const {
    params: { dappAddress, env, walletPublicKey, signer },
  } = useNotifiSubscriptionContext();
  const {
    loading,
    createAlert,
    deleteAlert,
    fetchData,
    isAuthenticated,
    logIn,
  } = useNotifiClient({
    dappAddress,
    env,
    walletPublicKey,
  });
  const {
    email: inputEmail,
    phoneNumber: inputPhoneNumber,
    getAlertConfigurations,
    setAlerts,
    setEmail,
    setPhoneNumber,
  } = useNotifiSubscriptionContext();
  const render = useCallback(
    (newData) => {
      var _a, _b, _c, _d;
      const alerts = {};
      newData === null || newData === void 0
        ? void 0
        : newData.alerts.forEach((alert) => {
            if (alert.name !== null) {
              alerts[alert.name] = alert;
            }
          });
      setAlerts(alerts);
      const targetGroup =
        newData === null || newData === void 0
          ? void 0
          : newData.targetGroups[0];
      const email =
        (_b =
          (_a =
            targetGroup === null || targetGroup === void 0
              ? void 0
              : targetGroup.emailTargets[0]) === null || _a === void 0
            ? void 0
            : _a.emailAddress) !== null && _b !== void 0
          ? _b
          : null;
      setEmail(email !== null && email !== void 0 ? email : "");
      const phoneNumber =
        (_d =
          (_c =
            targetGroup === null || targetGroup === void 0
              ? void 0
              : targetGroup.smsTargets[0]) === null || _c === void 0
            ? void 0
            : _c.phoneNumber) !== null && _d !== void 0
          ? _d
          : null;
      setPhoneNumber(
        phoneNumber !== null && phoneNumber !== void 0 ? phoneNumber : ""
      );
    },
    [setAlerts, setEmail, setPhoneNumber]
  );
  // Initial fetch
  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
        .then((data) => {
          render(data);
        })
        .catch((_e) => {
          /* Intentionally empty */
        });
    }
  }, [isAuthenticated]);
  const subscribe = useCallback(
    async (dispatch) => {
      if (!isAuthenticated) {
        await logIn(signer);
      }
      const data = await fetchData();
      const configurations = getAlertConfigurations();
      const names = Object.keys(configurations);
      const finalEmail = inputEmail === "" ? null : inputEmail;
      let finalPhoneNumber = null;
      if (inputPhoneNumber !== "") {
        const parsedPhoneNumber = parsePhoneNumber(inputPhoneNumber);
        if (parsedPhoneNumber !== undefined) {
          finalPhoneNumber = parsedPhoneNumber.number; // E.164
        }
      }
      const alertsToRemove = new Set();
      for (let i = 0; i < data.alerts.length; ++i) {
        // Mark all alerts for deletion
        const alert = data.alerts[i];
        if (alert.id !== null) {
          alertsToRemove.add(alert.id);
        }
      }
      const newResults = {};
      for (let i = 0; i < names.length; ++i) {
        const name = names[i];
        const existingAlert = data.alerts.find((alert) => alert.name === name);
        if (existingAlert !== undefined && existingAlert.id !== null) {
          // We'll manage it ourselves
          alertsToRemove.delete(existingAlert.id);
          dispatch(
            setSnackbar(
              true,
              "info",
              "Already subscribed. Please check you email"
            )
          );
        }
        const deleteThisAlert = async () => {
          if (existingAlert !== undefined && existingAlert.id !== null) {
            await deleteAlert({ alertId: existingAlert.id });
          }
        };
        const config = configurations[name];
        if (config === undefined) {
          await deleteThisAlert();
        } else {
          const { filterType, filterOptions, sourceType } = config;
          const source = data.sources.find((s) => s.type === sourceType);
          const filter = data.filters.find((f) => f.filterType === filterType);
          if (
            source === undefined ||
            source.id === null ||
            filter === undefined ||
            filter.id === null
          ) {
            await deleteThisAlert();
          } else if (
            existingAlert !== undefined &&
            existingAlert.id !== null &&
            existingAlert.filter.id === filter.id &&
            existingAlert.sourceGroup.sources.length > 0 &&
            existingAlert.sourceGroup.sources[0].id === source.id &&
            areFilterOptionsEqual(filterOptions, existingAlert.filterOptions)
          ) {
            // Alerts are the same
            newResults[name] = existingAlert;
          } else {
            // Call serially because of limitations
            await deleteThisAlert();
            const alert = await createAlert({
              name,
              sourceId: source.id,
              filterId: filter.id,
              filterOptions:
                filterOptions !== null && filterOptions !== void 0
                  ? filterOptions
                  : undefined,
              emailAddress: finalEmail,
              phoneNumber: finalPhoneNumber,
              telegramId: null,
              groupName: "managed",
            });

            if (alert) {
              dispatch(setSnackbar(true, "success", "Sent email"));
            }
            newResults[name] = alert;
          }
        }
      }
      // Untracked alerts
      const ids = [...alertsToRemove];
      for (let i = 0; i < ids.length; ++i) {
        const alertId = ids[i];
        await deleteAlert({ alertId });
      }
      const newData = await fetchData();
      render(newData);
    },
    [
      createAlert,
      deleteAlert,
      fetchData,
      getAlertConfigurations,
      inputEmail,
      inputPhoneNumber,
      isAuthenticated,
      logIn,
      signer,
    ]
  );
  return {
    loading,
    subscribe,
  };
};
