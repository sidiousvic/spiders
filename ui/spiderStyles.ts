import { css } from "lit-element";

export const spidersStyles = css`
  #theme {
    padding: 2rem;
    border-radius: 2px;
    background: var(--background);
    color: #ddd;
    transition: ease-in-out 0.3s;
    height: fit-content;
    min-height: 96vh;
  }

  #light-switch {
    position: fixed;
    font-size: 2rem;
    top: 2rem;
    left: 2rem;
    cursor: pointer !important;
    user-select: none;
    filter: hue-rotate(90deg);
  }

  :root {
    --dev-pastel: rgba(255, 78, 181, 0.8);
    --spiders-gray: rgb(17, 20, 28);
    --spiders-mint: rgba(0, 255, 170, 0.8);
    --spiders-purple: rgb(83, 67, 255);
    --spiders-blue: rgb(0, 102, 255);
    --spiders-bone: rgb(235, 230, 230);
  }

  *::selection {
    background: var(--spiders-blue-light);
  }

  *::-moz-selection {
    background: var(--spiders-blue-light);
  }

  .dark {
    --background: var(--spiders-gray);
    --foreground: var(--spiders-bone);
    --accent: var(--spiders-purple);
    --accentGradient: var(--spiders-blue);
  }

  .light {
    --background: var(--spiders-bone);
    --foreground: var(--spiders-gray);
    --accent: var(--spiders-purple);
    --accentGradient: var(--spiders-blue);
  }

  :root:hover {
    --dev-pastel: none;
  }

  nav {
    color: var(--accent);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  nav > #title {
    flex-basis: 60%;
  }

  nav > #title > h1 {
    font-family: Die Nasty;
    display: inline;
    font-weight: lighter;
    font-size: 3rem;
    flex-basis: 50%;
    /* spiders gradient */
    background: -webkit-linear-gradient(
      90deg,
      var(--accentGradient),
      var(--accent)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  nav > #title > h2 {
    font-family: Dank Mono;
    text-align: center;
    font-size: 1rem;
    font-weight: lighter;
    flex-basis: 50%;
  }

  #navlinks {
    font-size: 1.2rem;
  }

  #content {
    margin-top: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  #posts {
    flex-basis: 40%;
  }

  .post > .post-title,
  .post-subtitle {
    text-align: center;
  }

  .post > .post-title {
    font-family: Dank Mono;
    font-size: 2rem;
    /* spiders gradient */
    background: -webkit-linear-gradient(
      90deg,
      var(--accentGradient),
      var(--accent)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .post > .post-subtitle {
    font-family: Dank Mono;
    color: var(--foreground);
    font-size: 0.9rem;
    font-style: italic;
  }

  .post-body > p {
    font-size: 1rem;
    color: var(--foreground);
    font-family: monospace;
    line-height: 2.5rem;
    font-weight: lighter;
  }

  #links {
    transition: ease-out 1s;
    width: 50%;
  }

  pre {
    padding: 1rem;
  }

  code {
    font-family: monospace;
  }

  pre > code {
    font-size: 1rem;
    border-radius: 10px;
    overflow-wrap: break-word;
  }

  .tags {
    color: var(--accent);
  }
`;