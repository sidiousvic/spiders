import { css } from "lit-element";

const XSpidersCSS = css`
  :host {
    width: 100%;
    --spiders-pastel: rgba(255, 78, 181, 0.8);
    --spiders-pastel-dark: rgb(208, 0, 121);
    --spiders-pastel-light: rgb(255, 143, 208);
    --spiders-purple: rgb(40, 0, 255);
    --spiders-purple-light: #2d15ff;
    --spiders-mint: rgba(0, 255, 170, 0.8);
    --spiders-green: #24ff06;
    --spiders-blue: #195aff;
    --spiders-blue-dark: rgb(19, 0, 221);
    --spiders-blue-light: #2591f0;
    --spiders-bone: rgb(233, 227, 227);
    --spiders-bone-dark: rgb(237, 230, 230);
    --spiders-gray: rgb(8, 8, 9);
    --spiders-gray-light: rgb(16, 18, 17);
  }

  #spiders {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 2px;
    background: var(--background);
    color: var(--foreground);
    transition: ease-in-out 0.3s;
    height: fit-content;
    min-height: 100vh;
    overflow: none;
  }

  *::selection {
    background: var(--spiders-mint-light);
  }

  *::-moz-selection {
    background: var(--spiders-mint-light);
  }

  .dark {
    --background: var(--spiders-gray);
    --foreground: var(--spiders-bone);
    --accent: var(--spiders-green);
    --accentGradient: var(--spiders-mint);
  }

  .light {
    --background: var(--spiders-bone);
    --foreground: var(--spiders-gray);
    --accent: var(--spiders-purple);
    --accentGradient: var(--spiders-blue);
  }

  :root:hover {
    --dev-pastel: none;
  }
`;

export { XSpidersCSS };
