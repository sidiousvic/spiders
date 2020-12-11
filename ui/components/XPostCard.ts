import { Post, UserAuth } from "@spiders";
import {
  LitElement as X,
  html,
  property,
  customElement,
  query,
} from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import Prism from "prismjs";
import { spidersMachine } from "../machines/spidersMachine";
import { XPostCardCSS } from "../css/XPostCardCSS";
import { SpidersCodeCSS } from "../css/SpidersCodeCSS";
import { getHumanReadableDate } from "../utils";
import "prismjs/components/prism-typescript";

@customElement("x-post-card")
export default class XPostCard extends X {
  @property() state = { value: "" };
  @property() theme = "";
  @property() auth: UserAuth;
  @property() post: Partial<Post>;
  @property() stagedDelete = false;
  @query("#delete-post-button") deletePostButton: HTMLDivElement;

  static styles = [XPostCardCSS, SpidersCodeCSS];

  connectedCallback() {
    super.connectedCallback();
    Prism.highlightAllUnder(this.shadowRoot);
    //@ts-ignore
    spidersMachine.onTransition(({ value: { postCard } }) => {
      this.state = postCard;
    });
  }

  stageDeletePost() {
    this.stagedDelete = true;
    spidersMachine.send("STAGE/DELETE");
  }

  cancelDeletePost() {
    this.stagedDelete = false;
    spidersMachine.send("CANCEL/DELETE");
  }

  async handleDeletePost() {
    spidersMachine.send("CONFIRM/DELETE", {
      postToBeDeleted: this.post,
      auth: this.auth,
    });
  }

  async handleUpdatePost() {
    spidersMachine.send("/weaver");
    spidersMachine.send("UPDATE_WEAVER_POST", { postToUpdate: this.post });
  }

  isStagedDelete() {
    return this.stagedDelete;
  }

  renderDeletePostButton() {
    switch (this.auth.user.role) {
      case "DARKLORD": {
        return html`<div
            id="delete-post-button"
            @click=${this.isStagedDelete()
              ? this.cancelDeletePost
              : this.stageDeletePost}
          >
            <div>${this.isStagedDelete() ? "OH SHIT!" : "DELETE"}</div>
          </div>

          ${this.isStagedDelete()
            ? html`<div
                id="cancel-delete-post-button"
                class=${this.isStagedDelete() ? "staged-delete-highlight" : ""}
                @click=${this.handleDeletePost}
              >
                DELETE
              </div>`
            : ""} `;
      }
      default:
        return html``;
    }
  }

  renderUpdatePostButton() {
    switch (this.auth.user.role) {
      case "DARKLORD": {
        return html`<div
          id="update-post-button"
          @click=${this.handleUpdatePost}
        >
          <div>UPDATE</div>
        </div>`;
      }
      default:
        return html``;
    }
  }

  render() {
    const postBodyVisual = unsafeHTML(this.post.body.split("</pre>")[0]);
    return html`
      <div
        class="post-card"
        data-theme=${this.theme}
        @mouseenter=${() => spidersMachine.send("LIGHTS_OFF")}
        @mouseleave=${() => spidersMachine.send("LIGHTS_ON")}
      >
        <h1 class="post-card-title">${this.post.title}</h1>
        <h2 class="post-card-subtitle">
          ${getHumanReadableDate(new Date(this.post.createdAt))}
        </h2>
        <div class="post-card-body">${postBodyVisual}</div>
        <sub class="post-card-tags">${this.post.tags}</sub>
        <div id="post-buttons">
          ${this.renderDeletePostButton()} ${this.renderUpdatePostButton()}
        </div>
      </div>
    `;
  }
}
