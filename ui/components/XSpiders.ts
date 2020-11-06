import { LitElement as X, html, property, customElement } from "lit-element";
import { StateValue } from "xstate";
import { themeService, themeMachine } from "../machines/themeMachine";
import { viewService, viewMachine } from "../machines/viewMachine";
import { XSpidersCSS } from "../css/XSpidersCSS";
import "./XPosts";
import "./XNavbar";
import "./XWeaver";

@customElement("x-spiders")
export class XSpiders extends X {
  static styles = XSpidersCSS;

  @property() name = "";
  @property() theme = themeMachine.initialState.value;
  @property() view = viewMachine.initialState.value;

  firstUpdated() {
    themeService
      .onTransition(({ value }) => {
        this.theme = value;
      })
      .start();
    viewService
      .onTransition(({ value }) => {
        this.view = value;
      })
      .start();
  }

  renderView(view: StateValue) {
    switch (view) {
      case "read": {
        return html`<x-posts theme=${this.theme}></x-posts>`;
      }
      case "login": {
        return html`login`;
      }
      case "weave": {
        return html`<x-weaver theme=${this.theme}></x-weaver>`;
      }
      default: {
        return html``;
      }
    }
  }

  render() {
    return html` <div id="spiders" class=${this.theme}>
      <x-navbar></x-navbar>
      ${this.renderView(this.view)}
    </div>`;
  }
}
