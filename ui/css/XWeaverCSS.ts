import { css } from "lit-element";

const XWeaverCSS = css`
  :host {
    display: flex;
    font-family: Dank Mono, monospace;
    flex: 1;
    width: 100%;
  }

  #weaver {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: space-around;
    justify-content: space-around;
  }

  #weaver > * {
    padding: 1rem 2rem;
    /* border-radius: 3px; */
  }

  textarea {
    font-family: Dank Mono, monospace;
    font-size: 1.2rem;
    border: none;
    width: 50%;
    resize: none;
    outline: none;
    color: var(--foreground);
    background: var(--background);
  }

  #rendered {
    width: 50%;
    background: var(--background);
  }
`;

export { XWeaverCSS };
