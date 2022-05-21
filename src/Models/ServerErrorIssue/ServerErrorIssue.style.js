import styled from "styled-components";

const ServerErrorIssueWrapper = styled.div`
  .popup {
    position: fixed;
    top: -100vh;
    left: 0px;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.8);
    transition: top 0ms ease-in-out 200ms;
    z-index: 1000;
  }

  .popup.active {
    transition: top 0ms ease-in-out;
    top: 0vh;
    z-index: 1000;
  }

  .popup .popup-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    max-width: 370px;
    height: 400px;
    padding: 1rem 0.8rem;
    border-radius: 20px;
    background: #eee;
    opacity: 0.5;
    transition: all 300ms ease-in-out;
    // background: ${(props) => props.theme.popup.PopupBg1};
    background: black;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);

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
      -o-mask: ${(props) => props.theme.card.CardMask};
      -o-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }

  .popup.active .popup-container {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .contract_wrapper {
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
        }

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

        a {
          background: #e3e3e3;
          border-radius: 20px;
          padding: 0.3rem 1rem;
          color: black;
          margin: 10px 0px;
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

  @media only screen and (max-width: 600px) {
    .popup .popup-container {
      width: 98% !important;
    }
  }
`;

export default ServerErrorIssueWrapper;
