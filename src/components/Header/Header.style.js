import styled from "styled-components";

const HeaderWrapper = styled.div`
  .sideNav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1000;
    top: 0;
    border-radius: 0px 12px 12px 0px;
    left: 0;
    overflow-x: hidden;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    transition: 0.3s;
    background: rgba(0, 0, 0, 1);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;

    .small_logo {
      height: 3.8rem;
      width: auto;
    }

    .closeBtn {
      font-size: 40px;
      cursor: pointer;

      .close_icon {
        font-size: 1.8rem;
        color: ${(props) => props.theme.Primary};
      }
    }

    ul {
      list-style-type: none;

      li {
        a {
          padding: 10px 8px 10px 0px;
          text-decoration: none;
          font-size: 0.9rem;
          color: ${(props) => props.theme.Primary};
          display: block;
          transition: all 0.2s;
        }
      }
    }

    .Wallet {
      display: flex;
      justify-content: center;
    }
  }

  .navbar_component {
    background: inherit !important;

    nav {
      padding: 0.8rem;
      justify-content: inherit !important;

      .navbar-brand {
        flex-grow: 0 !important;

        img {
          height: 5.5rem;
          width: auto;
        }
      }

      .navbar-icon {
        color: ${(props) => props.theme.Primary};
        display: none;
        font-size: 1.6rem;
        cursor: pointer;
      }

      .left_ui_block {
        .left_ui_block_hide {
          // display: flex !important;

          li {
            padding-left: 0.7rem;
            padding-right: 0.7rem;

            .nav-link {
              position: relative;
              color: ${(props) => props.theme.Primary};
              font-weight: 500;
              font-size: 1rem;
              text-align: center;
              padding: 0.4rem 1rem 0.4rem 1rem;
              transition: hover 0.4s;
              padding-bottom: 10px;

              &:before {
                content: "";
                position: absolute;
                left: 0px;
                bottom: 0;
                width: 100%;
                height: 2px;
                opacity: 0;
                background: ${(props) => props.theme.BrandSecondary};
                transition: 450ms all;
              }

              &:hover {
                color: ${(props) => props.theme.BrandSecondary};

                &:before {
                  opacity: 1;
                }
              }
            }

            .active {
              position: relative;
              color: ${(props) => props.theme.BrandSecondary} !important;
              font-weight: 500;
              font-size: 1rem;
              text-align: center;
              padding: 0.4rem 1rem 0.4rem 1rem;
              transition: hover 0.4s;
              padding-bottom: 10px;
              text-decoration: none;

              &:before {
                content: "";
                position: absolute;
                left: 0px;
                bottom: 0;
                width: 100%;
                height: 2px;
                opacity: 1;
                background: ${(props) => props.theme.BrandSecondary};
                transition: 450ms all;
              }
            }

            .img_section {
              background: ${(props) => props.theme.BrandMain};
              padding: 0.4rem 2rem;
              border-radius: 16px;
              cursor: pointer;

              .network_img {
                width: auto;
                height: 1.5rem;
              }
            }

            .eth_btn {
              background: ${(props) => props.theme.BrandMain};
              border: none;
              outline: none;
              font-size: 1rem;
              height: 48px;
              padding: 0.5rem 2rem;
              border-radius: 50px;
              color: ${(props) => props.theme.Primary};
              font-weight: 600;
              cursor: pointer;
              width: 180px;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .btn-group {
              display: flex;
              flex-direction: column;
              .dropdown_btn {
                background: ${(props) => props.theme.BrandMain};
                border: none;
                outline: none;
                font-size: 1rem;
                height: 48px;
                padding: 0.5rem 2rem;
                border-radius: 50px;
                color: ${(props) => props.theme.Primary};
                font-weight: 600;
                cursor: pointer;
                width: 180px;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                transition: all 0.3s;
              }

              .dropdown-menu {
                position: absolute !important;
                background: ${(props) => props.theme.BrandMain};
                margin: 0.3rem 0 0;
                border-radius: 0.4rem;
                transition: all 0.2s;
                overflow: hidden;
                transform-origin: top center;
                transform: scale(1, 0);
                display: block;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
                  rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

                .dropdown-item {
                  padding: 0.25rem 3rem;
                  color: white;
                  transition: all 0.2s;

                  &:hover {
                    background: ${(props) => props.theme.Overlay};
                  }

                  $:focus {
                    background: ${(props) => props.theme.Overlay};
                  }
                }
              }
              &.show {
                .dropdown-menu {
                  transform: scale(1);
                }
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1216px) {
    .navbar_component {
      nav {
        padding: 0.2rem 0.5rem;

        .navbar-brand {
          img {
            height: 4.8rem;
            width: auto;
          }
        }

        .navbar-icon {
          display: block;
        }

        .left_ui_block {
          .left_ui_block_hide {
            display: none !important;
          }
        }

        button {
          display: none;
        }
      }
    }
  }
`;

export default HeaderWrapper;
