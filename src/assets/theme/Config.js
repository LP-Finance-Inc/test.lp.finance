import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: {
    BodyText: "white",
    BodyHeadingColor:
      "linear-gradient(90deg, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
    BodyBorderColor:
      "linear-gradient(90deg, #8b4898 0%, #009dd9 47.53%, #18b298 97.08%)",
    BodyBg1:
      "linear-gradient(to left, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
    BodyBg2:
      "linear-gradient(to right, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
    BodyBg3:
      "linear-gradient(90deg, #8b4898 0%, #009dd9 47.53%, #18b298 97.08%)",
    BodyBg4: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
  },

  card: {
    CardBg: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
    CardBg1: "rgba(255, 255, 255, 0.2)",
    CardBg2: "linear-gradient(-180deg, #8B4898 0%, #009DD9 102.51%)",
    CardBg3:
      "linear-gradient(40.42deg, rgba(139, 72, 152, 0.95) 16.11%, rgba(0, 157, 217, 0.95) 50.71%, rgba(24, 178, 152, 0.95) 86.78%)",

    CardMask:
      "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
    CardFilter: "blur(0px)",
    CardColor: "white",
    CardBorderColor:
      "linear-gradient(90deg, #8b4898 0%, #009dd9 47.53%, #18b298 97.08%) border-box",
  },
  header: {
    HeaderNavIconMenu: "white",
    HeaderNavMenuColor: "white",
    HeaderHoverColor: "#d1d1d1",
    HeaderHoverBorder:
      "linear-gradient(to left, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
  },

  slideMenu: {
    SlideMenuColor: "white",
    SlideMenuCloseColor: "white",
  },

  box: {
    BoxBg1:
      "linear-gradient(90deg, rgba(139, 72, 152, 0.4) 0%, rgba(0, 157, 217, 0.4) 47.53%, rgba(24, 178, 152, 0.4) 97.08%)",
  },

  button: {
    ButtonBg1: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
    ButtonBg2: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
    ButtonBg3: "linear-gradient(90deg, 18B298, 009DD9, 8B4898)",
    ButtonColor1: "white",
    ButtonColor2:
      "linear-gradient(to left, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
    ButtonColor3:
      "linear-gradient(to right, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
    ButtonBorder: "1px solid #ffffff",
  },

  progressBar: {
    ProgressBarBg1: "white",
    ProgressBarBg2:
      "linear-gradient(90deg, #8b4898 0%, #009dd9 47.53%, #18b298 97.08%)",
  },

  list: {
    ListColor: "white",
    ListHoverBg: "#ffffff1a",
  },

  dropDown: {
    DropDownColor: "white",
    DropDownBtnBg1: "inherit",
    DropDownBtnFocusHoverColor: "rgba(255, 255, 255, 0.2)",
    DropDownListBg:
      "linear-gradient(to right, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
    DropDownListColor: "white",
    DropDownListHoverBg: "rgba(255, 255, 255, 0.2)",
  },

  tabs: {
    // activeBg: "rgba(255, 255, 255, 0.2)",
    TabsColor: "white",
    TabsActiveBg: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
    TabsActiveBorderBg: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
  },

  table: {
    TableTitleColor: "#41bbe5",
    TableColor: "white",
    TableHeaderColor: "white",
    TableTdColor: "white",
  },

  footer: {
    FooterBg:
      "linear-gradient(90.17deg, #3F3F3F 0.13%, rgba(63, 63, 63, 0) 99.85%)",
    FooterBorder:
      "linear-gradient(90deg, #664898 0%, #009DD9 47.53%, #18B298 97.08%)",
  },

  popup: {
    PopupBg1: "white",
    PopupBg2:
      "linear-gradient(90deg, #8b4898 0%, #009dd9 47.53%, #18b298 97.08%)",
  },

  protocol: {
    ProtocolBg: "white",
  },

  input: {
    InputPlaceColor: "#dedede",
  },

  tooltip: {
    TooltipColor: "#009dd9",
    TooltipBg: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
  },

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
};

export const darkTheme = {};

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
    font-family: 'Nunito Sans', sans-serif;
    font-style: normal;
    font-weight: normal;
    background: black;
    padding-right: 0px;
    padding-left: 0px;
    margin-right: auto;
    margin-left: auto;
    position: relative;
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
    background-image:  ${(props) => props.theme.body.BodyHeadingColor};
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
