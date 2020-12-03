import { UserAuth, Role } from "@spiders";
import { LitElement as X, html, property, customElement } from "lit-element";
import { StateValue } from "xstate";
import { themeService } from "../machines/themeMachine";
import { routerService, Routes } from "../machines/routeMachine";
import { XSpidersCSS } from "../css/XSpidersCSS";
import { floodLightService } from "../machines/floodLightMachine";

@customElement("x-spiders")
export class XSpiders extends X {
  static styles = XSpidersCSS;

  @property() auth: UserAuth = {
    user: {} as Partial<User>,
    token: "",
  };
  @property() name = "";
  @property() lights: StateValue = "online";
  @property() route = "";

  connectedCallback() {
    super.connectedCallback();
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) this.auth = auth;

    themeService.onTransition(({ value }) => {
      localStorage.setItem("theme", value as string);
      this.theme = value;
    });

    routerService.onTransition(({ value }) => {
      this.routes = [...this.routes, value];
    });

    floodLightService.onTransition(({ value }) => {
      this.floodlights = value;
    });
  }

  renderRoute(route: StateValue) {
    switch (route) {
      case "/": {
        return html`<x-post-cards .auth=${this.auth} theme=${this.theme}></x-posts>`;
      }
      case "/signin": {
        return html`<x-signin .auth=${this.auth}></x-signin>`;
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

  renderFooterLights() {
    switch (this.lights) {
      case "on":
        return "lights";
      case "offline":
        return "";
      case "defused":
        return "";
      default:
        return "lights";
    }
  }

  render() {
    return html` <div
      id="spiders"
      data-theme=${this.theme}
      @onSignin=${({ detail: { auth } }) => {
        this.auth = auth;
        routerService.send("/weaver" as Routes, {
          auth: { token: this.auth.token },
        });
      }}
      @onSignout=${() => {
        this.auth = {
          user: {} as Partial<User>,
          token: "",
        };
        localStorage.removeItem("auth");
        routerService.send("/" as Routes);
      }}
    >
      .lights=${this.lights} 
      .theme=${this.theme}>
      <div id="footer" class=${this.renderFooterLights()}><a href="https://www.github.com/sidiousvic" target="_blank" id="github-link">🏴‍☠️ by sidiousvic</a></div>
      </div>
    </div>`;
  }
}
