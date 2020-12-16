import { UserAuth, Role } from "@spiders";
import { LitElement as X, html, property, customElement } from "lit-element";
import { StateValue } from "xstate";
import { spidersMachine } from "../machines/spidersMachine";
import { SpidersCSS } from "../css/SpidersCSS";

@customElement("x-spiders")
export class XSpiders extends X {
  static styles = SpidersCSS;
  @property() auth: UserAuth = {
    user: { username: "", role: Role.GUEST },
    token: "",
  };
  @property() name = "";
  @property() theme: StateValue = "dark";
  @property() skin: StateValue = "spiders";
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
    switch (route) {
      case "/":
        return html`<x-posts .auth=${this.auth} theme=${this.theme}></x-posts>`;
      case "/admin":
        return html`<x-signin
          .auth=${this.auth}
          theme=${this.theme}
        ></x-signin>`;
      case "/weaver":
        return html`<x-weaver
          .auth=${this.auth}
          theme=${this.theme}
        ></x-weaver>`;
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
      <header>
        <x-navbar .auth=${this.auth} .skin=${this.skin}> </x-navbar>
      </header>
      <main class="main">${this.renderRoute(this.route)}</main>
      <footer> sidiousvic</footer>
    </div>`;
  }
}
