import { css } from "lit-element";

const XWeaverCSS = css`
  :host {
    --accent: #2fe099;
  }

  :host {
    font-family: BlackerProDisplayTrial-Medium, serif;
    line-height: 2.2rem;
    display: flex;
    width: 100%;
    min-height: 100%;
    animation: fadeUp 500ms ease-out;
    animation-delay: 0s;
    animation-fill-mode: backwards;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows:
      7rem
      fit-content(99rem)
      minmax(25rem, 1fr)
      6rem
      6rem
      7rem;
    gap: 1rem;
    grid-template-areas:
      ". . . "
      ". ti ."
      ". bo ."
      ". ta ."
      ". co ."
      ". . . ";
    scroll-padding-bottom: 40rem;
  }

  :host > * {
    color: var(--foreground);
    animation: fadeUp 400ms ease-out;
    animation-delay: 0s;
    animation-fill-mode: backwards;
    caret-color: var(--accent);
  }

  #title-input {
    overflow: scroll;
    word-wrap: break-word;
    font-family: BlackerProDisplayTrial-Extrabold, serif;
    padding: 2rem 2rem;
    grid-area: ti;
    font-size: 4rem;
    border-radius: 5px;
    resize: none;
    outline: none;
    transition: ease-in-out 200ms;
    line-height: 4rem;
  }

  #title-input:empty:before {
    color: gray;
    content: attr(data-placeholder);
  }

  #body-editor {
    padding: 2rem 2rem;
    grid-area: bo;
    font-size: 1.8rem;
    border-radius: 5px;
    resize: none;
    outline: none;
    color: var(--foreground);
  }

  #body-editor:empty:before {
    content: attr(data-placeholder);
    color: gray;
  }

  #tags-input {
    font-family: BlackerProDisplayTrial-light, serif;
    padding: 2rem 2rem;
    grid-area: ta;
    font-size: 1.5rem;
    border-radius: 5px;
    resize: none;
    outline: none;
    color: gray;
    overflow-x: scroll;
    transition: ease-in-out 200ms;
  }

  #tags-input:empty:before {
    content: attr(data-placeholder);
    color: gray;
    white-space: nowrap;
  }

  #tags-input {
    overflow: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  #rendered {
    font-size: 1.4rem;
    position: relative;
    padding: 1rem 2rem;
    min-width: 0;
    grid-area: bo;
    resize: none;
    user-select: none;
    border-radius: 5px;
    overflow-wrap: anywhere;
    background: var(--background);
    cursor: pointer;
  }

  #controls {
    font-weight: normal;
    user-select: none;
    padding: 1rem 1rem;
    grid-area: co;
    font-size: 1.2rem;
    border-radius: 5px;
    resize: none;
    outline: none;
    border: none;
    color: var(--foreground);
    /* background: var(--background); */
    display: grid;
    gap: 1rem;
    grid-template-columns: 2fr 2fr 10fr;
    grid-template-rows: auto;
    justify-items: center;
    align-items: center;
    /* gap: 20px 20px; */
    grid-template-areas: "w s .";
  }

  .control {
    padding: 0.5rem;
    border-radius: 5px;
    background: var(--gradient);
    color: var(--background);
    transition: ease-in-out 100ms;
    border: var(--theme-borders);
  }

  [data-display="true"] {
    display: block;
  }
  [data-display="false"] {
    display: none;
  }

  @media only screen and (orientation: portrait) {
    :host {
      grid-template-columns: 1fr 25fr 1fr;
    }
  }
`;

export { XWeaverCSS };
