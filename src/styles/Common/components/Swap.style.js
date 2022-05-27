import styled from "styled-components";

const SwapWrapper = styled.div`
  .Swap {
    min-height: calc(100vh - 131px - 160px);

    .swap_title {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    .swap_card {
      position: relative;
      width: 100%;
      height: auto;
      background: ${(props) => props.theme.CardMain};
      border: 1px solid ${(props) => props.theme.MainColor};
      border-radius: 20px;
      padding: 1.5rem 1.5rem 1rem 1.5rem;
      z-index: 500;

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
        background: ${(props) => props.theme.CardMain};
        border: 1px solid ${(props) => props.theme.MainColor};
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
            color: #2e2e2e;
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
              color: ${(props) => props.theme.MainColor};
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
              background: ${(props) => props.theme.BoxHover};
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
