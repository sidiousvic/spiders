import { StateValue } from "xstate";
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
import MarkdownIt from "markdown-it";
import prism from "markdown-it-prism";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import { indent } from "indent.js";
import { XWeaverCSS } from "../css/XWeaverCSS";
import { SpidersCodeCSS } from "../css/SpidersCodeCSS";
import { routerService, Routes } from "../machines/routeMachine";
import { weaverMachine, weaverService } from "../machines/weaverMachine";
import { fireGraphQLQuery, logGraphQLErrors } from "../utils";

const md = new MarkdownIt();
md.use(prism, { defaultLanguage: "typescript" });

type WeaverPost = Pick<Post, "postId" | "title" | "body" | "raw" | "tags">;

@customElement("x-weaver")
export default class XWeaver extends X {
  @property() auth: UserAuth;
  @property() theme = "";
  @property() state: StateValue = weaverMachine.initialState.value;
  @property() weaverPostInput: WeaverPost = {
    postId: null,
    title: "Untitled",
    body: null,
    raw: null,
    tags: null,
  };
  @property() weaverBodyTemplate = `
  \`\`\`
  +----------------------------+
  |. . . . . . . . . . . . . . |
  |. . . . . . . . . . . . . . |
  |. . . . . . . . . . . . . . |
  |. . . . . . . . . . . . . . |
  |. . . . . . . . . . . . . . |
  |. . . . . . . . . . . . . . |
  |. . . . . . . . . . . . . . |
  |. . . . . . . . . . . . . . |
  +----------------------------+
  \`\`\`
  `;
  @property() raw = indent.html(this.weaverBodyTemplate, {
    tabString: "  ",
  });
  @property() rendered = md.render(this.raw);
  @property() title = md.render(this.weaverPostInput.title);
  @query("#title-input") titleInputElement: HTMLDivElement;
  @query("#body-editor") bodyEditorElement: HTMLDivElement;
  @query("#rendered") renderedElement: HTMLDivElement;
  @query("#tags-input") tagsInputElement: HTMLDivElement;

  firstUpdated() {
    this.bodyEditorElement.innerText = this.weaverBodyTemplate;
    weaverService.onTransition(({ value, context: { post }, event }) => {
      if (event.type === "UPDATE")
        this.fillWeaverWithUpdateePost(post as WeaverPost);
      this.state = value;
    });
  }

  static styles = [XWeaverCSS, SpidersCodeCSS];

  weave(value: string) {
    this.rendered = md.render(`# ${this.weaverPostInput.title} ${value}`);
  }

  /** @todo Slim this beastie down */
  async handleCommitPost() {
    if (this.someInputsAreEmpty()) return;

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

    const addPostQueryVariables = {
      input: {
        userId: this.auth.user.userId,
        title: this.weaverPostInput.title,
        author: this.auth.user.username,
        body: this.weaverPostInput.body,
        raw: this.weaverPostInput.raw,
        tags: this.weaverPostInput.tags,
      },
    };

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

    const updatePostQueryVariables = {
      input: {
        postId: this.weaverPostInput.postId,
        title: this.weaverPostInput.title,
        author: this.auth.user.username,
        body: this.weaverPostInput.body,
        raw: this.weaverPostInput.raw,
        tags: this.weaverPostInput.tags,
      },
    };

    const upsertQuery = this.weaverPostInput.postId
      ? updatePostQuery
      : addPostQuery;

    const variables = this.weaverPostInput.postId
      ? updatePostQueryVariables
      : addPostQueryVariables;

    const headers = {
      authorization: this.auth.token,
    };

    const { errors } = await fireGraphQLQuery(upsertQuery, variables, headers);

    if (errors) {
      logGraphQLErrors(errors);
      weaverService.send("POST_ERROR");
      setTimeout(() => weaverService.send("RESET"), 1000);
      return;
    }

    weaverService.send("POSTED");

    setTimeout(() => weaverService.send("RESET"), 1000);
    setTimeout(() => routerService.send("/" as Routes), 1000);
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
    this.weave(innerText);
    this.weaverPostInput = {
      ...this.weaverPostInput,
      body: this.rendered,
      raw: innerText,
    };
  }

  renderTitleOnFirstLineOfEditor() {
    this.weave(this.raw);
  }

  handleWeaverTitleInput(e: KeyboardEvent) {
    const { innerText } = e.target as HTMLDivElement;
    const title = innerText.trim();
    this.weaverPostInput = {
      ...this.weaverPostInput,
      title,
    };
    this.weave(this.raw);
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
      weaverService.send("EMPTY_TITLE_ERROR");
      setTimeout(() => {
        weaverService.send("RESET");
      }, 1000);
      return true;
    }
    if (!this.weaverPostInput.body) {
      weaverService.send("EMPTY_BODY_ERROR");
      setTimeout(() => {
        weaverService.send("RESET");
      }, 1000);
      return true;
    }
    if (!this.weaverPostInput.tags) {
      weaverService.send("EMPTY_TAGS_ERROR");
      setTimeout(() => {
        weaverService.send("RESET");
      }, 1000);
      return true;
    }
    return false;
  }

  renderModeIcon(state: StateValue) {
    switch (state) {
      case "read":
        return html`<div class="control">🏴‍☠️&nbspVIEW</div>`;
      case "weave":
        return html`<div class="control">🏴&nbspVIEW</div>`;
      default:
        return html`<div class="control">🏴‍☠️&nbspVIEW</div>`;
    }
  }

  renderStagePostButton(state: StateValue) {
    switch (state) {
      case "staged":
        return html`<div class="control" id="commit-post-button">
          ⚡️&nbspPOST&nbsp;
        </div>`;
      case "posted":
        return html`<div class="control" id="posted-post-indicator">
          ✅&nbspDONE&nbsp;
        </div>`;
      case "emptyTitleError":
        return html`<div class="control" id="empty-title-indicator">
          🚨&nbspERROR
        </div>`;
      case "emptyBodyError":
        return html`<div class="control" id="empty-body-indicator">
          🚨&nbspERROR
        </div>`;
      default:
        return html`<div class="control" id="stage-post-button">
          🔋&nbspSTAGE
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
    return html`<div id="weaver" data-theme=${this.theme}>
      <div
        id="title-input"
        data-placeholder=${this.renderTitlePlaceholder(this.state)}
        @keyup=${this.handleWeaverTitleInput}
        @keydown=${this.preventMultilineInput}
        contenteditable
      ></div>
      <div
        id="body-editor"
        data-placeholder="Weave something..."
        style=${this.displayEditorOrRendered(this.state, true)}
        @keyup=${this.handleWeaverBodyInput}
        contenteditable
      ></div>
      <div
        id="rendered"
        style=${this.displayEditorOrRendered(this.state, false)}
        @click=${() => {
          this.bodyEditorElement.focus();
          weaverService.send("TOGGLE_MODE");
        }}
      >
        ${unsafeHTML(this.rendered)}
      </div>
      <div
        contenteditable
        id="tags-input"
        data-placeholder=${this.renderTagsPlaceholder(this.state)}
        @keyup=${this.handleWeaverTagsInput}
        @keydown=${this.preventMultilineInput}
      ></div>
      <div id="controls">
        <div
          id="weaver-mode-indicator"
          @click=${() => weaverService.send("TOGGLE_MODE")}
        >
          <icon> ${this.renderModeIcon(this.state)}</icon>
        </div>
        <div
          id="post-button"
          @click=${async () => {
            if (this.state === "staged") await this.handleCommitPost();
            else weaverService.send("STAGE");
          }}
        >
          <icon> ${this.renderStagePostButton(this.state)} </icon>
        </div>
      </div>
    </div> `;
  }
}
