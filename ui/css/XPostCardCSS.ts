import { css } from "lit-element";

const XPostCardCSS = css`
  .post-card {
    background: var(--background-light);
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 2rem;
    user-select: none;
    min-height: 30rem;
  }

  .post-card:hover {
    transform: scale(0.98) translateY(-5px);
    border: 1px solid var(--accent-gradient);
    cursor: pointer;
    transition: 200ms ease-in-out;
  }

  .post-card > .post-card-title,
  .post-card-subtitle {
    text-align: left;
  }

  .post-card-title {
    overflow-wrap: break-word;
    font-family: Dank Mono, sans-serif;
    margin: 2rem 0rem;
    font-size: 3rem;
    /* spiders gradient */
    background: -webkit-linear-gradient(
      90deg,
      var(--accent-gradient),
      var(--accent)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .post-card-subtitle {
    font-family: Dank Mono, sans-serif;
    color: var(--foreground);
    font-size: 0.9rem;
    font-weight: 500;
    font-style: italic;
  }

  .post-card-body > p {
    text-align: left;
    font-size: 1rem;
    color: var(--foreground);
    font-family: Dank Mono, sans-serif;
    line-height: 2.5rem;
    font-weight: lighter;
  }

  #links {
    transition: ease-out 1s;
    width: 50%;
  }

  .post-card-tags {
    font-family: Dank Mono, sans-serif;
    color: var(--accent-gradient);
  }

  #post-buttons {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(1fr, auto) auto 1fr 1fr;
    grid-template-rows: repeat(auto-fill);
    grid-template-areas: ". candel delete update";
    padding: 1rem;
  }

  #post-buttons > * {
    color: var(--accent-gradient);
    background: var(--background);
    text-align: center;
    border: 1px solid var(--accent-gradient);
    border-radius: 3px;
    font-size: 1rem;
    padding: 0.5rem;
  }

  #post-buttons > .staged-delete-highlight {
    color: var(--background);
    background: var(--accent-gradient);
  }

  #post-buttons > *:hover {
    transform: translateY(1px);
  }

  #delete-post-button {
    color: var(--accent-gradient);
    background: var(--background);
    grid-area: delete;
  }

  #cancel-delete-post-button {
    grid-area: candel;
  }

  #update-post-button {
    grid-area: update;
  }
`;

export { XPostCardCSS };
