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
    font-family: Share Tech Mono, monospace;
    caret-color: var(--accent);
    border: var(--theme-borders);
  }

  #weaver {
    animation: fadeUp 500ms ease-out;
    animation-delay: 0s;
    animation-fill-mode: backwards;
    flex: 1 1 0%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 8fr 1fr;
    grid-template-rows:
      0.2fr minmax(5rem, 5rem) 5fr minmax(5rem, 5rem)
      minmax(5rem, 5rem) minmax(3rem, 0.2fr);
    gap: 20px;
    grid-template-areas:
      ". .   . "
      ". ti  ."
      ". bo  ."
      ". ta  ."
      ". co  ."
      ". .   . ";
    overflow: scroll;
    min-height: 95vh;
  }

  #title-input {
    padding: 2rem 2rem;
    grid-area: ti;
    font-size: 100%;
    border-radius: 5px;
    resize: none;
    outline: none;
    color: var(--foreground);
    background: var(--background-2);
  }

  #title-input:empty:before {
    content: attr(data-placeholder);
    color: gray;
  }

  #body-editor {
    padding: 2rem 2rem;
    grid-area: bo;
    font-size: 1.2rem;
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
    white-space: nowrap;
  }

  #rendered {
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
    animation: metallize 1s ease-in-out infinite;
  }

  @keyframes metallize {
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
    background: var(--gradient-2);
    color: var(--dark-foreground);
    transition: ease-in-out 100ms;
  }

  #empty-title-indicator,
  #empty-body-indicator {
    background: var(--gradient-3);
    color: var(--dark-foreground);
    transition: ease-in-out 100ms;
  }
`;

export { XWeaverCSS };
