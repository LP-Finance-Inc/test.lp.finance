import styled from "styled-components";

const DataLoaderWrapper = styled.div`
  .DataLoader_overlay {
    width: 100%;
    height: 100%;
    visibility: visible;
    opacity: 0.6;
    z-index: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
      background: inherit;
    }
    .DataLoader {
      position: relative;
      visibility: visible;
      z-index: 1;
      opacity: 1;
      height: 100% !important;
      width: 100% !important;
      margin: auto;
      border-radius: 15px;

      .icon_div {
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          height: 2.2rem;
          width: auto;
          animation: spin infinite 0.7s linear;
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
  }
`;

export default DataLoaderWrapper;
