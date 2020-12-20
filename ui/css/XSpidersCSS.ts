import { css } from "lit-element";

const XSpidersCSS = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: black;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 90%;
    mix-blend-mode: difference;
  }

  canvas {
    position: absolute;
    mix-blend-mode: difference;
  }

  main h1 {
    text-align: center;
    font-family: var(--notANikeFont);
    font-size: 130px;
    color: var(--sidious);
  }

  @media only screen and (orientation: portrait) {
  }
`;

export { XSpidersCSS };
