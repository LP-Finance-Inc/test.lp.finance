import styled from "styled-components";

const LiquidityPoolWrapper = styled.div`
  .LiquidityPool {
    min-height: calc(100vh - 131px - 160px);

    .LiquidityPool_title {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    .table_section {
      table {
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

        thead {
          tr {
            border-top: none;
            border-bottom: 1px solid white;

            th {
              color: ${(props) => props.theme.table.TableHeaderColor};
              font-weight: 900;
              font-size: 1.15rem;
              padding: 17px 50px 8px 50px;
              line-height: 33px;
            }
          }
        }

        tbody {
          tr {
            border-bottom: 1px solid #ffffff99;

            td {
              padding: 8px 50px;

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
