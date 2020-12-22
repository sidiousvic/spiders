import {
  LitElement as X,
  html,
  property,
  customElement,
  query,
} from "lit-element";
import { StateValue } from "xstate";
import { XSpidersCSS } from "../css/XSpidersCSS";
import { UniversalCSS } from "../css/UniversalCSS";

@customElement("x-spiders")
class XSpiders extends X {
  @property() title: string = "JUST DO SH*T.";
  @property() route: string = location.pathname;
  @query("#main") main;
  static styles = [UniversalCSS, XSpidersCSS];

  renderRoute(route: StateValue) {
    switch (route) {
      case "/":
        return html`<x-main></x-main>`;
      default:
        return html``;
    }
  }

  render() {
    return html`${this.renderRoute(this.route)}`;
  }
}

export { XSpiders };
