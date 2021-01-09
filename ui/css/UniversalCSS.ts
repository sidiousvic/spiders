import { css } from "lit-element";

const UniversalCSS = css`
  :host {
    --sidious: #ff1d53;
    --notANikeFont: "Gotham XNarrow";
    --foreground: #f0f0f0;
    --background: #0b0b0b;
    --inputBackground: #1f1f1f;
    --error: orangered;
    --accent: var(--sidious);
    --accent-2: orangered;
  }

  [data-theme="light"] {
  }

  * {
  }

  h1 {
  }

  *::selection {
    background: "";
  }

  *::-moz-selection {
    background: "";
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

export { UniversalCSS };
