import { UserAuth } from "spiders";
import { LitElement as X, html, property, customElement } from "lit-element";
import "./XPostCard";
import { XPostsCSS } from "../css/XPostsCSS";

@customElement("x-posts")
export default class XPosts extends X {
  @property() theme = "";
  @property() postsFetched = false;
  @property() loadingMessage = "W e a v i n g ...";
  @property() auth: UserAuth;
  @property() posts = null;

  connectedCallback() {
    super.connectedCallback();
    if (!this.postsFetched) this.fetchPosts();
    setTimeout(() => {
      if (!this.postsFetched) this.loadingMessage = "No webs found.";
    }, 3000);
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

    this.posts = findPosts;
    setTimeout(() => {
      this.postsFetched = true;
    }, 700);
  }

  static styles = [XPostsCSS];

  renderPosts() {
    return this.posts.map(
      (post) => html` <x-post-card
        theme=${this.theme}
        .post=${post}
        .auth=${this.auth}
      />`
    );
  }

  render() {
    return html`
      <div class="posts" @onPostDelete=${this.fetchPosts}>
        ${this.postsFetched
          ? this.renderPosts()
          : html`<div id="posts-loading-indicator">
              ${this.loadingMessage}
            </div>`}
      </div>
    `;
  }
}
