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
    let MarketDeposited = "";
    let MarketBorrowed = "";

    if (depositMndeRewardRate !== undefined) {
      DepositAPR =
        (depositAptRewardRate.d[0] +
          depositRate.d[0] +
          depositMndeRewardRate.d[0]) /
        100000;
    } else {
      DepositAPR = (depositAptRewardRate.d[0] + depositRate.d[0]) / 100000;
    }

    if (AssetsList[i].AssetsName === "USDC") {
      MarketDeposited = depositAmount.d[0] + "0." + depositAmount.d[1];
      let OneValue = borrowAmount.d[0];
      let secondValue = borrowAmount.d[1];
      let thirdValueLength = secondValue.toString().length;

      const first1Str = String(secondValue).slice(0, 1);
      const first1Num = Number(first1Str);

      const lastAllStr = String(secondValue).slice(1, thirdValueLength);
      const lastAllNum = Number(lastAllStr);

      MarketBorrowed = OneValue + "" + first1Num + "." + lastAllNum;
    } else {
      MarketDeposited = depositAmount.d[0];
      MarketBorrowed = borrowAmount.d[0];
    }

    const BorrowedAPR = (borrowAptRewardRate.d[0] + borrowRate.d[0]) / 100000;

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
