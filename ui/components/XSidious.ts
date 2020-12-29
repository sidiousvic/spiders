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

  renderRoute(route: StateValue) {
    switch (route) {
      case "/":
        return html`<x-main></x-main>`;
      case "/weaver":
        return html`<x-weaver></x-weaver>`;
      case "/spiders":
        return html`<x-spiders></x-spiders>`;
      default:
        return html``;
    }
  }

  render() {
    return html`${this.renderRoute(this.route)}`;
  }
}

export { XSpiders };
