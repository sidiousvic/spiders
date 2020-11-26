import { css } from "lit-element";

const XSpidersCSS = css`
  @import url("./fonts/SwampWitch.ttf");

  @import url("./fonts/WiredMono-Regular.ttf");

  @import url("./fonts/WiredMono-Bold.ttf");

  @import url("./fonts/WiredMono-Light.ttf");

  @import url("./fonts/ShareTechMono-Regular.ttf");

  :host {
    width: 100%;
    --spiders-pastel: rgba(255, 80, 180);
    --spiders-pastel-dark: rgb(209 133 176);
    --spiders-pastel-light: rgb(250, 140, 200);
    --spiders-peach: rgb(255, 150, 143);
    --spiders-purple: rgb(40, 0, 255);
    --spiders-purple-light: #2d15ff;
    --spiders-green: rgb(66, 245, 90);
    --spiders-mint: rgba(0, 255, 170);
    --spiders-blue: #195aff;
    --spiders-blue-dark: rgb(20, 0, 222);
    --spiders-blue-light: rgb(40, 20, 222);
    --spiders-bone-light: rgb(240, 240, 240);
    --spiders-bone: rgb(230, 230, 230);
    --spiders-bone-dark: rgb(220, 220, 220);
    --spiders-gray: rgb(8, 8, 8);
    --spiders-gray-light: rgb(15, 15, 15);
    --spiders-gray-dark: rgb(4, 4, 4);
  }

  .dark {
    --background: var(--spiders-gray);
    --background-2: var(--spiders-gray-light);
    --background-pattern: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAR0lEQVQoU43Q0QkAIAgE0HON23821zAKjLQL8k99omUAAh9hCpKEu5fxCybquMDePPMN1bq5O+sLvlAeOftGMvrh6hPkqxUcp58jT1ArFZIAAAAASUVORK5CYII=)
      repeat;
    --foreground: var(--spiders-bone);
    --foreground-2: var(--spiders-bone-dark);
    --accent: var(--spiders-green);
    --accent-2: var(--spiders-mint);
    --shadows: var(--spiders-gray-dark);
    --floodlights: var(--spiders-mint);
    --theme-borders: none;
    --gradient: -webkit-linear-gradient(
      90deg,
      var(--background-2),
      var(--accent),
      var(--accent-2)
    );
    --gradient-dark: -webkit-linear-gradient(
      90deg,
      var(--background-2),
      black,
      var(--background-2)
    );
    --gradient-2: -webkit-linear-gradient(
      90deg,
      var(--background-2),
      var(--accent),
      var(--accent-2)
    );
    --gradient-2: -webkit-linear-gradient(90deg, navy, cyan, blue);
    --gradient-3: -webkit-linear-gradient(90deg, red, lightpink, red);
    --dark-foreground: var(--foreground);
  }

  .light {
    --background: ghostwhite;
    --background-2: ghostwhite;
    --background-pattern: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAATElEQVQoU2P88eP/fwYkwH50H8NPaydkITCbEVkhTBE2xXCF6JLofLBCXNYhizP+37v3PzY3wRwJU4ziRgwfQAVAiolSiOFrXCaCxAGDUzoDcAdK2gAAAABJRU5ErkJggg==)
      repeat;
    --foreground: var(--spiders-gray-light);
    --foreground-2: var(--spiders-gray-light);
    --accent: orangered;
    --accent-2: red;
    --shadows: orangered;
    --floodlights: var(--spiders-peach);
    --theme-borders: solid 1px var(--accent-2);
    --gradient: -webkit-linear-gradient(
      90deg,
      var(--spiders-peach),
      var(--accent),
      var(--accent-2)
    );
    --gradient-dark: -webkit-linear-gradient(
      90deg,
      var(--background-2),
      var(--background),
      var(--background-2)
    );
    --gradient-2: -webkit-linear-gradient(90deg, navy, cyan, blue);
    --gradient-3: -webkit-linear-gradient(90deg, red, lightpink, red);
    --dark-foreground: var(--background);
  }

  #spiders {
    font-family: Wired Mono, monospace;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: var(--background-pattern);
    color: var(--foreground);
    transition: ease-in-out 0.3s;
    height: calc(100vh - 4rem);
    overflow: none;
    position: relative;
    overflow: scroll;
    scroll-padding-bottom: 18rem;
  }

  *::selection {
    background: var(--spiders-mint-light);
  }

  *::-moz-selection {
    background: var(--spiders-mint-light);
  }

  #footer {
    font-size: 1rem;
    border-top: 1px var(--accent-2) solid;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--foreground);
    background: var(--background);
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    transition: ease-in-out 200ms;
  }

  .floodlights {
    box-shadow: 0px -20px 200px var(--floodlights);
  }

  #github-link {
    text-decoration: none;
    color: inherit;
    text-transform: uppercase;
    font-style: italic;
    transition: 200ms ease-in-out;
  }

  #github-link:hover {
    letter-spacing: 0.5rem;
    animation: metalColor 800ms ease-in-out infinite;
  }

  @keyframes metalColor {
    0% {
      color: var(--background-2);
    }
    50% {
      color: var(--accent-2);
    }
    100% {
      color: var(--background-2);
    }
  }
`;

export { XSpidersCSS };
