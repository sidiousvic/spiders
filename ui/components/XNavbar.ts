import { LitElement as X, html, property, customElement } from "lit-element";
import { themeService } from "../machines/themeMachine";
import { XNavbarCSS } from "../css/XNavbarCSS";

@customElement("x-navbar")
export default class XNavbar extends X {
  @property() lightSwitch: string = "🌑";

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
        <div id="title">
          <h1>Spiders</h1>
        </div>
        <div id="navlinks">⌰ ⌬ ↯</div>
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
