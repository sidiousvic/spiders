import { css } from "lit-element";

const XNavbarCSS = css`
  :host {
    display: flex;
    width: 100%;
    z-index: 99;
    top: 0;
  }

  nav {
    top: 0;
    width: 100%;
    color: var(--accent);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  #title {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
  }

  #light-switch {
    text-align: center;
    width: 20%;
    font-size: 2rem;
    top: 2rem;
    left: 2rem;
    cursor: pointer !important;
    user-select: none;
    filter: hue-rotate(90deg);
  }

  nav > #title > h1 {
    width: fit-content;
    font-family: Swamp Witch;
    font-weight: lighter;
    font-size: 4rem;
    background: -webkit-linear-gradient(
      90deg,
      var(--accentGradient),
      var(--accent)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 1.5rem;
  }

  nav > #title > h2 {
    font-family: Encode Sans, sans-serif;
    text-align: center;
    font-size: 1rem;
    font-weight: lighter;
  }

  #navlinks {
    width: 20%;
    font-size: 1.2rem;
    margin-left: auto;
  }
`;
export { XNavbarCSS };