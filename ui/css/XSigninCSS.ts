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
    font-size: 3rem;
    background: -webkit-linear-gradient(
      90deg,
      var(--accent-gradient),
      var(--accent)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  #username-input,
  #password-input {
    padding: 1rem;
    border-radius: 5px;
    background: var(--background-light);
    outline: none;
    border: 1px solid var(--background-light);
    border-spacing: 10px;
    caret-color: var(--accent);
    color: var(--accent);
    font-family: Dank Mono;
    font-size: 2rem;
    font-style: italic;
    transition: 200ms ease-in-out;
    overflow: scroll;
    white-space: nowrap;
  }

  #username-input:focus,
  #password-input:hover {
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
    -webkit-text-security: circle;
  }

  #password-input:focus:empty:before {
    content: "";
  }

  #signin-button {
    text-align: center;
    background: var(--accent);
    cursor: pointer;
    grid-area: bu;
    color: var(--background-light);
    font-family: "Dank Mono";
    font-size: 1.5rem;
    padding: 1rem;
    border-radius: 5px;
    transition: all 200ms ease-in-out 0s;
    line-height: 2.2rem;
  }

  #signin-button:hover {
    transform: scale(0.99);
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active,
  input:-webkit-autofill:first-line {
    font-family: Dank Mono;
    font-style: italic;
    -webkit-text-fill-color: var(--accent);
    font-size: 2rem;
    -webkit-box-shadow: 0 0 0 100px var(--background-light) inset;
  }
`;

export { XSigninCSS };
