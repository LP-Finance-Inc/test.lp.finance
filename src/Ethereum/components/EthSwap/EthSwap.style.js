import styled from "styled-components";

const EthSwapWrapper = styled.div`
  .EthSwap {
    min-height: calc(100vh - 131px - 160px);

    .EthSwap_title {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    .EthSwap_card {
      position: relative;
      width: 100%;
      height: auto;
      background: ${(props) => props.theme.BrandMain};
      border-radius: 20px;
      padding: 1.5rem 1.5rem 1rem 1.5rem;

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
        -o-mask: ${(props) => props.theme.BrandMask};
        -o-mask-composite: destination-out;
        mask-composite: exclude;
      }

      .EthSwap_card_title {
        p {
          color: ${(props) => props.theme.Primary};
          font-size: 1.5rem;
          letter-spacing: 1px;
        }
      }

      .title {
        p {
          font-size: 1.67rem;
          color: ${(props) => props.theme.Primary};
          font-weight: 500;
        }
      }

      .box1,
      .box2 {
        background: ${(props) => props.theme.BoxMain};
        padding: 0.3rem 0.7rem;

        .title {
          p {
            color: white;
            font-size: 1rem;
            font-weight: 500;
            letter-spacing: 0.8px;
          }
        }

        .number {
          input {
            width: 100%;
            outline: none;
            font-size: 1.2rem;
            border: none;
            background: none;
            color: ${(props) => props.theme.Primary};
            -moz-appearance: textfield;

            &::placeholder {
              color: ${(props) => props.theme.Secondary};
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
            color: ${(props) => props.theme.Primary};
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

      .transfer_title {
        .trans_icon {
          transform: rotate(90deg);
          color: ${(props) => props.theme.Primary};
          font-size: 1.5rem;
          border: 2px solid white;
          border-radius: 50%;
          padding: 0.2rem;
          cursor: pointer;
        }
      }

      .btn {
        button {
          background: ${(props) => props.theme.BrandMain};
          color: ${(props) => props.theme.Primary};
          font-weight: 500;
          font-size: 1rem;
          padding: 0.5rem 2.5rem;
          border: none;
        }
      }
    }
  }

  @media only screen and (max-width: 907px) {
    .EthSwap {
      .EthSwap_box {
        .EthSwap_card {
          padding: 0.5rem;
        }
      }
    }
  }
`;

export default EthSwapWrapper;
