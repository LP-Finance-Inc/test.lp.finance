import styled from "styled-components";

const CountdownWrapper = styled.div`
  .base-timer {
    position: relative;
    height: 40px;
    width: 40px;
    display: inline-block;
    cursor: pointer;
    display: flex;
    justify-content: center;

    & .countdown_tooltip {
      visibility: hidden;
      width: auto;
      padding: 1rem 0.7rem;
      background: ${(props) => props.theme.card.CardBg};
      color: white;
      text-align: center;
      border-radius: 6px;
      position: absolute;
      z-index: 1;
      top: 100%;
      left: 50%;
      font-size: 0.9rem;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      margin-left: -150px;
      margin-top: 10px;
      opacity: 0;
      transition: opacity 0.5s;
    }

    & .countdown_tooltip::after {
      content: " ";
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: 62px;
      border-width: 5px;
      border-style: solid;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-color: transparent transparent #009dd9 transparent;
    }

    &:hover .countdown_tooltip {
      visibility: visible;
      opacity: 1;
    }
  }

  .base-timer__circle {
    fill: none;
    stroke: none;
  }

  .base-timer__path-elapsed {
    stroke-width: 7px;
    stroke: white;
  }

  .base-timer__label {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
  }

  .base-timer__svg {
    transform: scaleX(-1);
  }

  .base-timer__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    stroke: currentColor;
  }

  .stop_animation {
    transition: 0.01s linear all;
  }

  .base-timer__path-remaining.color {
    color: #8b4898;
  }
`;

export default CountdownWrapper;
