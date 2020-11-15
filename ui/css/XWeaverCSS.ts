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
    grid-template-columns: 1fr 8fr 1fr 8.5fr 1fr;
    grid-template-rows: 1fr 16fr 1fr;
    gap: 20px 0px;
    max-height: 80vh;
    grid-template-areas:
      ". ti ti ti ."
      ". bo bo bo ."
      ". ta ta ta .";
  }

  #title-input {
    padding: 2rem 2rem;
    grid-area: ti;
    font-family: Dank Mono, monospace;
    font-size: 1.2rem;
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

  #weaverModeIndicator {
    font-size: 2rem;
    position: absolute;
    user-select: none;
    left: 2rem;
    bottom: 2rem;
    cursor: pointer;
  }

  #weaverModeIndicator:hover {
    transform: scale(1.2);
  }
`;

export { XWeaverCSS };
