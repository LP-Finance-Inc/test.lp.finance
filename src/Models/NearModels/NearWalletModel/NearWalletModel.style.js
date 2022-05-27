import styled from "styled-components";

const NearWalletModelWrapper = styled.div`
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
    width: 370px;
    height: 300px;
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

  .near_wallet_wrapper {
    .close_near_wallet {
      .close_icon {
        color: ${(props) => props.theme.MainColor};
        font-size: 1.7rem;
        cursor: pointer;
        font-weight: 900;
      }
    }

    .near_wallet_title {
      span {
        color: ${(props) => props.theme.MainColor};
        font-size: 1.4rem;
        font-weight: 900;
        line-height: 1.8rem;
      }
    }

    .wallet_card {
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px solid ${(props) => props.theme.MainColor};
      border-radius: 20px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: all 0.3s;

      .img_section img {
        width: auto;
        height: 2.2rem;
      }

      .wallet_title {
        p {
          color: ${(props) => props.theme.MainColor};
          font-size: 1rem;
        }

        span {
          color: ${(props) => props.theme.MainColor};
          font-size: 0.9rem;
        }
      }

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .popup .popup-container {
      width: 98% !important;
    }
  }
`;

export default NearWalletModelWrapper;
