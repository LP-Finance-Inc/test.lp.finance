import styled from "styled-components";

const AuctionTabsWrapper = styled.div`
  .Auction_tab_section {
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
            background: ${(props) => props.theme.CardBg};
            backdrop-filter: ${(props) => props.theme.CardFilter};
            border-radius: 20px 20px 0px 0px;
            top: 1px;

            &::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 20px 20px 0px 0px;
              border-top: 2px solid transparent;
              border-right: 2px solid transparent;
              border-left: 2px solid transparent;
              border-bottom: 0px solid transparent;
              background: ${(props) => props.theme.CardLine};
              -webkit-mask: ${(props) => props.theme.CardMask};
              -webkit-mask-composite: destination-out;
              -moz-mask: ${(props) => props.theme.CardMask};
              -moz-mask-composite: destination-out;
              -o-mask: ${(props) => props.theme.CardMask};
              -o-mask-composite: destination-out;
              mask-composite: exclude;
            }
          }

          &:hover {
            border: none;
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

      .tab-content {
        position: relative;
        width: 100%;
        height: auto;
        background: ${(props) => props.theme.CardBg};
        backdrop-filter: ${(props) => props.theme.CardFilter};
        padding: 2.5rem 2rem;
        z-index: 500;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-top: 2px solid transparent;
          border-bottom: 2px solid transparent;
          border-left: 2px solid transparent;
          border-right: 2px solid transparent;
          background: ${(props) => props.theme.CardLine};
          -webkit-mask: ${(props) => props.theme.CardMask};
          -webkit-mask-composite: destination-out;
          -moz-mask: ${(props) => props.theme.CardMask};
          -moz-mask-composite: destination-out;
          -o-mask: ${(props) => props.theme.CardMask};
          -o-mask-composite: destination-out;
          mask-composite: exclude;
        }

        .deposit,
        .withdraw {
          .deposit_card,
          .withdraw_card {
            background: ${(props) => props.theme.BoxBgMain};
            padding: 0.2rem 0.5rem;

            .deposit_card_left,
            .withdraw_card_left {
              .badge {
                background: ${(props) => props.theme.MainColor};
                color: ${(props) => props.theme.BadgeColor};
                font-weight: 400;
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
                  color: ${(props) => props.theme.InputPlaceColor};
                }

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              }
            }

            .deposit_card_right,
            .withdraw_card_right {
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
                  background: ${(props) => props.theme.ButtonBgSecondary};
                }
              }
            }
          }

          .details {
            .btn_section {
              button {
                color: ${(props) => props.theme.MainColor};
                border: none;
                background: ${(props) => props.theme.ButtonBgMain};
                padding: 0.5rem 3rem;
              }
            }
          }
        }
      }
    }

    .Auction_Account {
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
        margin-top: 30px;

        hr {
          position: relative;
          border: 1px solid ${(props) => props.theme.MainColor};
          width: 0px;
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
        background: ${(props) => props.theme.CardBg};
        backdrop-filter: ${(props) => props.theme.CardFilter};
        border-radius: 20px;
        height: auto;
        padding: 1rem 2rem;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
          border: 2px solid transparent;
          background: ${(props) => props.theme.CardLine};
          -webkit-mask: ${(props) => props.theme.CardMask};
          -webkit-mask-composite: destination-out;
          -moz-mask: ${(props) => props.theme.CardMask};
          -moz-mask-composite: destination-out;
          -o-mask: ${(props) => props.theme.CardMask};
          -o-mask-composite: destination-out;
          mask-composite: exclude;
        }

        table {
          tr {
            td {
              padding: 0.5rem 0rem;
            }

            .left {
              vertical-align: top;
              p {
                color: ${(props) => props.theme.TableTitleColor};
                font-weight: bold;
                font-size: 1.5rem;
              }

              span {
                color: ${(props) => props.theme.MainColor};
                font-size: 1.25rem;
              }

              .dollar {
                color: ${(props) => props.theme.MainColor};
                font-weight: normal;
                font-size: 1rem;
              }
            }

            .right {
              .list {
                .list_details {
                  img {
                    height: 1, 7rem;
                    width: 1.7rem;
                  }
                }
                .list_Price {
                  p {
                    font-size: 0.8rem;
                  }
                }
              }
            }
          }
        }

        .Cake_earned {
          width: 100%;
          .title {
            color: ${(props) => props.theme.TableTitleColor};
            font-weight: bold;
            font-size: 1rem;
          }

          input {
            width: 100%;
            outline: none;
            font-size: 1.2rem;
            border: none;
            background: none;
            color: white;
            -moz-appearance: textfield;

            &::placeholder {
              color: ${(props) => props.theme.InputPlaceColor};
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }

          .btn_section {
            button {
              outline: none;
              border: none;
              width: 100%;
              color: ${(props) => props.theme.MainColor};
              padding: 0.5rem 2rem;
              border-radius: 20px;
              background: ${(props) => props.theme.ButtonBgMain};
              box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1200px) {
    .Auction_tab_section {
      .tabs_card {
        .tab-content {
          padding: 2.5rem 1rem;
        }
      }
    }
  }

  @media only screen and (max-width: 700px) {
    .Auction_tab_section {
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
    .Auction_tab_section {
      .tabs_card {
        .nav,
        .nav-tabs {
          .nav-link {
            padding: 1rem 0rem;
          }
        }

        .tab-content {
          padding: 1.3rem 0rem;
        }
      }

      .Auction_Account {
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
      }
    }
  }
`;

export default AuctionTabsWrapper;
