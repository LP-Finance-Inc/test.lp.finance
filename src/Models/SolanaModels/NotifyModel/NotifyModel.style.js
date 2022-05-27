import styled from "styled-components";

const NotifyModelWrapper = styled.div`
  .notify_popup {
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

  .notify_popup.active {
    transition: top 0ms ease-in-out;
    top: 0vh;
    z-index: 1000;
  }

  .notify_popup .notify_popup_container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 400px;
    height: auto !important;
    padding: 1.5rem 0.8rem;
    border-radius: 20px;
    background: #eee;
    opacity: 0.5;
    transition: all 300ms ease-in-out;
    background: ${(props) => props.theme.CardMain};
    border: 1px solid ${(props) => props.theme.MainColor};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }

  .notify_popup.active .notify_popup_container {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .notify_popup {
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
    }
  }

  @media only screen and (max-width: 600px) {
    .notify_popup .notify_popup_container {
      width: 98% !important;
    }

    .notify_popup .Model_section {
      padding: 1rem 0.8rem;
    }
  }
`;

export default NotifyModelWrapper;
