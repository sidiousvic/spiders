import { LitElement as X, customElement, property } from "lit-element";
import { html } from "lit-html";
import { fireGraphQLQuery, event } from "../utils";

@customElement("x-sign-in")
export default class XSignIn extends X {
  @property() auth;

  async handleSignIn() {
    const signInQuery = JSON.stringify({
      query: `
       mutation {
        signIn(input: {
          username: "${this.auth.username}"
          password: "${this.auth.password}"
        }) {
          token
        }
      }
    `,
    });

    const {
      signIn: { token },
    } = await fireGraphQLQuery(signInQuery);

    this.auth = { ...this.auth, token };

    const onSignUp = event("onSignUp", { auth: this.auth });
    this.dispatchEvent(onSignUp);
  }

  async handleSignInInput(e: KeyboardEvent) {
    const { value, name } = e.target as HTMLInputElement;
    this.auth = { ...this.auth, [name]: value };
  }

  render() {
    return html`<div>
      <input
        type="text"
        name="username"
        @keyup=${this.handleSignInInput}
        placeholder="username"
      />
      <input
        type="password"
        name="password"
        @keyup=${this.handleSignInInput}
        placeholder="password"
      />
      <button @click=${this.handleSignIn}>SIGN IN</button>
    </div>`;
  }
}
