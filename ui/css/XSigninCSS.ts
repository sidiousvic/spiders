import { css } from "lit-element";

const XSigninCSS = css`
  :host {
    width: 100%;
  }

  #signin {
    display: grid;
    grid-template-columns: 1fr 1fr 35vh 1fr 1fr;
    grid-template-rows:
      1fr
      minmax(1rem, 4rem)
      minmax(1rem, 4rem)
      minmax(1rem, 4rem)
      minmax(1rem, 4rem)
      4fr;
    gap: 20px 20px;
    min-height: 100vh;
    grid-template-areas:
      ".  .  .  .  . "
      ".  .  he .  . "
      ".  .  un .  . "
      ".  .  pw .  . "
      ".  .  bu .  . "
      ".  .  .  .  . ";
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

  #signin > * {
    animation: fadeUp 500ms ease-out;
    animation-delay: 0s;
    animation-fill-mode: backwards;
    caret-color: var(--accent);
  }

  #signin-heading {
    grid-area: he;
    text-align: center;
    margin: 0;
    font-size: 2.5rem;
    background: -webkit-linear-gradient(90deg, var(--accent-2), var(--accent));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  #username-input,
  #password-input {
    padding: 1rem;
    border-radius: 0px;
    background: var(--background-2);
    outline: none;
    border: 1px solid var(--background-2);
    border-spacing: 10px;
    caret-color: var(--accent);
    color: var(--accent);
    font-size: 2rem;
    transition: 200ms ease-in-out;
    overflow: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    font-weight: 100;
  }

  #username-input:focus,
  #password-input:focus {
    transform: scale(0.99);
    border: 1px solid var(--accent);
  }

  #username-input {
    grid-area: un;
    line-height: 100%;
  }

  #password-input {
    grid-area: pw;
    line-height: 100%;
  }

  #username-input:empty:before,
  #password-input:empty:before {
    content: attr(data-placeholder);
    color: gray;
  }

  #password-input:focus,
  #password-input:not(:empty) {
    -webkit-text-security: square;
  }

  #password-input:focus:empty:before {
    content: "";
  }

  #signin-button {
    text-align: center;
    cursor: pointer;
    grid-area: bu;
    color: var(--background-2);
    font-size: 1.5rem;
    padding: 1rem;
    border-radius: 0px;
    transition: all 200ms ease-in-out 0s;
    line-height: 2.2rem;
    background: -webkit-linear-gradient(90deg, var(--accent), var(--accent-2));
  }

  #signin-button:hover {
    transform: scale(0.99);
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active,
  input:-webkit-autofill:first-line {
    font-style: italic;
    -webkit-text-fill-color: var(--accent);
    font-size: 2rem;
    -webkit-box-shadow: 0 0 0 100px var(--background-2) inset;
  }
`;

export { XSigninCSS };
