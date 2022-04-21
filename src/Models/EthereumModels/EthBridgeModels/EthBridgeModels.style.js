import styled from "styled-components";

const EthBridgeModelsWrapper = styled.div`
  .Bridge_overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => props.theme.ModelOverlay};
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

  .Bridge {
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

    .Bridge_section {
      height: auto !important;
      width: 100% !important;

      .Bridge_top_Section {
        .title {
          p {
            font-size: 1.3rem;
            color: ${(props) => props.theme.Primary};
            font-weight: bold;
          }
        }

        .close_div {
          .close_icon {
            color: ${(props) => props.theme.Primary};
            font-size: 1.8rem;
            cursor: pointer;
          }
        }
      }

      .Bridge_bottom_Section {
        .network_list {
          .details {
            cursor: pointer;
            transition: all 0.3s;
            border-radius: 20px;
            border: 1px solid #b8b8b8;
            padding: 0.8rem 1rem;
            margin-top: 20px;

            &:hover {
              background: ${(props) => props.theme.Overlay};
            }

            img {
              height: 1.8rem;
              width: auto;
            }

            .details_name {
              span {
                color: ${(props) => props.theme.Primary};
                font-size: 1rem;
              }
            }
          }
        }
      }
    }
  }

  .Bridge {
    transform: scale(0);
    transition: all 0.4s ease-in-out;
  }

  .Bridge_overlay.show {
    visibility: visible;
    z-index: 900;
    opacity: 1;
  }

  .Bridge_overlay.show > .Bridge {
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
    .Bridge_overlay {
      padding: 0.1rem 0.2rem;
    }

    .Bridge {
      width: 100% !important;
    }
  }
`;

export default EthBridgeModelsWrapper;
