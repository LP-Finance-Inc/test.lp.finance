const SolanaPoint = "/images/tokens/SolanaTokens/";
const global = "/images/tokens/";

export const TableTitles = [
  {
    id: 1,
    title: "Name",
  },
  {
    id: 2,
    title: "Liquidity",
    img: "/images/figma/tableIcon.png",
  },
  {
    id: 3,
    title: "Fees (24hr)",
    img: "/images/figma/tableIcon.png",
  },
  {
    id: 4,
    title: "APY",
    img: "/images/figma/tableIcon.png",
  },
];

export const TableApi = [
  {
    id: 1,
    img1: global + "LPFi.png",
    img2: SolanaPoint + "SOL.png",
    name: "LPFi-SOL",
    val1: "$ 0",
    val2: "$ 0",
    val3: "0%",
  },
  {
    id: 2,
    img1: SolanaPoint + "SOL.png",
    img2: SolanaPoint + "lpUSD.png",
    name: "SOL-lpUSD",
    val1: "$ 0",
    val2: "$ 0",
    val3: "0%",
  },
];

export const LiquidityPoolTabs = [
  {
    id: "nav-AddLiquidity-tab",
    name: "Add Liquidity",
    class: "nav-link active",
    href: "#nav-AddLiquidity",
    ariaControls: "nav-AddLiquidity",
    ariaSelected: true,
  },

  {
    id: "nav-RemoveLiquidity-tab",
    name: "Remove Liquidity",
    class: "nav-link",
    href: "#nav-RemoveLiquidity",
    ariaControls: "nav-RemoveLiquidity",
    ariaSelected: false,
  },
];
