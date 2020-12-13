import { UserAuth } from "@spiders";
import { StateValue } from "xstate";
import { LitElement as X, html, property, customElement } from "lit-element";
import { XNavbarCSS } from "../css/XNavbarCSS";
import { spidersMachine } from "../machines/spidersMachine";

@customElement("x-navbar")
export default class XNavbar extends X {
  @property() theme: StateValue = "dark";
  @property() lights: StateValue = "online";
  @property() auth: UserAuth;
  @property() showDropdown: boolean = false;

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
            spidersMachine.send("/");
          }}
        >
          Spiders
        </div>

        ${this.auth.token /** @TODO consistent event sending */ &&
        html` <div
            class="menu-dropdown-link"
            id="weaver-link"
            @click=${() => {
              spidersMachine.send("/weaver", { auth: this.auth });
            }}
          >
            Weave
          </div>
          <div
            class="menu-dropdown-link"
            id="signout-link"
            @click=${() => {
              spidersMachine.send("SIGNOUT");
              spidersMachine.send("/");
            }}
          >
            Sign out
          </div>`}
      </div>
    </div>`;
  }

  renderUserGreeting() {
    if (this.auth.user.username) {
      return html`Howdy, dark lord! 🏴‍☠️`;
    }
    return html``;
  }

  render() {
    return html`
      <nav
        class=${this.renderNavLights()}
        @mouseenter=${() => spidersMachine.send("LIGHTS_ON")}
        @mouseleave=${() => spidersMachine.send("LIGHTS_OFF")}
      >
        <div
          id="title"
          @click=${() => {
            spidersMachine.send("/");
          }}
        >
          <h1>Spiders</h1>
        </div>
        <span
          id="light-switch"
          @click=${() => spidersMachine.send("SWITCH_THEME")}
        >
          ${this.renderLightSwitch()}
        </span>
        ${this.renderDropdownMenu()}
      </nav>
    `;
  }
}
