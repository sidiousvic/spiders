import { UserAuth } from "spiders";
import { LitElement as X, customElement, property } from "lit-element";
import { html } from "lit-html";
import { fireGraphQLQuery, event, logGraphQLErrors } from "../utils";

@customElement("x-sign-in")
export default class XSignIn extends X {
  @property() auth: UserAuth;

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

    const onSignIn = event("onSignIn", { auth: this.auth });
    this.dispatchEvent(onSignIn);
  }

  async handleSignInInput(e: KeyboardEvent) {
    const { value, name } = e.target as HTMLInputElement;
    this.auth = { ...this.auth, user: { ...this.auth.user, [name]: value } };
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
