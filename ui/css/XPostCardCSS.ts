import { css } from "lit-element";

const XPostCardCSS = css`
  .post-card {
  }

  .post-card:hover {
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
