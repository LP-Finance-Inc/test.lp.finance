import styled from "styled-components";

const BridgeWrapper = styled.div`
  .Bridge {
    min-height: calc(100vh - 131px - 160px);

    .Bridge_top {
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .subtitle {
        display: flex;
        justify-content: center;
        align-items: center;
        h1 {
          letter-spacing: 0.5px !important;
          font-size: 1.5rem !important;
        }
      }
    }

    .Bridge_bottom {
      padding: 30px 0px 30px 0px;

      .Token_Network_card {
        position: relative;
        width: 100%;
        min-height: 100px;
        background: ${(props) => props.theme.CardMain};
        border: 1px solid ${(props) => props.theme.MainColor};
        border-radius: 20px;
        padding: 1.2rem 1.5rem 1.2rem 1.5rem;
        z-index: 500;

        .Title {
          p {
            font-size: 1rem;
            color: ${(props) => props.theme.MainColor};
            font-weight: 500;
          }
        }
        .subtitle {
          span {
            font-size: 0.9rem;
            color: ${(props) => props.theme.MainColor};
          }
        }

        .Token_Network_section {
          .Input_Section {
            .Input_Section_Title {
              p {
                color: ${(props) => props.theme.MainColor};
                font-size: 0.8rem;
              }
            }
            .Input_Section_Box {
              background: ${(props) => props.theme.CardMain};
              border: 1px solid ${(props) => props.theme.MainColor};
              padding: 0.8rem 0.7rem;
              border-radius: 4px;
              cursor: pointer;

              .Input_Section_Box_left {
                .Details {
                  img {
                    width: auto;
                    height: 1.6rem;
                  }
                  span {
                    color: ${(props) => props.theme.MainColor};
                    font-size: 1rem;
                  }
                }
              }
              .Input_Section_Box_right {
                .icon {
                  color: ${(props) => props.theme.MainColor};
                }
              }
            }
          }

          .swap_section {
            .icon {
              color: ${(props) => props.theme.MainColor};
              font-size: 1.5rem;
              border: 2px solid ${(props) => props.theme.MainColor};
              border-radius: 50%;
              cursor: pointer;
            }
          }
        }

        .Btn_section {
          button {
            background: ${(props) => props.theme.CardMain};
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
    .Bridge {
      .Bridge_bottom {
        padding: 0px 0px 15px 0px;

        .token_sale_card {
          margin-top: 50px;
        }
      }
    }
  }
`;

export default BridgeWrapper;
