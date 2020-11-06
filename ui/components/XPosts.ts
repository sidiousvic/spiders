import {
  LitElement as X,
  html,
  property,
  customElement,
  css,
} from "lit-element";
import "./XPost";

@customElement("x-posts")
export default class XPosts extends X {
  @property() theme = "";
  @property() posts = null;

  connectedCallback() {
    super.connectedCallback();
    if (!this.posts) this.fetchPosts();
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
            title 
            author 
            body 
            createdAt 
          }
        }`,
      }),
    });

    const {
      data: { findPosts },
    } = await res.json();

    this.posts = findPosts;
  }

  static styles = css`
    :host {
      width: 40%;
      margin: 1rem 4rem;
    }
  `;

  render() {
    return html`
      <div class="posts">
        ${this.posts
          ? this.posts.map(
              (post) => html` <x-post theme=${this.theme} .post=${post} />`
            )
          : "Loading"}
      </div>
    `;
  }
}
