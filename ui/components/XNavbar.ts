import { UserAuth } from "@spiders";
import { StateValue } from "xstate";
import { LitElement as X, html, property, customElement } from "lit-element";
import { XNavbarCSS } from "../css/XNavbarCSS";
import { event } from "../utils";

@customElement("x-navbar")
export default class XNavbar extends X {
  @property() lights: StateValue = "online";
  @property() auth: UserAuth;
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

  renderNavLights() {
    switch (this.lights) {
      case "online":
        return "lights";
      case "offline":
        return "";
      case "defused":
        return "";
      default:
        return "lights";
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
            routerService.send("/weaver" as Routes, {
              auth: { token: this.auth.token },
            });
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
              Sign in
            </div>`
          : html`<div
              class="menu-dropdown-link"
              id="signout-link"
              @click=${() => {
                this.dispatchEvent(event("onSignout"));
              }}
            >
              Sign out
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
      <nav
        class=${this.renderNavFloodlights()}
        @mouseenter=${() => floodLightService.send("OFFLINE")}
        @mouseleave=${() => floodLightService.send("ONLINE")}
      >
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
