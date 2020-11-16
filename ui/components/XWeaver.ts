import { Post, UserAuth } from "spiders";
import {
  LitElement as X,
  html,
  property,
  customElement,
  query,
  css,
} from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import prism from "markdown-it-prism";
import MarkdownIt from "markdown-it";
import "prismjs/components/prism-typescript";
import { indent } from "indent.js";
import { XWeaverCSS } from "../css/XWeaverCSS";
import { spidersCodeCSS } from "../css/SpidersCodeCSS";
import { routerService, Routes } from "../machines/routeMachine";
import { weaverMachine, weaverService } from "../machines/weaverMachine";
import { fireGraphQLQuery, logGraphQLErrors } from "../utils";

const md = new MarkdownIt();
md.use(prism, { defaultLanguageForUnknown: "ts" });

@customElement("x-weaver")
export default class XWeaver extends X {
  @property() auth: UserAuth;
  @property() theme = "";
  @property() rendered = "";
  @property() raw = indent.html(this.rendered, {
    tabString: "  ",
  });
  @property() mode = weaverMachine.initialState.value;
  @property() postInput: Partial<Post>;
  @query("#rendered") renderedElement: HTMLDivElement;

  updated() {
    console.log(this.postInput);
  }

  firstUpdated() {
    weaverService
      .onTransition(({ value }) => {
        this.mode = value;
      })
      .start();

    if (!this.auth.token) routerService.send("/signin" as Routes);
  }

  static styles = [XWeaverCSS, spidersCodeCSS];

  weave(value: string) {
    this.rendered = md.render(value);
  }

  handlePostBodyInput(e: KeyboardEvent) {
    const { innerText } = e.target as HTMLInputElement;
    this.weave(innerText);
    this.postInput = { ...this.postInput, body: this.rendered };
  }

  handleTitleInput(e: KeyboardEvent) {
    const { value } = e.target as HTMLInputElement;
    this.postInput = { ...this.postInput, title: value.trim() };
  }

  handleTagsInput(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    const tags = target.value
      .trim()
      .split(" ")
      .map((tag) => `#${tag}`)
      .join(" ")
      .replace(/^\|+|#+$/g, "");
    if (e.key === "Space") target.value = tags;
    this.postInput = { ...this.postInput, tags };
  }

  async handleCommitPost() {
    const addPostQuery = `
      mutation addPost($input: AddPostInput!) {
        addPost(
          input: $input
        ) {
          message
          resource
        }
      }
    `;

    const variables = {
      input: {
        userId: this.auth.user.userId,
        title: this.postInput.title,
        author: this.auth.user.username,
        body: this.postInput.body,
        tags: this.postInput.tags,
      },
    };

    const headers = {
      authorization: this.auth.token,
    };

    const { data, errors } = await fireGraphQLQuery(
      addPostQuery,
      variables,
      headers
    );

    if (errors) {
      logGraphQLErrors(errors);
      return;
    }

    const {
      addPost: { message, resource },
    } = data;
    console.log(message, resource);
  }

  render() {
    return html`
    <div id="weaver" class=${this.theme}>

      <div id="controls">

      <div
      id="weaverModeIndicator"
      @click=${() => {
        weaverService.send("TOGGLE_MODE");
      }}
    >
      <icon>${this.mode === "weave" ? "🍊" : "🍌"}</icon>
    </div>

    <div
    id="stagePostButton"
    @click=${() => {
      if (this.mode === "staged") {
        this.handleCommitPost();
      } else weaverService.send("STAGE");
    }}>
    <icon>${this.mode === "staged" ? "‍👌🏽" : "📮"}</icon>
  </div>

      </div>

      <input
          type="text"
          placeholder="Untitled"
          id="title-input"
          @keyup=${this.handleTitleInput}
        ></input>
        <div
          contenteditable
          data-placeholder="Weave something..."
          @keyup=${this.handlePostBodyInput}
          id="body-editor"
        ></div>
        <div
          id="rendered"
          style=${`display: ${this.mode === "weave" ? css`none` : css`block`}`}
        >
          ${unsafeHTML(this.rendered)}
        </div>
        <input
          type="text"
          placeholder="Tags here, separated by spaces"
          id="tags-input"
          @keyup=${this.handleTagsInput}
        ></input>
      </div>
`;
  }
}
