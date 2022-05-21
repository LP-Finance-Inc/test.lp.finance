import styled from "styled-components";

const SolendModelWrapper = styled.div`
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
    min-height: auto !important;
    width: ${(props) => props.width} !important;
    margin: auto;
    border-radius: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    background: #1b1d23;
    backdrop: filer(20px);

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
        .Table_card {
          height: 420px;
          overflow-y: scroll;
          overflow-x: hidden;

          &::-webkit-scrollbar {
            width: 7px;
            background: inherit !important;
          }

          &::-webkit-scrollbar-track {
            border-radius: 10px;
          }

          &::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(5px);
            border-radius: 10px;
          }

          .table td,
          .table th {
            border-top: 0px solid #dee2e6;
          }

          table {
            thead {
              tr {
                th {
                  border-bottom: 1px solid
                    ${(props) => props.theme.apricot.ApricotPrimaryLine};
                  vertical-align: middle !important;
                  color: ${(props) => props.theme.apricot.ApricotSecondary};
                  font-size: 15px;
                  font-weight: 400;
                  line-height: 16px;
                  padding-bottom: 30px;
                }
              }
            }
            tbody {
              tr {
                cursor: pointer;
                height: 4.5rem;
                vertical-align: middle;
                transition: all 200ms;
                td {
                  vertical-align: middle !important;
                  font-size: 0.98rem;
                  .table_list {
                    img {
                      height: auto;
                      width: 1.8rem;
                    }
                    p {
                      color: ${(props) => props.theme.apricot.ApricotPrimary};
                      font-size: 14px;
                      font-weight: 400;
                      line-height: 24px;
                    }
                    .token_name {
                      span {
                        color: ${(props) =>
                          props.theme.apricot.ApricotSecondary};
                        font-size: 12px;
                        font-weight: 500;
                        line-height: 16px;
                      }
                    }
                    .DepositAPR_card {
                      position: relative;
                      display: inline-block;
                      cursor: pointer;

                      & .DepositAPR_card_tool {
                        visibility: hidden;
                        min-width: 150px;
                        background: #1b2020;
                        color: #fff;
                        text-align: center;
                        border-radius: 10px;
                        padding: 0.5rem 0.5rem;
                        position: absolute;
                        z-index: 1;
                        bottom: -30%;
                        left: 260%;
                        font-size: 0.8rem;
                        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                        margin-left: -200px;
                        opacity: 0;
                        transition: opacity 0.5s;

                        ul {
                          list-style-type: none;
                          margin-bottom: 0rem !important;

                          li {
                            color: ${(props) =>
                              props.theme.apricot.ApricotPrimary};
                            text-align: left;
                          }
                        }
                      }

                      & .DepositAPR_card_tool::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 100%;
                        margin-left: 0px;
                        transform: rotate(-90deg);
                        margin-bottom: 10px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: #ffff transparent transparent transparent;
                      }

                      &:hover .DepositAPR_card_tool {
                        visibility: visible;
                        opacity: 1;
                      }

                      .DepositAPR_icon {
                        color: ${(props) =>
                          props.theme.apricot.ApricotSecondary};
                      }
                    }
                  }
                }
                &:hover {
                  background: rgba(255, 255, 255, 0.1);
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
      width: 98% !important;

      .ApricotFR_section {
        padding: 1.1rem 1.4rem;
      }
    }
  }
`;

export default SolendModelWrapper;
