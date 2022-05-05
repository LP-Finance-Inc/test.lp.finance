import styled from "styled-components";

const NotifyWrapper = styled.div`
  .Notify {
    min-height: calc(100vh - 131px - 160px);

    .title {
      color: ${(props) => props.theme.body.BodyText};
      font-weight: 700;
      font-size: 1.1rem;
    }

    .Details {
      span,
      p {
        color: ${(props) => props.theme.body.BodyText};
        font-size: 0.9rem;
      }

      img {
        height: 1.5rem;
        width: auto;
      }
    }
  }
`;

export default NotifyWrapper;
