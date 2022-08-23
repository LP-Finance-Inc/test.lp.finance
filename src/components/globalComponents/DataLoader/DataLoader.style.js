import styled from "styled-components";

const DataLoaderWrapper = styled.div`
  .DataLoader_overlay {
    .DataLoader {
      height: 100%;
      width: 100%;

      img {
        height: 2rem;
        width: auto;
        animation: spin infinite 0.5s linear;
      }

      @keyframes spin {
        0% {
          transform: rotate(0);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
`;

export default DataLoaderWrapper;
