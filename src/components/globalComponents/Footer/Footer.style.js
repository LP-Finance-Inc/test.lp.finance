import styled from "styled-components";

const FooterWrapper = styled.div`
  .footer {
    max-width: 100% !important;
    margin: auto;
    padding: 1rem 0rem 0rem 0rem;
    min-height: 10rem;
    background: black;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
      rgba(90, 125, 188, 0.05) 0px 0.25em 1em;

    hr {
      height: 1px;
      margin: 10px 0px;
      background: linear-gradient(
        90deg,
        #664898 0%,
        #009dd9 47.53%,
        #18b298 97.08%
      );
    }

    .top_section {
      .footer_logo {
        img {
          height: 5.2rem;
          width: auto;
        }
      }

      ul {
        li {
          padding: 0rem 1rem;

          a {
            color: white;
            font-size: 30px;
          }
        }
      }
    }

    .bottom_section {
      padding: 0rem 0rem 1rem 0rem;

      .copyright {
        p {
          color: white;
          font-size: 1rem;
          width: 230px;
          background-image: linear-gradient(
            90deg,
            #664898 0%,
            #009dd9 47.53%,
            #18b298 97.08%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -webkit-text-stroke: 1.5px transparent;
          -moz-text-stroke: 1.5px transparent;
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .footer {
      .top_section {
        .footer_logo {
          display: flex;
          justify-content: flex-start;
        }

        ul {
          li {
            padding: 0rem 0.5rem;
          }
        }
      }
    }
  }
`;

export default FooterWrapper;
