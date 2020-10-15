import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import spidersStyles from "./styles.spiders"
import spidersCodeStyles from "./styles.spidersCode"
import { getTimeOfDayTheme, getHumanReadableDate } from "../utils";
import { LitElement as X, html, property, customElement } from "lit-element";
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import post from "../mockPost"

@customElement("x-spiders")
export default class Spiders extends X {
  @property() name = "World";
  @property() timeOfDayTheme = getTimeOfDayTheme();
  @property() theme = this.timeOfDayTheme;
  @property() lightSwitch = this.theme === "dark" ? "🌒" : "🌔";

  // post props
  @property() title = post.title;
  @property() author = post.author;
  @property() tags = post.tags;
  @property() body = post.body;

  toggleThemes() {
    this.lightSwitch = this.lightSwitch === "🌒" ? "🌔" : "🌒";
    const themes = ["light", "dark"];
    let currThemeIdx = themes.indexOf(this.theme);
    const nextThemeIdx = ++currThemeIdx % themes.length;
    this.theme = themes[nextThemeIdx];
  }

  static styles = [spidersStyles, spidersCodeStyles];

  firstUpdated() {
    this.highlightCode();
  }

  highlightCode() {
    const code = this.shadowRoot?.querySelector("#code");
    (code as HTMLElement).innerHTML = Prism.highlight(
      (code as HTMLElement).innerText,
      Prism.languages.typescript,
      "typescript"
    );
  }

  render() {
    return html` <div id="theme" class=${this.theme}>
      <span id="light-switch" @click="${this.toggleThemes}"> ${this.lightSwitch} </span>
      <nav>
        <div id="title">
          <h1>Spiders 🕸</h1>
          <h2>A web engineering log.</h2>
        </div>
        <div id="navlinks">⌰ ⌬ ↯</div>
      </nav>
      <div id="content">
        <div id="posts">
          <div class="post">
            <h1 class="post-title">${this.title}</h1>
            <h2 class="post-subtitle">by Vic @ ${getHumanReadableDate()}</h2>
            <div class="post-body">
            ${unsafeHTML(this.body)}
            </div>
            <br />
            <sub class="tags">${this.tags}</sub>
          </div>
        </div>
      </div>
    </div>`;
  }
}
