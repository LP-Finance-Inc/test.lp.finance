import { connection } from "../lib/helpers/connection";
import { getTokensPriceList } from "../utils/lpContractFunctions/global/getTokensPriceList";

export const blockInvalidChar = (e) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

const isNumber = (value) => {
  const check = Number.isInteger(value);

  if (check) {
    return value;
  } else {
    value = value.toString();
    value = value.slice(0, value.indexOf(".") + 3);
    return Number(value);
  }
};

export const calc = (num) => {
  if (num !== undefined) {
    const calVolumn = isNumber(num);
    return calVolumn;
  } else {
    return 0;
  }
};

export const CalcOneDigit = (num) => {
  if (num !== undefined) {
    num = num.toString();
    num = num.slice(0, num.indexOf(".") + 2);
    return Number(num);
  } else {
    return 0;
  }
};

export const CalcTwoDigit = (num) => {
  if (num !== undefined) {
    num = num.toString();
    num = num.slice(0, num.indexOf(".") + 3);
    return Number(num);
  } else {
    return 0;
  }
};

export const numFormatter = (num) => {
  if (num !== undefined) {
    if (num >= 1000 && num < 1000000) {
      return isNumber(num / 1000) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num >= 1000000 && num < 1000000000) {
      return isNumber(num / 1000000) + "M"; // convert to M for number from > 1 million
    } else if (num >= 1000000000) {
      return isNumber(num / 1000000000) + "B";
    } else if (num < 1000) {
      return isNumber(num); // if value < 1000, nothing to do
    }
  } else {
    return 0;
  }
};

export const getTokenPriceListData = async () => {
  try {
    const List = await getTokensPriceList(connection);

    const getTokensPriceListInfo = {
      BtcTokenPrice: List[0].Price ? List[0].Price : 0,
      ETHTokenPrice: List[1].Price ? List[1].Price : 0,
      SolTokenPrice: List[2].Price ? List[2].Price : 0,
      SRMTokenPrice: List[3].Price ? List[3].Price : 0,
      UsdcTokenPrice: List[4].Price ? List[4].Price : 0,
      USDTTokenPrice: List[5].Price ? List[5].Price : 0,
      mSOLTokenPrice: List[6].Price ? List[6].Price : 0,
      USTTokenPrice: List[7].Price ? List[7].Price : 0,
      STSOLTokenPrice: List[8].Price ? List[8].Price : 0,
      lpSOLTokenPrice: List[2].Price ? List[2].Price : 0,
      lpUSDTokenPrice: List[5].Price ? List[5].Price : 0,
      lpETHTokenPrice: List[1].Price ? List[1].Price : 0,
      lpBTCTokenPrice: List[0].Price ? List[0].Price : 0,
    };
    return getTokensPriceListInfo;
  } catch (error) {}
};
