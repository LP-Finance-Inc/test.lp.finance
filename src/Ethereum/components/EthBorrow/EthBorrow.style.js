import styled from "styled-components";

const EthBorrowWrapper = styled.div`
  .EthBorrow_Section {
    min-height: calc(100vh - 131px - 160px);

    .EthBorrow_Section_title {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .EthBorrow_Section_subtitle {
      display: flex;
      justify-content: center;
      align-items: center;

      h1 {
        letter-spacing: 0.5px !important;
        font-size: 1.5rem !important;
      }
    }

    .EthBorrow_Section_overview_section {
      .protocol_overview_title {
        p {
          color: ${(props) => props.theme.Primary};
          font-size: 1.6rem;
          font-weight: 900;
          font-style: normal;
          font-weight: 400;
        }
      }

      .protocol_overview_img {
        position: relative;

        hr {
          border: 1px solid white;
          width: 100%;
        }

        img {
          position: absolute;
          transform: rotate(-90deg);
          right: -10px;
          top: -4px;
          width: auto;
          height: 0.6rem;
        }
      }

      .overview_section_card {
        .bottom_arrow_img {
          position: relative;
          margin-top: 30px;

          hr {
            border: 1px solid white;
            width: 0px;
            height: 100%;
            margin-top: 0rem !important;
            margin-bottom: 0rem !important;
          }

          img {
            position: absolute;
            transform: translate(-50%, 50%);
            bottom: 0px;
            width: auto;
            height: 0.6rem;
          }
        }

        .EthBorrow_Section_card {
          position: relative;
          width: 100%;
          height: 100%;
          background: ${(props) => props.theme.BrandMain};
          backdrop-filter: blur(0px);
          border-radius: 20px 20px 20px 20px;
          padding: 1.5rem 3rem;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 20px 20px 20px 20px;
            border: 2px solid transparent;
            background: ${(props) => props.theme.BrandLine};
            -webkit-mask: ${(props) => props.theme.BrandMask};
            -webkit-mask-composite: destination-out;
            -moz-mask: ${(props) => props.theme.BrandMask};
            -moz-mask-composite: destination-out;
            mask-composite: exclude;
          }

          .EthBorrow_Section_card_left {
            .EthBorrow_Section_cart {
              @property --p {
                syntax: "<number>";
                inherits: true;
                initial-value: 0;
              }

              .pie {
                --c: ${(props) => props.theme.Main};
                --b: 16px;
                --w: 150px;
                --p: ${(props) => props.pie};

                width: 120px;
                aspect-ratio: 1;
                position: relative;
                display: inline-block;
                margin: 5px;
                place-content: center;
                transform: rotate(90deg);
                cursor: pointer;
              }

              .pie:before,
              .pie:after {
                content: "";
                position: absolute;
                border-radius: 50%;
              }

              .pie:before {
                inset: 0;
                background: radial-gradient(farthest-side, var(--c) 98%, #0000)
                    top/var(--b) var(--b) no-repeat,
                  conic-gradient(var(--c) calc(var(--p) * 1%), #0000 0);
                -webkit-mask: radial-gradient(
                  farthest-side,
                  #0000 calc(99% - var(--b)),
                  #000 calc(100% - var(--b))
                );
                mask: radial-gradient(
                  farthest-side,
                  #0000 calc(99% - var(--b)),
                  #000 calc(100% - var(--b))
                );
              }

              .pie:after {
                inset: calc(50% - var(--b) / 2);
                background: var(--c);
                transform: rotate(calc(var(--p) * 3.6deg))
                  translateY(calc(50% - var(--w) / 2));
              }

              .animate {
                animation: ani 1s 0.5s both;
              }

              .no-round:before {
                background-size: 0 0, auto;
              }

              .no-round:after {
                content: none;
              }

              .totalSupplyPie {
                position: absolute;
                display: inline-block;
                top: 22px;
                left: 37px;
                cursor: pointer;

                img {
                  height: 85px;
                  width: auto;
                  border-radius: 50%;
                  ya: -1;
                }
              }

              @keyframes ani {
                from {
                  --p: 0;
                }
              }
            }

            .miter1,
            .miter2 {
              z-index: -1;
              position: absolute;

              p {
                color: white;
              }
            }

            .miter1 {
              top: -17px;
              left: 98px;

              p {
                line-height: 20px;
              }

              img {
                width: 132px;
              }
            }

            .miter2 {
              left: 125px;
              top: 80px;

              p {
                line-height: 0px;
              }

              img {
                width: 110px;
              }
            }

            .cart_details {
              z-index: -1;
              p,
              span {
                color: white;
              }
            }
          }

          .EthBorrow_Section_card_right {
            border-left: 3px solid white;

            .list_section {
              table {
                tr {
                  td {
                    color: white;
                  }

                  .list_section_right {
                    padding-left: 20px;
                  }
                }
              }
            }
          }

          .CBS_DAO {
            button {
              color: ${(props) => props.theme.ButtonSecondary};
              border: none;
              background: ${(props) => props.theme.ButtonMain};
              padding: 0.4rem 1.1rem;
              box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
                rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

              img {
                width: auto;
                height: 1.5rem;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1200px) {
    .EthBorrow_Section {
      .EthBorrow_Section_overview_section {
        .overview_section_card {
          .EthBorrow_Section_card {
            padding: 1.5rem 1rem;

            &::before {
              padding: 1.5rem 1rem;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 999px) {
    .EthBorrow_Section {
      .EthBorrow_Section_overview_section {
        .overview_section_card {
          .EthBorrow_Section_card {
            padding: 1.5rem 2rem;

            &::before {
              padding: 1.5rem 2rem;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .EthBorrow_Section {
      .EthBorrow_Section_overview_section {
        .protocol_overview_title {
          p {
            text-align: center;
          }
        }

        .protocol_overview_img {
          display: none;
        }

        .overview_section_card {
          .bottom_arrow_img {
            display: none;
          }
        }
      }
    }
  }
`;

export default EthBorrowWrapper;
