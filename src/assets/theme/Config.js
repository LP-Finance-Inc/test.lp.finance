import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  Main: "#e3319c",
  Primary: "#ffff",
  Secondary: "#E0E0E0",
  MainHeader: "#41bbe5",
  NeutralAlt: "#1b1d23",
  PieMain: "884B99",
  Neutral: "black",
  Overlay: "rgba(255, 255, 255, 0.2)",
  Header: "linear-gradient(90deg, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
  ModelOverlay: "rgba(0, 0, 0, 0.8)",
  BrandLine:
    "linear-gradient(90deg, #8b4898 0%, #009dd9 47.53%, #18b298 97.08%) border-box",
  BrandMain: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
  BrandPrimary: "linear-gradient(-180deg, #8B4898 0%, #009DD9 102.51%)",
  BrandSecondary:
    "linear-gradient(to left, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
  BrandMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
  BoxMain:
    "linear-gradient(90deg, rgba(139, 72, 152, 0.4) 0%, rgba(0, 157, 217, 0.4) 47.53%, rgba(24, 178, 152, 0.4) 97.08%)",
  ButtonMain: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
  ButtonSecondary: "#fff",
  FixedMain: "white",

  apricotSolend: {
    Main: "#42f0db",
    Primary: "#ffff",
    Secondary: "#8c8c8c",
    MainLine: "#42f0db",
    PrimaryLine: "hsla(0,0%,89.8%,.4)",
    NeutralAlt: "#1b1d23",
    Neutral: "#0e1118",
    Overlay: "#0e1118",
    BrandAlt: "#0da098",
    Brand: "#ff5c28",
  },
};

export const darkTheme = {
  Main: "#e3319c",
  Primary: "#ffff",
  Secondary: "#E0E0E0",
  MainHeader: "#41bbe5",
  NeutralAlt: "#1b1d23",
  PieMain: "884B99",
  Neutral: "black",
  Overlay: "rgba(255, 255, 255, 0.2)",
  Header: "linear-gradient(90deg, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
  ModelOverlay: "rgba(0, 0, 0, 0.8)",
  BrandLine:
    "linear-gradient(90deg, #8b4898 0%, #009dd9 47.53%, #18b298 97.08%) border-box",
  BrandMain: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
  BrandPrimary: "linear-gradient(-180deg, #8B4898 0%, #009DD9 102.51%)",
  BrandSecondary:
    "linear-gradient(to left, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)",
  BrandMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
  BoxMain:
    "linear-gradient(90deg, rgba(139, 72, 152, 0.4) 0%, rgba(0, 157, 217, 0.4) 47.53%, rgba(24, 178, 152, 0.4) 97.08%)",
  ButtonMain: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)",
  ButtonSecondary: "#fff",
  FixedMain: "white",

  apricotSolend: {
    Main: "#42f0db",
    Primary: "#ffff",
    Secondary: "#8c8c8c",
    MainLine: "#42f0db",
    PrimaryLine: "hsla(0,0%,89.8%,.4)",
    NeutralAlt: "#1b1d23",
    Neutral: "#0e1118",
    Overlay: "#0e1118",
    BrandAlt: "#0da098",
    Brand: "#ff5c28",
  },
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
    font-family: 'Nunito Sans', sans-serif;
    font-style: normal;
    font-weight: normal;
    background:  ${(props) => props.theme.Neutral};
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
    background-image:  ${(props) => props.theme.Header};
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
  overflow-y: scroll;
  overflow-x: hidden;
  height:500px;
  border-radius: 20px;


  &::-webkit-scrollbar {
    width: 7px;
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    border-radius: 10px;
  }

  max-width: 500px !important;

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
        color: white;
      }

      .web3modal-provider-description{
        font-size: 15px !important;
        margin: 0em 0px !important;
        color: white;
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
