import { createAssetPoolLoader, getConnection } from "@apricot-lend/sdk-ts";
import { AssetsList } from "../../../assets/api/BorrowApi";

export const getAssetsMarketInfo = async () => {
  const newAssetsTokenMarket = [];

  let connection = getConnection();

  for (var i = 0; i < AssetsList.length; i++) {
    let assetPoolLoader = await createAssetPoolLoader(connection);
    const AssetsPoolInfoObj = await assetPoolLoader.getAssetPool(
      AssetsList[i].AssetsName
    );

    const {
      depositAptRewardRate,
      depositRate,
      depositAmount,
      borrowAmount,
      borrowAptRewardRate,
      borrowRate,
      depositMndeRewardRate,
    } = AssetsPoolInfoObj;

    let DepositAPR = "";

    if (depositMndeRewardRate !== undefined) {
      DepositAPR =
        (depositAptRewardRate.d[0] +
          depositRate.d[0] +
          depositMndeRewardRate.d[0]) /
        100000;
    } else {
      DepositAPR = (depositAptRewardRate.d[0] + depositRate.d[0]) / 100000;
    }

    const BorrowedAPR = (borrowAptRewardRate.d[0] + borrowRate.d[0]) / 100000;

    const MarketDeposited = depositAmount.d[0];
    const MarketBorrowed = borrowAmount.d[0];

    const createAssetsMarketPool = {
      ...AssetsList[i],
      DepositAPR,
      BorrowedAPR,
      MarketDeposited,
      MarketBorrowed,
    };

    newAssetsTokenMarket.push(createAssetsMarketPool);
  }

  return newAssetsTokenMarket;
};
