import { css } from "lit-element";

const XPostsCSS = css`
  :host {
    width: 100%;
  }

  .posts {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    grid-template-areas: "wh po";
    gap: 2rem;
    padding: 5rem;
  }

  .what-s-hot {
    grid-area: wh;
  }

  .post {
    grid-area: po;
    border: lime 1px solid;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes bounceBackAndForth {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.98);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export { XPostsCSS };
