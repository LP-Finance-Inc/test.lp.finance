import styled from "styled-components";

const DAOModelWrapper = styled.div`
  .DAO_overlay {
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

  .DAOModel {
    position: relative;
    visibility: hidden;
    z-index: -1;
    opacity: 0;
    height: auto !important;
    width: ${(props) => props.width} !important;
    margin: auto;
    border-radius: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    background: ${(props) => props.theme.card.CardBg2};
    backdrop-filter: ${(props) => props.theme.card.CardFilter};

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

    .DAO_section {
      height: auto !important;
      width: 100% !important;
      padding: 1rem 2rem;

      .DAO_top_Section {
        position: relative;

        .DAO_top_Section_title {
          p {
            font-size: 1.3rem;
            color: ${(props) => props.theme.body.BodyText};
            font-weight: 500;
          }
        }

        .close_section {
          position: absolute;
          right: 15px;
          top: 0px;

          .icon {
            color: white !important;
            font-size: 1.8rem;
            cursor: pointer;
          }
        }
      }

      .DAO_bottom_Section {
        .DAO_Section_card {
          min-height: 220px !important;

          .input_Card {
            background: ${(props) => props.theme.box.BoxBg1};
            padding: 0.5rem 0.7rem;

            input {
              width: 100%;
              outline: none;
              font-size: 1.2rem;
              border: none;
              background: none;
              color: white;
              -moz-appearance: textfield;

              &::placeholder {
                color: white;
              }

              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
            }
          }

          .btn_Section {
            button {
              background: ${(props) => props.theme.button.ButtonBg1};
              color: white;
              font-weight: 500;
              font-size: 1rem;
              padding: 0.5rem 2.5rem;
              border: none;
            }
          }

          .vote_Section_card_table {
            table {
              tr {
                border-bottom: 2px solid white;
                td {
                  color: white;
                  padding: 0.5rem;
                }
                .right {
                  padding-left: 30px;
                }
              }
            }
          }
        }
      }
    }
  }

  .DAOModel {
    transform: scale(0);
    transition: all 0.4s ease-in-out;
  }

  .DAO_overlay.show {
    visibility: visible;
    z-index: 900;
    opacity: 1;
  }

  .DAO_overlay.show > .DAOModel {
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
    .DAO_overlay {
      padding: 0.1rem 0.2rem;
    }

    .DAOModel {
      width: 98% !important;

      .DAO_section {
        padding: 1.1rem 1.4rem;
      }
    }
  }
`;

export default DAOModelWrapper;
