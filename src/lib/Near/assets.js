import Decimal from "decimal.js";
import { ViewMethodsLogic } from "./interfaces/contract-methods";
import { getBurrow } from "./utils";
import { getPrices } from "./helpers";

const DEFAULT_PRECISION = 60;

Decimal.set({ precision: DEFAULT_PRECISION });

export const getAssets = async () => {
  const { view, logicContract } = await getBurrow();
  return (
    await view(
      logicContract,
      ViewMethodsLogic[ViewMethodsLogic.get_assets_paged]
    )
  ).map(([token_id, asset]) =>
    Object.assign(Object.assign({}, asset), { token_id })
  );
};

export const getAssetDetailed = async (token_id) => {
  const { view, logicContract } = await getBurrow();
  const assetDetails = await view(
    logicContract,
    ViewMethodsLogic[ViewMethodsLogic.get_asset],
    {
      token_id,
    }
  );
  return assetDetails;
};

export const getAssetsDetailed = async () => {
  console.log("ok");
  const assets = await getAssets();
  console.log(assets);
  const priceResponse = await getPrices();
  let detailedAssets = await Promise.all(
    assets.map((asset) => getAssetDetailed(asset.token_id))
  );
  detailedAssets =
    detailedAssets === null || detailedAssets === void 0
      ? void 0
      : detailedAssets.map((detailedAsset) => {
          var _a;
          return Object.assign(Object.assign({}, detailedAsset), {
            price:
              ((_a =
                priceResponse === null || priceResponse === void 0
                  ? void 0
                  : priceResponse.prices.find(
                      (p) => p.asset_id === detailedAsset.token_id
                    )) === null || _a === void 0
                ? void 0
                : _a.price) || undefined,
          });
        });
  console.log(detailedAssets);
  return detailedAssets;
};
