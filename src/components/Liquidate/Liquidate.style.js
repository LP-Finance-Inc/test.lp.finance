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

        h3 {
          letter-spacing: 0 !important;
          font-weight: 500 !important;
          color: white !important;
          font-style: normal;
          font-size: 1rem !important;
        }
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
                  position: relative;
                  min-width: 150px;
                  border: 1px solid #ebebeb;
                  border-radius: 10px;
                  width: 100%;

                  .Threshold {
                    position: absolute;
                    right: 15px;
                    bottom: 0px;
                    height: 30px;
                    width: 4px;
                    background: #e3319c;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                  }

                  .Threshold .Threshold_tooltip {
                    visibility: hidden;
                    min-width: 150px;
                    background: ${(props) => props.theme.tooltip.TooltipBg};
                    color: #fff;
                    text-align: center;
                    border-radius: 6px;
                    padding: 0.5rem 0.5rem;
                    position: absolute;
                    z-index: 1;
                    bottom: 130%;
                    left: 50%;
                    font-size: 0.8rem;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    margin-left: -60px;
                    opacity: 0;
                    transition: opacity 0.5s;
                  }
                  .Threshold .Threshold_tooltip ::after {
                    content: "";
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -20px;
                    margin-bottom: 10px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: ${(props) => props.theme.tooltip.TooltipColor}
                      transparent transparent transparent;
                  }
                  .Threshold:hover .Threshold_tooltip {
                    visibility: visible;
                    opacity: 1;
                  }
                }

                .liquidate_btn {
                  position: relative;
                  padding: 8px 30px;
                  background: ${(props) => props.theme.button.ButtonBg1};
                  outline: none;
                  border: none;
                  color: ${(props) => props.theme.button.ButtonColor1};
                  border-radius: 50px;
                  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                  display: block;

                  & .liquidate_btn_tooltip {
                    visibility: hidden;
                    min-width: 150px;
                    background: ${(props) => props.theme.tooltip.TooltipBg};
                    color: #fff;
                    text-align: center;
                    border-radius: 6px;
                    padding: 0.5rem 0.5rem;
                    position: absolute;
                    z-index: 1;
                    bottom: 130%;
                    left: 38%;
                    font-size: 0.8rem;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    margin-left: -60px;
                    opacity: 0;
                    transition: all 0.5s;
                    transform: scale(0);
                  }

                  & .liquidate_btn_tooltip::after {
                    content: "";
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -5px;
                    margin-bottom: 10px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: ${(props) => props.theme.tooltip.TooltipColor}
                      transparent transparent transparent;
                  }

                  &:hover .liquidate_btn_tooltip {
                    visibility: visible;
                    opacity: 1;
                    transform: scale(1);
                    z-index: 1000;
                  }
                }
              }
            }

            .NoList {
              position: absolute;
              width: 100%;
              height: 400px;

              .message {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 260px;

                span {
                  color: white;
                  font-size: 1.3rem;
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
        justify-content: center;
        align-items: center;
        color: #8b4898;
      }

      .paginationBtn a {
        padding: 0.6rem 0.9rem;
        margin: 8px;
        text-decoration: none;
        font-size: 0.9rem;
        background: white;
        color: #8b4898;
        cursor: pointer;
        border-radius: 4px;
        font-weight: 500;
      }

      .paginationBtn a:hover {
        color: white;
        background: ${(props) => props.theme.card.CardBg};
        transition: background-color 0.4s;
      }

      .paginationActive a {
        color: white;
        background: ${(props) => props.theme.card.CardBg};
      }

      .paginationDisabled a {
        background: white;
        color: #8b4898;
      }

      .paginationDisabled a:hover {
        background: ${(props) => props.theme.card.CardBg};
        color: white;
      }
    }
  }
`;

export default LiquidateWrapper;
