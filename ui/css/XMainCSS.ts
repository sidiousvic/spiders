import { css } from "lit-element";

const XMainCSS = css`
  :host {
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
    pointer-events: none;
  }

  h1 {
    text-align: center;
    font-family: var(--notANikeFont);
    font-size: 130px;
    color: var(--sidious);
    user-select: none;
    cursor: pointer;
  }

  @media only screen and (orientation: portrait) {
  }
`;

export { XMainCSS };
