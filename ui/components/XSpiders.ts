import { UserAuth, Role } from "@spiders";
import { LitElement as X, html, property, customElement } from "lit-element";
import { StateValue } from "xstate";
import { spidersMachine } from "../machines/spidersMachine";
import { XSpidersCSS } from "../css/XSpidersCSS";

@customElement("x-spiders")
export class XSpiders extends X {
  static styles = XSpidersCSS;
  @property() auth: UserAuth = {
    user: { username: "", role: Role.GUEST },
    token: "",
  };
  @property() name = "";
  @property() theme: StateValue = "dark";
  @property() lights: StateValue = "online";
  @property() route = "";

  firstUpdated() {
    spidersMachine.start();
  }

  connectedCallback() {
    super.connectedCallback();
    spidersMachine.onTransition(
      ({
        children: { routerMachine, lightMachine, themeMachine, authMachine },
        event,
      }) => {
        const authState = authMachine.state;
        const routerState = routerMachine.state;
        const lightState = lightMachine.state;
        const themeState = themeMachine.state;

        this.route = routerState.value;

        /** @TODO move this to state machine ↯ */
        history.pushState(
          routerState.value,
          routerState.value,
          routerState.value
        );

        this.auth = authMachine.state.context || {};
        this.lights = lightState.value;
        this.theme = themeState.value;

        /** @TODO move this to state machine ↯ */
        localStorage.setItem("theme", themeState.value);

        console.log("🍎", event);
        console.table({
          auth: authState.value,
          light: lightState.value,
          router: routerState.value,
          theme: themeState.value,
        });
      }
    );
  }

  renderRoute(route: StateValue) {
    switch (route) {
      case "/":
        return html`<x-post-cards .auth=${this.auth} theme=${this.theme}></x-posts>`;
      case "/signin":
        return html`<x-signin .auth=${this.auth}></x-signin>`;
      case "/weaver":
        return html`<x-weaver
          .auth=${this.auth}
          theme=${this.theme}
        ></x-weaver>`;
      default:
        return html``;
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
    >
      <x-navbar 
      .auth=${this.auth} 
      .lights=${this.lights} 
      .theme=${this.theme}>
      </x-navbar>
      ${this.renderRoute(this.route)}
      <div id="footer" class=${this.renderFooterLights()}><a href="https://www.github.com/sidiousvic" target="_blank" id="github-link">🏴‍☠️ by sidiousvic</a></div>
      </div>
    </div>`;
  }
}
