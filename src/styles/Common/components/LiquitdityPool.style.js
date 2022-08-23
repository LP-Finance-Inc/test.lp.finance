import styled from "styled-components";

const LiquidityPoolWrapper = styled.div`
  .LiquidityPool {
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
        position: relative;
        background: ${(props) => props.theme.CardBg};
        border-radius: 20px;
        width: 100%;
        min-height: 260px;

        &::before {
          content: "";
          position: absolute;
          inset: 0;
          min-width: 480px;
          border-radius: 20px;
          border: 2px solid transparent;
          background: ${(props) => props.theme.CardLine};
          -webkit-mask: ${(props) => props.theme.CardMask};
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
        }

        table {
          width: 100%;
          th {
            vertical-align: middle !important;
            border-top: none !important;
          }

          thead {
            tr {
              th {
                padding: 1rem 1.5rem;
                color: ${(props) => props.theme.MainColor};
                font-weight: 900;
                font-size: 1.15rem;
              }
            }
          }

          tbody {
            border-radius: 10px;

            tr {
              td {
                padding: 1rem 1.5rem;
                font-size: 0.98rem;

                img {
                  border-radius: 50%;
                }

                p,
                span {
                  color: ${(props) => props.theme.MainColor};
                }
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1256px) {
  }
`;

export default LiquidityPoolWrapper;
