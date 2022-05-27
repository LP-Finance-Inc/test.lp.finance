import styled from "styled-components";

const NetworkModelWrapper = styled.div`
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
    max-width: 400px !important;
    height: auto !important;
    padding: 1.5rem 0.8rem;
    border-radius: 20px;
    background: #eee;
    opacity: 0.5;
    transition: all 300ms ease-in-out;
    background: ${(props) => props.theme.CardMain};
    border: 1px solid ${(props) => props.theme.MainColor};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }

  .popup.active .popup-container {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .popup {
    .NetworkModel_section {
      height: auto !important;
      width: 100% !important;

      .NetworkModel_top_Section {
        .title {
          p {
            font-size: 1.3rem;
            color: ${(props) => props.theme.MainColor};
            font-weight: bold;
          }
        }

        .close_div {
          .close_icon {
            color: ${(props) => props.theme.MainColor};
            font-size: 1.8rem;
            cursor: pointer;
          }
        }
      }

      .NetworkModel_bottom_Section {
        .network_list {
          .network_card {
            width: 100%;
            border-radius: 16px;
            padding: 1rem 0.5rem;
            display: flex;
            align-items: center;
            cursor: pointer;
            background: ${(props) => props.theme.BoxHover};
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            &:hover {
              opacity: 0.9;
            }

            .details {
              padding: 0rem 1.5rem;
              img {
                width: auto;
                height: 1.8rem;
              }
              p {
                color: ${(props) => props.theme.MainColor};
                font-size: 1rem;
              }
            }
          }
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

export default NetworkModelWrapper;
