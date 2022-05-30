import styled from "styled-components";

const LiquidityPoolWrapper = styled.div`
  .LiquidityPool {
    min-height: calc(100vh - 131px - 160px);

    .LiquidityPool_top {
      .LiquidityPool_title {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .subtitle {
        display: flex;
        justify-content: center;
        align-items: center;
        h1 {
          letter-spacing: 0.5px !important;
          font-size: 1.5rem !important;
        }
      }
    }

    .table_section {
      .table_card {
        padding: 3px 25px 0px 25px;
        background: ${(props) => props.theme.card.CardBg};
        backdrop-filter: ${(props) => props.theme.card.CardFilter};
        border-radius: 20px;
        width: 1210px;

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

        table {
          thead {
            tr {
              cursor: pointer;
              vertical-align: middle !important;

              th {
                color: ${(props) => props.theme.table.TableHeaderColor};
                font-weight: 900;
                font-size: 1.15rem;
                border-top: none;
                color: ${(props) => props.theme.table.TableHeaderColor};
                vertical-align: middle !important;
              }
            }
          }

          tbody {
            tr {
              cursor: pointer;
              vertical-align: middle !important;
              height: 3rem;

              td {
                vertical-align: middle !important;

                img {
                  border-radius: 50%;
                }

                p,
                span {
                  color: ${(props) => props.theme.table.TableTdColor};
                }
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1256px) {
    .LiquidityPool {
      .table_section {
        table {
          thead {
            tr {
              th {
                padding: 17px 30px 8px 30px;
              }
            }
          }

          tbody {
            tr {
              td {
                padding: 8px 30px;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 700px) {
    .LiquidityPool {
      .table_section {
        table {
          thead {
            tr {
              th {
                padding: 17px 30px 8px 30px;
              }
            }
          }

          tbody {
            tr {
              td {
                padding: 8px 30px;
              }
            }
          }
        }
      }
    }
  }
`;

export default LiquidityPoolWrapper;
