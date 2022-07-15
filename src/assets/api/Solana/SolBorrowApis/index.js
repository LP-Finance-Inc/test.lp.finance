import { useSelector } from "react-redux";
import { calc, numFormatter, CalcOneDigit } from "../../../../helper";
import { Token } from "../../global";

const { SOLANA } = Token;

export const AssetsList = [
  {
    id: 1,
    img: SOLANA.SOL,
    AssetsName: "SOL",
  },
  {
    id: 2,
    img: SOLANA.mSOL,
    AssetsName: "mSOL",
  },
  {
    id: 3,
    img: SOLANA.stSOL,
    AssetsName: "stSOL",
  },
  {
    id: 4,
    img: SOLANA.scnSOL,
    AssetsName: "scnSOL",
  },
  {
    id: 5,
    img: SOLANA.BTC,
    AssetsName: "BTC",
  },
  {
    id: 6,
    img: SOLANA.ETH,
    AssetsName: "ETH",
  },
  {
    id: 7,
    img: SOLANA.SRM,
    AssetsName: "SRM",
  },
  {
    id: 8,
    img: SOLANA.USDT,
    AssetsName: "USDT",
  },
  {
    id: 9,
    img: SOLANA.USDC,
    AssetsName: "USDC",
  },
];

export const AssetsMarketHeaderList = [
  {
    id: 1,
    name: "Asset",
  },
  {
    id: 2,
    name: "Market Deposited",
  },
  {
    id: 3,
    name: "Market Borrowed",
  },
  {
    id: 4,
    name: "Deposit APR",
  },
];

export const AssetsSolendHeaderList = [
  {
    id: 1,
    name: "Asset",
  },
  {
    id: 2,
    name: "LTV",
  },
  {
    id: 3,
    name: "Total supply",
  },
  {
    id: 4,
    name: "Supply APY",
  },
  {
    id: 5,
    name: "Total borrow",
  },
];

export const AccountTokenApi = (lpContractState, ApricotList, SolendList) => {
  const {
    DepositedwSolAmount,
    DepositedmSOLAmount,
    DepositedscnSOLAmount,
    DepositedstSOLAmount,
    DepositedRAYAmount,
    DepositedSRMAmount,
    DepositedlpSolAmount,
    DepositedlpUsdAmount,
    DepositedLPFiAmount,
    LendingwSOLAmount,
    LendingmSOLAmount,
    LendingscnSOLAmount,
    LendingstSOLAmount,
    LendingSRMAmount,
    LendingRAYAmount,
    BorrowedlpSOLAmount,
    BorrowedlpUsdAmount,
  } = lpContractState.UserAccountInfo;

  const {
    DepositedwSOLAmountCal,
    DepositedUsermSOLAmountCal,
    DepositedUserscnSOLAmountCal,
    DepositedUserstSOLAmountCal,
    DepositedUserRAYAmountCal,
    DepositedUserSRMAmountCal,
    DepositedUserlpSOLAmountCal,
    DepositedUserlpUSDAmountCal,
    DepositedUserLPFiAmountCal,
    BorrowedUserlpUSDAmountCal,
    BorrowedUserlpSOLAmountCal,
  } = lpContractState.variables;

  const RewardObj = {
    wSOLRewardAPY: {
      name: "",
      value: "",
    },
    mSOLRewardAPY: {
      name: "",
      value: "",
    },
    stSOLRewardAPY: {
      name: "",
      value: "",
    },
    scnSOLRewardAPY: {
      name: "",
      value: "",
    },
    RAYRewardAPY: {
      name: "",
      value: "",
    },
    SRMRewardAPY: {
      name: "",
      value: "",
    },
    lpSOLRewardAPY: {
      name: "",
      value: "",
    },
    lpUSDRewardAPY: {
      name: "",
      value: "",
    },
    LPFiRewardAPY: {
      name: "",
      value: "",
    },
  };

  for (var i = 0; i < SolendList?.length; i++) {
    for (var j = 0; j < ApricotList?.length; j++) {
      if (SolendList[i].AssetsName === ApricotList[j].AssetsName) {
        if (SolendList[i].SupplyAPY > ApricotList[j].DepositAPR) {
          const RewardAPY = SolendList[i].SupplyAPY / 10;

          if (SolendList[i].AssetsName === "wSOL") {
            RewardObj.wSOLRewardAPY.name = "solend";
            RewardObj.wSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "solend";
            RewardObj.mSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "stSOL") {
            RewardObj.stSOLRewardAPY.name = "solend";
            RewardObj.stSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "scnSOL") {
            RewardObj.scnSOLRewardAPY.name = "solend";
            RewardObj.scnSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "RAY") {
            RewardObj.RAYRewardAPY.name = "solend";
            RewardObj.RAYRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "SRM") {
            RewardObj.SRMRewardAPY.name = "solend";
            RewardObj.SRMRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "lpSOL") {
            RewardObj.lpSOLRewardAPY.name = "solend";
            RewardObj.lpSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "lpUSD") {
            RewardObj.lpUSDRewardAPY.name = "solend";
            RewardObj.lpUSDRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "LPFi") {
            RewardObj.LPFiRewardAPY.name = "solend";
            RewardObj.LPFiRewardAPY.value = RewardAPY;
          }
        } else if (ApricotList[j].DepositAPR > SolendList[i].SupplyAPY) {
          const RewardAPY = ApricotList[j].DepositAPR / 10;

          if (ApricotList[j].AssetsName === "wSOL") {
            RewardObj.wSOLRewardAPY.name = "apricot";
            RewardObj.wSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "apricot";
            RewardObj.mSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "stSOL") {
            RewardObj.stSOLRewardAPY.name = "apricot";
            RewardObj.stSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "scnSOL") {
            RewardObj.scnSOLRewardAPY.name = "apricot";
            RewardObj.scnSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "RAY") {
            RewardObj.RAYRewardAPY.name = "apricot";
            RewardObj.RAYRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "SRM") {
            RewardObj.SRMRewardAPY.name = "apricot";
            RewardObj.SRMRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "lpSOL") {
            RewardObj.lpSOLRewardAPY.name = "apricot";
            RewardObj.lpSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "lpUSD") {
            RewardObj.lpUSDRewardAPY.name = "apricot";
            RewardObj.lpUSDRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "LPFi") {
            RewardObj.LPFiRewardAPY.name = "apricot";
            RewardObj.LPFiRewardAPY.value = RewardAPY;
          }
        }
      }
    }
  }

  var AccountTable = [
    {
      id: 1,
      title: "Collateral",
      TotalCollateral: lpContractState?.variables?.UserTotalDepositedCal
        ? `$ ${numFormatter(lpContractState.variables.UserTotalDepositedCal)}`
        : "$ 0",
      price: "0",
      css: "3px solid #FFFFFF80",
      userInfo: [
        {
          id: 1,
          Bal: DepositedwSolAmount + LendingwSOLAmount,
          name: "wSOL",
          img: SOLANA.SOL,
          TokenPrice: DepositedwSOLAmountCal,
          RewardAPY: RewardObj.wSOLRewardAPY.value,
          RewardAPYName: RewardObj.wSOLRewardAPY.name,
        },
        {
          id: 2,
          Bal: DepositedmSOLAmount + LendingmSOLAmount,
          name: "mSOL",
          img: SOLANA.mSOL,
          TokenPrice: DepositedUsermSOLAmountCal,
          RewardAPY: RewardObj.mSOLRewardAPY.value,
          RewardAPYName: RewardObj.mSOLRewardAPY.name,
        },
        {
          id: 3,
          Bal: DepositedstSOLAmount + LendingstSOLAmount,
          name: "stSOL",
          img: SOLANA.stSOL,
          TokenPrice: DepositedUserstSOLAmountCal,
          RewardAPY: RewardObj.stSOLRewardAPY.value,
          RewardAPYName: RewardObj.stSOLRewardAPY.name,
        },
        {
          id: 4,
          Bal: DepositedscnSOLAmount + LendingscnSOLAmount,
          name: "scnSOL",
          img: SOLANA.scnSOL,
          TokenPrice: DepositedUserscnSOLAmountCal,
          RewardAPY: RewardObj.scnSOLRewardAPY.value,
          RewardAPYName: RewardObj.scnSOLRewardAPY.name,
        },
        {
          id: 5,
          Bal: DepositedRAYAmount + LendingRAYAmount,
          name: "RAY",
          img: SOLANA.SRM,
          TokenPrice: DepositedUserRAYAmountCal,
          RewardAPY: RewardObj.RAYRewardAPY.value,
          RewardAPYName: RewardObj.RAYRewardAPY.name,
        },
        {
          id: 6,
          Bal: DepositedSRMAmount + LendingSRMAmount,
          name: "SRM",
          img: SOLANA.SRM,
          TokenPrice: DepositedUserSRMAmountCal,
          RewardAPY: RewardObj.SRMRewardAPY.value,
          RewardAPYName: RewardObj.SRMRewardAPY.name,
        },
        {
          id: 7,
          Bal: DepositedlpSolAmount,
          name: "lpSOL",
          img: SOLANA.lpSOL,
          TokenPrice: DepositedUserlpSOLAmountCal,
          RewardAPY: RewardObj.lpSOLRewardAPY.value,
          RewardAPYName: RewardObj.lpSOLRewardAPY.name,
        },
        {
          id: 8,
          Bal: DepositedlpUsdAmount,
          name: "lpUSD",
          img: SOLANA.lpUSD,
          TokenPrice: DepositedUserlpUSDAmountCal,
          RewardAPY: RewardObj.lpUSDRewardAPY.value,
          RewardAPYName: RewardObj.lpUSDRewardAPY.name,
        },
        {
          id: 9,
          Bal: DepositedLPFiAmount,
          name: "LPFi",
          img: SOLANA.LPFi,
          TokenPrice: DepositedUserLPFiAmountCal,
          RewardAPY: RewardObj.LPFiRewardAPY.value,
          RewardAPYName: RewardObj.LPFiRewardAPY.name,
        },
      ],
    },
    {
      id: 2,
      title: "Borrowed",
      TotalBorrowed: lpContractState?.variables?.UserTotalBorrowedCal
        ? `$ ${numFormatter(lpContractState.variables.UserTotalBorrowedCal)}`
        : "$ 0",
      price: "0",
      css: "3px solid #FFFFFF80",
      userInfo: [
        {
          id: 1,
          Bal: BorrowedlpSOLAmount,
          name: "lpSOL",
          img: SOLANA.lpSOL,
          TokenPrice: BorrowedUserlpSOLAmountCal,
        },
        {
          id: 2,
          Bal: BorrowedlpUsdAmount,
          name: "lpUSD",
          img: SOLANA.lpUSD,
          TokenPrice: BorrowedUserlpUSDAmountCal,
        },
      ],
    },
    {
      id: 3,
      title: "Borrow Limit",
      price: lpContractState?.Borrow?.Account?.BorrowLimit
        ? `$ ${numFormatter(lpContractState?.Borrow?.Account?.BorrowLimit)}`
        : `$ 0`,
      css: "3px solid #FFFFFF80",
    },
    {
      id: 4,
      title: "Liquidation Threshold",
      price: lpContractState?.Borrow?.Account?.Liquidation
        ? `$ ${numFormatter(lpContractState?.Borrow?.Account?.Liquidation)}`
        : `$ 0`,
      css: "3px solid #FFFFFF80",
    },
    {
      id: 5,
      title: "LTV",
      price:
        lpContractState.Borrow.Account.LTV >= 0
          ? `${calc(lpContractState.Borrow.Account.LTV)}%`
          : "0%",
    },
  ];
  return AccountTable;
};

export const CBSDepositedPieChartList = () => {
  const lpContractState = useSelector((state) => state.SolBorrowReducers);

  const {
    wSOLDepositedPercentage,
    mSOLDepositedPercentage,
    scnSOLDepositedPercentage,
    stSOLDepositedPercentage,
    RAYDepositedPercentage,
    SRMDepositedPercentage,
    LPFiDepositedPercentage,
    lpSOLDepositedPercentage,
    lpUSDDepositedPercentage,
  } = lpContractState.Borrow.pieChart.TotalSupply;

  const {
    TotalDepositedwSOL,
    TotalDepositedmSOL,
    TotalDepositedstSOL,
    TotalDepositedscnSOL,
    TotalDepositedRAY,
    TotalDepositedSRM,
    TotalDepositedLPFi,
    TotalDepositedlpSOL,
    TotalDepositedlpUSD,
  } = lpContractState.StateAccountInfo;

  const {
    DepositedwSOLAmountCal,
    DepositedmSOLAmountCal,
    DepositedscnSOLAmountCal,
    DepositedstSOLAmountCal,
    DepositedRAYAmountCal,
    DepositedSRMAmountCal,
    DepositedlpSOLAmountCal,
    DepositedlpUSDAmountCal,
    DepositedLPFiAmountCal,
  } = lpContractState.variables;

  const wSOL_PERCENTAGE = CalcOneDigit(wSOLDepositedPercentage);
  const mSOL_PERCENTAGE = CalcOneDigit(mSOLDepositedPercentage);
  const stSOL_PERCENTAGE = CalcOneDigit(stSOLDepositedPercentage);
  const scnSOL_PERCENTAGE = CalcOneDigit(scnSOLDepositedPercentage);
  const RAY_PERCENTAGE = CalcOneDigit(RAYDepositedPercentage);
  const SRM_PERCENTAGE = CalcOneDigit(SRMDepositedPercentage);
  const lpSOL_PERCENTAGE = CalcOneDigit(lpSOLDepositedPercentage);
  const lpUSD_PERCENTAGE = CalcOneDigit(lpUSDDepositedPercentage);
  const LPFi_PERCENTAGE = CalcOneDigit(LPFiDepositedPercentage);

  const BorrowDepositedPieChartLegend = [
    {
      id: 1,
      name: "wSOL",
      bg: "#c45dd4",
      img: SOLANA.wSOL,
      price: DepositedwSOLAmountCal,
    },
    {
      id: 2,
      name: "mSOL",
      bg: "#5dd4a8",
      img: SOLANA.mSOL,
      price: DepositedmSOLAmountCal,
    },
    {
      id: 3,
      name: "stSOL",
      bg: "#24B7BE",
      img: SOLANA.stSOL,
      price: DepositedstSOLAmountCal,
    },

    {
      id: 4,
      name: "scnSOL",
      bg: "pink",
      img: SOLANA.scnSOL,
      price: DepositedscnSOLAmountCal,
    },
    {
      id: 5,
      name: "RAY",
      bg: "#77DAD1",
      img: SOLANA.RAY,
      price: DepositedRAYAmountCal,
    },
    {
      id: 6,
      name: "SRM",
      bg: "#77DAD1",
      img: SOLANA.SRM,
      price: DepositedSRMAmountCal,
    },

    {
      id: 7,
      name: "lpSOL",
      bg: "#2085ec",
      img: SOLANA.lpSOL,
      price: DepositedlpSOLAmountCal,
    },

    {
      id: 8,
      name: "lpUSD",
      bg: "#72b4eb",
      img: SOLANA.lpUSD,
      price: DepositedlpUSDAmountCal,
    },
    {
      id: 9,
      name: "LPFi",
      bg: "#0a417a",
      img: SOLANA.LPFi,
      price: DepositedLPFiAmountCal,
    },
  ];

  const CBSDepositedPieChartLegendDetails = [
    {
      name: "SOL",
      per: wSOL_PERCENTAGE,
      price: calc(TotalDepositedwSOL),
    },
    {
      name: "mSOL",
      per: mSOL_PERCENTAGE,
      price: calc(TotalDepositedmSOL),
    },
    {
      name: "stSOL",
      per: stSOL_PERCENTAGE,
      price: calc(TotalDepositedstSOL),
    },
    {
      name: "scnSOL",
      per: scnSOL_PERCENTAGE,
      price: calc(TotalDepositedscnSOL),
    },
    {
      name: "RAY",
      per: RAY_PERCENTAGE,
      price: calc(TotalDepositedRAY),
    },
    {
      name: "SRM",
      per: SRM_PERCENTAGE,
      price: calc(TotalDepositedSRM),
    },
    {
      name: "lpSOL",
      per: lpSOL_PERCENTAGE,
      price: calc(TotalDepositedlpSOL),
    },
    {
      name: "lpUSD",
      per: lpUSD_PERCENTAGE,
      price: calc(TotalDepositedlpUSD),
    },
    {
      name: "LPFi",
      per: LPFi_PERCENTAGE,
      price: calc(TotalDepositedLPFi),
    },
  ];

  const NewAllTokenPerList = [];
  const NewAllTokenPerColorList = [];

  const NewBorrowDepositedPieChartLegend = BorrowDepositedPieChartLegend.sort(
    function (a, b) {
      return b.price - a.price;
    }
  );

  const NewCBSDepositedPieChartLegendDetails =
    CBSDepositedPieChartLegendDetails.sort((a, b) => b.price - a.price).sort(
      (a, b) => b.per - a.per
    );

  for (var i = 0; i < NewCBSDepositedPieChartLegendDetails.length; i++) {
    NewAllTokenPerList.push(NewCBSDepositedPieChartLegendDetails[i].per);
  }

  for (var j = 0; j < NewBorrowDepositedPieChartLegend.length; j++) {
    NewAllTokenPerColorList.push(NewBorrowDepositedPieChartLegend[j].bg);
  }

  return {
    NewBorrowDepositedPieChartLegend,
    NewCBSDepositedPieChartLegendDetails,
    NewAllTokenPerList,
    NewAllTokenPerColorList,
  };
};

export const CBSBorrowedPieChartList = () => {
  const lpContractState = useSelector((state) => state.SolBorrowReducers);

  const { lpSOLBorrowedPercentage, lpUSDBorrowedPercentage } =
    lpContractState.Borrow.pieChart.TotalSupply;

  const { TotalBorrowedlpSOL, TotalBorrowedlpUSD } =
    lpContractState.StateAccountInfo;

  const { BorrowedlpSOLAmountCal, BorrowedlpUSDAmountCal } =
    lpContractState.variables;

  const lpSOL_PERCENTAGE = CalcOneDigit(lpSOLBorrowedPercentage);
  const lpUSD_PERCENTAGE = CalcOneDigit(lpUSDBorrowedPercentage);

  const BorrowBorrowedPieChartLegend = [
    {
      id: 1,
      name: "lpSOL",
      bg: "#2085ec",
      img: SOLANA.lpSOL,
      price: BorrowedlpSOLAmountCal,
    },
    {
      id: 2,
      name: "lpUSD",
      bg: "#72b4eb",
      img: SOLANA.lpUSD,
      price: BorrowedlpUSDAmountCal,
    },
  ];

  const CBSBorrowedPieChartLegendDetails = [
    {
      name: "lpSOL",
      per: lpSOL_PERCENTAGE,
      price: calc(TotalBorrowedlpSOL),
    },
    {
      name: "lpUSD",
      per: lpUSD_PERCENTAGE,
      price: calc(TotalBorrowedlpUSD),
    },
  ];

  const NewAllTokenPerList = [];
  const NewAllTokenPerColorList = [];

  const NewBorrowBorrowedPieChartLegend = BorrowBorrowedPieChartLegend.sort(
    function (a, b) {
      return b.price - a.price;
    }
  );

  const NewCBSBorrowedPieChartLegendDetails =
    CBSBorrowedPieChartLegendDetails.sort((a, b) => b.price - a.price).sort(
      (a, b) => b.per - a.per
    );

  for (var i = 0; i < NewCBSBorrowedPieChartLegendDetails.length; i++) {
    NewAllTokenPerList.push(NewCBSBorrowedPieChartLegendDetails[i].per);
  }

  for (var j = 0; j < NewBorrowBorrowedPieChartLegend.length; j++) {
    NewAllTokenPerColorList.push(NewBorrowBorrowedPieChartLegend[j].bg);
  }

  return {
    NewBorrowBorrowedPieChartLegend,
    NewCBSBorrowedPieChartLegendDetails,
    NewAllTokenPerList,
    NewAllTokenPerColorList,
  };
};
