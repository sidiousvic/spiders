import { UserAuth } from "spiders";
import { LitElement as X, html, property, customElement } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import Prism from "prismjs";
import { XPostCSS } from "../css/XPostCSS";
import { spidersCodeCSS } from "../css/SpidersCodeCSS";
import {
  event,
  fireGraphQLQuery,
  getHumanReadableDate,
  logGraphQLErrors,
} from "../utils";
import "prismjs/components/prism-typescript";

@customElement("x-post")
export default class XPost extends X {
  @property() theme = "";
  @property() auth: UserAuth;
  @property({ type: Object }) post: any;

  static styles = [XPostCSS, spidersCodeCSS];

  firstUpdated() {
    Prism.highlightAllUnder(this.shadowRoot);
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
  }

  renderDeletePostButton() {
    switch (this.auth.user.role) {
      case "DARKLORD": {
        return html`<icon id="deletePostButton" @click=${this.handleDeletePost}
          >🔥‍</icon
        >`;
      }
      default:
        return html``;
    }
  }

  render() {
    return html`
      <div class="post ${this.theme}">
        <h1 class="post-title">${this.post.title}</h1>
        <h2 class="post-subtitle">
          by ${this.post.author} @
          ${getHumanReadableDate(new Date(this.post.createdAt))}
        </h2>
        <div class="post-body">${unsafeHTML(this.post.body)}</div>
        <sub class="tags">${this.post.tags}</sub>
        ${this.renderDeletePostButton()}
      </div>
    `;
  }
}
