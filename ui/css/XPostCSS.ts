import { css } from "lit-element";

const XPostCSS = css`
  .post {
    background: var(--background-light);
    border-radius: 5px;
    padding: 2rem;
  }

  .post > .post-title,
  .post-subtitle {
    text-align: left;
  }

  .post-title {
    overflow-wrap: break-word;
    font-family: Dank Mono, sans-serif;
    margin: 2rem 0rem;
    font-size: 6rem;
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

  .post-subtitle {
    font-family: Encode Sans, sans-serif;
    color: var(--foreground);
    font-size: 0.9rem;
    font-weight: 500;
    font-style: italic;
  }

  .post-body > p {
    text-align: left;
    font-size: 1rem;
    color: var(--foreground);
    font-family: Encode Sans, sans-serif;
    line-height: 2.5rem;
    font-weight: lighter;
  }

  #links {
    transition: ease-out 1s;
    width: 50%;
  }

  .tags {
    font-family: Dank Mono, sans-serif;
    color: var(--accent);
  }
`;

export { XPostCSS };
