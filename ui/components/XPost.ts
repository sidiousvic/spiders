import {
  LitElement as X,
  html,
  property,
  customElement,
  css,
} from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import Prism from "prismjs";
import { getHumanReadableDate } from "../utils";
import "prismjs/components/prism-typescript";

@customElement("x-post")
export default class XPost extends X {
  @property() theme = "";
  @property({ type: Object }) post: any;

  static styles = [
    css`
      .post > .post-title,
      .post-subtitle {
        text-align: left;
      }

      .post-title {
        overflow-wrap: break-word;
        font-family: Bison, sans-serif;
        margin: 2rem 0rem;
        font-size: 6rem;
        /* spiders gradient */
        background: -webkit-linear-gradient(
          90deg,
          var(--accentGradient),
          var(--accent)
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .post-subtitle {
        font-family: Encode Sans, sans-serif;
        color: var(--foreground);
        font-size: 0.9rem;
        font-weight: 500;
        font-style: italic;
      }

      .post-body > p {
        text-align: left;
        font-size: 1rem;
        color: var(--foreground);
        font-family: Encode Sans, sans-serif;
        line-height: 2.5rem;
        font-weight: lighter;
      }

      #links {
        transition: ease-out 1s;
        width: 50%;
      }

      .tags {
        font-family: Dank Mono, sans-serif;
        color: var(--accent);
      }
    `,
    css`
      .dark {
        --code-foreground: var(--spiders-bone);
        --code-background: var(--spiders-gray-light);
        /* --border: var(--spiders-blue-light); */
        --keyword: var(--spiders-purple-light);
        --function: var(--spiders-blue-light);
        --string: var(--spiders-mint-light);
      }

      .light {
        --code-foreground: var(--spiders-gray);
        --code-background: var(--spiders-bone-dark);
        --border: var(--spiders-blue);
        --keyword: var(--spiders-purple);
        --function: var(--spiders-blue-dark);
        --string: var(--spiders-pastel-dark);
      }

      pre > code {
        font-size: 1rem;
        border-radius: 5px;
      }

      code[class*="language-"],
      pre[class*="language-"] {
        -moz-tab-size: 2;
        -o-tab-size: 2;
        tab-size: 2;
        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
        white-space: pre;
        white-space: pre-wrap;
        word-wrap: normal;
        font-family: Dank Mono;
        font-size: 1rem;
        color: var(--code-foreground);
        text-shadow: none;
        cursor: crosshair;
        overflow-wrap: break-word;
      }

      pre > code[class*="language-"] {
        font-size: 0.9rem;
      }

      pre[class*="language-"],
      :not(pre) > code[class*="language-"] {
        background: var(--code-background);
      }

      :not(pre) > code[class*="language-"] {
        background: none;
      }

      pre[class*="language-"] {
        padding: 1rem 2rem;
        border-radius: 5px;
        border: 0px dashed var(--border);
        overflow: auto;
        position: relative;
        overflow: scroll;
        box-shadow: 2px 2px blur;
      }

      pre[class*="language-"] code {
        white-space: pre;
        display: block;
      }

      .token.namespace {
        opacity: 0.7;
      }

      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: #272829;
      }

      .token.operator,
      .token.boolean,
      .token.number {
        color: var(--keyword);
      }

      .token.attr-name,
      .token.string {
        color: var(--string);
      }

      .token.entity,
      .token.url,
      .language-css .token.string,
      .style .token.string {
        color: var(--string);
      }

      .token.selector,
      .token.inserted,
      .token.function {
        color: var(--function);
      }

      .token.atrule,
      .token.attr-value,
      .token.keyword,
      .token.important,
      .token.deleted {
        color: var(--keyword);
      }

      .token.regex,
      .token.statement {
        color: #76d9e6;
      }

      .token.placeholder,
      .token.variable,
      .token.class-name {
        color: var(--function);
      }

      .token.important,
      .token.statement,
      .token.bold {
        font-weight: bold;
      }

      .token.punctuation {
        color: #bebec5;
      }

      .token.entity {
        cursor: help;
      }

      .token.italic {
        font-style: italic;
      }

      code.language-markup {
        color: #f9f9f9;
      }

      code.language-markup .token.tag {
        color: #ef3b7d;
      }

      code.language-markup .token.attr-name {
        color: #ff38f5;
      }

      code.language-markup .token.attr-value {
        color: #ff38f5;
      }

      code.language-markup .token.style,
      code.language-markup .token.script {
        color: #76d9e6;
      }

      code.language-markup .token.script .token.keyword {
        color: #76d9e6;
      }

      /* Line highlight plugin */
      pre[class*="language-"][data-line] {
        position: relative;
        padding: 1em 0 1em 3em;
      }

      pre[data-line] .line-highlight {
        position: absolute;
        left: 0;
        right: 0;
        padding: 0;
        margin-top: 1em;
        background: rgba(255, 255, 255, 0.08);
        pointer-events: none;
        line-height: inherit;
        white-space: pre;
      }

      pre[data-line] .line-highlight:before,
      pre[data-line] .line-highlight[data-end]:after {
        content: attr(data-start);
        position: absolute;
        top: 0.4em;
        left: 0.6em;
        min-width: 1em;
        padding: 0.2em 0.5em;
        background-color: rgba(255, 255, 255, 0.4);
        color: black;
        font: bold 65%/1 sans-serif;
        height: 1em;
        line-height: 1em;
        text-align: center;
        border-radius: 999px;
        text-shadow: none;
        box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
      }

      pre[data-line] .line-highlight[data-end]:after {
        content: attr(data-end);
        top: auto;
        bottom: 0.4em;
      }
    `,
  ];

  firstUpdated() {
    Prism.highlightAllUnder(this.shadowRoot);
  }

  render() {
    return html`
      <div class="post ${this.theme}">
        <h1 class="post-title">${this.post.title}</h1>
        <h2 class="post-subtitle">
          by ${this.post.author} @
          ${getHumanReadableDate(new Date(this.post.createdAt))}
        </h2>
        <div class="post-body">${unsafeHTML(this.post.body)}</div>
        <br />
        <sub class="tags"> </sub>
      </div>
    `;
  }
}
