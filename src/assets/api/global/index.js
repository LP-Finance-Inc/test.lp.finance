import { FaTwitter, FaTelegramPlane } from "react-icons/fa";
import { AiFillGithub, AiFillMediumCircle } from "react-icons/ai";
import { GrLinkedinOption } from "react-icons/gr";
import { FaDiscord } from "react-icons/fa";

const point = "/images/network/";

export const NetWorkList = [
  {
    id: 1,
    img: point + "Solana.png",
    name: "SOL",
    fullName: "Solana",
  },
  {
    id: 2,
    img: point + "Near.png",
    name: "NEAR Protocol",
    fullName: "NEAR Protocol",
  },
  {
    id: 3,
    img: point + "Aurora.png",
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
