import styled from "styled-components";

const TokenModelWrapper = styled.div`
  .popup {
    position: fixed;
    top: -100vh;
    left: 0px;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.8);
    transition: top 0ms ease-in-out 200ms;
    z-index: 1000;
  }

  .popup.active {
    transition: top 0ms ease-in-out;
    top: 0vh;
    z-index: 1000;
  }

  .popup .popup-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    max-width: 400px !important;
    height: auto !important;
    padding: 1rem 0.8rem;
    border-radius: 20px;
    background: #eee;
    opacity: 0.5;
    transition: all 300ms ease-in-out;
    background: ${(props) => props.theme.card.CardBg2};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }

  .popup.active .popup-container {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .popup .popup-container .popup-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: #111;
    text-align: center;
    line-height: 30px;
    color: #eee;
    border-radius: 50%;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
  }

  .popup {
    .Model_section {
      height: auto !important;
      width: 100% !important;

      .Model_top_Section {
        .title {
          p {
            font-size: 1.3rem;
            color: white;
            font-weight: bold;
          }
        }

        .close_div {
          .close_icon {
            color: white;
            font-size: 1.8rem;
            cursor: pointer;
          }
        }
      }

      .Model_bottom_Section {
        .search_box {
          input {
            position: relative;
            display: flex;
            align-items: center;
            -webkit-box-align: center;
            border: 1px solid rgb(206, 208, 217);
            border-radius: 20px;
            overflow-y: scroll;
            width: 100%;
            outline: none;
            text-indent: 10px;
            padding: 1rem 0.5rem;
            color: white;
            background: none;
            white-space: nowrap;
            appearance: none;
            font-size: 16px;
            transition: border 100ms ease 0s;

            &:hover,
            &:focus {
              outline: none;
            }

            &::placeholder {
              color: white;
            }
          }
        }

        .token_title {
          p {
            color: white;
            font-size: 1rem;
          }
        }

        .token_list {
          height: ${(props) => props.height};
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

          .details {
            cursor: pointer;
            padding: 1rem 0rem;
            transition: all 0.3s;
            border-radius: 20px;

            &:hover {
              background: rgba(255, 255, 255, 0.2);
              backdrop-filter: blur(20px);
              padding: 1rem 0rem 1rem 1rem;
            }

            img {
              height: 1.7rem;
              width: auto;
            }

            .details_name {
              span {
                color: white;
                font-size: 0.96rem;
              }

              p {
                color: #e0e0e0;
                font-size: 0.8rem;
              }
            }

            .balance {
              p,
              span {
                color: #e0e0e0;
                font-size: 0.95rem;
              }
            }

            .cal_Balance {
              p {
                color: #e0e0e0;
                font-size: 0.7rem;
              }
            }
          }
        }
      }
    }
  }
`;

export default TokenModelWrapper;
