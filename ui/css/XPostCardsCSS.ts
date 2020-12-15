import { css } from "lit-element";

const XPostCardsCSS = css`
  :host {
    width: 100%;
  }

  .posts {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, 30rem);
    grid-template-rows: auto;
    align-items: center;
    justify-content: center;
    padding: 5rem;
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

  #posts-loading-indicator {
    font-size: 2rem;
    animation: bounceBackAndForth ease-in-out 1s infinite;
    animation-delay: 0s;
    animation-fill-mode: backwards;
    text-align: center;
    background: var(--gradient);
    color: var(--background-2);
    border-radius: 40px;
    font-style: italic;
    padding: 1rem;
    transition: ease-in-out 100ms;
    text-rendering: geometricPrecision;
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

export { XPostCardsCSS };
