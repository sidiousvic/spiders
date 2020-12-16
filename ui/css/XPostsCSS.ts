import { css } from "lit-element";

const XPostsCSS = css`
  :host {
    width: 100%;
  }

  .posts {
    /* offset footer height */
    height: calc(100% - 6rem);
    display: grid;
    grid-template-columns: 35rem 1fr;
    grid-template-rows: auto;
    align-items: flex-start;
    justify-content: center;
    grid-template-areas: "wh po";
    gap: 2rem;
    padding: 5rem;
    padding-left: 0;
  }

  .what-s-hot {
    height: 100%;
    overflow: scroll;
    /* faded border start */
    border: solid 2px;
    border-image: radial-gradient(var(--accent-2), transparent) 1;
    border-bottom: 0;
    border-top: 0;
    border-left: 0;
    /* faded border end */
    grid-area: wh;
    animation: fadeUp 0.5s ease-in-out;
    padding: 1rem;
    padding-left: 0;
  }

  .post {
    grid-area: po;
    border: var(--accent-2) 1px dotted;
    animation: fadeUp 1s ease-in-out;
    padding: 1rem;
  }

  @media (max-width: 800px) {
    .posts {
      /* offset footer height */
      height: calc(100% - 6rem);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 2rem;
    }

    .post {
      display: none;
    }
  }
`;

export { XPostsCSS };
