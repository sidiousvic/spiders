import {
  LitElement as X,
  html,
  property,
  customElement,
  query,
} from "lit-element";
import { StateValue } from "xstate";
import { XSidiousCSS } from "../css/XSidiousCSS";
import { UniversalCSS } from "../css/UniversalCSS";

@customElement("x-sidious")
class XSpiders extends X {
  @property() title: string = "JUST DO SH*T.";
  @property() route: string = location.pathname;
  @query("#main") main;
  static styles = [UniversalCSS, XSidiousCSS];

  async firstUpdated() {
    await new Promise((r) => setTimeout(r, 0));
    this.addEventListener("authed", this.router);
    this.addEventListener("unauthed", this.router);
  }

  router(e: CustomEvent) {
    // @ts-ignore add typing later
    this.route = e.detail.routeTo;
    // @ts-ignore add typing later
    console.log(e.detail.routeTo);
  }

  renderRoute(route: StateValue) {
    switch (route) {
      case "/":
        return html`<x-main></x-main>`;
      case "/signin":
        return html`<x-signin></x-signin>`;
      case "/weaver":
        return html`<x-weaver></x-weaver>`;
      case "/spiders":
        return html`<x-spiders></x-spiders>`;
      default:
        return html``;
    }
  }

  render() {
    return html`${this.renderRoute(this.route)} `;
  }
}

export { XSpiders };
