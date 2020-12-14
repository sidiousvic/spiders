import { css } from "lit-element";

const XPostCardCSS = css`
  .post-card {
    background: var(--background-2);
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 2rem;
    user-select: none;
    word-wrap: break-word;
    box-shadow: var(--shadows) 5px 5px;
  }

  .post-card:hover {
    transform: scale(0.98) translateY(-5px);
    border: 1px solid var(--accent-2);
    cursor: pointer;
    transition: 200ms ease-in-out;
  }

  .post-card > .post-card-title,
  .post-card-subtitle {
    text-align: left;
  }

  .post-card-title {
    font-family: GhastlyPixe;
    font-weight: 500;
    overflow-wrap: break-word;
    margin: 1rem 0rem;
    font-size: 5rem;
    /* spiders gradient */
    background: -webkit-linear-gradient(90deg, var(--accent-2), var(--accent));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .post-card-subtitle {
    color: var(--foreground);
    font-size: 0.9rem;
    font-weight: 500;
    font-style: italic;
  }

  .post-card-body > p {
    font-family: Wired Mono;
    text-align: left;
    font-size: 1.5rem;
    color: var(--foreground);
    line-height: 2.5rem;
    font-weight: lighter;
    font-stretch: 20px;
  }

  .embed-responsive {
    position: relative;
    padding-top: 56.25%; /*16:9 */
  }

  .youtube-player {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
  }

  #links {
    transition: ease-out 1s;
    width: 50%;
  }

  .post-card-tags {
    font-weight: 100;
    color: var(--accent-2);
  }

  #post-buttons {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(1fr, auto) auto 1fr 1fr;
    grid-template-rows: repeat(auto-fill);
    grid-template-areas: ". candel delete update";
    padding: 2rem 0 0 0;
  }

  #post-buttons:empty {
    display: none;
  }

  #post-buttons > * {
    color: var(--accent-2);
    background: var(--background);
    text-align: center;
    border: 1px solid var(--accent-2);
    border-radius: 0px;
    font-size: 1rem;
    padding: 0.5rem;
  }

  #post-buttons > .staged-delete-highlight {
    color: var(--background);
    background: var(--accent-2);
  }

  #post-buttons > *:hover {
    background: var(--accent-2);
    color: var(--background);
    transform: translateY(1px);
  }

  #delete-post-button {
    color: var(--accent-2);
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
