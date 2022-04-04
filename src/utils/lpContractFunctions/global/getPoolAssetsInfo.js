import * as anchor from "@project-serum/anchor";
import { SolendMarket } from "@solendprotocol/solend-sdk";
import { NETWORK_MAINNET } from "../../../lib/helpers/connection";
import { AssetsList } from "../../../assets/api/BorrowApi";

const { Connection } = anchor.web3;

const getFullPercent = (percent_str) => {
  return parseFloat(percent_str) * 100;
};

const getParsedAmount = (amount_str) => {
  return new anchor.BN(amount_str)
    .div(new anchor.BN("1000000000000000000000000"))
    .toString();
};

export const getPoolAssetsInfo = async () => {
  try {
    const connection = new Connection(NETWORK_MAINNET, "processed");

    const market = await SolendMarket.initialize(connection);

    await market.loadReserves();

    let TokenPoolAssetsInfoObjet = [];
    for (var i = 0; i < market.reserves.length; i++) {
      for (var j = 0; j < AssetsList.length; j++) {
        const assetReserve = market.reserves[i];

        if (assetReserve.stats.symbol === AssetsList[j].AssetsName) {
          const resultObject = {
            ...AssetsList[j],
            LTV: getFullPercent(assetReserve.stats.loanToValueRatio.toString()),
            TotalSupply: getParsedAmount(
              assetReserve.stats.totalDepositsWads.toString()
            ),
            SupplyAPY: getFullPercent(
              assetReserve.stats.supplyInterestAPY.toString()
            ),
            TotalBorrowed: getParsedAmount(
              assetReserve.stats.totalBorrowsWads.toString()
            ),
          };

          TokenPoolAssetsInfoObjet.push(resultObject);
        }
      }
    }

    return TokenPoolAssetsInfoObjet;
  } catch (err) {}
};
