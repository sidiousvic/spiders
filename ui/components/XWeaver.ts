import { Post } from "spiders";
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
// import { routerService, Routes } from "../machines/routeMachine";
import { weaverMachine, weaverService } from "../machines/weaverMachine";

const md = new MarkdownIt();
md.use(prism, { defaultLanguageForUnknown: "ts" });

@customElement("x-weaver")
export default class XWeaver extends X {
  @property() auth;
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

    // if (!this.auth.token) routerService.send("/signin" as Routes);
    this.weave(`\`\`\`
    const authResolvers: AuthResolvers = {
      Query: {
        me: authenticated((_, __, { authedUser }) => authedUser),
      },
      Mutation: {
        async signIn(_, { input: signInInput }, { models }) {
          const user = await models.User.find(signInInput);
          if (!user) throw new AuthenticationError("User not found.");
          const verified = verifySignin(signInInput, user);
          if (!verified) throw new AuthenticationError("Wrong signin.");
          const token = generateToken(user);
          return { token, user };
        },
        async signUp(_, { input: signUpInput }, { models }) {
          let user = {};
          try {
            user = await models.User.add(signUpInput);
          } catch ({ code }) {
            if (code === "23505") throw new UserInputError("User already exists.");
          }
          if (!user) throw new AuthenticationError("Unable to sign up user.");
          return user as User;
        },
      },
    };
    
    export { authResolvers };`);
  }

  static styles = [XWeaverCSS, spidersCodeCSS];

  weave(value: string) {
    this.rendered = md.render(value);
  }

  handlePostBodyInput(e: KeyboardEvent) {
    const { innerText } = e.target as HTMLInputElement;
    this.weave(innerText);
    this.postInput = { ...this.postInput, body: innerText.trim() };
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

  render() {
    return html`
      <div
        id="weaverModeIndicator"
        @click=${() => {
          weaverService.send("TOGGLE");
        }}
      >
        ${this.mode === "weave" ? "🍊" : "🍌"}
      </div>
      <div id="weaver" class=${this.theme}>
      <input
          type="text"
          placeholder="Untitled"
          id="title-input"
          @keyup=${this.handleTitleInput}
        ></input>
        <div
          contenteditable
          id="body-editor"
          @keyup=${this.handlePostBodyInput}
        ></div>
        <div
          id="rendered"
          style=${`display: ${this.mode === "read" ? css`block` : css`none`}`}
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
