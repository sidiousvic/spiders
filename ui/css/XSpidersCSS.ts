import { css } from "lit-element";

const XSpidersCSS = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: var(--sidious);
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 90%;
    background-color: var(--sidious);
  }

  main h1 {
    text-align: center;
    font-family: var(--notANikeFont);
    font-size: 130px;
    color: var(--sidious);
    mix-blend-mode: difference;
  }

  @media only screen and (orientation: portrait) {
  }
`;

export { XSpidersCSS };
