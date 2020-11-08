import { LitElement as X, html, property, customElement } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import prism from "markdown-it-prism";
import MarkdownIt from "markdown-it";
import "prismjs/components/prism-typescript";
import { indent } from "indent.js";
import { XWeaverCSS } from "../css/XWeaverCSS";
import { spidersCodeCSS } from "../css/SpidersCodeCSS";
import { routerService, Routes } from "../machines/routeMachine";

const md = new MarkdownIt();
md.use(prism, { defaultLanguageForUnknown: "ts" });

@customElement("x-weaver")
export default class XWeaver extends X {
  @property() auth;
  @property() theme = "";
  @property() rendered = "";
  @property() raw = indent.html(this.rendered, {
    tabString: "  ",
  });

  firstUpdated() {
    if (!this.auth.token) routerService.send("/signin" as Routes);
  }

  static styles = [XWeaverCSS, spidersCodeCSS];

  weave(value: string) {
    this.rendered = md.render(value);
  }

  render() {
    return html`
      <div id="weaver" class=${this.theme}>
        <textarea
          @keyup=${(e: KeyboardEvent) =>
            this.weave((e.target as HTMLTextAreaElement).value)}
        ></textarea>
        <div id="rendered">${unsafeHTML(this.rendered)}</div>
      </div>
    `;
  }
}
