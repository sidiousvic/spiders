import { StateValue } from "xstate";
import { LitElement as X, html, property, customElement } from "lit-element";
import { routerService, Routes } from "../machines/routeMachine";
import { floodLightService } from "../machines/floodLightMachine";
import { themeService } from "../machines/themeMachine";
import { XNavbarCSS } from "../css/XNavbarCSS";
import { event } from "../utils";

@customElement("x-navbar")
export default class XNavbar extends X {
  @property() theme: StateValue = themeService.initialState.value;
  @property() floodlights: StateValue = floodLightService.initialState.value;
  @property() auth;
  @property() showDropdown: boolean = false;

  firstUpdated() {
    themeService.onTransition(({ value }) => {
      this.theme = value;
    });
    floodLightService.onTransition(({ value }) => {
      this.floodlights = value;
    });
  }

  static styles = [XNavbarCSS];

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

  renderNavFloodlights() {
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

  renderDropdownMenu() {
    return html`<div
      id="menu"
      @mouseenter=${() => {
        this.showDropdown = true;
      }}
      @mouseleave=${() => {
        this.showDropdown = false;
      }}
    >
      Menu
      <div
        class="menu-dropdown ${this.showDropdown ? "visible" : "hidden"}"
        @click=${() => {
          this.showDropdown = false;
        }}
      >
        <div
          class="menu-dropdown-link"
          id="spiders-link"
          @click=${() => {
            routerService.send("/" as Routes);
          }}
        >
          Spiders
        </div>
        <div
          class="menu-dropdown-link"
          id="weaver-link"
          @click=${() => {
            routerService.send("/weaver" as Routes);
          }}
        >
          Weave
        </div>

        ${!this.auth.token
          ? html`<div
              class="menu-dropdown-link"
              id="signin-link"
              @click=${() => {
                routerService.send("/signin" as Routes);
              }}
            >
              S/in
            </div>`
          : html`<div
              class="menu-dropdown-link"
              id="signout-link"
              @click=${() => {
                this.dispatchEvent(event("onSignout"));
              }}
            >
              S/out
            </div>`}
      </div>
    </div>`;
  }

  renderUserGreeting() {
    if (this.auth.user.username) {
      return html`Howdy, ${this.auth.user.username}! 👽`;
    }
    return html`A web journal.`;
  }

  render() {
    return html`
      <nav class=${this.renderNavFloodlights()}>
        <div
          id="title"
          @click=${() => {
            routerService.send("/" as Routes);
          }}
        >
          <h1>Spiders</h1>
        </div>
        <span
          id="light-switch"
          @click=${() => themeService.send("SWITCH_THEME")}
        >
          ${this.renderLightSwitch()}
        </span>
        ${this.renderDropdownMenu()}
      </nav>
    `;
  }
}
