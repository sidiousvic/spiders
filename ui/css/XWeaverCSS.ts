import { css } from "lit-element";

const XWeaverCSS = css`
  :host {
    display: flex;
    width: 100%;
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

  #weaver > * {
    animation: fadeUp 400ms ease-out;
    animation-delay: 0s;
    animation-fill-mode: backwards;
    font-family: ShareTechMono, monospace;
    caret-color: var(--accent);
    border: var(--theme-borders);
  }

  #weaver {
    animation: fadeUp 500ms ease-out;
    animation-delay: 0s;
    animation-fill-mode: backwards;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows:
      3rem 5rem 5fr 5rem
      5rem 3rem;
    gap: 1rem;
    grid-template-areas:
      ". .   . "
      ". ti  ."
      ". bo  ."
      ". ta  ."
      ". co  ."
      ". .   . ";
    overflow: scroll;
  }

  @media only screen and (orientation: portrait) {
    #weaver {
      grid-template-columns: 1fr 25fr 1fr;
    }
  }

  #title-input {
    padding: 2rem 2rem;
    grid-area: ti;
    font-size: 1.2rem;
    border-radius: 5px;
    resize: none;
    outline: none;
    color: var(--foreground);
    background: var(--background-2);
    overflow-x: scroll;
    transition: ease-in-out 200ms;
  }

  #title-input:empty:before {
    content: attr(data-placeholder);
    color: gray;
    white-space: nowrap;
  }

  #body-editor {
    padding: 2rem 2rem;
    grid-area: bo;
    font-size: 1.4rem;
    border-radius: 5px;
    resize: none;
    outline: none;
    color: var(--foreground);
    background: var(--background-2);
  }

  #body-editor:empty:before {
    content: attr(data-placeholder);
    color: gray;
  }

  #tags-input {
    padding: 2rem 2rem;
    grid-area: ta;
    font-size: 1.2rem;
    border-radius: 5px;
    resize: none;
    outline: none;
    color: var(--foreground);
    background: var(--background-2);
  }

  #tags-input:empty:before {
    content: attr(data-placeholder);
    color: gray;
  }

  #tags-input,
  #title-input {
    overflow: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  #rendered {
    font-size: 1.4rem;
    position: relative;
    display: none;
    padding: 1rem 2rem;
    min-width: 0;
    grid-area: bo;
    resize: none;
    user-select: none;
    border-radius: 5px;
    overflow-wrap: anywhere;
    background: var(--background-2);
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
    /* background: var(--background-2); */
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

  .control:hover {
    animation: bounceBackAndForth 1s ease-in-out infinite;
    box-shadow: 0px 0px 100px var(--floodlights);
  }

  @keyframes bounceBackAndForth {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.96);
    }
    100% {
      transform: scale(1);
    }
  }

  #weaverModeIndicator {
    grid-area: w;
    font-size: 2rem;
    cursor: pointer;
  }

  #post-button {
    grid-area: s;
    font-size: 2rem;
    cursor: pointer;
  }

  #commit-post-button {
    filter: hue-rotate(90deg);
    transition: ease-in-out 100ms;
  }

  #empty-title-indicator,
  #empty-body-indicator {
    filter: hue-rotate(220deg);
    transition: ease-in-out 100ms;
  }
`;

export { XWeaverCSS };
