import { themeService } from "../machines/themeMachine";
import {
  LitElement as X,
  html,
  property,
  customElement,
  css,
} from "lit-element";

@customElement("x-navbar")
export default class XNavbar extends X {
  @property() lightSwitch: string = "🌑";

  firstUpdated() {
    themeService.onTransition((state) => {
      if (state.value === "dark") this.lightSwitch = "🌘";
      else this.lightSwitch = "🌖";
    });
  }

  static styles = css`
    :host {
      display: flex;
      width: 100%;
      z-index: 99;
      top: 0;
    }

    nav {
      top: 0;
      width: 100%;
      color: var(--accent);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }

    #title {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-direction: row;
      width: 20%;
    }

    #light-switch {
      width: 20%;
      font-size: 2rem;
      top: 2rem;
      left: 2rem;
      cursor: pointer !important;
      user-select: none;
      filter: hue-rotate(300deg);
    }

    nav > #title > h1 {
      width: fit-content;
      font-family: Die Nasty;
      font-weight: lighter;
      font-size: 2rem;
      background: -webkit-linear-gradient(
        90deg,
        var(--accentGradient),
        var(--accent)
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 1.5rem;
    }

    nav > #title > h2 {
      font-family: Encode Sans, sans-serif;
      text-align: center;
      font-size: 1rem;
      font-weight: lighter;
    }

    #navlinks {
      width: 20%;
      font-size: 1.2rem;
      margin-left: auto;
    }
  `;

  render() {
    return html`
      <nav>
        <div id="title">
          <h1>Spiders 🕸</h1>
        </div>
        <span
          id="light-switch"
          @click=${() => themeService.send("SWITCH_THEME")}
        >
          ${this.lightSwitch}
        </span>
        <div id="navlinks">⌰ ⌬ ↯</div>
      </nav>
    `;
  }
}
