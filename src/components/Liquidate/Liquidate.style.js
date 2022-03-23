import styled from "styled-components";

const LiquidateWrapper = styled.div`
  .liquidate {
    min-height: calc(100vh - 131px - 160px);

    .liquidate_top {
      .title {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
    }

    .table_section {
      .table_card {
        background: ${(props) => props.theme.card.CardBg};
        border-radius: 20px;
        padding: 10px 15px 0px 15px;

        table {
          width: 100%;

          thead {
            tr {
              border-bottom: 2px solid white;
              text-align: center;

              th {
                position: relative;
                vertical-align: middle !important;
                border: none;
                color: white;
                font-size: 1rem;
                padding-bottom: 15px;

                &::after {
                  position: absolute;
                  top: 50%;
                  right: 0;
                  width: 1px;
                  height: 1.6em;
                  background-color: rgb(165, 165, 165);
                  -webkit-transform: translateY(-50%);
                  transform: translateY(-50%);
                  transition: background-color 0.3s;
                  content: "";
                }
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
                }

                p,
                span {
                  color: white;
                }

                .LTVPie_section {
                  min-width: 150px;
                  border: 1px solid #ebebeb;
                  border-radius: 10px;
                  width: 100%;

                  .LTVPie {
                    height: 30px;
                    width: 50%;
                    background: #8b4898;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 10px 0px 0px 10px;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                    p {
                      font-size: 0.8rem;
                    }
                  }
                }

                button {
                  padding: 8px 30px;
                  background: ${(props) => props.theme.button.ButtonBg1};
                  outline: none;
                  border: none;
                  color: ${(props) => props.theme.button.ButtonColor1};
                  border-radius: 50px;
                  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                }
              }
            }
          }
        }
      }
    }

    .pagination_div {
      dl,
      ol,
      ul {
        margin-bottom: 0rem;
      }

      .paginationBtn {
        width: 100%;
        height: 100px;
        list-style: none;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      .paginationBtn a {
        padding: 0.6rem 0.9rem;
        margin: 8px;
        text-decoration: none;
        font-size: 0.9rem;
        background: none;
        color: white;
        cursor: pointer;
        border-radius: 4px;
        font-weight: 500;
      }

      .paginationBtn a:hover {
        color: white;
        background: ${(props) => props.theme.card.CardBg};
        transition: background-color 0.2s;
      }

      .paginationActive a {
        color: white;
        background: ${(props) => props.theme.card.CardBg};
      }

      .paginationDisabled a {
        background: ${(props) => props.theme.card.CardBg};
        color: white;
      }

      .paginationDisabled a:hover {
        background: ${(props) => props.theme.card.CardBg};
        color: white;
      }
    }
  }
`;

export default LiquidateWrapper;
