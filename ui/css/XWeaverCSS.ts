import { css } from "lit-element";

const XWeaverCSS = css`
  :host {
    display: flex;
    font-family: Dank Mono, monospace;
    width: 100%;
  }

  #weaver {
    flex: 1;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 8fr 1fr 8.5fr 1fr;
    grid-template-rows: 0.5fr minmax(5rem, 5rem) 5fr minmax(5rem, 5rem) 0.5fr;
    gap: 20px 20px;
    min-height: 80vh;
    grid-template-areas:
      ". .  .  .  .  ."
      ". co ti ti ti ."
      ". co bo bo bo ."
      ". co ta ta ta ."
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
    background: var(--weaver-background);
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
    background: var(--weaver-background);
  }

  #body-editor:empty:not(:focus):before {
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
    background: var(--weaver-background);
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
    background: var(--weaver-background);
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
    background: var(--weaver-background);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    justify-items: center;
    align-items: center;
    /* gap: 20px 20px; */
    grid-template-areas:
      " w "
      " s "
      " . "
      " . "
      " . ";
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
