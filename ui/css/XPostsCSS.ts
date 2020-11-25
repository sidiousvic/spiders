import { css } from "lit-element";

const XPostsCSS = css`
  :host {
    width: 100%;
  }

  .posts {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, 26rem);
    align-items: center;
    justify-content: center;
    padding: 2rem;
    padding: 8rem;
    /* margin: 0 2rem 0 0; */
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

  .posts > * {
    animation: fadeUp 500ms ease-out;
    animation-delay: 0s;
    animation-fill-mode: backwards;
    caret-color: var(--accent);
  }
`;

export { XPostsCSS };
