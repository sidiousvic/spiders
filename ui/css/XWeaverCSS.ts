import { css } from "lit-element";

const XWeaverCSS = css`
  :host {
    display: flex;
    font-family: Dank Mono, monospace;
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
    animation: fadeUp 500ms ease-out;
    animation-delay: 0s;
    animation-fill-mode: backwards;
    caret-color: var(--accent);
  }

  #weaver {
    flex: 1;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 8fr 1fr 8.5fr 1fr;
    grid-template-rows: 0.5fr minmax(5rem, 5rem) 5fr minmax(5rem, 5rem) auto;
    gap: 20px 20px;
    min-height: 80vh;
    grid-template-areas:
      ". co co co co ."
      ". ti ti ti ti ."
      ". bo bo bo bo ."
      ". ta ta ta ta ."
      ". .  .  .  .  .";
  }

  #title-input {
    padding: 2rem 2rem;
    grid-area: ti;
    font-family: Dank Mono, monospace;
    font-size: 100%;
    border-radius: 5px;
    resize: none;
    outline: none;
    border: none;
    color: var(--foreground);
    background: var(--background-light);
  }

  #title-input:empty:before {
    content: attr(data-placeholder);
    color: gray;
  }

  #body-editor {
    padding: 2rem 2rem;
    grid-area: bo;
    font-family: Dank Mono, monospace;
    font-size: 1.2rem;
    border-radius: 5px;
    resize: none;
    outline: none;
    border: none;
    color: var(--foreground);
    background: var(--background-light);
  }

  #body-editor:empty:before {
    content: attr(data-placeholder);
    color: gray;
  }

  #tags-input {
    padding: 2rem 2rem;
    grid-area: ta;
    font-family: Dank Mono, monospace;
    font-size: 1.2rem;
    border-radius: 5px;
    resize: none;
    outline: none;
    border: none;
    color: var(--foreground);
    background: var(--background-light);
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
    background: var(--background-light);
    cursor: pointer;
  }

  #controls {
    user-select: none;
    padding: 1rem 1rem;
    grid-area: co;
    font-family: Dank Mono, monospace;
    font-size: 1.2rem;
    border-radius: 5px;
    resize: none;
    outline: none;
    border: none;
    color: var(--foreground);
    background: var(--background-light);
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    justify-items: center;
    align-items: center;
    /* gap: 20px 20px; */
    grid-template-areas: "w s . . . . . .";
  }

  #controls > *:hover {
    transform: scale(1.2);
  }

  #weaverModeIndicator {
    grid-area: w;
    font-size: 2rem;
    cursor: pointer;
  }

  #stagePostButton {
    grid-area: s;
    font-size: 2rem;
    cursor: pointer;
  }
`;

export { XWeaverCSS };
