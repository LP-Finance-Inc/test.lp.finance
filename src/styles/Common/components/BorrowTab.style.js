import styled from "styled-components";

const BorrowTabWrapper = styled.div`
  .borrow_tab_section {
    .tabs_card {
      .nav,
      .nav-tabs {
        padding: 0rem;
        border-bottom: 0px;
        width: 100% !important;

        .nav-link {
          position: relative;
          padding: 1.4rem 0rem;
          width: 100%;
          text-align: center;
          font-size: 1.2rem;
          color: ${(props) => props.theme.MainColor};
          margin-bottom: none;
          border: 0px solid transparent;
          border-top-left-radius: none;
          border-top-right-radius: none;
          z-index: 100;
          cursor: pointer;

          &.active {
            color: ${(props) => props.theme.MainColor};
            background: ${(props) => props.theme.CardMain};
            border-radius: 20px 20px 0px 0px;
            border: 1px solid ${(props) => props.theme.MainColor};
            top: 1px;
          }
        }
      }

      .tabContentToggle1 {
        border-radius: 20px 0px 20px 20px;

        &::before {
          border-radius: 20px 0px 20px 20px;
        }
      }

      .tabContentToggle2 {
        border-radius: 0px 20px 20px 20px;

        &::before {
          border-radius: 0px 20px 20px 20px;
        }
      }

      .tabContentToggle3 {
        border-radius: 20px;

        &::before {
          border-radius: 20px;
        }
      }

      .tab-content {
        position: relative;
        width: 100%;
        min-height: 115px;
        border: 1px solid ${(props) => props.theme.MainColor};
        background: ${(props) => props.theme.CardMain};
        padding: 2rem 2rem;
        z-index: 500;

        .deposit {
          .deposit_card {
            background: ${(props) => props.theme.CardMain};
            border: 1px solid ${(props) => props.theme.MainColor};
            padding: 0.2rem 0.5rem;

            .deposit_card_left {
              .badge {
                background: ${(props) => props.theme.CardMain};
                color: ${(props) => props.theme.MainColor};
                border: 1px solid ${(props) => props.theme.MainColor};
                font-weight: 400;
                border-radius: 10px;
                padding: 0.4rem 0.5rem;
                cursor: pointer;
              }

              input {
                width: 100%;
                outline: none;
                font-size: 1.2rem;
                border: none;
                background: none;
                color: ${(props) => props.theme.MainColor};
                -moz-appearance: textfield;

                &::placeholder {
                  color: ${(props) => props.theme.MainColor};
                }

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              }
            }

            .deposit_card_right {
              button {
                display: flex;
                align-items: center;
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

          .details {
            .btn_section {
              button {
                color: ${(props) => props.theme.MainColor};
                border: 1px solid ${(props) => props.theme.MainColor};
                background: ${(props) => props.theme.CardMain};
                padding: 0.6rem 3.5rem;
              }
            }
          }
        }
      }
    }

    .borrow_Account {
      .Account_title {
        p {
          color: ${(props) => props.theme.MainColor};
          font-size: 1.6rem;
          font-weight: 900;
          font-style: normal;
          font-weight: 400;
        }
      }

      .right_arrow_img {
        position: relative;

        hr {
          border: 1px solid ${(props) => props.theme.MainColor};
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

      .bottom_arrow_img {
        position: relative;
        margin-top: 50px;

        hr {
          position: relative;
          border: 1px solid ${(props) => props.theme.MainColor};
          width: auto;
          height: 100%;
          top: 0px;
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

      .Account_card {
        color: ${(props) => props.theme.MainColor};
        border: 1px solid ${(props) => props.theme.MainColor};
        background: ${(props) => props.theme.CardMain};
        border-radius: 20px;
        height: auto;
        padding: 1rem 2rem;

        .chart_miters {
          border: 1px solid ${(props) => props.theme.MainColor};
          height: 0.8rem;
          position: relative;
          width: 100%;

          .pie1 {
            position: absolute;
            display: inline-block;
            height: 100%;
            width: ${(props) => props.pieLTV}%;
            background: #884b99;
            left: 0;
            cursor: pointer;
          }

          .pie2 {
            position: absolute;
            display: inline-block;
            height: 100%;
            width: 2%;
            background: #e3319c;
            right: 15px;
            cursor: pointer;
          }

          .pie3 {
            position: absolute;
            display: inline-block;
            height: 100%;
            width: 2%;
            background: #41bbe5;
            right: 48px;
            cursor: pointer;
          }

          .pie1 .pie1_tooltip,
          .pie2 .pie2_tooltip,
          .pie3 .pie3_tooltip {
            visibility: hidden;
            min-width: 150px;
            background: ${(props) => props.theme.PrimaryColor};
            color: white;
            border: 1px solid ${(props) => props.theme.MainColor};
            text-align: center;
            border-radius: 6px;
            padding: 0.5rem 0.5rem;
            position: absolute;
            z-index: 1;
            bottom: 195%;
            left: 50%;
            font-size: 0.8rem;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            margin-left: -60px;
            opacity: 0;
            transition: opacity 0.5s;
          }

          .pie1 .pie1_tooltip::after,
          .pie2 .pie2_tooltip::after,
          .pie3 .pie3_tooltip::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-bottom: 10px;
            border-width: 5px;
            border-style: solid;
            border-color: ${(props) => props.theme.MainColor} transparent
              transparent transparent;
          }

          .pie1 .pie1_tooltip::after {
            margin-left: -5px;
          }

          .pie2 .pie2_tooltip::after {
            margin-left: -20px;
          }

          .pie3 .pie3_tooltip::after {
            margin-left: -20px;
          }

          .pie1:hover .pie1_tooltip,
          .pie2:hover .pie2_tooltip,
          .pie3:hover .pie3_tooltip {
            visibility: visible;
            opacity: 1;
          }
        }

        table {
          tr {
            td {
              padding: 0.5rem 0rem;
            }

            .left {
              vertical-align: top;

              p {
                color: ${(props) => props.theme.MainColor};
                font-weight: bold;
                font-size: 1.5rem;
              }

              span {
                color: ${(props) => props.theme.MainColor};
                font-size: 0.8rem;
              }
            }

            .right {
              .Collateral_list {
                .Collateral_list_details {
                  img {
                    height: 1, 7rem;
                    width: 1.7rem;
                  }
                }
                .Collateral_list_Price,
                .Collateral_list_APY {
                  p {
                    font-size: 0.8rem;

                    img {
                      height: 1rem;
                      width: auto;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1200px) {
    .borrow_tab_section {
      .tabs_card {
        .tab-content {
          padding: 2.5rem 1rem;
        }
      }
    }
  }

  @media only screen and (max-width: 700px) {
    .borrow_tab_section {
      .tabs_card {
        .nav-tabs {
          .nav-link {
            font-size: 1.1rem;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .borrow_tab_section {
      .tabs_card {
        .nav,
        .nav-tabs {
          .nav-link {
            padding: 1rem 0rem;
          }
        }
      }

      .borrow_Account {
        .Account_title {
          p {
            text-align: center;
          }
        }

        .right_arrow_img {
          display: none;
        }

        .bottom_arrow_img {
          display: none;
        }

        .Account_card {
          padding: 1rem 1rem;

          .chart_miters {
            .pie2 {
              right: 10px;
            }

            .pie3 {
              right: 25px;
            }

            .pie1 .pie1_tooltip,
            .pie2 .pie2_tooltip,
            .pie3 .pie3_tooltip {
              margin-left: -120px;
            }

            .pie2 .pie2_tooltip::after {
              margin-left: 40px;
            }

            .pie3 .pie3_tooltip::after {
              margin-left: 40px;
            }
          }
        }
      }
    }
  }
`;

export default BorrowTabWrapper;
