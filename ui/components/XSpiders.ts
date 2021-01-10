import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { LitElement as X, html, customElement, property } from "lit-element";
import { Post } from "@spiders";
import { XSpidersCSS } from "../css/XSpidersCSS";
import { UniversalCSS } from "../css/UniversalCSS";
import { dataMachine } from "../machines/dataMachine";

@customElement("x-spiders")
class XSpiders extends X {
  static styles = [UniversalCSS, XSpidersCSS];
  @property() posts: Post[] = [];

  firstUpdated() {
    dataMachine.send("FETCH_POSTS");
    dataMachine.onTransition(({ context: { posts } }) => {
      if (posts.length) this.posts = posts;
    });
  }

  render() {
    return this.posts.length
      ? this.posts.map(
          (post) =>
            html`<div id="post">
              <h1>${post.title}</h1>
              <h3>${post.createdAt}</h3>
              ${unsafeHTML(post.body)}
              <sub>${post.tags}</sub>
            </div>`
        )
      : "Loading...";
  }
}

export { XSpiders };
