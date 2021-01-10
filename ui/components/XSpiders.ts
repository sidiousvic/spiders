import { LitElement as X, html, customElement } from "lit-element";
import { XSpidersCSS } from "../css/XSpidersCSS";
import { UniversalCSS } from "../css/UniversalCSS";
import { dataMachine } from "../machines/dataMachine";

@customElement("x-spiders")
class XSpiders extends X {
  static styles = [UniversalCSS, XSpidersCSS];

  firstUpdated() {
    dataMachine.send("FETCH_POSTS");
    dataMachine.onTransition((state) => {
      console.log(state);
    });
  }

  render() {
    return html`Spiders`;
  }
}

export { XSpiders };
