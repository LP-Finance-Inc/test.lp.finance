import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  apricot: {
    ApricotMain: "#42f0db",
    ApricotPrimary: "#ffff",
    ApricotSecondary: "#8c8c8c",
    ApricotMainLine: "#42f0db",
    ApricotPrimaryLine: "hsla(0,0%,89.8%,.4)",
    ApricotNeutralAlt: "#1b1d23",
    ApricotNeutral: "#0e1118",
    ApricotOverlay: "#0e1118",
    ApricotBrandAlt: "#0da098",
    ApricotBrand: "#ff5c28",
  },

  MainColor: "white",
  HeaderMain:
    "linear-gradient(90deg, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
  NavBgLine:
    "linear-gradient(to left, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
  CardMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
  CardFilter: "blur(20px)",
  CardLine:
    "linear-gradient(90deg, #8b4898 0%, #009dd9 47.53%, #18b298 97.08%) border-box",
  CardBg: "rgba(255, 255, 255, 0.2)",
  ButtonBgMain: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
  ButtonBgSecondary: "rgba(255, 255, 255, 0.2)",
  BoxBgMain:
    "linear-gradient(90deg, rgba(139, 72, 152, 0.4) 0%, rgba(0, 157, 217, 0.4) 47.53%, rgba(24, 178, 152, 0.4) 97.08%)",
  InputPlaceColor: "#dedede",
  ChartMainBg: "#fd37ae",
  BadgeColor: "#3f3f3f",
  TooltipHandleBg: "#009dd9",
  TableTitleColor: "#41bbe5",
  ModelFilter: "blur(5px)",
  ModelMainBg: "rgba(0, 0, 0, 0.8)",
  ModelSecondBg: "rgba(255, 255, 255, 0.2)",
  FooterMainBg:
    "linear-gradient(90deg, rgba(139, 72, 152, 0.89) 0%, #009DD9 60.17%, #18A9B2 97.08%)",
};

export const darkTheme = {
  apricot: {
    ApricotMain: "#42f0db",
    ApricotPrimary: "#ffff",
    ApricotSecondary: "#8c8c8c",
    ApricotMainLine: "#42f0db",
    ApricotPrimaryLine: "hsla(0,0%,89.8%,.4)",
    ApricotNeutralAlt: "#1b1d23",
    ApricotNeutral: "#0e1118",
    ApricotOverlay: "#0e1118",
    ApricotBrandAlt: "#0da098",
    ApricotBrand: "#ff5c28",
  },

  MainColor: "white",
  HeaderMain:
    "linear-gradient(90deg, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
  NavBgLine:
    "linear-gradient(to left, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
  CardMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
  CardFilter: "blur(0px)",
  CardLine:
    "linear-gradient(90deg, #8b4898 0%, #009dd9 47.53%, #18b298 97.08%) border-box",
  CardBg: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
  ButtonBgMain: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
  ButtonBgSecondary: "rgba(255, 255, 255, 0.2)",
  BoxBgMain:
    "linear-gradient(90deg, rgba(139, 72, 152, 0.4) 0%, rgba(0, 157, 217, 0.4) 47.53%, rgba(24, 178, 152, 0.4) 97.08%)",
  InputPlaceColor: "#dedede",
  ChartMainBg: "#fd37ae",
  BadgeColor: "#3f3f3f",
  TooltipHandleBg: "#009dd9",
  TableTitleColor: "#41bbe5",
  ModelFilter: "blur(5px)",
  ModelMainBg: "rgba(0, 0, 0, 0.8)",
  ModelSecondBg: "linear-gradient(-180deg, #8B4898 0%, #009DD9 102.51%)",
  FooterMainBg: "black",
};

export const GlobalStyle = createGlobalStyle`

*,
*:before,
*:after {
    box-sizing: inherit;
}

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

body,
html {
    margin: 0;
}

html {
    margin: 0;
    padding: 0;
    text-size-adjust: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;    
    -moz-text-size-adjust: 100%;
}

::-webkit-scrollbar {
    height: 10px;
    width: 10px;
    background: white;
}

::-webkit-scrollbar-corner {
    background: white;
}

::-webkit-scrollbar-thumb {
    background: #a8a8a8;
    border-radius: 10px;
    -webkit-border-radius: 1ex;
}

body {
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: normal;
    padding-right: 0px;
    padding-left: 0px;
    margin-right: auto;
    margin-left: auto;
    position: relative;

    ${(props) =>
      props.Mode === "LIGHT_MODE"
        ? `
        background-image:url("/images/backgroundBody.png");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size:cover;

      `
        : `
        background: black;

        
      `}
}

h1,
h2,
h3,
h4,
h5,
h6 {
    letter-spacing: 0.8px;
    font-weight: 1000;
    color: black;
    font-style: normal;
    font-size: 1.9rem;
    background-image:  ${(props) => props.theme.HeaderMain};
    background-repeat: repeat;
    background-size: 100%;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-stroke-width: 0.18px;
    -moz-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-stroke-width: 0.18px;
}

p {
  margin-bottom: 0 !important;
}


.container {
    max-width: 1250px !important;
}

.dropdown-menu {
    z-index: 400;
}

.web3modal-modal-card {
  background: linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%) !important;
  max-width: 700px !important;
  .web3modal-provider-wrapper{
    .web3modal-provider-container{
      padding: 24px 28px !important;

      .web3modal-provider-icon{
        img{
          width:auto !important;
          height:2rem !important;
        }
      }
      .web3modal-provider-name{
        font-size: 20px !important;
      }

      .web3modal-provider-description{
        font-size: 15px !important;
        margin: 0em 0px !important;
      }
    }
  }
}


@media only screen and (max-width: 600px) {

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 28px;
    }
}
`;
