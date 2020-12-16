import { css } from "lit-element";

const XPostCardCSS = css`
  .post-card {
    transform: translate(-3px);
    background: var(--background-2);
    background: var(--gradient-dark-inverted);
    border: 1px solid transparent;
    border-right-color: black;
    border-top-right-radius: 4px 80px;
    border-bottom-right-radius: 4px 80px;
    box-shadow: 0.2rem 0.2rem 1rem black;
    padding: 1rem;
    margin: 1rem;
    margin-left: 0;
    transition: 0.2s ease-in-out;
  }

  [data-selection="selected"] {
    transform: translate(0);
    border-right-color: var(--accent-2);
    cursor: pointer;
  }

  .post-card-title {
    font-size: 3rem;
    /* spiders gradient */
    background: -webkit-linear-gradient(90deg, var(--accent-2), var(--accent));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .post-card-date {
    font-size: 1rem;
  }

  .post-card-title,
  .post-card-subtitle {
  }

  .post-card-body > p {
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
  }

  .post-card-tags {
  }

  #post-buttons {
  }

  #post-buttons:empty {
  }

  #post-buttons > * {
  }

  #post-buttons > .staged-delete-highlight {
  }

  #post-buttons > *:hover {
  }

  #delete-post-button {
  }

  #cancel-delete-post-button {
  }

  #update-post-button {
  }
`;

export { XPostCardCSS };
