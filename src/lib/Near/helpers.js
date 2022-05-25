import { Contract } from "near-api-js";
import { getBurrow } from "./utils";
import { ViewMethodsOracle } from "./interfaces/contract-methods";
import Decimal from "decimal.js";

export const getPrices = async () => {
  const { view, oracleContract } = await getBurrow();
  try {
    const priceResponse = await view(
      oracleContract,
      ViewMethodsOracle[ViewMethodsOracle.get_price_data]
    );
    if (priceResponse) {
      priceResponse.prices =
        priceResponse === null || priceResponse === void 0
          ? void 0
          : priceResponse.prices.map((assetPrice) => {
              var _a;
              return Object.assign(Object.assign({}, assetPrice), {
                price: assetPrice.price
                  ? Object.assign(Object.assign({}, assetPrice.price), {
                      usd: new Decimal(
                        ((_a = assetPrice.price) === null || _a === void 0
                          ? void 0
                          : _a.multiplier) || 0
                      )
                        .div(10000)
                        .toNumber(),
                    })
                  : null,
              });
            });
    }
    return priceResponse;
  } catch (err) {
    console.error("Getting prices failed: ", err.message);
    return undefined;
  }
};

export const getContract = async (
  account,
  contractAddress,
  viewMethods,
  changeMethods
) => {
  const contract = new Contract(account, contractAddress, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: Object.values(viewMethods)
      .filter((m) => typeof m === "string")
      .map((m) => m),
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: Object.values(changeMethods)
      .filter((m) => typeof m === "string")
      .map((m) => m),
  });
  return contract;
};
