import { FaTwitter, FaTelegramPlane } from "react-icons/fa";
import { AiFillGithub, AiFillMediumCircle } from "react-icons/ai";
import { GrLinkedinOption } from "react-icons/gr";
import { FaDiscord } from "react-icons/fa";

export const Token = {
  SOLANA: {
    SOL: "https://lptokenbucket.s3.amazonaws.com/df32c49a4f133662fd78dc3449b0946d",
    AVAX: "https://lptokenbucket.s3.amazonaws.com/7c94ecdfa35cb938058a5cfd4def12b0",
    BTC: "https://lptokenbucket.s3.amazonaws.com/13355d0cbc36957a4cab652ced5e593d",
    ETH: "https://lptokenbucket.s3.amazonaws.com/af7aab2e5dffe547903c269440d072f8",
    FIDA: "https://lptokenbucket.s3.amazonaws.com/b25cf68285a09b69fa114aea1e4aa1c8",
    FTM: "https://lptokenbucket.s3.amazonaws.com/3c8381d0a56b6ce57838f4b98d12736b",
    FTT: "https://lptokenbucket.s3.amazonaws.com/e729be5a6e549f0822a99d71b4acb393",
    GMT: "https://lptokenbucket.s3.amazonaws.com/b9a0803c08edc7405ca9f9bf8916e071",
    lpBTC:
      "https://lptokenbucket.s3.amazonaws.com/d4f8c12da580e5354acb49ecc506a143",
    lpETH:
      "https://lptokenbucket.s3.amazonaws.com/38a2c2d927513757dd166a284143d2ff",
    LPFi: "https://lptokenbucket.s3.amazonaws.com/a5b9ac6b0666de27ea209d9441f19023",
    lpSOL:
      "https://lptokenbucket.s3.amazonaws.com/230c108aaf8ccc43b13c51e79b2a4cd4",
    lpUSD:
      "https://lptokenbucket.s3.amazonaws.com/046c0ebb25140f38237bc2f06f35978d",
    LUNA: "https://lptokenbucket.s3.amazonaws.com/4e559fe1be8132c8c93c1e24785cb180",
    MATIC:
      "https://lptokenbucket.s3.amazonaws.com/8b1274654b7906cd1e5c06ccc98c92ba",
    mSOL: "https://lptokenbucket.s3.amazonaws.com/dff4db9f6e4d5e45c898d810cd6b381b",
    RAY: "https://lptokenbucket.s3.amazonaws.com/946b1a66cf451854b333c14329e89f9b",
    scnSOL:
      "https://lptokenbucket.s3.amazonaws.com/7e8b0e4d73fa832fa1549ca58e0350d1",
    SRM: "https://lptokenbucket.s3.amazonaws.com/ff00f3aa48cd2273dd1429a00b4b566d",
    stSOL:
      "https://lptokenbucket.s3.amazonaws.com/c8e60e5099ff1a97c766ca39dac5fe71",
    USDC: "https://lptokenbucket.s3.amazonaws.com/c65abd7ddaeb4bd9dac7af64fe64a98b",
    USDT: "https://lptokenbucket.s3.amazonaws.com/5674dbe0e4e1e426f27fdf50f44fdec1",
    wBTC: "https://lptokenbucket.s3.amazonaws.com/f4c8fda1c30a3836b8809dbbf69ffb23",
    wETH: "https://lptokenbucket.s3.amazonaws.com/79348e9689a91ff74210766c2996a4b0",
    wSOL: "https://lptokenbucket.s3.amazonaws.com/0f81361d55f5479bb29057d8d15148ba",
  },

  NEAR: {
    AURORA:
      "https://lptokenbucket.s3.amazonaws.com/f6cead2734f8acc7390b5f2932d40846",
    CELO: "https://lptokenbucket.s3.amazonaws.com/3eb409e7073b92adfbd6c06040bc9f16",
    cUSD: "https://lptokenbucket.s3.amazonaws.com/145e51c07f35fec1873d469f8b3d6957",
    ETH: "https://lptokenbucket.s3.amazonaws.com/4ac46666504e3401c5b6d25886d4ca07",
    fBRRR:
      "https://lptokenbucket.s3.amazonaws.com/bc165c4feff9f0e2587e76eef0243d2a",
    lpNEAR:
      "https://lptokenbucket.s3.amazonaws.com/2825ad05c780643c5fa09f35baf49a9c",
    NEAR: "https://lptokenbucket.s3.amazonaws.com/c99d9a56da78ef27e6c0b13d8460c6a1",
    stNEAR:
      "https://lptokenbucket.s3.amazonaws.com/a3c060b86882ccb749647e86e6ec0f61",
    USN: "https://lptokenbucket.s3.amazonaws.com/c9803e7527dd610ed8c50dd89ad92f9e",
    wBTC: "https://lptokenbucket.s3.amazonaws.com/b004b2dbfaa3b34fd1081f3b2f9202a3",
  },
};

export const Network = {
  Solana:
    "https://lptokenbucket.s3.amazonaws.com/9440febbf20acc4f4405cd3e96033a90",
  Near: "https://lptokenbucket.s3.amazonaws.com/11e9318ffc76d36ccff4850212ba347d",
  Aurora:
    "https://lptokenbucket.s3.amazonaws.com/18b98d07ea71d97c11a3bab3d0618052",
};

export const Global = {
  factory:
    "https://lptokenbucket.s3.amazonaws.com/185a4a97968e24818e451f721a52feb1",
};

export const NetWorkList = [
  {
    id: 1,
    img: Network.Solana,
    name: "SOL",
    fullName: "Solana",
  },
  {
    id: 2,
    img: Network.Near,
    name: "NEAR Protocol",
    fullName: "NEAR Protocol",
  },
  {
    id: 3,
    img: Network.Aurora,
    name: "Aurora",
    fullName: "Aurora",
  },
];

export const NavbarApi = [
  {
    id: 1,
    name: "Faucet",
    pathName: "/",
    href: "/",
  },
  {
    id: 2,
    name: "Borrow",
    pathName: "/borrow",
    href: "/borrow",
  },
  {
    id: 3,
    name: "Auction",
    pathName: "/auction",
    href: "/auction",
  },
  {
    id: 4,
    name: "Liquidate",
    pathName: "/liquidate",
    href: "/liquidate",
  },
  {
    id: 5,
    name: "Liquidity Pool",
    pathName: "/liquidityPool",
    href: "/liquidityPool",
  },
  {
    id: 6,
    name: "Swap",
    pathName: "/swap",
    href: "/swap",
  },
  {
    id: 7,
    name: "Bridge",
    pathName: "/bridge",
    href: "/bridge",
  },
];

export const FooterApi = [
  {
    id: 1,
    icon: <FaTwitter />,
    url: "https://twitter.com/LPFinance_",
  },
  {
    id: 2,
    icon: <FaTelegramPlane />,
    url: "https://t.me/LP_Defi_Official_group",
  },
  {
    id: 3,
    icon: <AiFillMediumCircle />,
    url: " https://medium.com/@LP_Finance",
  },
  {
    id: 4,
    icon: <GrLinkedinOption />,
    url: "https://www.linkedin.com/company/lpdefi/",
  },

  {
    id: 5,
    icon: <AiFillGithub />,
    url: "https://github.com/LP-Finance-Inc",
  },
  {
    id: 6,
    icon: <FaDiscord />,
    url: "https://discord.gg/ug7mstrHNW",
  },
];
