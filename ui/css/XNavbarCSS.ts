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
    display: grid;
    color: var(--accent);
    grid-template-columns: 4fr 2fr repeat(1fr, auto);
    grid-template-areas: "spiders nav-links user-greeting light-switch";
    user-select: none;
  }

  nav > * {
    cursor: pointer;
    background: -webkit-linear-gradient(
      90deg,
      var(--accent-gradient),
      var(--accent)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 1.5rem;
  }

  #title {
    grid-area: spiders;
  }

  #nav-links {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    grid-area: nav-links;
    font-size: 1.2rem;
  }

  #user-greeting {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: user-greeting;
  }

  #light-switch {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: light-switch;
    text-align: center;
    font-size: 2rem;
    cursor: pointer;
    user-select: none;
    filter: var(--light-switch-hue);
  }

  nav > #title > h1 {
    width: fit-content;
    font-family: Swamp Witch;
    font-weight: lighter;
    font-size: 4rem;
    background: -webkit-linear-gradient(
      90deg,
      var(--accent-gradient),
      var(--accent)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 1.5rem;
  }

  nav > #title > h2 {
    font-family: Dank Mono, sans-serif;
    text-align: center;
    font-size: 1rem;
    font-weight: lighter;
  }
`;
export { XNavbarCSS };
