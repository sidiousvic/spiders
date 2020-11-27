import { UserAuth } from "spiders";
import { LitElement as X, html, property, customElement } from "lit-element";
import { floodLightService } from "../machines/floodLightMachine";
import "./XPostCard";
import { XPostCardsCSS } from "../css/XPostCardsCSS";

@customElement("x-post-cards")
export default class XPostCards extends X {
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

  static styles = [XPostCardsCSS];

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

  renderLoadingMessage() {
    setTimeout(() => {
      if (!this.posts.length) this.loadingMessage = "No webs found.";
    }, 3000);
    return html`<div id="posts-loading-indicator">${this.loadingMessage}</div>`;
  }

  render() {
    return html`
      <div class="posts" @onPostDelete=${this.fetchPosts}>
        ${this.posts.length ? this.renderPosts() : this.renderLoadingMessage()}
      </div>
    `;
  }
}
