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
    background: ${(props) => props.theme.CardMain};
    border: 1px solid ${(props) => props.theme.MainColor};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }

  .popup.active .popup-container {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .popup {
    .Model_section {
      height: auto !important;
      width: 100% !important;

      .Model_top_Section {
        .title {
          p {
            font-size: 1.3rem;
            color: ${(props) => props.theme.MainColor};
            font-weight: bold;
          }
        }

        .close_div {
          .close_icon {
            color: ${(props) => props.theme.MainColor};
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
            border: 1px solid ${(props) => props.theme.MainColor};
            border-radius: 20px;
            overflow-y: scroll;
            width: 100%;
            outline: none;
            text-indent: 10px;
            padding: 1rem 0.5rem;
            color: ${(props) => props.theme.MainColor};
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
              color: ${(props) => props.theme.MainColor};
            }
          }
        }

        .token_title {
          p {
            color: ${(props) => props.theme.MainColor};
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
            background: ${(props) => props.theme.MainColor};
            backdrop-filter: blur(5px);
            border-radius: 10px;
          }

          .details {
            cursor: pointer;
            padding: 1rem 0rem;
            transition: all 0.3s;
            border-radius: 20px;

            &:hover {
              background: ${(props) => props.theme.BoxHover};
              padding: 1rem 0rem 1rem 1rem;
            }

            img {
              height: 1.7rem;
              width: auto;
            }

            .details_name {
              span {
                color: ${(props) => props.theme.MainColor};
                font-size: 0.96rem;
              }

              p {
                color: ${(props) => props.theme.PrimaryColor};
                font-size: 0.8rem;
              }
            }

            .balance {
              p,
              span {
                color: ${(props) => props.theme.PrimaryColor};
                font-size: 0.95rem;
              }
            }

            .cal_Balance {
              p {
                color: ${(props) => props.theme.PrimaryColor};
                font-size: 0.7rem;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .popup .popup-container {
      width: 98% !important;
    }

    .popup .Model_section {
      padding: 1rem 0.8rem;
    }
  }
`;

export default TokenModelWrapper;
