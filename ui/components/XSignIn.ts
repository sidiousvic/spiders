import { UserAuth } from "spiders";
import { LitElement as X, customElement, property } from "lit-element";
import { html } from "lit-html";
import { fireGraphQLQuery, event, logGraphQLErrors } from "../utils";
import { routerService, Routes } from "../machines/routeMachine";
import { XSigninCSS } from "../css/XSigninCSS";

@customElement("x-signin")
export default class XSignIn extends X {
  @property() auth: UserAuth;

  firstUpdated() {
    if (this.auth.token) routerService.send("/weaver" as Routes);
  }

  static styles = [XSigninCSS];

  async handleSignIn() {
    const signInQuery = `
       mutation signIn($input: UserSignIn!) {
        signIn(input: $input) {
          token
          user {
            username
            userId
            role
          }
        }
      }
    `;

    const variables = {
      input: {
        username: this.auth.user.username,
        password: this.auth.user.password,
      },
    };

    const { data, errors } = await fireGraphQLQuery(signInQuery, variables);

    if (errors) logGraphQLErrors(errors);

    const {
      signIn: { token, user },
    } = data;

    this.auth = { ...this.auth, token, user };

    localStorage.setItem("auth", JSON.stringify(this.auth));

    const onSignin = event("onSignin", { auth: this.auth });
    this.dispatchEvent(onSignin);
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

    this.auth = {
      ...this.auth,
      user: { ...this.auth.user, [name]: innerHTML },
    };
  }

  render() {
    return html`<div id="signin">
      <h1 id="signin-heading">WHO ARE YOU ?</h1>
      <div
        contenteditable
        id="username-input"
        type="text"
        data-name="username"
        @keyup=${this.handleSignInInput}
        @keydown=${this.preventMultilineInput}
        data-placeholder="username"
      ></div>
      <div
        contenteditable
        id="password-input"
        type="text"
        data-name="password"
        @keyup=${this.handleSignInInput}
        @keydown=${this.preventMultilineInput}
        data-placeholder="password"
      ></div>
      <div id="signin-button" @click=${this.handleSignIn}>SIGN IN</div>
    </div>`;
  }
}
