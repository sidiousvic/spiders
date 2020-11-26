import { css } from "lit-element";

const XNavbarCSS = css`
  :host {
    display: flex;
    width: 100%;
    z-index: 99;
    top: 0;
  }

  nav {
    background: var(--background);
    top: 0;
    width: inherit;
    display: grid;
    color: var(--accent);
    gap: 1rem;
    grid-template-columns: 1fr 1fr minmax(10rem, 15rem) 3fr;
    grid-template-areas: "spiders light-switch menu .";
    user-select: none;
    padding: 1rem;
    border-bottom: 1px var(--accent-2) solid;
    transition: ease-in-out 100ms;
  }

  .floodlights {
    box-shadow: 0px 20px 200px var(--floodlights);
  }

  nav > * {
    cursor: pointer;
  }

  #title {
    grid-area: spiders;
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

  #greeting {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: greeting;
  }

  nav > #title > h1 {
    font-family: SwampWitch, Comic Sans, sans-serif;
    font-size: 4.5rem;
    font-weight: lighter;
    background: -webkit-linear-gradient(
      90deg,
      var(--background),
      var(--accent),
      var(--accent-2)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0.5rem 0 0.5rem 2rem;
  }

  nav > #title > h2 {
    text-align: center;
    font-size: 1rem;
    font-weight: lighter;
  }

  #menu {
    grid-area: menu;
    font-size: 1.3rem;
    padding: 1rem;
    display: flex;
    align-self: center;
    justify-content: center;
    position: relative;
  }

  /* dropdown */
  #menu:hover {
    background: var(--background);
    border-radius: 5px 5px 0 0;
  }

  .menu-dropdown {
    top: 100%;
    width: 100%;
    position: absolute;
    text-align: center;
    visibility: hidden;
    z-index: 1;
    background: var(--gradient-dark);
    border-radius: 5px;
    transition: visibility 200ms, opacity 200ms ease-in-out;
  }

  .visible {
    visibility: visible;
    opacity: 1;
  }

  .hidden {
    visibility: hidden;
    opacity: 0;
  }

  .menu-dropdown-link {
    padding: 1rem;
    border-radius: 5px;
  }

  .menu-dropdown-link:hover {
    background: var(--gradient);
    color: var(--background-2);
    font-style: italic;
    box-shadow: 20px 0px 200px var(--floodlights);
    animation: stretchY 1s ease-in-out infinite;
  }

  @keyframes bounceBackAndForth {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.04);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes stretchY {
    0% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(1.04);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;
export { XNavbarCSS };
