export const blockInvalidChar = (e) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

export const isNumber = (value) => {
  const check = Number.isInteger(value);

  if (check) {
    return value;
  } else {
    /* to calculate correct value */
    const temp = Math.ceil(value * 1000) / 1000;
    value = temp.toString();
    value = value.slice(0, value.indexOf(".") + 3);
    return Number(value);
  }
};

export const isNumberFourDigit = (value) => {
  const check = Number.isInteger(value);

  if (check) {
    return value;
  } else {
    /* to calculate correct value */
    const temp = Math.ceil(value * 1000) / 1000;
    value = temp.toString();
    value = value.slice(0, value.indexOf(".") + 5);
    return Number(value);
  }
};

export const CeilMethod = (value) => {
  const temp = Math.ceil(value * 1000) / 1000;
  return temp;
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

export const CalcThreeDigit = (num) => {
  if (num !== undefined) {
    num = num.toString();
    num = num.slice(0, num.indexOf(".") + 4);
    return Number(num);
  } else {
    return 0;
  }
};

export const CalcFourDigit = (num) => {
  if (num !== undefined) {
    num = num.toString();
    num = num.slice(0, num.indexOf(".") + 5);
    return Number(num);
  } else {
    return 0;
  }
};

export const CalcFiveDigit = (num) => {
  if (num !== undefined) {
    num = num.toString();
    num = num.slice(0, num.indexOf(".") + 6);
    return Number(num);
  } else {
    return 0;
  }
};

export const CalcEightDigit = (num) => {
  if (num !== undefined) {
    num = num.toString();
    num = num.slice(0, num.indexOf(".") + 9);
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

export const FourNumFormatter = (num) => {
  if (num !== undefined) {
    if (num >= 1000 && num < 1000000) {
      return isNumberFourDigit(num / 1000) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num >= 1000000 && num < 1000000000) {
      return isNumberFourDigit(num / 1000000) + "M"; // convert to M for number from > 1 million
    } else if (num >= 1000000000) {
      return isNumberFourDigit(num / 1000000000) + "B";
    } else if (num < 1000) {
      return isNumberFourDigit(num); // if value < 1000, nothing to do
    }
  } else {
    return 0;
  }
};
