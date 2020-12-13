// import { Post, UserAuth } from "@spiders";
// import { LitElement as X, html, property, customElement } from "lit-element";
// import truncateHTML from "truncate-html";
// import { unsafeHTML } from "lit-html/directives/unsafe-html";
// // import { XMain } from "../css/XMainCSS";
// import { getHumanReadableDate } from "../utils";

// @customElement("x-main")
// export default class XMain extends X {
//   @property() theme = "";
//   @property() loadingMessage = "Weaving webs...";
//   @property() auth: UserAuth;
//   @property() post: Partial<Post> = {};

//   connectedCallback() {}

//   //   static styles = [XMain];

//   render() {
//     const postBodyVisual = unsafeHTML(this.post.body.split("</pre>")[0]);
//     const postBodyText = unsafeHTML(
//       truncateHTML(this.post.body.split("</pre>")[1] || "NO VISUAL", 12, {
//         byWords: true,
//         excludes: ["code"],
//       })
//     );
//     return html`
//       <div class="post ${this.theme}">
//         <h1 class="post-title">${this.post.title}</h1>
//         <h2 class="post-subtitle">
//           ${getHumanReadableDate(new Date(this.post.createdAt))}
//         </h2>
//         <div class="post-card-body">${postBodyVisual}${postBodyText}</div>
//         <sub class="post-card-tags">${this.post.tags}</sub>
//       </div>
//     `;
//   }
// }
