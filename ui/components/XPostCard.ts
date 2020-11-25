// import { State } from "xstate";
import { Post, UserAuth } from "spiders";
import {
  LitElement as X,
  html,
  property,
  customElement,
  query,
} from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import truncateHTML from "truncate-html";
import Prism from "prismjs";
import { postCardService } from "../machines/postCardMachine";
import { routerService, Routes } from "../machines/routeMachine";
import { weaverService } from "../machines/weaverMachine";
import { floodLightService } from "../machines/floodLightMachine";
import { XPostCardCSS } from "../css/XPostCardCSS";
import { spidersCodeCSS } from "../css/SpidersCodeCSS";
import {
  event,
  fireGraphQLQuery,
  getHumanReadableDate,
  logGraphQLErrors,
} from "../utils";
import "prismjs/components/prism-typescript";

@customElement("x-post-card")
export default class XPostCard extends X {
  @property() theme = "";
  @property() state = { value: {}, context: {} };
  @property() auth: UserAuth;
  @property() post: Partial<Post>;
  @query("#delete-post-button") deletePostButton: HTMLDivElement;
  static styles = [XPostCardCSS, spidersCodeCSS];

  firstUpdated() {
    Prism.highlightAllUnder(this.shadowRoot);
    postCardService.onTransition((state) => {
      this.state = state;
    });
  }

  stageDeletePost() {
    postCardService.send("STAGE_DELETE", { post: this.post });
  }

  cancelDeletePost() {
    postCardService.send("RESET");
  }

  async handleDeletePost() {
    const deletePostMutation = `
    mutation deletePost($input: DeletePostInput!) {
      deletePost(input: $input) {
        message
        resource
      }
    }
    `;
    const variables = {
      input: {
        postId: this.post.postId,
      },
    };

    const headers = {
      authorization: this.auth.token,
    };

    const { errors } = await fireGraphQLQuery(
      deletePostMutation,
      variables,
      headers
    );

    if (errors) {
      logGraphQLErrors(errors);
    }

    const onPostDelete = event("onPostDelete", { postId: this.post.postId });
    this.dispatchEvent(onPostDelete);
    weaverService.send("RESET");
    postCardService.send("RESET");
  }

  async handleUpdatePost() {
    routerService.send("/weaver" as Routes);
    weaverService.send("UPDATE", { post: this.post });
  }

  isStagedDelete() {
    return this.state.value === "stagedDelete";
  }

  isStagedPost() {
    return (
      this.post.postId === postCardService.state.context.stagedDeletePost.postId
    );
  }

  renderDeletePostButton() {
    switch (this.auth.user.role) {
      case "DARKLORD": {
        return html`<div
            id="delete-post-button"
            @click=${this.isStagedDelete()
              ? this.handleDeletePost
              : this.stageDeletePost}
          >
            <div>DELETE</div>
          </div>

          ${this.isStagedDelete() && this.isStagedPost()
            ? html`<div
                id="cancel-delete-post-button"
                class=${this.isStagedDelete() && this.isStagedPost()
                  ? "staged-delete-highlight"
                  : ""}
                @click=${this.cancelDeletePost}
              >
                OH SHIT NO
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
    return html`
      <div
        class="post-card ${this.theme}"
        @mouseenter=${() => floodLightService.send("OFF")}
        @mouseleave=${() => floodLightService.send("ONLINE")}
      >
        <h1 class="post-card-title">${this.post.title}</h1>
        <h2 class="post-card-subtitle">
          by ${this.post.author} @
          ${getHumanReadableDate(new Date(this.post.createdAt))}
        </h2>
        <div class="post-card-body">
          ${unsafeHTML(this.post.body.split("</pre>")[0])}
          ${unsafeHTML(
            truncateHTML(this.post.body.split("</pre>")[1], 20, {
              byWords: true,
              excludes: ["code"],
            })
          )}
        </div>
        <sub class="post-card-tags">${this.post.tags}</sub>
        <div id="post-buttons">
          ${this.renderDeletePostButton()} ${this.renderUpdatePostButton()}
        </div>
      </div>
    `;
  }
}
