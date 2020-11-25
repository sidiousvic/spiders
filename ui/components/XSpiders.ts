import { UserAuth, User } from "spiders";
import { LitElement as X, html, property, customElement } from "lit-element";
import { StateValue } from "xstate";
import { themeService } from "../machines/themeMachine";
import { routerService, Routes } from "../machines/routeMachine";
import { XSpidersCSS } from "../css/XSpidersCSS";
import "./XPosts";
import "./XNavbar";
import "./XWeaver";
import "./XSignIn";
import { floodLightService } from "../machines/floodLightMachine";

@customElement("x-spiders")
export class XSpiders extends X {
  static styles = XSpidersCSS;

  @property() auth: UserAuth = {
    user: {} as Partial<User>,
    token: "",
  };
  @property() name = "";
  @property() theme = themeService.initialState.value;
  @property() routes = [routerService.initialState.value];
  @property() floodlights = floodLightService.initialState.value;

  firstUpdated() {
    // WEAVER DEVELOPMENT
    routerService.send("/weaver" as Routes);
    // WEAVER DEVELOPMENT

    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) this.auth = auth;

    themeService.onTransition(({ value }) => {
      if (value === "light") floodLightService.send("DEFUSE");
      else floodLightService.send("FUSE");
      if ([...this.routes].pop() === "/") floodLightService.send("ONLINE");
      if ([...this.routes].pop() === "/signin")
        floodLightService.send("ONLINE");
      this.theme = value;
    });

    routerService.onTransition(({ value }) => {
      if (value === "/") floodLightService.send("ONLINE");
      if (value === "/signin") floodLightService.send("ONLINE");
      history.pushState(null, null, value as string);
      this.routes = [...this.routes, value];
    });

    floodLightService.onTransition(({ value }) => {
      this.floodlights = value;
    });
  }

  renderRoute(route: StateValue) {
    switch (route) {
      case "/": {
        return html`<x-posts .auth=${this.auth} theme=${this.theme}></x-posts>`;
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

  renderFooterFloodlights() {
    switch (this.floodlights) {
      case "on":
        return "floodlights";
      case "off":
        return "";
      case "defused":
        return "";
      default:
        return "floodlights";
    }
  }

  render() {
    return html` <div
      id="spiders"
      class=${this.theme}
      @onSignin=${({ detail: { auth } }) => {
        this.auth = auth;
        routerService.send("/weaver" as Routes);
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
      <x-navbar .auth=${this.auth}></x-navbar>
      ${this.renderRoute([...this.routes].pop())}
      <div id="footer" class=${this.renderFooterFloodlights()}>🏴‍☠️ by sidiousvic</div>
      </div>
    </div>`;
  }
}
