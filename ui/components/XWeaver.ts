import { StateValue } from "xstate";
import { Post, UserAuth } from "@spiders";
import {
  LitElement as X,
  html,
  property,
  customElement,
  query,
  css,
} from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import MarkdownIt from "markdown-it";
import { XWeaverCSS } from "../css/XWeaverCSS";
import { CodeCSS } from "../css/CodeCSS";
import { weaverMachine } from "../machines/weaverMachine";

const md = new MarkdownIt();

type WeaverPost = Pick<Post, "postId" | "title" | "body" | "raw" | "tags">;

@customElement("x-weaver")
export default class XWeaver extends X {
  @property() auth: UserAuth;
  @property() theme = "";
  @property() state: StateValue = "weave";
  @property() weaverPostInput: WeaverPost = {
    postId: "",
    title: "",
    body: "",
    raw: "",
    tags: "",
  };
  @property() rendered = md.render(this.weaverPostInput.raw);
  @property() title = md.render(this.weaverPostInput.title);
  @query("#title-input") titleInputElement: HTMLDivElement;
  @query("#body-editor") bodyEditorElement: HTMLDivElement;
  @query("#rendered") renderedElement: HTMLDivElement;
  @query("#tags-input") tagsInputElement: HTMLDivElement;

  firstUpdated() {
    // @ts-ignore
    weaverMachine.onTransition((state, event) => {
      this.state = state.value;
      console.log(state, event);
      // if (event.type === "UPDATE_WEAVER_POST")
      //   this.fillWeaverWithUpdateePost(event.postToUpdate as WeaverPost);
    });
  }

  static styles = [XWeaverCSS, CodeCSS];

  weave(value: string) {
    this.rendered = md.render(value);
  }

  stagePost() {
    weaverMachine.send("STAGE");
  }

  async handlePost() {
    if (this.someInputsAreEmpty()) return;

    weaverMachine.send("POST", {
      auth: this.auth,
      weaverPostInput: this.weaverPostInput,
    });
  }

  fillWeaverWithUpdateePost(post: WeaverPost) {
    this.weaverPostInput = post;
    this.titleInputElement.innerText = post.title;
    this.bodyEditorElement.innerText = post.raw;
    this.tagsInputElement.innerText = post.tags.replaceAll("#", "");
    this.weave(post.raw);
  }

  handleWeaverBodyInput(e: KeyboardEvent) {
    const { innerText } = e.target as HTMLInputElement;
    this.weaverPostInput = {
      ...this.weaverPostInput,
      body: this.rendered,
      raw: innerText,
    };
    this.weave(this.weaverPostInput.raw);
  }

  handleWeaverTitleInput(e: KeyboardEvent) {
    const { innerText } = e.target as HTMLDivElement;
    const title = innerText.trim();
    this.weaverPostInput = {
      ...this.weaverPostInput,
      title,
    };
    this.weave(this.weaverPostInput.raw);
  }

  handleWeaverTagsInput(e: KeyboardEvent) {
    let { innerText } = e.target as HTMLDivElement;
    const tags = innerText
      .trim()
      .split(" ")
      .map((tag) => `#${tag}`)
      .join(" ")
      .replace(/^\|+|#+$/g, "");
    if (e.key === "Space") innerText = tags;
    this.weaverPostInput = { ...this.weaverPostInput, tags };
  }

  someInputsAreEmpty() {
    if (!this.weaverPostInput.title) {
      weaverMachine.send("EMPTY_TITLE_ERROR");
      return true;
    }
    if (!this.weaverPostInput.body) {
      weaverMachine.send("EMPTY_BODY_ERROR");
      return true;
    }
    if (!this.weaverPostInput.tags) {
      weaverMachine.send("EMPTY_TAGS_ERROR");
      return true;
    }
    return false;
  }

  renderModeIcon(state: StateValue) {
    switch (state) {
      case "read":
        return html`<div class="control">View</div>`;
      case "weave":
        return html`<div class="control">Read</div>`;
      default:
        return html`<div class="control">View</div>`;
    }
  }

  renderStagePostButton(state: StateValue) {
    switch (state) {
      case "staged":
        return html`<div id="post-button" @click=${this.handlePost}>
          <icon>
            <div class="control" id="commit-post-button">Post</div>
          </icon>
        </div>`;
      case "posting":
        return html`<div id="post-button">
          <icon>
            <div class="control" id="posted-post-indicator">Done</div>
          </icon>
        </div>`;
      case "emptyTitleError":
        return html`<div id="post-button" @click=${this.handlePost}>
          <icon
            ><div class="control control-error" id="empty-title-indicator">
              Error
            </div></icon
          >
        </div>`;
      case "emptyBodyError":
        return html`<div id="post-button" @click=${this.handlePost}>
          <icon
            ><div class="control control-error" id="empty-body-indicator">
              Error
            </div></icon
          >
        </div>`;
      case "emptyTagsError":
        return html`<div id="post-button" @click=${this.handlePost}>
          <icon
            ><div class="control control-error" id="empty-tags-indicator">
              Error
            </div></icon
          >
        </div>`;
      default:
        return html`<div id="post-button" @click=${this.stagePost}>
          <icon>
            <div class="control" id="stage-post-button">Stage</div>
          </icon>
        </div>`;
    }
  }

  renderTitlePlaceholder(state: StateValue) {
    switch (state) {
      case "emptyTitleError":
        return "Please enter a title!";
      default:
        return "Untitled";
    }
  }

  renderBodyPlaceholder(state: StateValue) {
    switch (state) {
      case "emptyBodyError":
        return "Nothing to weave!";
      case "weave":
        return "Weave your web...";
      default:
        return this.weaverPostInput.raw;
    }
  }

  renderTagsPlaceholder(state: StateValue) {
    switch (state) {
      case "emptyTagsError":
        return "Please enter tags for this post!";
      default:
        return "Tags, separated by spaces";
    }
  }

  displayEditorOrRendered(state: StateValue, isEditor: boolean) {
    switch (state) {
      case "weave":
        return css`
          display: ${isEditor ? css`block` : css`none`};
        `;
      case "emptyBodyError":
        return css`
          display: ${isEditor ? css`block` : css`none`};
        `;
      default:
        return css`
          display: ${isEditor ? css`none` : css`block`};
        `;
    }
  }

  preventMultilineInput(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as HTMLDivElement).blur();
    }
  }

  render() {
    return html`
      <div
        id="title-input"
        data-placeholder=${this.renderTitlePlaceholder(this.state)}
        @keyup=${this.handleWeaverTitleInput}
        @keydown=${this.preventMultilineInput}
        contenteditable
      ></div>
      <div
        id="body-editor"
        data-placeholder=${this.renderBodyPlaceholder(this.state)}
        style=${this.displayEditorOrRendered(this.state, true)}
        @keyup=${this.handleWeaverBodyInput}
        contenteditable
      ></div>
      <div
        id="rendered"
        style=${this.displayEditorOrRendered(this.state, false)}
        @click=${() => {
          this.bodyEditorElement.focus();
          weaverMachine.send("TOGGLE_MODE");
        }}
      >
        ${unsafeHTML(this.rendered)}
      </div>
      <div
        id="tags-input"
        data-placeholder=${this.renderTagsPlaceholder(this.state)}
        @keyup=${this.handleWeaverTagsInput}
        @keydown=${this.preventMultilineInput}
        contenteditable
      ></div>
      <div id="controls">
        <div
          id="weaver-mode-indicator"
          @click=${() => weaverMachine.send("TOGGLE_MODE")}
        >
          <icon> ${this.renderModeIcon(this.state)}</icon>
        </div>
        ${this.renderStagePostButton(this.state)}
      </div>
    `;
  }
}
