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
      height: 350px;
    }

    .swap_card {
      position: relative;
      width: 100%;
      height: 400px;
      background: ${(props) => props.theme.CardBg};
      backdrop-filter: ${(props) => props.theme.CardFilter};
      border-radius: 20px;
      padding: 1.5rem 1.5rem 1rem 1.5rem;
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
