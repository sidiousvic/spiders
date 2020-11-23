import { css } from "lit-element";

const XSpidersCSS = css`
  :host {
    width: 100%;
    --spiders-pastel: rgba(255, 80, 180);
    --spiders-pastel-dark: rgb(209 133 176);
    --spiders-pastel-light: rgb(250, 140, 200);
    --spiders-peach: rgb(255, 150, 143);
    --spiders-purple: rgb(40, 0, 255);
    --spiders-purple-light: #2d15ff;
    --spiders-green: #24ff06;
    --spiders-mint: rgba(0, 255, 170);
    --spiders-blue: #195aff;
    --spiders-blue-dark: rgb(20, 0, 222);
    --spiders-blue-light: rgb(40, 20, 222);
    --spiders-zef: rgb(225, 225, 235);
    --spiders-zef-dark: rgb(215, 215, 225);
    --spiders-zef-light: rgb(230, 230, 250);
    --spiders-bone: rgb(230, 230, 230);
    --spiders-bone-dark: rgb(220, 220, 220);
    --spiders-gray: rgb(8, 8, 8);
    --spiders-gray-light: rgb(12, 12, 12);
    --spiders-gray-dark: rgb(4, 4, 4);
  }

  .dark {
    --background: var(--spiders-gray);
    --foreground: var(--spiders-bone);
    --code-background: var(--spiders-gray-light);
    --code-foreground: var(--spiders-bone-dark);
    --background-light: var(--spiders-gray-light);
    --accent: var(--spiders-green);
    --accent-gradient: var(--spiders-mint);
  }

  .light {
    --background: lavenderblush;
    --foreground: var(--spiders-pastel-dark);
    --code-background: floralwhite;
    --code-foreground: var(--spiders-peach);
    --background-light: floralwhite;
    --accent: var(--spiders-pastel);
    --accent-gradient: var(--spiders-pastel-light);
  }

  #spiders {
    font-family: Dank Mono, sans-serif;
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
`;

export { XSpidersCSS };
