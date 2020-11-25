import { StateValue } from "xstate";
import { LitElement as X, html, property, customElement } from "lit-element";
import { routerService, Routes } from "../machines/routeMachine";
import { themeService } from "../machines/themeMachine";
import { XNavbarCSS } from "../css/XNavbarCSS";
import { event } from "../utils";

@customElement("x-navbar")
export default class XNavbar extends X {
  @property() theme: StateValue = themeService.initialState.value;
  @property() floodlights: StateValue = floodLightService.initialState.value;
  @property() auth;

  firstUpdated() {
    themeService.onTransition(({ value }) => {
      this.theme = value;
    });
    floodLightService.onTransition(({ value }) => {
      this.floodlights = value;
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
            routerService.send("/" as Routes);
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
          <div
            id="signin-link"
            @click=${() => {
              routerService.send("/signin" as Routes);
            }}
          >
            Signin
          </div>
          <div
            id="signout-link"
            @click=${() => {
              this.dispatchEvent(event("onSignout"));
            }}
          >
            Signout
          </div>
        </div>
        <div id="user-greeting">${this.renderUserGreeting()}</div>
        <span
          id="light-switch"
          @click=${() => themeService.send("SWITCH_THEME")}
        >
          ${this.renderLightSwitch()}
        </span>
      </nav>
    `;
  }
}
