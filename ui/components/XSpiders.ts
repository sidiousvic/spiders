import { LitElement as X, html, customElement } from "lit-element";
import { XSpidersCSS } from "../css/XSpidersCSS";
import { UniversalCSS } from "../css/UniversalCSS";

@customElement("x-spiders")
class XSpiders extends X {
  static styles = [UniversalCSS, XSpidersCSS];

  render() {
    return html`Spiders`;
  }
}

export { XSpiders };
