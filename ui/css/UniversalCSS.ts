import { css } from "lit-element";

const UniversalCSS = css`
  [data-skin="editorial"] {
    --logo-type: "Blacker", serif;
    --heading-type: Foglihten, serif;
    --main-type: "Adobe Fangsong Std R", serif;
    --code-type: GoMonoForPowerline, monospace;
  }

  [data-skin="spiders"] {
    --logo-type: Liquido, monospace;
    --heading-type: Liquido, monospace;
    --main-type: Share Tech Mono, monospace;
    --code-type: Share Tech Mono, monospace;
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
    font-weight: 100;
    margin: 1rem 0;
  }

  *::selection {
    background: var(--accent-2);
  }

  *::-moz-selection {
    background: var(--accent-2);
  }
`;

export { UniversalCSS };
