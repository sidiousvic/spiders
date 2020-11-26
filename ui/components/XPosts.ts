import { UserAuth } from "spiders";
import { LitElement as X, html, property, customElement } from "lit-element";
import { floodLightService } from "../machines/floodLightMachine";
import "./XPostCard";
import { XPostsCSS } from "../css/XPostsCSS";

@customElement("x-posts")
export default class XPosts extends X {
  @property() theme = "";
  @property() loadingMessage = "Weaving webs...";
  @property() auth: UserAuth;
  @property() posts = [];

  connectedCallback() {
    super.connectedCallback();
    if (!this.posts.length) {
      floodLightService.send("OFFLINE");
      this.fetchPosts();
    }
  }

  async fetchPosts() {
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

  static styles = [XPostsCSS];

  renderPosts() {
    floodLightService.send("ONLINE");
    return this.posts.map(
      (post) => html` <x-post-card
        theme=${this.theme}
        .post=${post}
        .auth=${this.auth}
      />`
    );
  }

  render() {
    setTimeout(() => {
      if (!this.posts.length) this.loadingMessage = "No webs found.";
    }, 3000);
    return html`
      <div class="posts" @onPostDelete=${this.fetchPosts}>
        ${this.posts.length
          ? this.renderPosts()
          : html`<div id="posts-loading-indicator">
              ${this.loadingMessage}
            </div>`}
      </div>
    `;
  }
}
