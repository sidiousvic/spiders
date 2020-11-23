import { StateValue } from "xstate";
import { LitElement as X, html, property, customElement } from "lit-element";
import { routerService, Routes } from "../machines/routeMachine";
import { themeService } from "../machines/themeMachine";
import { XNavbarCSS } from "../css/XNavbarCSS";
import { weaverService } from "../machines/weaverMachine";

@customElement("x-navbar")
export default class XNavbar extends X {
  @property() theme: StateValue = "";
  @property() auth;

  firstUpdated() {
    themeService.onTransition(({ value }) => {
      this.theme = value;
    });
  }

  static styles = [XNavbarCSS];

  renderUserGreeting() {
    if (this.auth.user.username) {
      return html` <p>Howdy, ${this.auth.user.username}! 👽</p>`;
    }
    return html`A web journal.`;
  }

  renderLightSwitch() {
    switch (this.theme) {
      case "dark":
        return "🦠";
      case "light":
        return "🍑";
      default:
        return "⤬";
    }
  }

  render() {
    return html`
      <nav>
        <div
          id="title"
          @click=${() => {
            if (!(routerService.state.value !== "/weaver"))
              if (confirm("The web will not be woven.")) {
                routerService.send("/" as Routes);
                weaverService.send("RESET");
              }
          }}
        >
          <h1>Spiders</h1>
        </div>
        <div id="nav-links">
          <div
            id="weaver-link"
            @click=${() => {
              routerService.send("/weaver" as Routes);
            }}
          >
            Weaver
          </div>
        </div>
        <div id="user-greeting">${this.renderUserGreeting()}</div>
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
