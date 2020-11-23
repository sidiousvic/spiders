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
  @property() postInput: Partial<Post> = {};
  @query("#title-input") titleInputElement: HTMLDivElement;
  @query("#body-editor") bodyEditorElement: HTMLDivElement;
  @query("#rendered") renderedElement: HTMLDivElement;
  @query("#tags-input") tagsInputElement: HTMLDivElement;

  updated() {
    console.log(this.mode);
  }

  firstUpdated() {
    weaverService.onTransition(({ value, context: { post } }) => {
      if (value === "RESET") {
        weaverService.send("RESET", { post: {} });
      }
      if (post && post.postId !== this.postInput.postId) {
          this.handleUpdatePostStateTransition(post);
      }
        this.mode = value;
    });

    if (!this.auth.token) routerService.send("/signin" as Routes);
  }

  static styles = [XWeaverCSS, spidersCodeCSS];

  weave(value: string) {
    this.rendered = md.render(value);
  }

  handleUpdatePostStateTransition(post: Partial<Post>) {
    if (post) {
    this.postInput = post;
    this.titleInputElement.innerText = post.title;
    this.bodyEditorElement.innerText = post.raw;
    this.weave(post.raw);
    this.tagsInputElement.innerText = post.tags;
  }
  }

  handlePostBodyInput(e: KeyboardEvent) {
    const { innerText } = e.target as HTMLInputElement;
    this.weave(innerText);
    this.postInput = { ...this.postInput, body: this.rendered, raw: innerText };
  }

  handleTitleInput(e: KeyboardEvent) {
    const { innerText } = e.target as HTMLDivElement;
    this.postInput = { ...this.postInput, title: innerText.trim() };
  }

  handleTagsInput(e: KeyboardEvent) {
    let { innerText } = e.target as HTMLDivElement;
    const tags = innerText
      .trim()
      .split(" ")
      .map((tag) => `#${tag}`)
      .join(" ")
      .replace(/^\|+|#+$/g, "");
    if (e.key === "Space") innerText = tags;
    this.postInput = { ...this.postInput, tags };
  }

  validatePostInput() {
    if (!this.postInput.title) {
      weaverService.send("EMPTY_TITLE_ERROR");
      setTimeout(() => {
        weaverService.send("RESET");
      }, 1000);
      return false;
    }
    if (!this.postInput.body) {
      weaverService.send("EMPTY_BODY_ERROR");
      setTimeout(() => {
        weaverService.send("RESET");
      }, 1000);
      return false;
    }
    if (!this.postInput.tags) {
      weaverService.send("EMPTY_TAGS_ERROR");
      setTimeout(() => {
        weaverService.send("RESET");
      }, 1000);
      return false;
    }
    return true;
  }

  async handleCommitPost() {
    if (!this.validatePostInput()) return;

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

    const updatePostQuery = `
      mutation updatePost($input: UpdatePostInput!) {
        updatePost(
          input: $input
        ) {
          message
          resource
        }
      }
    `;

    const variables = {
      input: {
        postId: this.postInput.postId,
        userId: this.auth.user.userId,
        title: this.postInput.title,
        author: this.auth.user.username,
        body: this.postInput.body,
        raw: this.postInput.raw,
        tags: this.postInput.tags,
      },
    };

    const headers = {
      authorization: this.auth.token,
    };

    const upsertQuery = this.postInput.postId ? updatePostQuery : addPostQuery;
    const { errors } = await fireGraphQLQuery(upsertQuery, variables, headers);

    if (errors) {
      logGraphQLErrors(errors);
      weaverService.send("POST_ERROR");
      setTimeout(() => {
        weaverService.send("RESET");
      }, 1000);
      return;
    }

    weaverService.send("POSTED");
    setTimeout(() => {
      weaverService.send("RESET");
    }, 1000);
  }

  switchModeIcon() {
    switch (this.mode) {
      case "read":
        return "👁‍🗨";
      case "weave":
        return "🕸";
      default:
        return "👁‍🗨";
    }
  }

  switchStagePostIcon() {
    switch (this.mode) {
      case "staged":
        return "🔋";
      case "posted":
        return "✅";
      case "emptyTitleError":
        return "❌";
      case "emptyBodyError":
        return "❌";
      default:
        return "⚡️";
    }
  }

  renderRenderedStyles() {
    switch (this.mode) {
      case "weave":
        return css`
          display: none;
        `;
      default:
        return css`
          display: block;
        `;
    }
  }

  renderTitlePlaceholder() {
    switch (this.mode) {
      case "emptyTitleError":
        return "Please enter a title!";
      default:
        return "Untitled";
    }
  }

  renderBodyContent() {
    switch (this.mode) {
      case "emptyBodyError": {
        return html`<p style="color: gray">Please enter a body!</p>`;
      }
      default:
        return unsafeHTML(this.rendered);
    }
  }

  render() {
    return html`<div id="weaver" class=${this.theme}>
      <div id="controls">
        <div
          id="weaverModeIndicator"
          @click=${() => {
            weaverService.send("TOGGLE_MODE");
          }}
        >
          <icon> ${this.switchModeIcon()} </icon>
        </div>
        <div
          id="stagePostButton"
          @click=${() => {
            if (this.mode === "staged") {
              this.handleCommitPost();
            } else weaverService.send("STAGE");
          }}
        >
          <icon> ${this.switchStagePostIcon()} </icon>
        </div>
      </div>
      <div
        id="title-input"
        data-placeholder=${this.renderTitlePlaceholder()}
        contenteditable
        @keyup=${this.handleTitleInput}
      ></div>
      <div
        contenteditable
        data-placeholder="Weave something..."
        @keyup=${this.handlePostBodyInput}
        id="body-editor"
      ></div>
      <div
        id="rendered"
        style=${this.renderRenderedStyles()}
        @click=${() => {
          this.bodyEditorElement.focus();
          weaverService.send("TOGGLE_MODE");
        }}
      >
        ${this.renderBodyContent()}
      </div>
      <div
        id="tags-input"
        data-placeholder="Tags here, separated by spaces"
        contenteditable
        @keyup=${this.handleTagsInput}
      ></div>
    </div> `;
  }
}
