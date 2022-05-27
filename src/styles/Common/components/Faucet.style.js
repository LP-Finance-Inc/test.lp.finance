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
        width: 420px;
        min-height: 100px;
        background: ${(props) => props.theme.CardMain};
        border: 1px solid ${(props) => props.theme.MainColor};
        border-radius: 20px;
        padding: 1.2rem 1.5rem 1.2rem 1.5rem;
        z-index: 500;

        .title {
          p {
            font-size: 1.55rem;
            color: ${(props) => props.theme.MainColor};
            font-weight: 500;
          }
          span {
            color: ${(props) => props.theme.MainColor};
          }
        }

        .box {
          background: ${(props) => props.theme.BoxMain};
          padding: 0.3rem 0.7rem;
          border: 1px solid ${(props) => props.theme.MainColor};

          .title {
            p {
              color: ${(props) => props.theme.MainColor};
              font-size: 1rem;
              font-weight: 500;
              letter-spacing: 0.8px;
            }
          }

          .number {
            p {
              font-size: 1.2rem;
              color: ${(props) => props.theme.MainColor};
            }
          }

          .btn_section {
            button {
              border: none;
              background: none;
              color: ${(props) => props.theme.MainColor};
              transition: all 0.3s;
              padding: 0.4rem;
              display: flex;
              align-items: center;

              &:hover {
                background: ${(props) => props.theme.BoxHover};
              }
            }
          }
        }

        .btn {
          button {
            background: ${(props) => props.theme.BoxMain};
            border: 1px solid ${(props) => props.theme.MainColor};
            color: ${(props) => props.theme.MainColor};
            font-weight: 500;
            font-size: 1rem;
            padding: 0.5rem 2.5rem;
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
