import { LitElement as X, html, property, customElement } from "lit-element";
import { routerService, Routes } from "../machines/routeMachine";
import { themeService } from "../machines/themeMachine";
import { XNavbarCSS } from "../css/XNavbarCSS";

@customElement("x-navbar")
export default class XNavbar extends X {
  @property() lightSwitch: string = "🌑";
  @property() auth;

  firstUpdated() {
    themeService.onTransition((state) => {
      if (state.value === "dark") this.lightSwitch = "🌞";
      else this.lightSwitch = "🌜";
    });
  }

  static styles = XNavbarCSS;

  render() {
    return html`
      <nav>
        <div
          id="title"
          @click=${() => {
            routerService.send("/" as Routes);
          }}
        >
          <h1>Spiders</h1>
        </div>
        <div id="navlinks">
          <p
            @click=${() => {
              routerService.send("/weaver" as Routes);
            }}
          >
            Weaver
          </p>
          <p>
            ${this.auth.username
              ? `Welcome, ${this.auth.username}!`
              : "Not signed in."}
          </p>
        </div>
        <span
          id="light-switch"
          @click=${() => themeService.send("SWITCH_THEME")}
        >
          ${this.lightSwitch}
        </span>
      </nav>
    `;
  }
}
