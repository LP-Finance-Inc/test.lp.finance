import styled from "styled-components";

const NetworkModelWrapper = styled.div`
  .NetworkModel_overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    visibility: hidden;
    opacity: 0.6;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s;
    overflow-y: scroll;
    backdrop-filter: blur(5px);

    &::-webkit-scrollbar {
      display: none;
      background: inherit;
    }
  }

  .NetworkModel {
    position: relative;
    visibility: hidden;
    z-index: -1;
    opacity: 0;
    height: auto !important;
    width: 400px !important;
    margin: auto;
    border-radius: 20px;
    padding: 1.5rem 0.8rem;
    background: ${(props) => props.theme.card.CardBg2};
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

    .NetworkModel_section {
      height: auto !important;
      width: 100% !important;

      .NetworkModel_top_Section {
        .title {
          p {
            font-size: 1.3rem;
            color: white;
            font-weight: bold;
          }
        }

        .close_div {
          .close_icon {
            color: white;
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
            background: rgba(255, 255, 255, 0.2);
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
                color: white;
                font-size: 1rem;
              }
            }
          }
        }
      }
    }
  }

  .NetworkModel {
    transform: scale(0);
    transition: all 0.4s ease-in-out;
  }

  .NetworkModel_overlay.show {
    visibility: visible;
    z-index: 900;
    opacity: 1;
  }

  .NetworkModel_overlay.show > .NetworkModel {
    visibility: visible;
    z-index: 1000;
    transform: scale(1);
    opacity: 1;
    animation: pop_swirl_forwards 0.4s ease forwards;
  }

  @keyframes pop_swirl_forwards {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  @media only screen and (max-width: 600px) {
    .NetworkModel_overlay {
      padding: 0.1rem 0.2rem;
    }

    .NetworkModel {
      width: 100% !important;

      .NetworkModel_section {
        padding: 1.1rem 1.4rem;
      }
    }
  }
`;

export default NetworkModelWrapper;
