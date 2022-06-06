import styled from "styled-components";

const SnackbarWrapper = styled.div`
  .snackbar {
    p {
      color: ${(props) => props.theme.MainColor};

      a {
        color: ${(props) => props.theme.MainColor};
        text-decoration: underline;
        margin-left: 10px;
      }
    }
  }
`;

export default SnackbarWrapper;
