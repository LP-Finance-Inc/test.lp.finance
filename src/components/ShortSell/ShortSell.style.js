import styled from "styled-components";

const ShortSellWrapper = styled.div`
  .ShortSell {
    min-height: calc(100vh - 131px - 160px);

    .ShortSell_top {
      .title {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
    }

    .ShortSell_section {
      padding: 30px 0px 30px 0px;

      .ShortSell_section_left {
        .price_chart {
          position: relative;
          width: 100%;
          min-height: 350px;
          background: ${(props) => props.theme.card.CardBg};
          backdrop-filter: ${(props) => props.theme.card.CardFilter};
          border-radius: 20px;
          padding: 1.2rem 1rem 1.2rem 1rem;
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

          p {
            color: white;
            font-size: 1.65rem;
            font-weight: 800;
          }
        }
      }

      .ShortSell_section_right {
        .token_sale_card {
          position: relative;
          width: 100%;
          min-height: 100px;
          background: ${(props) => props.theme.card.CardBg};
          backdrop-filter: ${(props) => props.theme.card.CardFilter};
          border-radius: 20px;
          padding: 1.2rem 1rem 1.2rem 1rem;
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

          .assets_Section {
            .assets_Section_left {
              display: flex;
              justify-content: center;
            }

            .assets_Section_right {
              button {
                padding: 0.5rem 1rem;
                display: flex;
                align-items: center;
                background: ${(props) => props.theme.button.ButtonBg1};
                color: white;
                font-size: 1rem;
                border: none;
              }
            }
          }

          .box_data {
            background: ${(props) => props.theme.box.BoxBg1};
            padding: 0.1rem 0.7rem;

            .title {
              p {
                color: white;
                font-size: 1rem;
                font-weight: 500;
                letter-spacing: 0.8px;
              }
            }

            .number_section {
              input {
                width: 100%;
                outline: none;
                font-size: 1.2rem;
                border: none;
                background: none;
                color: ${(props) => props.theme.card.CardColor};
                -moz-appearance: textfield;

                &::placeholder {
                  color: ${(props) => props.theme.input.InputPlaceColor};
                }

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              }

              .badge {
                background: white;
                color: #3f3f3f;
                font-weight: 500;
                padding: 0.4rem 0.6rem;
              }
            }

            .btn_section {
              button {
                display: flex;
                align-items: center;
                border: none;
                background: none;
                color: white;
                transition: all 0.3s;
                padding: 0.4rem;
                display: flex;
                align-items: center;

                &:hover {
                  background: ${(props) =>
                    props.theme.dropDown.DropDownListHoverBg};
                }

                img {
                  // border-radius: 50%;
                }
              }
            }
          }

          .btn {
            button {
              background: ${(props) => props.theme.button.ButtonBg1};
              color: white;
              font-size: 1rem;
              padding: 0.5rem 2.5rem;
              border: none;
            }
          }
        }
      }

      .ShortSell_account {
        .Account_title {
          p {
            color: ${(props) => props.theme.body.BodyText};
            font-size: 1.6rem;
            font-weight: 900;
            font-style: normal;
            font-weight: 400;
          }
        }

        .right_arrow_img {
          position: relative;

          hr {
            border: 1px solid white;
            width: 100%;
          }

          img {
            position: absolute;
            transform: rotate(-90deg);
            right: -10px;
            top: -4px;
            width: auto;
            height: 0.6rem;
          }
        }

        .bottom_arrow_img {
          position: relative;

          hr {
            position: relative;
            border: 1px solid white;
            width: 0px;
            height: 93%;
            top: 15px;
          }

          img {
            position: absolute;
            transform: translate(-50%, 50%);
            bottom: -20px;
            width: auto;
            height: 0.6rem;
          }
        }

        .Account_section {
          position: relative;
          width: 100%;
          min-height: 100px;
          background: ${(props) => props.theme.card.CardBg};
          backdrop-filter: ${(props) => props.theme.card.CardFilter};
          border-radius: 20px;
          padding: 1.2rem 1.5rem 1.2rem 1.5rem;

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

          .account_details {
            table {
              margin-top: 10px;

              tbody {
                tr {
                  td {
                    padding: 0.5rem 0rem;
                  }

                  .left {
                    p {
                      color: ${(props) => props.theme.table.TableTitleColor};
                      font-weight: bold;
                      font-size: 1.5rem;
                    }

                    span {
                      color: ${(props) => props.theme.table.TableColor};
                      font-size: 1.25rem;
                    }

                    .dollar {
                      color: ${(props) => props.theme.table.TableColor};
                      font-weight: normal;
                      font-size: 1rem;
                    }
                  }

                  .right {
                    p {
                      color: ${(props) => props.theme.table.TableColor};
                      font-weight: bold;
                      font-size: 1.25rem;
                      text-align: right;
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

  @media only screen and (max-width: 992px) {
    .ShortSell {
      .ShortSell_section {
        padding: 15px 0px 15px 0px;

        .ShortSell_section_right {
          .token_sale_card {
            width: 100%;
            margin-top: 50px;

            .assets_Section {
              .assets_Section_left {
                display: flex;
                justify-content: flex-start;

                img {
                  width: auto;
                  height: 4rem;
                }
              }
            }
          }
        }

        .ShortSell_account {
          margin: 20px 0px;
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .ShortSell {
      .ShortSell_section {
        .ShortSell_account {
          .Account_title {
            text-align: center;
          }

          .right_arrow_img {
            display: none;
          }

          .bottom_arrow_img {
            display: none;
          }
        }
      }
    }
  }
`;

export default ShortSellWrapper;
