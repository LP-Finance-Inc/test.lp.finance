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

export const AccountTokenApi = (lpContractState, ApricotState, SolendState) => {
  const {
    DepositedSolAmount,
    DepositedBtcAmount,
    DepositedUsdcAmount,
    DepositedMSOLAmount,
    DepositedETHAmount,
    DepositedSRMAmount,
    DepositedUSDTAmount,
    DepositedstSOLAmount,
    DepositedscnSOLAmount,

    LendingSolAmount,
    LendingBtcAmount,
    LendingUsdcAmount,
    LendingMSOLAmount,
    LendingETHAmount,
    LendingSRMAmount,
    LendingUSDTAmount,
    LendingstSOLAmount,
    LendingscnSOLAmount,

    DepositedLpSolAmount,
    DepositedLpUsdAmount,
    DepositedLpBTCAmount,
    DepositedLpETHAmount,
    BorrowedLpSOLAmount,
    BorrowedLpUsdAmount,
    BorrowedLpBTCAmount,
    BorrowedLpETHAmount,
  } = lpContractState.UserAccountInfo;

  const {
    DepositedUserSOLAmountCal,
    DepositedUserBTCAmountCal,
    DepositedUserUSDCAmountCal,
    DepositedUserMSOLAmountCal,
    DepositedUserETHAmountCal,
    DepositedUserSRMAmountCal,
    DepositedUserUSDTAmountCal,
    DepositedUserstSOLAmountCal,
    DepositedUserscnSOLAmountCal,
    DepositedUserLpSOLAmountCal,
    DepositedUserLpUSDAmountCal,
    DepositedUserLpBTCAmountCal,
    DepositedUserLpETHAmountCal,
    BorrowedUserLpUSDAmountCal,
    BorrowedUserLpSOLAmountCal,
    BorrowedUserLpBTCAmountCal,
    BorrowedUserLpETHAmountCal,
  } = lpContractState.variables;

  const { PoolAssetsList } = SolendState;
  const { AssetsMarketList } = ApricotState;

  const RewardObj = {
    SOLRewardAPY: {
      name: "",
      value: "",
    },
    BTCRewardAPY: {
      name: "",
      value: "",
    },
    USDCRewardAPY: {
      name: "",
      value: "",
    },
    mSOLRewardAPY: {
      name: "",
      value: "",
    },
    ETHRewardAPY: {
      name: "",
      value: "",
    },
    SRMRewardAPY: {
      name: "",
      value: "",
    },
    USDTRewardAPY: {
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
    lpSOLRewardAPY: {
      name: "",
      value: "",
    },
    lpUSDRewardAPY: {
      name: "",
      value: "",
    },
    lpBTCRewardAPY: {
      name: "",
      value: "",
    },
    lpETHRewardAPY: {
      name: "",
      value: "",
    },
  };

  for (var i = 0; i < PoolAssetsList?.length; i++) {
    for (var j = 0; j < AssetsMarketList?.length; j++) {
      if (PoolAssetsList[i].AssetsName === AssetsMarketList[j].AssetsName) {
        if (PoolAssetsList[i].SupplyAPY > AssetsMarketList[j].DepositAPR) {
          const RewardAPY = PoolAssetsList[i].SupplyAPY / 10;

          if (PoolAssetsList[i].AssetsName === "SOL") {
            RewardObj.SOLRewardAPY.name = "solend";
            RewardObj.SOLRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "BTC") {
            RewardObj.BTCRewardAPY.name = "solend";
            RewardObj.BTCRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "USDC") {
            RewardObj.USDCRewardAPY.name = "solend";
            RewardObj.USDCRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "solend";
            RewardObj.mSOLRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "ETH") {
            RewardObj.ETHRewardAPY.name = "solend";
            RewardObj.ETHRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "SRM") {
            RewardObj.SRMRewardAPY.name = "solend";
            RewardObj.SRMRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "USDT") {
            RewardObj.USDTRewardAPY.name = "solend";
            RewardObj.USDTRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "stSOL") {
            RewardObj.stSOLRewardAPY.name = "solend";
            RewardObj.stSOLRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "scnSOL") {
            RewardObj.scnSOLRewardAPY.name = "solend";
            RewardObj.scnSOLRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "lpSOL") {
            RewardObj.lpSOLRewardAPY.name = "solend";
            RewardObj.lpSOLRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "lpUSD") {
            RewardObj.lpUSDRewardAPY.name = "solend";
            RewardObj.lpUSDRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "lpBTC") {
            RewardObj.lpBTCRewardAPY.name = "solend";
            RewardObj.lpBTCRewardAPY.value = RewardAPY;
          } else if (PoolAssetsList[i].AssetsName === "lpETH") {
            RewardObj.lpETHRewardAPY.name = "solend";
            RewardObj.lpETHRewardAPY.value = RewardAPY;
          }
        } else if (
          AssetsMarketList[j].DepositAPR > PoolAssetsList[i].SupplyAPY
        ) {
          const RewardAPY = AssetsMarketList[j].DepositAPR / 10;

          if (AssetsMarketList[j].AssetsName === "SOL") {
            RewardObj.SOLRewardAPY.name = "apricot";
            RewardObj.SOLRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "BTC") {
            RewardObj.BTCRewardAPY.name = "apricot";
            RewardObj.BTCRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "USDC") {
            RewardObj.USDCRewardAPY.name = "apricot";
            RewardObj.USDCRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "apricot";
            RewardObj.mSOLRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "ETH") {
            RewardObj.ETHRewardAPY.name = "apricot";
            RewardObj.ETHRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "SRM") {
            RewardObj.SRMRewardAPY.name = "apricot";
            RewardObj.SRMRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "USDT") {
            RewardObj.USDTRewardAPY.name = "apricot";
            RewardObj.USDTRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "stSOL") {
            RewardObj.stSOLRewardAPY.name = "apricot";
            RewardObj.stSOLRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "scnSOL") {
            RewardObj.scnSOLRewardAPY.name = "apricot";
            RewardObj.scnSOLRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "lpSOL") {
            RewardObj.lpSOLRewardAPY.name = "apricot";
            RewardObj.lpSOLRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "lpUSD") {
            RewardObj.lpUSDRewardAPY.name = "apricot";
            RewardObj.lpUSDRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "lpBTC") {
            RewardObj.lpBTCRewardAPY.name = "apricot";
            RewardObj.lpBTCRewardAPY.value = RewardAPY;
          } else if (AssetsMarketList[j].AssetsName === "lpETH") {
            RewardObj.lpETHRewardAPY.name = "apricot";
            RewardObj.lpETHRewardAPY.value = RewardAPY;
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
          Bal: DepositedSolAmount + LendingSolAmount,
          name: "SOL",
          img: SOLANA.SOL,
          TokenPrice: DepositedUserSOLAmountCal,
          RewardAPY: RewardObj.SOLRewardAPY.value,
          RewardAPYName: RewardObj.SOLRewardAPY.name,
        },
        {
          id: 2,
          Bal: DepositedBtcAmount + LendingBtcAmount,
          name: "BTC",
          img: SOLANA.BTC,
          TokenPrice: DepositedUserBTCAmountCal,
          RewardAPY: RewardObj.BTCRewardAPY.value,
          RewardAPYName: RewardObj.BTCRewardAPY.name,
        },
        {
          id: 3,
          Bal: DepositedUsdcAmount + LendingUsdcAmount,
          name: "USDC",
          img: SOLANA.USDC,
          TokenPrice: DepositedUserUSDCAmountCal,
          RewardAPY: RewardObj.USDCRewardAPY.value,
          RewardAPYName: RewardObj.USDCRewardAPY.name,
        },
        {
          id: 4,
          Bal: DepositedMSOLAmount + LendingMSOLAmount,
          name: "mSOL",
          img: SOLANA.mSOL,
          TokenPrice: DepositedUserMSOLAmountCal,
          RewardAPY: RewardObj.mSOLRewardAPY.value,
          RewardAPYName: RewardObj.mSOLRewardAPY.name,
        },
        {
          id: 5,
          Bal: DepositedETHAmount + LendingETHAmount,
          name: "ETH",
          img: SOLANA.ETH,
          TokenPrice: DepositedUserETHAmountCal,
          RewardAPY: RewardObj.ETHRewardAPY.value,
          RewardAPYName: RewardObj.ETHRewardAPY.name,
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
          Bal: DepositedUSDTAmount + LendingUSDTAmount,
          name: "USDT",
          img: SOLANA.USDT,
          TokenPrice: DepositedUserUSDTAmountCal,
          RewardAPY: RewardObj.USDTRewardAPY.value,
          RewardAPYName: RewardObj.USDTRewardAPY.name,
        },
        {
          id: 9,
          Bal: DepositedstSOLAmount + LendingstSOLAmount,
          name: "stSOL",
          img: SOLANA.stSOL,
          TokenPrice: DepositedUserstSOLAmountCal,
          RewardAPY: RewardObj.stSOLRewardAPY.value,
          RewardAPYName: RewardObj.stSOLRewardAPY.name,
        },
        {
          id: 10,
          Bal: DepositedscnSOLAmount + LendingscnSOLAmount,
          name: "scnSOL",
          img: SOLANA.scnSOL,
          TokenPrice: DepositedUserscnSOLAmountCal,
          RewardAPY: RewardObj.scnSOLRewardAPY.value,
          RewardAPYName: RewardObj.scnSOLRewardAPY.name,
        },
        {
          id: 11,
          Bal: DepositedLpSolAmount,
          name: "lpSOL",
          img: SOLANA.lpSOL,
          TokenPrice: DepositedUserLpSOLAmountCal,
          RewardAPY: RewardObj.lpSOLRewardAPY.value,
          RewardAPYName: RewardObj.lpSOLRewardAPY.name,
        },
        {
          id: 12,
          Bal: DepositedLpUsdAmount,
          name: "lpUSD",
          img: SOLANA.lpUSD,
          TokenPrice: DepositedUserLpUSDAmountCal,
          RewardAPY: RewardObj.lpUSDRewardAPY.value,
          RewardAPYName: RewardObj.lpUSDRewardAPY.name,
        },
        {
          id: 13,
          Bal: DepositedLpBTCAmount,
          name: "lpBTC",
          img: SOLANA.lpBTC,
          TokenPrice: DepositedUserLpBTCAmountCal,
          RewardAPY: RewardObj.lpBTCRewardAPY.value,
          RewardAPYName: RewardObj.lpBTCRewardAPY.name,
        },
        {
          id: 14,
          Bal: DepositedLpETHAmount,
          name: "lpETH",
          img: SOLANA.lpETH,
          TokenPrice: DepositedUserLpETHAmountCal,
          RewardAPY: RewardObj.lpETHRewardAPY.value,
          RewardAPYName: RewardObj.lpETHRewardAPY.name,
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
          Bal: BorrowedLpSOLAmount,
          name: "lpSOL",
          img: SOLANA.lpSOL,
          TokenPrice: BorrowedUserLpSOLAmountCal,
        },
        {
          id: 2,
          Bal: BorrowedLpUsdAmount,
          name: "lpUSD",
          img: SOLANA.lpUSD,
          TokenPrice: BorrowedUserLpUSDAmountCal,
        },
        {
          id: 3,
          Bal: BorrowedLpBTCAmount,
          name: "lpBTC",
          img: SOLANA + "lpBTC.png",
          TokenPrice: BorrowedUserLpBTCAmountCal,
        },
        {
          id: 4,
          Bal: BorrowedLpETHAmount,
          name: "lpETH",
          img: SOLANA.lpETH,
          TokenPrice: BorrowedUserLpETHAmountCal,
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
    SOLDepositedPercentage,
    BTCDepositedPercentage,
    USDCDepositedPercentage,
    mSOLDepositedPercentage,
    ETHDepositedPercentage,
    SRMDepositedPercentage,
    USDTDepositedPercentage,
    stSOLDepositedPercentage,
    scnSOLDepositedPercentage,
    lpSOLDepositedPercentage,
    lpUSDDepositedPercentage,
    lpBTCDepositedPercentage,
    lpETHDepositedPercentage,
  } = lpContractState.Borrow.pieChart.TotalSupply;

  const {
    TotalDepositedSOL,
    TotalDepositedBTC,
    TotalDepositedUSDC,
    TotalDepositedMSOL,
    TotalDepositedETH,
    TotalDepositedSRM,
    TotalDepositedUSDT,
    TotalDepositedstSOL,
    TotalDepositedscnSOL,
    TotalDepositedLpSOL,
    TotalDepositedLpUSD,
    TotalDepositedLpBTC,
    TotalDepositedLpETH,
  } = lpContractState.StateAccountInfo;

  const {
    DepositedSOLAmountCal,
    DepositedBTCAmountCal,
    DepositedUSDCAmountCal,
    DepositedMSOLAmountCal,
    DepositedETHAmountCal,
    DepositedSRMAmountCal,
    DepositedUSDTAmountCal,
    DepositedstSOLAmountCal,
    DepositedscnSOLAmountCal,
    DepositedLpSOLAmountCal,
    DepositedLpUSDAmountCal,
    DepositedLpBTCAmountCal,
    DepositedLpETHAmountCal,
  } = lpContractState.variables;

  const SOL_PERCENTAGE = CalcOneDigit(SOLDepositedPercentage);
  const BTC_PERCENTAGE = CalcOneDigit(BTCDepositedPercentage);
  const USDC_PERCENTAGE = CalcOneDigit(USDCDepositedPercentage);
  const mSOL_PERCENTAGE = CalcOneDigit(mSOLDepositedPercentage);
  const ETH_PERCENTAGE = CalcOneDigit(ETHDepositedPercentage);
  const SRM_PERCENTAGE = CalcOneDigit(SRMDepositedPercentage);
  const USDT_PERCENTAGE = CalcOneDigit(USDTDepositedPercentage);
  const stSOL_PERCENTAGE = CalcOneDigit(stSOLDepositedPercentage);
  const scnSOL_PERCENTAGE = CalcOneDigit(scnSOLDepositedPercentage);
  const lpSOL_PERCENTAGE = CalcOneDigit(lpSOLDepositedPercentage);
  const lpUSD_PERCENTAGE = CalcOneDigit(lpUSDDepositedPercentage);
  const lpBTC_PERCENTAGE = CalcOneDigit(lpBTCDepositedPercentage);
  const lpETH_PERCENTAGE = CalcOneDigit(lpETHDepositedPercentage);

  const BorrowDepositedPieChartLegend = [
    {
      id: 1,
      name: "SOL",
      bg: "#c45dd4",
      img: SOLANA.SOL,
      price: DepositedSOLAmountCal,
    },
    {
      id: 2,
      name: "BTC",
      bg: "#d4b25d",
      img: SOLANA.BTC,
      price: DepositedBTCAmountCal,
    },
    {
      id: 3,
      name: "USDC",
      bg: "#7BB6B3",
      img: SOLANA.USDC,
      price: DepositedUSDCAmountCal,
    },
    {
      id: 4,
      name: "mSOL",
      bg: "#5dd4a8",
      img: SOLANA.mSOL,
      price: DepositedMSOLAmountCal,
    },
    {
      id: 5,
      name: "ETH",
      bg: "#A3A2A5",
      img: SOLANA.ETH,
      price: DepositedETHAmountCal,
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
      name: "USDT",
      bg: "#3F8C86",
      img: SOLANA.USDT,
      price: DepositedUSDTAmountCal,
    },
    {
      id: 9,
      name: "stSOL",
      bg: "#24B7BE",
      img: SOLANA.stSOL,
      price: DepositedstSOLAmountCal,
    },
    {
      id: 10,
      name: "scnSOL",
      bg: "pink",
      img: SOLANA.scnSOL,
      price: DepositedscnSOLAmountCal,
    },
    {
      id: 11,
      name: "lpSOL",
      bg: "#2085ec",
      img: SOLANA.lpSOL,
      price: DepositedLpSOLAmountCal,
    },
    {
      id: 12,
      name: "lpUSD",
      bg: "#72b4eb",
      img: SOLANA.lpUSD,
      price: DepositedLpUSDAmountCal,
    },
    {
      id: 13,
      name: "lpBTC",
      bg: "#0a417a",
      img: SOLANA.lpBTC,
      price: DepositedLpBTCAmountCal,
    },
    {
      id: 14,
      name: "lpETH",
      bg: "#8464a0",
      img: SOLANA.lpETH,
      price: DepositedLpETHAmountCal,
    },
  ];

  const CBSDepositedPieChartLegendDetails = [
    {
      name: "SOL",
      per: SOL_PERCENTAGE,
      price: calc(TotalDepositedSOL),
    },
    {
      name: "BTC",
      per: BTC_PERCENTAGE,
      price: calc(TotalDepositedBTC),
    },
    {
      name: "USDC",
      per: USDC_PERCENTAGE,
      price: calc(TotalDepositedUSDC),
    },
    {
      name: "mSOL",
      per: mSOL_PERCENTAGE,
      price: calc(TotalDepositedMSOL),
    },
    {
      name: "ETH",
      per: ETH_PERCENTAGE,
      price: calc(TotalDepositedETH),
    },
    {
      name: "SRM",
      per: SRM_PERCENTAGE,
      price: calc(TotalDepositedSRM),
    },
    {
      name: "USDT",
      per: USDT_PERCENTAGE,
      price: calc(TotalDepositedUSDT),
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
      name: "lpSOL",
      per: lpSOL_PERCENTAGE,
      price: calc(TotalDepositedLpSOL),
    },
    {
      name: "lpUSD",
      per: lpUSD_PERCENTAGE,
      price: calc(TotalDepositedLpUSD),
    },
    {
      name: "lpBTC",
      per: lpBTC_PERCENTAGE,
      price: calc(TotalDepositedLpBTC),
    },
    {
      name: "lpETH",
      per: lpETH_PERCENTAGE,
      price: calc(TotalDepositedLpETH),
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

  const {
    lpSOLBorrowedPercentage,
    lpUSDBorrowedPercentage,
    lpBTCBorrowedPercentage,
    lpETHBorrowedPercentage,
  } = lpContractState.Borrow.pieChart.TotalSupply;

  const {
    TotalBorrowLpSOL,
    TotalBorrowLpUSD,
    TotalBorrowLpBTC,
    TotalBorrowLpETH,
  } = lpContractState.StateAccountInfo;

  const {
    BorrowedLpSOLAmountCal,
    BorrowedLpUSDAmountCal,
    BorrowedLpBTCAmountCal,
    BorrowedLpETHAmountCal,
  } = lpContractState.variables;

  const lpSOL_PERCENTAGE = CalcOneDigit(lpSOLBorrowedPercentage);
  const lpUSD_PERCENTAGE = CalcOneDigit(lpUSDBorrowedPercentage);
  const lpBTC_PERCENTAGE = CalcOneDigit(lpBTCBorrowedPercentage);
  const lpETH_PERCENTAGE = CalcOneDigit(lpETHBorrowedPercentage);

  const BorrowBorrowedPieChartLegend = [
    {
      id: 1,
      name: "lpSOL",
      bg: "#2085ec",
      img: SOLANA.lpSOL,
      price: BorrowedLpSOLAmountCal,
    },
    {
      id: 2,
      name: "lpUSD",
      bg: "#72b4eb",
      img: SOLANA.lpUSD,
      price: BorrowedLpUSDAmountCal,
    },
    {
      id: 3,
      name: "lpBTC",
      bg: "#0a417a",
      img: SOLANA.lpBTC,
      price: BorrowedLpBTCAmountCal,
    },
    {
      id: 4,
      name: "lpETH",
      bg: "#8464a0",
      img: SOLANA.lpETH,
      price: BorrowedLpETHAmountCal,
    },
  ];

  const CBSBorrowedPieChartLegendDetails = [
    {
      name: "lpSOL",
      per: lpSOL_PERCENTAGE,
      price: calc(TotalBorrowLpSOL),
    },
    {
      name: "lpUSD",
      per: lpUSD_PERCENTAGE,
      price: calc(TotalBorrowLpUSD),
    },
    {
      name: "lpBTC",
      per: lpBTC_PERCENTAGE,
      price: calc(TotalBorrowLpBTC),
    },
    {
      name: "lpETH",
      per: lpETH_PERCENTAGE,
      price: calc(TotalBorrowLpETH),
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
