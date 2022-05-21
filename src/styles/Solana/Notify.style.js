import styled from "styled-components";

const NotifyWrapper = styled.div`
  .Notify {
    .title {
      display: flex;
      align-items: center;
      p {
        color: ${(props) => props.theme.body.BodyText};
        font-weight: 1000;
        font-size: 1.3rem;
        letter-spacing: 0.3px;
        color: black;
        font-style: normal;
        background-image: ${(props) => props.theme.body.BodyHeadingColor};
        background-repeat: repeat;
        background-size: 100%;
        background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-text-stroke-width: 0.18px;
        -moz-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-stroke-width: 0.18px;
      }
    }

    .Details {
      span,
      p {
        color: ${(props) => props.theme.body.BodyText};
        font-size: 0.9rem;
      }

      img {
        height: 1.4rem;
        width: auto;
      }
    }

    .Notify_card {
      .form_control {
        .form_group {
          width: 100%;
          position: relative;

          .form_icon {
            position: absolute;
            left: 10px;
            top: 10px;
            font-size: 1.2rem;
            color: white;
          }

          input {
            width: 100%;
            border: none;
            outline: none;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-size: 0.95rem;
            text-indent: 25px;
            background: ${(props) => props.theme.button.ButtonBg1};
            color: white;

            &::placeholder {
              color: white;
              font-size: 0.95rem;
            }
          }
        }

        button {
          background: ${(props) => props.theme.button.ButtonBg1};
          color: white;
          font-weight: 500;
          width: 100%;
          font-size: 1rem;
          padding: 0.5rem 2.5rem;
          border: none;
          border-radius: 50px;
        }

        span {
          color: ${(props) => props.theme.body.BodyText};
          font-size: 0.9rem;
        }
      }
    }
  }
`;

export default NotifyWrapper;
