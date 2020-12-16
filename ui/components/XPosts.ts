import { UserAuth } from "@spiders";
import { LitElement as X, html, property, customElement } from "lit-element";
import Prism from "prismjs";
import "./XPostCard";
import { XPostsCSS } from "../css/XPostsCSS";
import { UniversalCSS } from "../css/UniversalCSS";

@customElement("x-posts")
export default class XPosts extends X {
  @property() theme = "";
  @property() loadingMessage = "Weaving webs...";
  @property() auth: UserAuth;
  @property() posts = [];

  connectedCallback() {
    super.connectedCallback();
    if (!this.posts.length) {
      this.fetchPosts();
    }
    Prism.highlightAllUnder(this.shadowRoot);
  }

  async fetchPosts() {
    this.posts = [];
    const res = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{ 
          findPosts { 
            postId
            title 
            author 
            body 
            raw
            createdAt 
            tags
          }
        }`,
      }),
    });

    const {
      data: { findPosts },
    } = await res.json();

    setTimeout(() => {
      this.posts = findPosts;
    }, 700);
  }

  static styles = [UniversalCSS, XPostsCSS];

  renderPosts() {
    return this.posts.map(
      (post) => html` <x-post-card
        theme=${this.theme}
        .post=${post}
        .auth=${this.auth}
      />`
    );
  }

  renderLoadingMessage() {
    setTimeout(() => {
      if (!this.posts.length) this.loadingMessage = "No webs found.";
    }, 3000);
    return html`<div id="posts-loading-indicator">${this.loadingMessage}</div>`;
  }

  render() {
    return html`
      <div class="posts">
        ${this.posts.length
          ? html`<div class="what-s-hot" @onPostDelete=${this.fetchPosts}>
                ${this.renderPosts()}
              </div>
              <div class="post">This is a post.</div>`
          : this.renderLoadingMessage()}
      </div>
    `;
  }
}
