import styled from "styled-components";

const ContractsModelWrapper = styled.div`
  .contract_model {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    overflow-y: auto;

    .contract_overlay {
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all linear 0.4s;
      backdrop-filter: blur(5px);
    }

    .contract_wrapper {
      position: relative;
      transition: all linear 0.4s;
      box-sizing: border-box;
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      z-index: 1000;
      max-width: 370px;
      min-height: 350px;
      padding: 0px 20px;
      border-radius: 20px;
      background: black;
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.6);
      flex: 1;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        border: 2px solid transparent;
        background: ${(props) => props.theme.card.CardBorderColor};
        -webkit-mask: ${(props) => props.theme.card.CardMask};
        -webkit-mask-composite: destination-out;
        -moz-mask: ${(props) => props.theme.card.CardMask};
        -moz-mask-composite: destination-out;
        mask-composite: exclude;
      }

      .Process_Status {
        .onGoing {
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            height: auto;
            width: 3rem;
            animation: spin infinite 0.5s linear;
          }

          @keyframes spin {
            0% {
              transform: rotate(0);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        }

        .success,
        .error {
          img {
            height: auto;
            width: 4rem;
            // animation: success forwards 0.5s linear;
          }

          // @keyframes success {
          //   0% {
          //     transform: scale(0.6);
          //   }

          //   100% {
          //     transform: scale(1);
          //   }
          // }

          h1 {
            letter-spacing: inherit;
            font-weight: 600 !important;
            font-size: 1.3rem !important;
            background-image: ${(props) => props.theme.body.BodyHeadingColor};
          }
        }
      }

      .messages_Section {
        .message {
          p {
            font-weight: 500;
            color: black;
            font-style: normal;
            font-size: 1rem;
            background-image: ${(props) => props.theme.body.BodyHeadingColor};
            background-repeat: repeat;
            background-size: 100%;
            background-clip: text;
            text-fill-color: transparent;
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
            -webkit-text-stroke-width: 0.18px;
            -moz-text-fill-color: transparent;
            -moz-background-clip: text;
            -moz-text-stroke-width: 0.18px;
          }
        }
      }

      .other_Section {
        .btn_Section {
          button {
            outline: none;
            box-sizing: box-sizing;
            border: 1px solid #009dd9;
            padding: 0.5rem 1.5rem;
            width: 100%;
            color: ${(props) => props.theme.button.ButtonColor1};
            background: ${(props) => props.theme.button.ButtonBg1};
          }
        }
      }
    }

    &.modal-fade-in {
      opacity: 1;
    }
  }

  @media only screen and (max-width: 600px) {
    .contract_model {
      .contract_wrapper {
        max-width: 98% !important;
      }
    }
  }
`;

export default ContractsModelWrapper;
