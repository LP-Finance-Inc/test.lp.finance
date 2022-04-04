import styled from "styled-components";

const ApricotFRWrapper = styled.div`
  .ApricotFR_overlay {
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

  .ApricotFR {
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

    .ApricotFR_section {
      height: auto !important;
      width: 100% !important;
      padding: 1rem 2rem;

      .ApricotFR_top_Section {
        .title {
          display: flex;
          justify-content: start;

          p {
            font-size: 1.4rem;
            color: white !important;
            font-weight: 600;
          }
        }

        .close_div {
          .close_icon {
            color: white !important;
            font-size: 2rem;
            cursor: pointer;
          }
        }
      }

      .ApricotFR_bottom_Section {
        .table_card {
          height: 500px !important;
          overflow-y: scroll !important;
          overflow-x: hidden !important;

          &::-webkit-scrollbar {
            width: 8px;
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
          table {
            width: 100%;
            table-layout: fixed;

            thead {
              tr {
                border-bottom: 1px solid white;
                // text-align: center;

                th {
                  vertical-align: middle !important;
                  border: none;
                  color: white;
                  font-size: 1rem;
                  padding-bottom: 15px;
                }
              }
            }

            tbody {
              tr {
                cursor: pointer;
                height: 4.5rem;
                vertical-align: middle;
                text-align: center;

                td {
                  vertical-align: middle !important;
                  font-size: 0.98rem;

                  .img_section {
                    img {
                      height: auto;
                      width: 1.6rem;
                    }

                    p {
                      color: white;
                    }
                  }

                  .APR_section {
                    img {
                      height: auto;
                      width: 1.1rem;
                    }
                    p {
                      color: white;
                    }

                    .tooltip_section {
                      position: relative;
                      display: inline-block;
                      height: 100%;
                      cursor: pointer;

                      .APR_icon {
                        font-size: 1.1rem;
                        color: white;
                      }

                      & .APR_icon_tooltip {
                        visibility: hidden;
                        min-width: 180px;
                        background: ${(props) => props.theme.tooltip.TooltipBg};
                        color: #fff;
                        text-align: center;
                        border-radius: 6px;
                        padding: 0.2rem 1rem;
                        position: absolute;
                        z-index: 1;
                        bottom: -10%;
                        right: 120%;
                        font-size: 0.8rem;
                        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                        margin-left: 0px;
                        opacity: 0;
                        transition: opacity 0.5s;

                        ul {
                          list-style-type: none;
                          li {
                            display: flex;
                            align-items: center;
                            color: white;

                            p {
                              font-size: 0.8rem;
                            }
                          }
                        }
                      }

                      & .APR_icon_tooltip::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        right: 0%;
                        margin-left: 200px;
                        margin-bottom: -400px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: ${(props) =>
                            props.theme.tooltip.TooltipColor}
                          transparent transparent transparent;
                      }

                      &:hover .APR_icon_tooltip {
                        visibility: visible;
                        opacity: 1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .ApricotFR {
    transform: scale(0);
    transition: all 0.4s ease-in-out;
  }

  .ApricotFR_overlay.show {
    visibility: visible;
    z-index: 900;
    opacity: 1;
  }

  .ApricotFR_overlay.show > .ApricotFR {
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
    .ApricotFR_overlay {
      padding: 0.1rem 0.2rem;
    }

    .ApricotFR {
      width: 100% !important;

      .ApricotFR_section {
        padding: 1.1rem 1.4rem;
      }
    }
  }
`;

export default ApricotFRWrapper;
