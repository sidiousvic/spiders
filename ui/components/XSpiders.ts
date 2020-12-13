import { UserAuth, Role } from "@spiders";
import { LitElement as X, html, property, customElement } from "lit-element";
import { StateValue } from "xstate";
import { spidersMachine } from "../machines/spidersMachine";
import { XSpidersCSS } from "../css/XSpidersCSS";

@customElement("x-spiders")
export class XSpiders extends X {
  static styles = XSpidersCSS;
  @property() auth: UserAuth = {
    user: { username: "", role: Role.GUEST },
    token: "",
  };
  @property() name = "";
  @property() theme: StateValue = "dark";
  @property() skin: StateValue = "spiders";
  @property() lights: StateValue = "online";
  @property() route = "";

  firstUpdated() {
    spidersMachine.start();
  }

  connectedCallback() {
    super.connectedCallback();
    spidersMachine.onTransition(
      // @ts-ignore
      ({ value: { router, auth, theme, skin }, event, context }) => {
        this.route = router;

        /** @TODO move this to state machine ↯ */
        history.pushState(router, router, router);

        this.auth = { user: context.user, token: context.token };
        this.theme = theme;
        this.skin = skin;

        /** @TODO move this to state machine ↯ */
        localStorage.setItem("theme", theme);
        localStorage.setItem("skin", skin);

        console.log("🍎", event);
        console.table({
          auth,
          router,
          theme,
          skin,
        });
      }
    );
  }

  renderRoute(route: StateValue) {
    console.log("Fasdfaf");
    switch (route) {
      case "/":
        return html`<x-post-cards .auth=${this.auth}></x-post-cards>`;
      case "/admin":
        return html`<x-signin .auth=${this.auth}></x-signin>`;
      case "/weaver":
        return html`<x-weaver .auth=${this.auth}></x-weaver>`;
      default:
        return html``;
    }
  }

  render() {
    return html` <div
      id="spiders"
      data-theme=${this.theme} 
      data-skin=${this.skin}
    >
      <x-navbar 
      .auth=${this.auth} 
      
      .skin=${this.skin}
      >
      </x-navbar>
      ${this.renderRoute(this.route)}
      <div id="footer"><a href="https://www.github.com/sidiousvic" target="_blank" id="github-link">🏴‍☠️ by sidiousvic</a></div>
      </div>
    </div>`;
  }
}
