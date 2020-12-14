import { css } from "lit-element";

const SpidersCSS = css`
  :host {
    width: 100%;
    --green: rgb(66, 245, 90);
    --mint: rgba(0, 255, 170);
    --bone: rgb(230, 230, 230);
    --bone-light: rgb(240, 240, 240);
    --bone-dark: rgb(220, 220, 220);
    --grey: rgb(8, 8, 8);
    --grey-light: rgb(15, 15, 15);
    --grey-dark: rgb(4, 4, 4);
    --gradient: -webkit-linear-gradient(90deg, var(--accent-2), var(--accent));
  }

  [data-skin="editorial"] {
    --heading-type: "Adobe Fangsong Std R", serif;
    --main-type: "Adobe Fangsong Std R", serif;
  }

  [data-skin="spiders"] {
    --heading-type: GhastlyPixe, monospace;
    --main-type: Share Tech Mono, monospace;
  }

  [data-theme="dark"] {
    --background: var(--grey);
    --background-2: var(--grey-light);
    --background-pattern: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAR0lEQVQoU43Q0QkAIAgE0HON23821zAKjLQL8k99omUAAh9hCpKEu5fxCybquMDePPMN1bq5O+sLvlAeOftGMvrh6hPkqxUcp58jT1ArFZIAAAAASUVORK5CYII=)
      repeat;
    --foreground: var(--bone);
    --foreground-2: var(--bone-dark);
    --accent: var(--green);
    --accent-2: var(--mint);
    --shadows: var(--grey-dark);
    --floodlights: var(--mint);
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

  [data-theme="light"] {
    --background: ghostwhite;
    --background-2: ghostwhite;
    --background-pattern: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAATElEQVQoU2P88eP/fwYkwH50H8NPaydkITCbEVkhTBE2xXCF6JLofLBCXNYhizP+37v3PzY3wRwJU4ziRgwfQAVAiolSiOFrXCaCxAGDUzoDcAdK2gAAAABJRU5ErkJggg==)
      repeat;
    --foreground: var(--grey-light);
    --foreground-2: var(--grey-light);
    --accent: orangered;
    --accent-2: red;
    --shadows: orangered;
    --floodlights: var(--peach);
    --theme-borders: solid 1px var(--accent-2);
    --gradient: -webkit-linear-gradient(
      90deg,
      var(--peach),
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

  * {
    font-family: var(--main-type);
  }

  h1 {
    font-family: var(--heading-type);
  }

  #spiders {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: var(--background);
    color: var(--foreground);
    transition: ease-in-out 0.3s;
    height: calc(100vh);
    overflow: none;
    position: relative;
    overflow: scroll;
    scroll-padding-bottom: 18rem;
  }

  *::selection {
    background: var(--mint-light);
  }

  *::-moz-selection {
    background: var(--mint-light);
  }
`;

export { SpidersCSS };
