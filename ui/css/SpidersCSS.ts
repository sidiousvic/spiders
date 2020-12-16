import { css } from "lit-element";

const SpidersCSS = css`
  :host {
    width: 100%;
    --green: rgb(66, 245, 90);
    --mint: rgba(0, 255, 170);
    --bone: rgb(230, 230, 230);
    --bone-light: rgb(240, 240, 240);
    --bone-dark: rgb(220, 220, 220);
    --grey: rgb(8, 8, 8);
    --grey-light: rgb(15, 15, 15);
    --grey-dark: rgb(4, 4, 4);
    --gradient: -webkit-linear-gradient(90deg, var(--accent-2), var(--accent));
  }

  #spiders {
    background: var(--background);
    color: var(--foreground);
    transition: ease-in-out 0.3s;
    display: grid;
    grid-template-areas:
      "h"
      "m"
      "f";
    grid-template-rows: 5rem 1fr 5rem;
    grid-gap: 1rem;
    height: 100vh;
  }

  header {
    grid-area: h;
  }

  main {
    grid-area: m;
    overflow: hidden;
  }

  footer {
    grid-area: f;
  }
`;

export { SpidersCSS };
