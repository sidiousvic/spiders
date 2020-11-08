import { LitElement as X, html, property, customElement } from "lit-element";
import { StateValue } from "xstate";
import { themeService, themeMachine } from "../machines/themeMachine";
import { routerService, routerMachine, Routes } from "../machines/routeMachine";
import { XSpidersCSS } from "../css/XSpidersCSS";
import "./XPosts";
import "./XNavbar";
import "./XWeaver";
import "./XSignIn";

export interface Auth {
  username: string;
  password: string;
  token: string;
}

@customElement("x-spiders")
export class XSpiders extends X {
  static styles = XSpidersCSS;

  @property() auth: Auth = {
    username: null,
    password: null,
    token: null,
  };
  @property() name = "";
  @property() theme = themeMachine.initialState.value;
  @property() routes = [routerMachine.initialState.value];

  firstUpdated() {
    themeService
      .onTransition(({ value }) => {
        this.theme = value;
      })
      .start();

    routerService
      .onTransition(({ value }) => {
        history.pushState(null, null, value as string);
        this.routes = [...this.routes, value];
      })
      .start();
  }

  renderRoute(route: StateValue) {
    switch (route) {
      case "/read": {
        return html`<x-posts theme=${this.theme}></x-posts>`;
      }
      case "/signin": {
        return html`<x-sign-in .auth=${this.auth}></x-sign-in>`;
      }
      case "/weaver": {
        return html`<x-weaver
          .auth=${this.auth}
          theme=${this.theme}
        ></x-weaver>`;
      }
      default: {
        return html``;
      }
    }
  }

  render() {
    return html` <div
      id="spiders"
      class=${this.theme}
      @onSignUp=${({ detail: { auth } }) => {
        this.auth = auth;
        routerService.send("/weaver" as Routes);
      }}
    >
      <x-navbar .auth=${this.auth}></x-navbar>
      ${this.renderRoute([...this.routes].pop())}
    </div>`;
  }
}
