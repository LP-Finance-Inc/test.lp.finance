import styled from "styled-components";

const PieChartWrapper = styled.div`
  .Protocol_overlay {
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

  .ProtocolModel {
    position: relative;
    visibility: hidden;
    z-index: -1;
    opacity: 0;
    height: auto !important;
    width: ${(props) => props.width} !important;
    margin: auto;
    border-radius: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    background: white;

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

    .Protocol_section {
      height: auto !important;
      width: 100% !important;
      padding: 1rem 2rem;

      .Protocol_top_Section {
        border-bottom: 3px solid #e6e6e6;

        .title {
          display: flex;
          justify-content: start;

          p {
            font-size: 1.4rem;
            color: black !important;
            font-weight: 600;
          }
        }

        .close_div {
          .close_icon {
            color: black !important;
            font-size: 2rem;
            cursor: pointer;
          }
        }
      }

      .Protocol_bottom_Section {
        .legend {
          .legend_list {
            height: 300px;
            overflow-y: scroll;
            overflow-x: hidden;

            &::-webkit-scrollbar {
              width: 7px;
              background: inherit;
            }

            &::-webkit-scrollbar-track {
              border-radius: 10px;
            }

            &::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.2);
              backdrop-filter: blur(5px);
              border-radius: 10px;
            }

            .legend_card {
              height: 50px;
              padding: 1.5rem 1rem;
              box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
              border-radius: 20px;
              img {
                height: auto;
                width: 1.5rem;
              }
              p {
                color: grey;
                font-size: 0.9rem;
                font-weight: 600;
                color: white;
              }
              span {
                font-size: 0.7rem;
                color: white;
              }
            }
          }
        }

        .vote_Section {
          .vote_Section_title {
            p {
              font-size: 1.6rem;
              color: black !important;
              font-weight: 600;
            }
          }

          .vote_Section_card {
            position: relative;
            width: 100%;
            min-height: 300px;
            background: ${(props) => props.theme.card.CardBg};
            backdrop-filter: ${(props) => props.theme.card.CardFilter};
            border-radius: 20px;
            padding: 1.2rem 1.5rem 1.2rem 1.5rem;
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
              background: ${(props) => props.theme.card.CardBorderColor};
              -webkit-mask: ${(props) => props.theme.card.CardMask};
              -webkit-mask-composite: destination-out;
              -moz-mask: ${(props) => props.theme.card.CardMask};
              -moz-mask-composite: destination-out;
              mask-composite: exclude;
            }

            .vote_Section_card_title {
              p {
                font-size: 1.3rem;
                color: ${(props) => props.theme.body.BodyText};
                font-weight: 500;
              }
            }
            .input_Card {
              background: ${(props) => props.theme.box.BoxBg1};
              padding: 0.5rem 0.7rem;
              box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
                rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

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
                  padding: 0.3rem;
                  td {
                    color: white;
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
  }

  .ProtocolModel {
    transform: scale(0);
    transition: all 0.4s ease-in-out;
  }

  .Protocol_overlay.show {
    visibility: visible;
    z-index: 900;
    opacity: 1;
  }

  .Protocol_overlay.show > .ProtocolModel {
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
    .Protocol_overlay {
      padding: 0.1rem 0.2rem;
    }

    .ProtocolModel {
      width: 98% !important;

      .Protocol_section {
        padding: 1.1rem 1.4rem;
      }
    }
  }
`;

export default PieChartWrapper;
