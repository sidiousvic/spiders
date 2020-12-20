import { LitElement as X, html, property, customElement } from "lit-element";
import { StateValue } from "xstate";
// import { spidersMachine } from "../machines/spidersMachine";
import { UniversalCSS } from "../css/UniversalCSS";
import { XSpidersCSS } from "../css/XSpidersCSS";

@customElement("x-spiders")
class XSpiders extends X {
  @property() x: string = "";

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
    return html`<main><h1>JUST DO SH*T</h1></main>`;
  }
}

export { XSpiders };
