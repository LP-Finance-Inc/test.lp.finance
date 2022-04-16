import styled from "styled-components";

const ModelSWrapper = styled.div`
  .Model_overlay {
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

  .Model {
    position: relative;
    visibility: hidden;
    z-index: -1;
    opacity: 0;
    height: auto !important;
    max-width: 400px !important;
    margin: auto;
    border-radius: 20px;
    padding: 1rem 0.8rem;
    background: ${(props) => props.theme.BrandPrimary};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 20px;
      border: 2px solid transparent;
      background: ${(props) => props.theme.BrandLine};
      -webkit-mask: ${(props) => props.theme.BrandMask};
      -webkit-mask-composite: destination-out;
      -moz-mask: ${(props) => props.theme.BrandMask};
      -moz-mask-composite: destination-out;
      -o-mask: ${(props) => props.theme.BrandMask};
      -o-mask-composite: destination-out;
      mask-composite: exclude;
    }

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
              background: ${(props) => props.theme.Overlay};
              backdrop-filter: blur(20px);
              padding: 1rem 0rem 1rem 1rem;
            }

            img {
              height: 1.7rem;
              width: auto;
            }

            .details_name {
              span {
                color: ${(props) => props.theme.Primary};
                font-size: 0.96rem;
              }

              p {
                color: ${(props) => props.theme.Secondary};
                font-size: 0.8rem;
              }
            }

            .balance {
              p,
              span {
                color: ${(props) => props.theme.Secondary};
                font-size: 0.95rem;
              }
            }

            .cal_Balance {
              p {
                color: ${(props) => props.theme.Secondary};
                font-size: 0.7rem;
              }
            }
          }
        }
      }
    }
  }

  .Model {
    transform: scale(0);
    transition: all 0.4s ease-in-out;
  }

  .Model_overlay.show {
    visibility: visible;
    z-index: 900;
    opacity: 1;
  }

  .Model_overlay.show > .Model {
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
    .Model_overlay {
      padding: 0.1rem 0.2rem;
    }

    .Model {
      width: 100% !important;

      .Model_section {
        padding: 1.1rem 1.4rem;
      }
    }
  }
`;

export default ModelSWrapper;
