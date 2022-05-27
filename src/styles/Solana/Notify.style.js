import styled from "styled-components";

const NotifyWrapper = styled.div`
  .Notify {
    .title {
      display: flex;
      align-items: center;
      p {
        color: ${(props) => props.theme.MainColor};
        font-weight: 1000;
        font-size: 1.3rem;
      }
    }

    .Details {
      span,
      p {
        color: ${(props) => props.theme.MainColor};
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
            color: ${(props) => props.theme.MainColor};
          }

          input {
            width: 100%;
            border: none;
            outline: none;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-size: 0.95rem;
            text-indent: 25px;
            background: ${(props) => props.theme.CardMain};
            border: 1px solid ${(props) => props.theme.MainColor};
            color: ${(props) => props.theme.MainColor};

            &::placeholder {
              color: ${(props) => props.theme.MainColor};
              font-size: 0.95rem;
            }
          }
        }

        button {
          background: ${(props) => props.theme.CardMain};
          border: 1px solid ${(props) => props.theme.MainColor};
          color: ${(props) => props.theme.MainColor};
          font-weight: 500;
          width: 100%;
          font-size: 1rem;
          padding: 0.5rem 2.5rem;
          border-radius: 50px;
        }

        span {
          color: ${(props) => props.theme.MainColor};
          font-size: 0.9rem;
        }
      }
    }
  }
`;

export default NotifyWrapper;
