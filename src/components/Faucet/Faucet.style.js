import styled from "styled-components";

const FaucetWrapper = styled.div`
  .Faucet {
    min-height: calc(100vh - 131px - 160px);

    .Faucet_top {
      .title {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
    }

    .Faucet_bottom {
      padding: 30px 0px 30px 0px;

      .img_section {
        img {
          max-width: 90%;
        }
      }

      .token_sale_card {
        position: relative;
        width: 420px;
        min-height: 100px;
        background: ${(props) => props.theme.BrandMain};
        border-radius: 20px;
        padding: 1.2rem 1.5rem 1.2rem 1.5rem;
        z-index: 500;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
          border: 2px solid transparent;
          background: ${(props) => props.theme.BrandLine};
          -webkit-mask: ${(props) => props.theme.BrandMask};
          -webkit-mask-composite: destination-out;
          -moz-mask: ${(props) => props.theme.BrandMask};
          -moz-mask-composite: destination-out;
          mask-composite: exclude;
        }

        .title {
          p {
            font-size: 1.55rem;
            color: ${(props) => props.theme.Primary};
            font-weight: 500;
          }
          span {
            color: ${(props) => props.theme.Primary};
          }
        }

        .box {
          background: ${(props) => props.theme.BoxMain};
          padding: 1rem 0.7rem;

          .title {
            p {
              color: white;
              font-size: 1rem;
              font-weight: 500;
              letter-spacing: 0.8px;
            }
          }

          .number {
            p {
              font-size: 1.2rem;
              color: ${(props) => props.theme.Secondary};
            }
          }

          .btn_section {
            button {
              border: none;
              background: none;
              color: white;
              transition: all 0.3s;
              padding: 0.4rem;
              display: flex;
              align-items: center;

              &:hover {
                background: ${(props) => props.theme.Overlay};
              }
            }
          }
        }

        .btn {
          button {
            background: ${(props) => props.theme.ButtonMain};
            color: ${(props) => props.theme.ButtonSecondary};
            font-weight: 500;
            font-size: 1rem;
            padding: 0.5rem 2.5rem;
            border: none;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 990px) {
    .Faucet {
      .Faucet_bottom {
        padding: 0px 0px 15px 0px;

        .token_sale_card {
          width: 100%;
          margin-top: 50px;

          .title {
            p {
              font-size: 1.5rem;
            }
          }
        }
      }
    }
  }
`;

export default FaucetWrapper;
