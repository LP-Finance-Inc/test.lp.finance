import styled from "styled-components";

const SwapWrapper = styled.div`
  .Swap {
    .swap_title {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    .TradingView_section {
      .nav-tabs {
        border-bottom: 1px solid #404040;
      }

      .nav-tabs .nav-item.show .nav-link,
      .nav-tabs .nav-link.active {
        position: relative;
        color: ${(props) => props.theme.MainColor} !important;
        font-size: 1.2rem;
        font-weight: 600;
        background-color: transparent;
        border: none;
        transition: hover 0.4s;
        padding-bottom: 10px;
        padding: 0.4rem 2rem 0.4rem 2rem;

        &:before {
          content: "";
          position: absolute;
          left: 0px;
          bottom: 0;
          width: 100%;
          height: 2px;
          opacity: 1;
          background: ${(props) => props.theme.NavBgLine};
          transition: 450ms all;
        }

        h1 {
          font-size: 1rem !important;
          letter-spacing: 0.4px !important;
          font-weight: 700 !important;
        }
      }

      .tab-content {
        .tab-pane {
          .TradingView_section {
            .trading_name {
              color: ${(props) => props.theme.MainColor};
              opacity: 0.8;
              font-size: 0.9rem;
            }

            .trading_Details {
              .price {
                font-size: 1.2rem;
                font-weight: 600;
                color: ${(props) => props.theme.MainColor};

                .text-green {
                  color: #427045;
                  opacity: 0.8;
                }
                .text-red {
                  color: #a35151;
                  opacity: 0.8;
                }

                span {
                  font-size: 0.8rem;
                }
              }

              .time {
                color: ${(props) => props.theme.MainColor};
                opacity: 0.8;
                font-size: 0.78rem;
              }
            }

            .trading_timers {
              button {
                border: none;
                background: transparent;
                font-weight: 600;
                font-size: 0.8rem;
              }

              .active {
                color: ${(props) => props.theme.MainColor};
                border: 1px solid ${(props) => props.theme.MainColor};
                border-radius: 10px;
                padding: 0.2rem 0.5rem;
                background: #8b4898;
              }

              .notActive {
                color: ${(props) => props.theme.MainColor};
              }
            }
          }
        }
      }

      .Trading_view_wrapper {
        display: flex;
        padding-top: 50px;
        justify-content: center;

        .collapsible {
          width: 400px;
          overflow: hidden;
          font-weight: 500;
        }

        .collapsible label {
          position: relative;
          font-weight: 600;
          // background:white;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
          color: #1c1c6b;
          display: block;
          margin-bottom: 10px;
          cursor: pointer;
          padding: 15px 0;
          border-radius: 4px;
        }

        .collapsible label::after {
          content:"",
          position:absolute;
          right:10px;
          background:red;
          top:20px;
          cursor: pointer;
          width:auto;
          height:auto;
          background: url("/images/figma/CollapseBottom.png") no-repeat 0 0;
        }

        .collapsible-text {
          max-height:1px;
          overflow:hidden;
          border-radius:4px;
          line-height:1.4;
        }
      }
    }

    .swap_card {
      position: relative;
      width: 100%;
      height: auto;
      background: ${(props) => props.theme.CardBg};
      backdrop-filter: ${(props) => props.theme.CardFilter};
      border-radius: 16px;
      padding: 1.5rem 1.5rem 1rem 1.5rem;
      z-index: 500;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 16px;
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

      .swap_card_title {
        p {
          color: ${(props) => props.theme.MainColor};
          font-size: 1.5rem;
          letter-spacing: 1px;
        }
      }

      .title {
        p {
          font-size: 1.67rem;
          color: ${(props) => props.theme.MainColor};
          font-weight: 500;
        }
      }

      .box1,
      .box2 {
        background: ${(props) => props.theme.BoxBgMain};
        padding: 0.3rem 0.7rem;

        .title {
          p {
            color: ${(props) => props.theme.MainColor};
            font-size: 1rem;
            font-weight: 500;
            letter-spacing: 0.8px;
          }
        }

        .number {
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

        .img_Section {
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

      .transfer_title {
        .trans_icon {
          transform: rotate(90deg);
          color: ${(props) => props.theme.MainColor};
          font-size: 1.5rem;
          border: 2px solid ${(props) => props.theme.MainColor};
          border-radius: 50%;
          padding: 0.2rem;
          cursor: pointer;
        }
      }

      .btn {
        button {
          background: ${(props) => props.theme.ButtonBgMain};
          color: ${(props) => props.theme.MainColor};
          font-weight: 500;
          font-size: 1rem;
          padding: 0.5rem 2.5rem;
          border: none;
        }
      }
    }
  }

  @media only screen and (max-width: 907px) {
    .Swap {
      .swap_box {
        .swap_card {
          padding: 0.5rem;
        }
      }
    }
  }
`;

export default SwapWrapper;
