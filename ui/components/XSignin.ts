import { LitElement as X, customElement, property } from "lit-element";
import { html } from "lit-html";
import { XSigninCSS } from "../css/XSigninCSS";
import { authMachine } from "../machines/authMachine";

interface SignInInput {
  username: string;
  password: string;
}

@customElement("x-signin")
export default class XSignIn extends X {
  @property() signinInput: SignInInput = {
    username: "",
    password: "",
  };
  @property() authed;

  firstUpdated() {
    authMachine.onTransition(({ context: { user } }) => {
      if (user.role === "DARKLORD") {
        const authed = new CustomEvent("authed", {
          detail: { message: `User is ${user.role}.`, routeTo: "/weaver" },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(authed);
      }
    });
  }

  static styles = [XSigninCSS];

  handleSignIn(e: MouseEvent & KeyboardEvent) {
    switch (e.type) {
      case "keydown":
        if (e.key === "Enter") this.signIn();
        break;
      case "click":
        this.signIn();
        break;
      default:
        break;
    }
  }

  async signIn() {
    authMachine.send("SIGNIN", { signInInput: this.signinInput });
  }

  preventMultilineInput(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as HTMLDivElement).blur();
    }
  }

  async handleSignInInput(e: KeyboardEvent) {
    const {
      innerHTML,
      dataset: { name },
    } = e.target as HTMLDivElement;

    this.signinInput = {
      ...this.signinInput,
      [name]: innerHTML,
    };
  }

  render() {
    return html`<div id="signin">
      <h1 id="signin-heading">WHO ARE YOU ?</h1>
      <div
        contenteditable
        tabindex="1"
        id="username-input"
        type="text"
        data-name="username"
        @keyup=${this.handleSignInInput}
        @keydown=${this.preventMultilineInput}
        data-placeholder="username"
      ></div>
      <div
        contenteditable
        tabindex="2"
        id="password-input"
        type="text"
        data-name="password"
        @keyup=${this.handleSignInInput}
        @keydown=${this.preventMultilineInput}
        data-placeholder="password"
      ></div>
      <div
        tabindex="3"
        id="signin-button"
        @click=${this.handleSignIn}
        @keydown=${this.handleSignIn}
      >
        SIGN IN
      </div>
    </div>`;
  }
}
