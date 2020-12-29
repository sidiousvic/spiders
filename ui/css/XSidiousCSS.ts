import { css } from "lit-element";

const XSidiousCSS = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: var(--background);
  }

  @media only screen and (orientation: portrait) {
  }
`;

export { XSidiousCSS };
